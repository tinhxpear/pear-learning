import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { isAdmin } from "@/lib/admin";
type Props = {
    className?: string;
};
const Sidebar = ({className} : Props) => {
    return (
        <div className={cn(
            "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
            className
            )}>

            <Link href="/">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="/logo_main.svg" height={40} width={40} alt="Logo"/>
                    <h1 className="text-xl font-extrabold text-blue-400 tracking-wide">Pear Learning</h1>
                </div>
            </Link>

            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem label="Learn" href="/learn" iconSrc="/learn.svg"/>  
                <SidebarItem label="Leaderboard" href="/leaderboard" iconSrc="/leaderboard.svg"/>   
                <SidebarItem label="Quests" href="/quests" iconSrc="/quests.svg"/>   
                <SidebarItem label="Shop" href="/shop" iconSrc="/shop.svg"/> 
                <SidebarItem label="Chat" href="/chat" iconSrc="/chat.png"/> 
                <SidebarItem label="Chat Bot" href="/chatbot" iconSrc="/logo_ai.svg"/>
                {isAdmin() && <SidebarItem label="Admin" iconSrc="/img_admin.png" href="/admin" />}      
            </div>

            <div className="p-4">
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton afterSignOutUrl="/" />
                </ClerkLoaded>
            </div>
        </div>
    );
};
export default Sidebar;