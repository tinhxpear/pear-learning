
import { Button } from "@/components/ui/button";
import { isAdmin } from "@/lib/admin";
import { 
    ClerkLoaded, 
    ClerkLoading, 
    SignInButton, 
    SignedIn, 
    SignedOut, 
    UserButton 
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const Header = () => {
    return (
        <header className="h-20 w-full border-b-2 border-slate-200 px-4">
            <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="/logo_main.svg" height={40} width={40} alt="Logo"/>
                    <h1 className="text-2xl font-extrabold text-blue-400 tracking-wide">
                        Pear Learning
                    </h1>
                </div>
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
                </ClerkLoading>

                <ClerkLoaded>
                    <SignedIn>
                        <UserButton afterSignOutUrl="/"/>
                        {isAdmin() 
                        && <Button size="lg" variant="super" asChild>
                                <Link href="/admin/courses">
                                    Admin
                                </Link>
                            </Button>}
                    </SignedIn>
                    <SignedOut>
                        <SignInButton 
                            mode="modal" 
                            afterSignInUrl="/" 
                            afterSignUpUrl="/"
                        >
                            <Button size="lg" variant="ghost">
                                Login
                            </Button>
                        </SignInButton>
                    </SignedOut>
                </ClerkLoaded>
            </div>
        </header>
    )
};

export default Header;