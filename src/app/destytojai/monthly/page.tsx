import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import ShowMonthTutor from "./ShowMonthTutor";

export default async function Page() {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/");
    }

    let destytojai = await prisma.destytojas.findMany({
        select: {
            id: true,
            atsiliepimas: true,
            perziuros: true,
        },
    });

    destytojai.map((destytojas) => {
        destytojas.atsiliepimas = destytojas.atsiliepimas.filter(
            (atsiliepimas) =>
                atsiliepimas.data.getFullYear() === new Date().getFullYear() &&
                atsiliepimas.data.getMonth() === new Date().getMonth()
        );

        return destytojas;
    });

    destytojai.sort((a, b) =>
        a.atsiliepimas.length === b.atsiliepimas.length
            ? b.perziuros - a.perziuros
            : b.atsiliepimas.length - a.atsiliepimas.length
    );

    return <ShowMonthTutor tutorId={destytojai[0].id} />;
}
