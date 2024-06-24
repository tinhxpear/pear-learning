"use client";
import { deleteLessonAction } from "@/actions/lessons-edit";
import { Button } from "@/components/ui/button"
import { TableCell } from "@/components/ui/table"
import { useRouter } from "next/navigation";

type Props = {
    lessonId: string
    unitId: string
}
const DeleteLesson = ({lessonId} : Props) => {
    const router = useRouter();
    const deleteLesson = async () => {
        confirm("Are you sure delete it");
        await deleteLessonAction(lessonId);
        router.refresh();
    }
  return (
    <>
        <TableCell >
            <Button type="submit" 
                    size="sm" variant="danger" 
                    onClick={deleteLesson}>
                Delete
            </Button>
        </TableCell>
    </>
  )
}

export default DeleteLesson