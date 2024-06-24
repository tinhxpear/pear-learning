import MobileSideBar from "./mobile-sidebar";

const MobileHeader = () => {
    return (
        <nav className="lg:hidden px-6 h-[50px] flex items-center bg-blue-400 
            border-b fixed top-0 w-full z-50">
            <MobileSideBar />
        </nav>
    )
}
export default MobileHeader;