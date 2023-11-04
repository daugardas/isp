import prisma from "@/lib/db";
import Naudotojai from "./Naudotojai";

export default async function Page() {
  const naudotojai = await prisma.naudotojas.findMany({
    select: {
      id: true,
      vardas: true,
    },
  });

  return <Naudotojai naudotojai={naudotojai} />;
}
