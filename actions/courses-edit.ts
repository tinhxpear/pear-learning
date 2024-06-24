"use server";
import db from "@/db/drizzle";
import { UTApi } from "uploadthing/server";
import { courses } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCourseById } from "@/db/queries";


type NewCourse = typeof courses.$inferInsert;
export const addCourse = async (course : NewCourse) => {
    await db.insert(courses).values(course);
    revalidatePath("/courses");
    revalidatePath("/admin/courses");
}

export const deleteCourseAction = async(id: string) => {
    const course =  await getCourseById(id);
    const imgKey = course?.imageSrc.substring(course.imageSrc.lastIndexOf("/") + 1);
    console.log("tesstt: " + imgKey);
    const utapi = new UTApi();
    await utapi.deleteFiles(imgKey!);
    await db.delete(courses).where(sql`${courses.id} = ${id}`);

    revalidatePath("/courses");
    revalidatePath("/admin/courses");
}

export const updateCourseAction =  async(course: NewCourse) => {
    return await db.update(courses).set({
        title: course.title,
        imageSrc: course.imageSrc
    }).where(sql`${courses.id} = ${course.id}`);
}