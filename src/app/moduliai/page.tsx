import prisma from "@/lib/db";
import Moduliai from "./Moduliai";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * Renders the page component with a list of users.
 * @returns JSX element with the Naudotojai component.
 */
export default async function Page() {


  



  const moduliai = await prisma.modulis.findMany({
    select: {
      id: true,
      pavadinimas: true,
    },
  });

  return <Moduliai moduliai={moduliai} />;
}
