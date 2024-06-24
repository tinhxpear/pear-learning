
import { getLesson, getUserProgress } from "@/db/queries"
import { redirect } from "next/navigation";
import Quiz from "./quiz";
import ChatBot from "@/components/ai/chatbot";


const LessonPage = async () => {

    const lessonData = getLesson();
    const userProgressData = getUserProgress();

    const [lesson, userProgress] = 
        await Promise.all([
            lessonData,
            userProgressData,
        ]);
    if(!lesson || !userProgress){
        redirect("/learn");
    }
    const initialPercentage = lesson.challenges
        .filter((challenge) => challenge.completed)
        .length / lesson.challenges.length * 100;
    
  return (
    <>
        <Quiz   
            initialLessonId={lesson.id}
            initialLessonChallenges={lesson.challenges}
            initialHearts={userProgress.hearts}
            initialPercentage={initialPercentage}
        />
        <div className="absolute overflow-scroll right-6 top-36 bg-slate-100 w-[420px] h-[450px] rounded-lg pb-2">
            <ChatBot />
        </div>
    </>
    
  );
};

export default LessonPage