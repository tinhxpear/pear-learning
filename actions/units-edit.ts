"use server"
import db from "@/db/drizzle"
import { units } from "@/db/schema"
import { eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache";

export const getUnitByCourseId = async (courseId: string) => {
    return await db.select().from(units).where(sql`${units.courseId} = ${courseId}`);
}

type NewUnit = typeof units.$inferInsert;
export const addUnit = async (unit : NewUnit) => {
    await db.insert(units).values(unit);
    revalidatePath("/courses");
    revalidatePath("/admin/courses");
}

export const deleteUnitAction = async(id: string, courseId: string) => {
    await db.delete(units).where(sql`${units.id} =  ${id}`);
    revalidatePath(`/admin/courses/${courseId}/units`);
}


export const updateUnitAction =  async(unit: NewUnit) => {
    return await db.update(units).set({
        id: unit.id,
        title: unit.title,
        description: unit.description,
        order: unit.order,
        courseId: unit.courseId
    }).where(sql`${units.id} = ${unit?.id}`);
}