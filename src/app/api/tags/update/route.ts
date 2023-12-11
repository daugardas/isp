import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type DataJson = {
    tagName: string | undefined;
    tagId: string | undefined;
};

export async function PUT(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { tagName, tagId } = (await req.json()) as DataJson;

    if (!tagId) {
        return NextResponse.json(
            { message: "Nepateiktas žymės ID." },
            { status: 400 }
        );
    }

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
        const tag = await prisma.zymes.update({
            where: {
                id: Number(tagId),
                naudotojasId: Number(session.user?.id),
            },
            data: {
                zyme: tagName,
            },
        });

        return NextResponse.json({ tag }, { status: 201 });
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json(
            { message: "Nepavyko atnaujinti žymės." },
            { status: 500 }
        );
    }
}
