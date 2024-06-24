"use client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { addCourse } from "@/actions/courses-edit";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const router = useRouter();
  const addCourseFunc = async () => {
    await addCourse({title: title, imageSrc: imageSrc});
    alert("Create success");
    router.refresh();
  }
  return (
    <> 
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
                  placeholder="Vietnamese"
                  className="col-span-3"
                  required
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label className="text-right">
                  Flag Image Source
                </Label>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    console.log("Files: ", res);
                    setImageSrc(res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={addCourseFunc}>Save</Button>
            </DialogFooter>
          </DialogContent>
          </form>
      </Dialog>
    </>
  )
}


export default CreateCourse
