import { getChallengeByLessonId } from "@/actions/challenge-edit";
import { getLessonByUnitId } from "@/actions/lessons-edit";
import { getUnitByCourseId } from "@/actions/units-edit";
import CreateChallenge from "@/components/admin/challenges/create-challenge";
import DeleteChallenge from "@/components/admin/challenges/delete-challenge";
import EditChallenge from "@/components/admin/challenges/edit-challenge";
import CreateLesson from "@/components/admin/lessons/create-lesson";
import DeleteLesson from "@/components/admin/lessons/delete-lesson";
import EditLesson from "@/components/admin/lessons/edit-lesson";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getLessonById } from "@/db/queries";
import Link from "next/link";

type Props = {
    params: {
        courseId: string;
        unitId: string;
        lessonId: string;
    }
}
const ChallengeAdminPage =  async ({params} : Props) => {
    const lessons = await getLessonById(params.unitId);
    const challenges = await getChallengeByLessonId(params.lessonId);
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Manage Challenge of {lessons?.title}</h1>
      <div>
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Question</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Challenge Option</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {challenges.map((challenge) => (
                <TableRow key={challenge.id}>
                  <TableCell className="font-medium">{challenge.id}</TableCell>
                  <TableCell>{challenge.question}</TableCell>
                  <TableCell>{challenge.order}</TableCell>
                  <TableCell>{challenge.type}</TableCell>
                  <TableCell>
                    <Button size="sm">
                      <Link 
                        href={`/admin/courses/${params.courseId}/units/${params.unitId}/lessons/${challenge.lessonId}/challenges/${challenge.id}`}>
                        Challenge Options
                      </Link>
                    </Button>
                  </TableCell>
                  <TableCell >
                    <EditChallenge challenge={challenge}/>
                  </TableCell>
                  <DeleteChallenge challengeId={challenge.id}/>
                </TableRow>
              ))}
            
          </TableBody>
        </Table>

        <div className="flex justify-around">
          <Button size="lg" asChild className="mt-5">
            <Link href={`/admin/courses/${params.courseId}/units/${params.unitId}/lessons/`}>
              Go to Lesson
            </Link>
          </Button>
          <CreateChallenge lessonId={params.lessonId}/>
        </div>
        

        
      </div>
    </div>
  )
}

export default ChallengeAdminPage