"use client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox"
import { addChallengeOption } from "@/actions/challenge-options-edit";
import { UploadButton } from "@/utils/uploadthing";
type Props = {
    challengeId: string;
    typeQuestion: string | undefined;
}
const CreateChallengeOption = ({challengeId, typeQuestion} : Props) => {
  const [text, setText] = useState('');
  const [correct, setCorrect] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [audioSrc, setAudioSrc] = useState('');
  const router = useRouter();

  const addChallengeOptionFunc = async () => {
    await addChallengeOption(
      {text: text, correct: correct || false, imageSrc: imageSrc, audioSrc: audioSrc, challengeId: challengeId});
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
                <Label htmlFor="text" className="text-right">
                  Text
                </Label>
                <Input
                  id="text"
                  className="col-span-3"
                  placeholder="Cà phê"
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
                  onChange={(event) => setImageSrc(event.target.value)}
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
                <Label htmlFor="correct" className="text-right">
                  Correct answer
                </Label>
                <Checkbox onCheckedChange={(event) => setCorrect(Boolean(event))} id="correct"/>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={addChallengeOptionFunc}>Save</Button>
            </DialogFooter>
          </DialogContent>
          </form>
      </Dialog>
    </div>
  )
};

export default CreateChallengeOption