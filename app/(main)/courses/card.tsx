import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";

type Props = {
    title: string;
    id: string;
    imageSrc: string;
    onClick: (id: string) => void;
    disable?: boolean;
    active?: boolean;
}
const Card = ({id, title, imageSrc, onClick, disable, active} : Props) => {
  return (
    <div
        onClick={() => onClick(id)}
        className={cn(
            "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex "
           +"flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px]",
           disable && "pointer-events-none opacity-50"
        )}
    >
        <div className="min-[24px] w-full flex items-center justify-end">
            {active && (
                <div className="rounded-md bg-blue-500 flex items-center justify-center p-1.5">
                    <Check className="text-white stroke-[4] h-4 w-4"/>
                </div>
            )}
        </div>
        <Image 
            src={imageSrc} 
            alt={title} 
            height={40} 
            width={93.33}
            className="rounded-lg object-cover"
        />
        <p className="text-neutral-700 text-center font-bold mt-3">
            {title}
        </p>
    </div>
  )
}

export default Card