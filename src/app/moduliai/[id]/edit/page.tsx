
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import EditModuleForm from "./EditModuleForm";

export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { id } = params;

  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }

 
  const modulis = await prisma.modulis.findUnique({
    where: { id: parseInt(id) },
  });

  if (!modulis) {
    return <div>Module not found</div>;
  }

  return <EditModuleForm params={params} modulis={modulis} />;
}