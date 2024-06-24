
import CreateCourse from "@/components/admin/courses/create-course";
import DeleteCourse from "@/components/admin/courses/delete-course";
import EditCourse from "@/components/admin/courses/edit-course";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCourses } from "@/db/queries";
import Link from "next/link";


const CoursesAdmin = async () => {
  const courses = await getCourses();
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Manage Courses</h1>
      <div>
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Image Source</TableHead>
              <TableHead>Unit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.id}</TableCell>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.imageSrc}</TableCell>
                  <TableCell>
                    <Button size="sm">
                      <Link href={`/admin/courses/${course.id}/units`}>
                        List Unit
                      </Link>
                    </Button>
                  </TableCell>
                  
                  <TableCell >
                    <EditCourse course={course}/>
                  </TableCell>
                  <DeleteCourse courseId={course.id}/>
                </TableRow>
              ))}
            
          </TableBody>
        </Table>

        <div className="flex justify-around">
          <Button size="lg" variant="default">Back to Home page</Button>
          <CreateCourse />
        </div>
        


      </div>
    </div>
  )
}

export default CoursesAdmin;