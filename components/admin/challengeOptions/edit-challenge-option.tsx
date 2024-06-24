"use client";
import { updateChallengeOptionAction } from '@/actions/challenge-options-edit';
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { challengeOptions} from '@/db/schema';
import { UploadButton } from '@/utils/uploadthing';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

type Props = {
    challengeOption: typeof challengeOptions.$inferInsert;
}
const EditChallengeOption = ({challengeOption} : Props) => {
  const [text, setText] = useState('');
  const [correct, setCorrect] = useState(false);
  console.log("Correct edit: " + correct);
  const [imageSrc, setImageSrc] = useState('');
  const [audioSrc, setAudioSrc] = useState('');
    const router = useRouter();
    const newChallengeOption = {
      id: challengeOption.id,
      text: text || challengeOption.text, 
      correct: correct ?? challengeOption.correct,
      imageSrc: imageSrc || challengeOption.imageSrc,
      audioSrc: audioSrc || challengeOption.audioSrc, 
      challengeId: challengeOption.challengeId
    };
    const updateChallengeOption = async () => {
        await updateChallengeOptionAction(newChallengeOption)
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
              <DialogTitle>Update {challengeOption.text}</DialogTitle>
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
                  defaultValue={challengeOption.id}
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="text" className="text-right">
                  Text
                </Label>
                <Input
                  id="text"
                  className="col-span-3"
                  defaultValue={challengeOption.text}
                  onChange={(event) => setText(event.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
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
              Or
              <Input
                  id="text"
                  className="col-span-3"
                  onChange={(event) => setAudioSrc(event.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="audio" className="text-right">
                  Audio
                </Label>
                <UploadButton
                  endpoint="audioUploader"
                  onClientUploadComplete={(res) => {
                    console.log("Files: ", res);
                    setAudioSrc(res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
                Or
              <Input
                  id="text"
                  className="col-span-3"
                  onChange={(event) => setAudioSrc(event.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                  Correct answer
                </Label>
                <select name="" id="" onChange={e => setCorrect(Boolean(e.target.value))}>
                  <option value="true">True</option>
                  <option value="">False</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={updateChallengeOption}>Update</Button>
            </DialogFooter>
          </DialogContent>
          </form>
      </Dialog>
    </>
  )
}

export default EditChallengeOption