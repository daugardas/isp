import prisma from "@/lib/db";
import Naudotojai from "./Naudotojai";

/**
 * Renders the page component with a list of users.
 * @returns JSX element with the Naudotojai component.
 */
export default async function Page() {
    const naudotojai = await prisma.naudotojas.findMany({
        select: {
            id: true,
            vardas: true,
        },
        where: {
            deleted: false,
        },
    });

    return <Naudotojai naudotojai={naudotojai} />;
}
