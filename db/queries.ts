import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs";
import { eq, sql } from "drizzle-orm";
import { challengeOptions, challengeProgress, challenges, courses, lessons, units, userProgress } from "@/db/schema";

export const getUserProgress = cache(async () => {
    const {userId} = auth();
    if(!userId) {
        return null;
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        },
    });
    return data;
});
export const getCourses = cache( async () => {
    const data = await db.query.courses.findMany();

    return data;
});


export const getUnits = cache(async () => {
    const {userId} = auth();
    const userProgress = await getUserProgress();
    if(!userId || !userProgress?.activeCourseId) {
        return [];
    };
    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                with: {
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId)
                            }
                        }
                    }
                }
            }
        }
    });
    const nomarlizedData = data.map((unit) => {
        const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {

            if(lesson.challenges.length === 0){
                return {...lesson, completed: false}
            }
            const allCompletedChallenges = lesson.challenges.every((challenge) => {
                return challenge.challengeProgress 
                    && challenge.challengeProgress.length > 0
                    && challenge.challengeProgress.every((progress) => progress.completed);
            });
            return { ...lesson, completed: allCompletedChallenges}
        });
        return { ...unit, lessons: lessonsWithCompletedStatus}
    });

    return nomarlizedData;
});

export const getCourseProgress = cache(async () => {
    const {userId} = await auth();
    const userProgress = await getUserProgress();

    if(!userId || !userProgress?.activeCourseId){
        return null;
    }
    const unitsInActiveCourse = await db.query.units.findMany({
        orderBy: (units, {asc}) => [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                orderBy: (lessons, {asc}) => [asc(lessons.order)],
                with: {
                    unit: true,
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId),
                            }
                        }
                    }
                }
            }
        }
    });
    const firstUnCompletedLesson = unitsInActiveCourse
        .flatMap((unit) => unit.lessons)
        .find((lesson) => {
            return lesson.challenges.some((challenge) => {
                return !challenge.challengeProgress 
                    || challenge.challengeProgress.length === 0
                    || challenge.challengeProgress.some((progress) => progress.completed === false);
            })
        })
    
    return {
        activeLesson: firstUnCompletedLesson,
        activeLessonId: firstUnCompletedLesson?.id,
    }
});

export const getLesson = cache(async (id?: string) => {
    const {userId} = auth();
    if(!userId){
        return null;
    }
    const courseProgress = await getCourseProgress();

    const lessonId = id || courseProgress?.activeLessonId;

    if(!lessonId){
        return null;
    }
    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with: {
            challenges: {
                orderBy: (challenges, {asc}) => [asc(challenges.order)],
                with: {
                    challengeOptions: true,
                    challengeProgress: {
                        where: eq(challengeProgress.userId, userId),
                    },
                },
            },
        },
    });
    if(!data || !data.challenges){
        return null;
    }
    const normalizedChallenges = data.challenges.map((challenge) => {
        const completed = challenge.challengeProgress 
            && challenge.challengeProgress.length > 0
            && challenge.challengeProgress.every((progress) => progress.completed);
        return {... challenge, completed: completed}
    });
    return {...data, challenges: normalizedChallenges}
});

export const getLessonPercentage = cache(async () => {
    const courseProgress = await getCourseProgress();
    if(!courseProgress?.activeLessonId){
        return 0;
    }

    const lesson = await getLesson(courseProgress.activeLessonId);
    if(!lesson){
        return 0;
    }
    const completedChallenges = lesson.challenges.filter((challenge) => challenge.completed);
    const percentage = Math.round((completedChallenges.length / lesson.challenges.length) * 100);
    return percentage;
});



export const getTopTenUsers = cache(async () => {
    const {userId} = auth();
    if(!userId){
        return [];
    }
    const data = await db.query.userProgress.findMany({
        orderBy: (userProgress, {desc}) => [desc(userProgress.points)],
        limit: 10,
        columns: {
            userId: true,
            userName: true,
            userImageSrc: true,
            points: true,
        },
    });
    return data;
});


export const getCourseById = cache(async (courseId: string) => {
    const data = await db.query.courses.findFirst({
        where: sql`${courses.id} = ${courseId}`,
    });
    return data;
});

export const getChallengeOptionById = cache(async (challengeOptionId: string) => {
    const data = await db.query.challengeOptions.findFirst({
        where: sql`${challengeOptions.id} = ${challengeOptionId}`,
    });
    return data;
});

export const getUnitById = cache(async (unitId: string) => {
    const data = await db.query.units.findFirst({
        where: sql`${units.id} = ${unitId}`,
    });
    return data;
});

export const getLessonById = cache(async (lessonId: string) => {
    const data = await db.query.lessons.findFirst({
        where: sql`${lessons.id} = ${lessonId}`,
    });
    return data;
});

export const getChallengeById = cache(async (challengeId: string) => {
    const data = await db.query.challenges.findFirst({
        where: sql`${challenges.id} = ${challengeId}`,
    });
    return data;
});

