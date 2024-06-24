"use client";
import { deleteUnitAction } from "@/actions/units-edit";
import { Button } from "@/components/ui/button"
import { TableCell } from "@/components/ui/table"

type Props = {
    courseId: string
    unitId: string
}
const DeleteUnit = ({unitId, courseId} : Props) => {
    const deleteUnit = async () => {
        confirm("Are you sure delete it");
        await deleteUnitAction(unitId, courseId);
    }
  return (
    <>
        <TableCell >
            <Button type="submit" 
                    size="sm" variant="danger" 
                    onClick={deleteUnit}>
                Delete
            </Button>
        </TableCell>
    </>
  )
}

export default DeleteUnit