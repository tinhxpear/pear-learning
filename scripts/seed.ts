
// import "dotenv/config";
// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";

// import * as schema from "../db/schema";

// const sql = neon(process.env.DATABASE_URL!);

// // @ts-ignore
// const db = drizzle(sql, {schema});

// const main = async () => {
//     try {
        
//         console.log("Seeding database!");
//         await db.delete(schema.courses);
//         await db.delete(schema.userProgress);
//         await db.delete(schema.units);
//         await db.delete(schema.lessons);
//         await db.delete(schema.challenges);
//         await db.delete(schema.challengeOptions);
//         await db.delete(schema.challengeProgress);

//         await db.insert(schema.courses).values([
//             {
//                 id: 1,
//                 title: "Vietnamese",
//                 imageSrc: "/flag/flag_vietnam.svg",
//             },
//             {
//                 id: 2,
//                 title: "English",
//                 imageSrc: "/flag/flag_uk.svg",
//             }
//         ]);

//         await db.insert(schema.units).values([
//             {
//                 id: 1,
//                 courseId: 1,
//                 title: "Unit 1",
//                 description: "Learn basic Vietnamese",
//                 order: 1,
//             }
//         ]);
//         await db.insert(schema.lessons).values([
//             {
//                 id: 1,
//                 unitId: 1,
//                 order: 1,
//                 title: "Nouns",
//             },
//             {
//                 id: 2,
//                 unitId: 1,
//                 order: 2,
//                 title: "Verbs",
//             },
//             {
//                 id: 3,
//                 unitId: 1,
//                 order: 3,
//                 title: "Nouns",
//             },
//             {
//                 id: 4,
//                 unitId: 1,
//                 order: 4,
//                 title: "Verbs",
//             },
//             {
//                 id: 5,
//                 unitId: 1,
//                 order: 5,
//                 title: "Verbs",
//             },
//         ]);
//         await db.insert(schema.challenges).values([
//             {
//                 id: 1,
//                 lessonId: 1,
//                 type: "SELECT",
//                 order: 1,
//                 question: 'Which one of these is the "Coffee"',
//             },
//             {
//                 id: 2,
//                 lessonId: 1,
//                 type: "ASSIST",
//                 order: 2,
//                 question: '"Coffee"',
//             },
//             {
//                 id: 3,
//                 lessonId: 1,
//                 type: "SELECT",
//                 order: 3,
//                 question: 'Which one of these is the "Tea"',
//             },
//             {
//                 id: 4,
//                 lessonId: 1,
//                 type: "ASSIST",
//                 order: 4,
//                 question: '"Tea"',
//             },
//             {
//                 id: 5,
//                 lessonId: 1,
//                 type: "ASSIST",
//                 order: 5,
//                 question: '"Water"',
//             },
//         ]);

//         await db.insert(schema.challenges).values([
//             {
//                 id: 6,
//                 lessonId: 2,
//                 type: "SELECT",
//                 order: 1,
//                 question: 'Which one of these is the "Coffee"',
//             },
//             {
//                 id: 7,
//                 lessonId: 2,
//                 type: "ASSIST",
//                 order: 2,
//                 question: '"Coffee"',
//             },
//             {
//                 id: 8,
//                 lessonId: 2,
//                 type: "SELECT",
//                 order: 3,
//                 question: 'Which one of these is the "Tea"',
//             },
//             {
//                 id: 9,
//                 lessonId: 2,
//                 type: "ASSIST",
//                 order: 4,
//                 question: '"Tea"',
//             },
//             {
//                 id: 10,
//                 lessonId: 2,
//                 type: "ASSIST",
//                 order: 5,
//                 question: '"Water"',
//             },
//         ]);
//         await db.insert(schema.challengeOptions).values([
//             {
//                 id: 1,
//                 challengeId: 1,
//                 imageSrc: "/coffee.svg",
//                 correct: true,
//                 text: "Cà phê",
//                 audioSrc: "/vie_coffee.mp3",

//             },
//             {
//                 id: 2,
//                 challengeId: 1,
//                 imageSrc: "/tea.svg",
//                 correct: false,
//                 text: "Trà",
//                 audioSrc: "/vie_tea.mp3",

//             },
//             {
//                 id: 3,
//                 challengeId: 1,
//                 imageSrc: "/water.svg",
//                 correct: false,
//                 text: "Nước",
//                 audioSrc: "/vie_water.mp3",

//             },
//         ]);

//         await db.insert(schema.challengeOptions).values([
//             {
//                 id: 4,
//                 challengeId: 2,
//                 correct: true,
//                 text: "Cà phê",
//                 audioSrc: "/vie_coffee.mp3",

//             },
//             {
//                 id: 5,
//                 challengeId: 2,
//                 correct: false,
//                 text: "Trà",
//                 audioSrc: "/vie_tea.mp3",

//             },
//             {
//                 id: 6,
//                 challengeId: 2,
//                 correct: false,
//                 text: "Nước",
//                 audioSrc: "/vie_water.mp3",

//             },
//         ]);

//         await db.insert(schema.challengeOptions).values([
//             {
//                 id: 7,
//                 challengeId: 3,
//                 imageSrc: "/coffee.svg",
//                 correct: false,
//                 text: "Cà phê",
//                 audioSrc: "/vie_coffee.mp3",

//             },
//             {
//                 id: 8,
//                 challengeId: 3,
//                 imageSrc: "/tea.svg",
//                 correct: true,
//                 text: "Trà",
//                 audioSrc: "/vie_tea.mp3",

//             },
//             {
//                 id: 9,
//                 challengeId: 3,
//                 imageSrc: "/water.svg",
//                 correct: false,
//                 text: "Nước",
//                 audioSrc: "/vie_water.mp3",

//             },
//         ]);   
//         await db.insert(schema.challengeOptions).values([
//             {
//                 id: 10,
//                 challengeId: 4,
//                 correct: false,
//                 text: "Cà phê",
//                 audioSrc: "/vie_coffee.mp3",

//             },
//             {
//                 id: 11,
//                 challengeId: 4,
//                 correct: true,
//                 text: "Trà",
//                 audioSrc: "/vie_tea.mp3",

//             },
//             {
//                 id: 12,
//                 challengeId: 4,
//                 correct: false,
//                 text: "Nước",
//                 audioSrc: "/vie_water.mp3",

//             },
//         ]);

//         await db.insert(schema.challengeOptions).values([
//             {
//                 id: 13,
//                 challengeId: 5,
//                 correct: false,
//                 text: "Cà phê",
//                 audioSrc: "/vie_coffee.mp3",

//             },
//             {
//                 id: 14,
//                 challengeId: 5,
//                 correct: false,
//                 text: "Trà",
//                 audioSrc: "/vie_tea.mp3",

//             },
//             {
//                 id: 15,
//                 challengeId: 5,
//                 correct: true,
//                 text: "Nước",
//                 audioSrc: "/vie_water.mp3",

//             },
//         ]);
//         console.log("Seeding finished");
//     } catch(error){ 
//         console.error(error);
//         throw new Error("Failed to seed the database!");
//     }
// }

// main();