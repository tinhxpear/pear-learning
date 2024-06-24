import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image-src").notNull()
});
export const coursesRelations = relations(courses, ({many}) => ({
    userProgress: many(userProgress),
    units: many(units),
}));

export const units = pgTable("units", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    courseId: uuid("course_id").references(() => courses.id, {onDelete: "cascade"}).notNull(),
    order: integer("order").notNull(),
});

export const unitsRelations = relations(units, ({many, one}) => ({
    course: one(courses, {
        fields: [units.courseId],
        references: [courses.id],
    }),
    lessons: many(lessons),
}));

export const lessons = pgTable("lessons", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    unitId: uuid("unit_id").references(() => units.id, {onDelete: "cascade"}).notNull(),
    order: integer("order").notNull(),
});

export const lessonsRelations = relations(lessons, ({one, many}) => ({
    unit: one(units, {
        fields: [lessons.unitId],
        references: [units.id],
    }),
    challenges: many(challenges),
}));

export const challenges = pgTable("challenges", {
    id: uuid("id").defaultRandom().primaryKey(),
    lessonId: uuid("lesson_id").references(() => lessons.id, {onDelete: "cascade"}).notNull(),
    type: text('type').notNull(),
    question: text("question").notNull(),
    order: integer("order").notNull(),
});

export const challengesRelation = relations(challenges, ({one, many}) => ({
    lesson: one(lessons, {
        fields: [challenges.lessonId],
        references: [lessons.id],
    }),
    challengeOptions: many(challengeOptions),
    challengeProgress: many(challengeProgress),
}));

export const challengeOptions = pgTable("challenge_options", {
    id: uuid("id").defaultRandom().primaryKey(),
    challengeId: uuid("challenge_id").references(() => challenges.id, {onDelete: "cascade"}).notNull(),
    text: text("text").notNull(),
    correct: boolean("correct").notNull(),
    imageSrc: text("image_src"),
    audioSrc: text("aduio_src")
});
export const challengeOptionsRelations = relations(challengeOptions, ({one}) => ({
    challenge: one(challenges, {
        fields: [challengeOptions.challengeId],
        references: [challenges.id],
    }),
}));

export const challengeProgress = pgTable("challenge_progress", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    challengeId: uuid("challenge_id").references(() => challenges.id, {onDelete: "cascade"}).notNull(),
    completed: boolean("completed").notNull().default(false),
});
export const challengeProgressRelations = relations(challengeProgress, ({one}) => ({
    challenge: one(challenges, {
        fields: [challengeProgress.challengeId],
        references: [challenges.id],
    }),
}));
export const userProgress = pgTable("user_progress", {
    userId: text("user_id").primaryKey(),
    userName: text("user_name").notNull().default("User"),
    userImageSrc: text("user_image_src").notNull().default("/avatar.jpg"),
    activeCourseId: uuid("active_course_id").references(() => courses.id, {onDelete: "cascade"}),
    hearts: integer("hearts").notNull().default(5),
    points: integer("points").notNull().default(0),
});

export const userProgressRelation = relations(userProgress, ({one}) => ({
    activeCourse: one(courses, {
        fields: [userProgress.activeCourseId],
        references: [courses.id]
    }),
}));


