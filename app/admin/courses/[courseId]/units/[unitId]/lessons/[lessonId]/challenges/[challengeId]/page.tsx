import { getChallengeByLessonId } from "@/actions/challenge-edit";
import { getChallengeOptionByChallengeId } from "@/actions/challenge-options-edit";
import CreateChallengeOption from "@/components/admin/challengeOptions/create-challenge-option";
import DeleteChallengeOption from "@/components/admin/challengeOptions/delete-challenge-options";
import EditChallengeOption from "@/components/admin/challengeOptions/edit-challenge-option";
import CreateChallenge from "@/components/admin/challenges/create-challenge";
import DeleteChallenge from "@/components/admin/challenges/delete-challenge";
import EditChallenge from "@/components/admin/challenges/edit-challenge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getChallengeById } from "@/db/queries";
import Link from "next/link";

type Props = {
    params: {
        courseId: string;
        unitId: string;
        lessonId: string;
        challengeId: string;
    }
}
const ChallengeOptionAdminPage =  async ({params} : Props) => {
    const challenges = await getChallengeById(params.lessonId);
    const challengeOptions = await getChallengeOptionByChallengeId(params.challengeId)
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Manage Challenge Option of {challenges?.question}</h1>
      <div>
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Text</TableHead>
              <TableHead>Correct</TableHead>
              <TableHead>Image Source</TableHead>
              <TableHead>Audio Source</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {challengeOptions.map((challengeOption) => (
                <TableRow key={challengeOption.id}>
                  <TableCell className="font-medium">{challengeOption.id}</TableCell>
                  <TableCell>{challengeOption.text}</TableCell>
                  <TableCell>{challengeOption.correct == true ? "Correct" : "Incorrect"}</TableCell>
                  <TableCell>{challengeOption.imageSrc}</TableCell>
                  <TableCell>{challengeOption.audioSrc}</TableCell>
                  
                  <TableCell >
                    <EditChallengeOption challengeOption={challengeOption}/>
                  </TableCell>
                  <DeleteChallengeOption challengeOptionId={challengeOption.id}/>
                </TableRow>
              ))}
            
          </TableBody>
        </Table>

        <div className="flex justify-around">
          <Button size="lg" asChild className="mt-5">
            <Link href={`/admin/courses/${params.courseId}/units/${params.unitId}/lessons/${params.lessonId}/challenges`}>
              Go to Challenge
            </Link>
          </Button>
          <CreateChallengeOption challengeId={params.challengeId} typeQuestion={challenges?.type}/>
        </div>
      </div>
    </div>
  )
}

export default ChallengeOptionAdminPage