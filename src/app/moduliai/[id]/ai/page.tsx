import prisma from "@/lib/db";
import ChatGpt from "./ChatGptForm";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {


  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
}

  const { id } = params;

  const moduliai = await prisma.modulis.findMany({
    where: { id: parseInt(id) },
  });

  return <ChatGpt moduliai={moduliai} />;
}
