"use client";
import { deleteCourseAction } from "@/actions/courses-edit";
import { Button } from "@/components/ui/button"
import { TableCell } from "@/components/ui/table"

type Props = {
    courseId: string
}
const DeleteCourse = ({courseId} : Props) => {
    const deleteCourse = async () => {
        confirm("Are you sure delete it");
        await deleteCourseAction(courseId);
    }
  return (
    <>
        <TableCell >
            <Button type="submit" 
                    size="sm" variant="danger" 
                    onClick={deleteCourse}>
                Delete
            </Button>
        </TableCell>
    </>
  )
}

export default DeleteCourse