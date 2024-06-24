"use client";
import { deleteChallengeOptionAction } from "@/actions/challenge-options-edit";
import { Button } from "@/components/ui/button"
import { TableCell } from "@/components/ui/table"
import { useRouter } from "next/navigation";

type Props = {
    challengeOptionId: string
}
const DeleteChallengeOption = ({challengeOptionId} : Props) => {
    const router = useRouter();
    const deleteChallengeOption = async () => {
        confirm("Are you sure delete it ?");
        await deleteChallengeOptionAction(challengeOptionId);
        router.refresh();

    }
  return (
    <>
        <TableCell >
            <Button type="submit" 
                    size="sm" variant="danger" 
                    onClick={deleteChallengeOption}>
                Delete
            </Button>
        </TableCell>
    </>
  )
}

export default DeleteChallengeOption