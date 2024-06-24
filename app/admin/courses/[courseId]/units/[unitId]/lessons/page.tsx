import { getLessonByUnitId } from "@/actions/lessons-edit";
import CreateLesson from "@/components/admin/lessons/create-lesson";
import DeleteLesson from "@/components/admin/lessons/delete-lesson";
import EditLesson from "@/components/admin/lessons/edit-lesson";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getUnitById } from "@/db/queries";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
    params: {
        courseId: string;
        unitId: string;
    }
}
const UnitsAdminPage =  async ({params} : Props) => {
    const units = await getUnitById(params.courseId);
    const lessons = await getLessonByUnitId(params.unitId);
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Manage Lessons of {units?.title}</h1>
      <div>
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Challenge</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {lessons.map((lesson) => (
                <TableRow key={lesson.id}>
                  <TableCell className="font-medium">{lesson.id}</TableCell>
                  <TableCell>{lesson.title}</TableCell>
                  <TableCell>{lesson.order}</TableCell>
                  <TableCell>
                    <Button size="sm">
                      <Link 
                        href={`/admin/courses/${params.courseId}/units/${params.unitId}/lessons/${lesson.id}/challenges`}>
                        Challenge
                      </Link>
                    </Button>
                  </TableCell>
                  <TableCell >
                    <EditLesson lesson={lesson}/>
                  </TableCell>
                  <DeleteLesson lessonId={lesson.id} unitId={lesson.unitId}/>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <div className="flex justify-around">
          <Button size="lg" asChild className="mt-5">
              <Link href={`/admin/courses/${params.courseId}/units`}>
                  Back to Unit
              </Link>
          </Button>
          <CreateLesson unitId={params.unitId}/>
        </div>
      </div>
    </div>
  )
}

export default UnitsAdminPage