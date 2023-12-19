import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type DataJson = {
    tagId: string | undefined;
    userIdToTag: string | undefined;
};

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { tagId, userIdToTag } = (await req.json()) as DataJson;

    if (!tagId) {
        return NextResponse.json(
            {
                message:
                    "Bad Request. Field 'tagId' is missing in POST request body.",
            },
            { status: 400 }
        );
    }

    if (!userIdToTag) {
        return NextResponse.json(
            {
                message:
                    "Bad Request. Field 'userIdToTag' is missing in POST request body.",
            },
            { status: 400 }
        );
    }

    let tag: {
        id: number;
        zyme: string;
        data: Date;
        naudotojasId: number;
    } | null = null;

    try {
        tag = await prisma.zymes.findUnique({
            where: {
                id: Number(tagId),
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal server error." },
            { status: 500 }
        );
    }

    if (!tag) {
        return NextResponse.json(
            {
                message:
                    "Bad Request. Given tag does not exist in the database.",
            },
            { status: 400 }
        );
    }

    if (tag.naudotojasId !== Number(session.user?.id)) {
        return NextResponse.json(
            { message: "Bad request. You can only tag with your own tags." },
            { status: 401 }
        );
    }

    try {
        const user = await prisma.naudotojas.findUnique({
            where: {
                id: Number(userIdToTag),
                deleted: false,
            },
        });

        if (!user) {
            return NextResponse.json(
                {
                    message:
                        "Bad Request. Given user does not exist in the database.",
                },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal server error." },
            { status: 500 }
        );
    }

    try {
        // check if tagged user already has a tag, if yes, then update it, if not create a new one
        const userAlreadyHasATag = await prisma.pazymetiNaudotojai.findFirst({
            where: {
                naudotojasId: Number(session.user?.id),
                pazymetoNaudotojoId: Number(userIdToTag),
            },
        });

        if (userAlreadyHasATag) {
            await prisma.pazymetiNaudotojai.update({
                where: {
                    id: userAlreadyHasATag.id,
                },
                data: {
                    zymeId: Number(tagId),
                },
            });
        } else {
            await prisma.pazymetiNaudotojai.create({
                data: {
                    naudotojasId: Number(session.user?.id),
                    zymeId: Number(tagId),
                    pazymetoNaudotojoId: Number(userIdToTag),
                },
            });
        }

        return NextResponse.json(
            { message: "Naudotojas sėkmingai pažymėtas." },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal server error." },
            { status: 500 }
        );
    }
}
