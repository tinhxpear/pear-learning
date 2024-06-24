"use client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { addUnit } from "@/actions/units-edit";
import { useRouter } from "next/navigation";

type Props = {
    courseId: string;
}
const CreateUnit = ({courseId} : Props) => {
  const [title, setTitle] = useState('');
  const [description, setDesciption] = useState('');
  const [order, setOrder] = useState(0);

  const router = useRouter();
  const addCourseFunc = async () => {
    await addUnit({title: title, description: description, order: order, courseId: courseId});
    router.refresh();
    alert("Create success !");
  }
  return (
    <div className="mt-5"> 
    <Dialog>
          <form >
          <DialogTrigger asChild>
            <Button size="lg" variant="primary" className="mt5 ml-5">Create</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]" >
            <DialogHeader>
              <DialogTitle>Create course</DialogTitle>
              <DialogDescription>
                Make changes to your courses here. Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Unit 1"
                  className="col-span-3"
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  className="col-span-3"
                  placeholder="Learn Basic Vietnamses"
                  onChange={(event) => setDesciption(event.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="order" className="text-right">
                  Order
                </Label>
                <Input
                  id="order"
                  className="col-span-3"
                  placeholder="1"
                  onChange={(event) => setOrder(Number(event.target.value))}
                />
              </div>
              
            </div>
            <DialogFooter>
              <Button type="submit" onClick={addCourseFunc}>Save</Button>
            </DialogFooter>
          </DialogContent>
          </form>
      </Dialog>
    </div>
  )
}

export default CreateUnit