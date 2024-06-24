"use client";
import { deleteChallengeAction } from "@/actions/challenge-edit";
import { deleteLessonAction } from "@/actions/lessons-edit";
import { Button } from "@/components/ui/button"
import { TableCell } from "@/components/ui/table"
import { useRouter } from "next/navigation";

type Props = {
    challengeId: string
}
const DeleteChallenge = ({challengeId} : Props) => {
    const router = useRouter();
    const deleteChallenge = async () => {
        confirm("Are you sure delete it ?");
        await deleteChallengeAction(challengeId);
        router.refresh();

    }
  return (
    <>
        <TableCell >
            <Button type="submit" 
                    size="sm" variant="danger" 
                    onClick={deleteChallenge}>
                Delete
            </Button>
        </TableCell>
    </>
  )
}

export default DeleteChallenge