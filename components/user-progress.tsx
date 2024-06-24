import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { courses } from "@/db/schema";

type Props = {
    activeCourse: typeof courses.$inferSelect;
    hearts: number;
    points: number;
};
export const UserProgress = ({activeCourse, hearts, points} : Props) => {
    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
            <Link href="/courses">
                <Button variant="ghost">
                    <Image 
                        src={activeCourse.imageSrc} 
                        alt={activeCourse.title}
                        className="rounded-md"
                        width={32}
                        height={32}
                    />
                </Button>
            </Link>

            <Link href="/shop">
                <Button variant="ghost" className="text-orange-500">
                    <Image src="/points.svg" height={28} width={28} alt="Points" className="mr-2"/>
                    {points}
                </Button>
            </Link>

            <Link href="/shop">
                <Button variant="ghost" className="text-rose-500">
                    <Image src="/heart.svg" height={28} width={28} alt="Heart" className="mr-2"/>
                    {hearts}
                </Button>
            </Link>
        </div>
    )
}