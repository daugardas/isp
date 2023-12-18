import prisma from "@/lib/db";
import Destytojai from "./Destytojai";

/**
 * Renders the page component with a list of users.
 * @returns JSX element with the Naudotojai component.
 */
export default async function Page() {
  const destytojai = await prisma.destytojas.findMany({
    select: {
      id: true,
      vardas: true,
    },
  });
  
  return <Destytojai destytojai={destytojai} />;
}
