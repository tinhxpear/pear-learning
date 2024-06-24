"use client";
import { updateCourseAction } from '@/actions/courses-edit';
import { updateUnitAction } from '@/actions/units-edit';
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { units } from '@/db/schema';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

type Props = {
    unit: typeof units.$inferInsert;
}
const EditUnit = ({unit} : Props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [order, setOrder] = useState(0);
    const router = useRouter();
    const newUnit = {
      id: unit.id,
      title: title || unit.title, 
      description: description || unit.description, 
      order: order || unit.order, 
      courseId: unit.courseId
    };
    const updateUnit = async () => {
        await updateUnitAction(newUnit)
        router.refresh();
        alert("Update success !");
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
              <DialogTitle>Update {unit.title}</DialogTitle>
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
                  defaultValue={unit.id}
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
                  className="col-span-3"
                  onChange={(event) => setTitle(event.target.value)}
                  defaultValue={unit.title}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Desciption
                </Label>
                <Input
                  id="description"
                  className="col-span-3"
                  onChange={(event) => setDescription(event.target.value)}
                  defaultValue={unit.description}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="order" className="text-right">
                  Order
                </Label>
                <Input
                  type='number'
                  id="order"
                  className="col-span-3"
                  onChange={(event) => setOrder(Number(event.target.value))}
                  defaultValue={unit.order}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={updateUnit}>Update</Button>
            </DialogFooter>
          </DialogContent>
          </form>
      </Dialog>
    </>
  )
}

export default EditUnit