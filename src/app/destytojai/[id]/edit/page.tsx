import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import EditTutorForm from "./EditTutorForm";

export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { id } = params;

  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }

  const destytojas = await prisma.destytojas.findUnique({
    where: { id: parseInt(id) },
  });

  if (!destytojas) {
    return <div>Tutor not found</div>;
  }

  return <EditTutorForm params={params} destytojas={destytojas} />;
}
