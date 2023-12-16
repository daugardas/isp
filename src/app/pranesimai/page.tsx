import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import Pranesimai from "./Pranesimai";
import { redirect } from "next/navigation";

/**
 * Renders the page component with a list of messages associated with the logged-in user.
 * @returns JSX element with the Pranesimai component.
 */
export default async function Page() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }

  const userID = parseInt(session.user.id, 10);

  const pranesimai = await prisma.pranesimas.findMany({
    where: {
      naudotojasId: userID,
    },
    select: {
      id: true,
      tipas: true,
      data: true,
      tekstas: true,
      naudotojas: true,
    },
  });

  return <Pranesimai messages={pranesimai} />;
}
