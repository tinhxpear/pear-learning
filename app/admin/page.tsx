
import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import CoursePage from "./courses/page";

const AdminPage = () => {
    if(!isAdmin()) redirect("/");
  return (
    <CoursePage />
  );
};

export default AdminPage;