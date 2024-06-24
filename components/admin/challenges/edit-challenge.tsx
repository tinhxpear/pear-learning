"use client";
import { updateChallengeAction } from '@/actions/challenge-edit';
import { updateLessonAction } from '@/actions/lessons-edit';
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { challenges, lessons} from '@/db/schema';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

type Props = {
    challenge: typeof challenges.$inferInsert;
}
const EditChallenge = ({challenge} : Props) => {
    const [question, setQuestion] = useState('');
    const [order, setOrder] = useState(0);
    const [type, setType] = useState('');
    const router = useRouter();
    const newChallenge = {
      id: challenge.id,
      question: question || challenge.question, 
      type: type || challenge.type,
      order: order || challenge.order, 
      lessonId: challenge.lessonId
    };
    const updateChallenge = async () => {
        await updateChallengeAction(newChallenge)
        router.refresh();
        alert('Update success');
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
              <DialogTitle>Update {challenge.question}</DialogTitle>
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
                  defaultValue={challenge.id}
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Question
                </Label>
                <Input
                  id="title"
                  className="col-span-3"
                  onChange={(event) => setQuestion(event.target.value)}
                  defaultValue={challenge.question}
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
                  defaultValue={challenge.order}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <div />
                <Select defaultValue={challenge.type} onValueChange={(e) => {
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
            </div>
            <DialogFooter>
              <Button type="submit" onClick={updateChallenge}>Update</Button>
            </DialogFooter>
          </DialogContent>
          </form>
      </Dialog>
    </>
  )
}

export default EditChallenge