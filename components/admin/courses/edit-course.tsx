"use client";
import { updateCourseAction } from '@/actions/courses-edit';
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { courses } from '@/db/schema';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

type Props = {
    course: typeof courses.$inferInsert;
}
const EditCourse = ({course} : Props) => {
    const [title, setTitle] = useState('');
    const [imageSrc, setImageSrc] = useState('');

    const router = useRouter();
    const newCourse = {id: course.id, title: title || course.title, imageSrc: imageSrc || course.imageSrc};
    const updateCourse = async () => {
        await updateCourseAction(newCourse)
        alert("Update success");
        router.refresh();
    }
  return (
    <>
        <Dialog>
          <form >
          <DialogTrigger asChild>
            <Button size="sm" variant="super" className="mt5 ml-5">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update course</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click update when you are done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  Id
                </Label>
                <Input
                  id="id"
                  placeholder="Id"
                  className="col-span-3"
                  defaultValue={course.id}
                  disabled
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Vietnamese"
                  className="col-span-3"
                  onChange={(event) => setTitle(event.target.value)}
                  defaultValue={course.title}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageSrc" className="text-right">
                  Image Source
                </Label>
                <Input
                  id="imageSrc"
                  className="col-span-3"
                  placeholder="/flag/flag_vietnam.svg"
                  onChange={(event) => setImageSrc(event.target.value)}
                  defaultValue={course.imageSrc}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={updateCourse}>Update</Button>
            </DialogFooter>
          </DialogContent>
          </form>
      </Dialog>
    </>
  )
}

export default EditCourse