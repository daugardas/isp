import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type DataJson = {
    tagName: string | undefined;
};

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { tagName } = (await req.json()) as DataJson;

    if (!tagName && tagName !== "") {
        return NextResponse.json(
            { message: "Žymė negali būti tuščia." },
            { status: 400 }
        );
    }

    if (tagName.length > 15) {
        return NextResponse.json(
            { message: "Žymė negali būti ilgesnė nei 15 simbolių." },
            { status: 400 }
        );
    }

    try {
        const tag = await prisma.zymes.create({
            data: {
                zyme: tagName,
                naudotojasId: Number(session.user?.id),
            },
        });

        return NextResponse.json({ tag }, { status: 201 });
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json(
            { message: "Nepavyko sukurti naujos žymės." },
            { status: 500 }
        );
    }
}
