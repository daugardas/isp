import prisma from "@/lib/db";
import Review from "./Review";
import Atsiliepimai from "./Review";

/**
 * Renders the page component with a list of users.
 * @returns JSX element with the Naudotojai component.
 */
export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { id } = params;
  const atsiliepimai = await prisma.atsiliepimas.findMany({
    select: {
      id: true,
      atsiliepimas: true,
      modulisId: true,
    },
    where: {
      modulisId: parseInt(id),
    },
  });

  return <Review atsiliepimai={atsiliepimai} />;
}
