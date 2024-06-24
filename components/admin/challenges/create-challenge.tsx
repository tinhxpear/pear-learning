"use client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, FormEvent, FormEventHandler, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { addChallenge } from "@/actions/challenge-edit";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
type Props = {
    lessonId: string;
}
const CreateChallenge = ({lessonId} : Props) => {
  const [type, setType] = useState('');
  const [question, setQuestion] = useState('');
  const [order, setOrder] = useState(0);
  const router = useRouter();
  const addChallengeFunc = async () => {
    await addChallenge({type: type, question: question, order: order, lessonId: lessonId});
    router.refresh();
    alert("Create success");
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
              <DialogTitle>Create challenge</DialogTitle>
              <DialogDescription>
                Make changes to your courses here. Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <div />
                <Select onValueChange={(e) => {
                      setType(e);
                    }}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Type</SelectLabel>
                      <SelectItem value="SELECT">SELECT</SelectItem>
                      <SelectItem value="ASSIST">ASSIST</SelectItem>
                    </SelectGroup >
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="question" className="text-right">
                  Question
                </Label>
                <Input
                  id="question"
                  className="col-span-3"
                  placeholder="How are you ?"
                  onChange={(event) => setQuestion(event.target.value)}
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
              <Button type="submit" onClick={addChallengeFunc}>Save</Button>
            </DialogFooter>
          </DialogContent>
          </form>
      </Dialog>
    </div>
  )
};

export default CreateChallenge