"use server"
import db from "@/db/drizzle"
import { lessons } from "@/db/schema"
import { eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache";

export const getLessonByUnitId = async (unitId: string) => {
    return await db.select().from(lessons)
        .where(eq(lessons.unitId, unitId));
}

type NewLesson = typeof lessons.$inferInsert;
export const addLesson = async (lesson : NewLesson) => {
    await db.insert(lessons).values(lesson);
    revalidatePath("/courses");
    revalidatePath("/admin/courses");
}

export const deleteLessonAction = async(id: string) => {
    await db.delete(lessons).where(sql`${lessons.id} = ${id}`);
}
export const updateLessonAction =  async(lesson: NewLesson) => {
    return await db.update(lessons).set({
        id: lesson.id,
        title: lesson.title,
        order: lesson.order,
        unitId: lesson.unitId
    }).where(sql`${lessons.id} = ${lesson.id}`);
}