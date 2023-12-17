import prisma from "@/lib/db";
import ChatGpt from "./ChatGptForm";

export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { id } = params;

  const moduliai = await prisma.modulis.findMany({
    where: { id: parseInt(id) },
  });

  return <ChatGpt moduliai={moduliai} />;
}
