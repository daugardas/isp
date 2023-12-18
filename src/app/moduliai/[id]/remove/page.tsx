import RemoveModuleForm from "./RemoveModuleForm";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {

  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
}
  const { id } = params;
  console.log("Page.tsx");
  console.log("moduleId:", id);

  // Check if moduleId is available
  if (!id) {
    console.error("moduleId is not provided!");
    return <div>Error: moduleId is not provided!</div>;
  }

  return <RemoveModuleForm moduleId={id} />;
}
