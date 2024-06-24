"use server"
import db from "@/db/drizzle"
import { getChallengeOptionById } from "@/db/queries"
import { challengeOptions } from "@/db/schema"
import { eq, sql } from "drizzle-orm"
import { UTApi } from "uploadthing/server"

export const getChallengeOptionByChallengeId = async (challengeId: string) => {
    return await db.select().from(challengeOptions)
        .where(eq(challengeOptions.challengeId, challengeId));
}

type NewChallengeOption = typeof challengeOptions.$inferInsert;
export const addChallengeOption = async (challengeOption : NewChallengeOption) => {
    console.log("Correct: " + challengeOption.correct);
    await db.insert(challengeOptions).values(challengeOption);
}

export const deleteChallengeOptionAction = async(id: string) => {
    const challengeOption =  await getChallengeOptionById(id);
    const imgKey = challengeOption?.imageSrc?.substring(challengeOption?.imageSrc.lastIndexOf("/") + 1);
    const audioKey = challengeOption?.audioSrc?.substring(challengeOption.audioSrc.lastIndexOf("/") + 1);
    console.log("tesstt: " + imgKey);
    const utapi = new UTApi();
    await utapi.deleteFiles([imgKey!, audioKey!]);
    await db.delete(challengeOptions).where(eq(challengeOptions.id, id));
}


export const updateChallengeOptionAction =  async(challengeOption: NewChallengeOption) => {
    return await db.update(challengeOptions).set({
        id: challengeOption.id,
        text: challengeOption.text,
        correct: challengeOption.correct,
        imageSrc: challengeOption.imageSrc,
        audioSrc: challengeOption.audioSrc,
        challengeId: challengeOption.challengeId
    }).where(sql`${challengeOptions.id} = ${challengeOption?.id}`);
}