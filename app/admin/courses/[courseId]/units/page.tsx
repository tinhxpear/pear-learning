import { getUnitByCourseId } from "@/actions/units-edit";
import CreateUnit from "@/components/admin/units/create-unit";
import DeleteUnit from "@/components/admin/units/delete-unit";
import EditUnit from "@/components/admin/units/edit-unit";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCourseById } from "@/db/queries";
import Link from "next/link";

type Props = {
    params: {
        courseId: string;
    }
}
const UnitsAdminPage =  async ({params} : Props) => {
    const course = await getCourseById(params.courseId);
    const units = await getUnitByCourseId(params.courseId);
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Manage Units of {course?.title} course</h1>
      <div>
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Lesson</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {units.map((unit) => (
                <TableRow key={unit.id}>
                  <TableCell className="font-medium">{unit.id}</TableCell>
                  <TableCell>{unit.title}</TableCell>
                  <TableCell>{unit.description}</TableCell>
                  <TableCell>{unit.order}</TableCell>
                  <TableCell>
                    <Button size="sm">
                      <Link href={`/admin/courses/${params.courseId}/units/${unit.id}/lessons`}>
                        Lesson
                      </Link>
                    </Button>
                  </TableCell>
                  <TableCell >
                    <EditUnit unit={unit}/>
                  </TableCell>
                  <DeleteUnit unitId={unit.id} courseId={unit.courseId}/>
                </TableRow>
              ))}
            
          </TableBody>
        </Table>
            
        <div className="flex justify-around">
          <Button size="lg" asChild className="mt-5">
              <Link href={`/admin/courses`}>
                  Back to Course 
              </Link>
          </Button>
          <CreateUnit courseId={params.courseId}/>
        </div>
      </div>
    </div>
  )
}

export default UnitsAdminPage