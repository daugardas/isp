import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type DataJson = {
    tagId: string | undefined;
};

export async function DELETE(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { tagId } = (await req.json()) as DataJson;

    if (!tagId) {
        return NextResponse.json(
            { message: "Nepateiktas žymės ID." },
            { status: 400 }
        );
    }

    try {
        const tagIsUsed = await prisma.pazymetiNaudotojai.findFirst({
            where: {
                zymeId: Number(tagId),
            },
        });

        if (tagIsUsed) {
            return NextResponse.json(
                { message: "Žymė yra priskirta prie bent vieno naudotojo." },
                { status: 400 }
            );
        }
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json(
            {
                message:
                    "Nepavyko patikrinti ar žymė yra priskirta prie bent vieno naudotojo.",
            },
            { status: 500 }
        );
    }

    try {
        const tagExists = await prisma.zymes.findUnique({
            where: {
                id: Number(tagId),
                naudotojasId: Number(session.user?.id),
            },
        });

        if (!tagExists) {
            return NextResponse.json(
                { message: "Žymė su tokiu ID nerasta." },
                { status: 400 }
            );
        }
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json(
            { message: "Nepavyko patikrinti žymės." },
            { status: 500 }
        );
    }

    try {
        await prisma.zymes.delete({
            where: {
                id: Number(tagId),
            },
        });

        return NextResponse.json(
            { message: "Žymė sėkmingai ištrinta" },
            { status: 201 }
        );
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json(
            { message: "Nepavyko ištrinti žymės." },
            { status: 500 }
        );
    }
}
