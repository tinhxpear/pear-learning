"use server"
import db from "@/db/drizzle"
import { challenges } from "@/db/schema"
import { eq, sql } from "drizzle-orm"

export const getChallengeByLessonId = async (lessonId: string) => {
    return await db.select().from(challenges)
        .where(eq(challenges.lessonId, lessonId));
}

type NewChallenge = typeof challenges.$inferInsert;
export const addChallenge = async (challenge : NewChallenge) => {
    await db.insert(challenges).values(challenge);
}

export const deleteChallengeAction = async(id: string) => {
    await db.delete(challenges).where(eq(challenges.id, id));
}


export const updateChallengeAction =  async(challenge: NewChallenge) => {
    return await db.update(challenges).set({
        id: challenge.id,
        type: challenge.type,
        question: challenge.question,
        order: challenge.order,
        lessonId: challenge.lessonId
    }).where(sql`${challenges.id} = ${challenge?.id}`);
}