import { auth } from "@/lib/auth";
import EditProfileForm from "./AddModuleForm";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import AddModuleForm from "./AddModuleForm";

export default async function Page() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }
  return <AddModuleForm  />;
}
