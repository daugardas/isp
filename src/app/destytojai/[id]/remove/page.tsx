import { auth } from "@/lib/auth";
import RemoveTutorForm from "./RemoveTutorForm";
import { $Enums } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { id } = params;
  console.log("Page.tsx");
  console.log("tutorId:", id);

  let isAdmin = false;
  const session = await auth();
  const userId = session.user?.id;
    if (userId) {
      const numericUserId = parseInt(userId, 10); // Ensure userId is a number
      const userData = await prisma.naudotojas.findUnique({
        where: {
          id: numericUserId,
        },
      });

      isAdmin = userData?.tipas === $Enums.NaudotojoTipas.administratorius;

      if(!isAdmin){
        redirect("/");
      }

    } else {
      return <div>Vartotojas nerastas</div>;
    }

  // Check if moduleId is available
  if (!id) {
    console.error("tutorId is not provided!");
    return <div>Error: tutorId is not provided!</div>;
  }

  return <RemoveTutorForm tutorId={id} />;
}
