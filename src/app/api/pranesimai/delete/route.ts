import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type DataJson = {
    messageID: number[] | undefined
};

export async function DELETE(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { messageID } = (await req.json()) as DataJson;

    if (!messageID) {
        return NextResponse.json(
            { message: "Nepateiktas žymės ID." },
            { status: 400 }
        );
    }

    if (messageID.length === 0) {
        return NextResponse.json(
            { message: "Nepasirinkote pranešimų ištrynimui." },
            { status: 400 }
        );
    }


    try {
        const deletedMessages = await prisma.pranesimas.deleteMany({
            where: {
                id: {
                    in: messageID
                }
            }
        })
        
        console.log("deleted messages:");
        console.log(deletedMessages);
        return NextResponse.json({
            message: "pavyko"
        }, {status: 200})
    } catch(error){
        console.log("error");
        return NextResponse.json({
            message: "server error",
            
        }, {status: 500})
    }

}