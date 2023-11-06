import { auth } from "@/lib/auth";
import EditProfileForm from "./EditProfileForm";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

export default async function Page() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }

  const naudotojas = await prisma.naudotojas.findUnique({
    where: {
      id: parseInt(session.user.id),
    },
  });

  if (!naudotojas) {
    throw new Error("Naudotojas nerastas");
  }

  return <EditProfileForm naudotojas={naudotojas} />;
}
