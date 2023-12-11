import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";

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

    return (
        <div className="mt-6 w-8/12 max-w-lg flex flex-col items-center gap-4">
            <div>
                <Link
                    href="/profilis/redaguoti"
                    className="bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition duration-100"
                >
                    Redaguoti
                </Link>
            </div>
            <h1 className="text-3xl font-bold">{naudotojas.vardas}</h1>
            <p className="text-lg">{naudotojas.el_pastas}</p>
            <p className="text-lg">{naudotojas.telefonas}</p>
            {naudotojas.fakultetasId && (
                <p className="text-lg">{naudotojas.fakultetasId}</p>
            )}
        </div>
    );
}
