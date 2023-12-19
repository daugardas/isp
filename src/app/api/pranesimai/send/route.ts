import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { PranesimoTipas } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type DataJson = {
    messageText: string | undefined;
    messageType: PranesimoTipas;
    userID: number;
};

export async function POST(req: NextRequest) {
    const session = await auth();
    const date = new Date();

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { messageText, messageType, userID } = (await req.json()) as DataJson;

    console.log("messageText: " + messageText);
    console.log("messageType: " + messageType);
    console.log("userID: " + userID);

    if (!messageText && messageText !== "") {
        return NextResponse.json(
            { message: "Neįvedėte jokio teksto." },
            { status: 400 }
        );
    }

    try {
        const createdMessage = await prisma.pranesimas.create({
            data: {
                tipas: messageType,
                tekstas: messageText,
                data: date,
                naudotojasId: userID,
            },
        });

        console.log("Created message:");
        console.log(createdMessage);
        return NextResponse.json(
            {
                message: "pavyko",
            },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "server error",
            },
            { status: 500 }
        );
    }
}
