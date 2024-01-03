import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    // delete naudotojas

    const { id } = (await req.json()) as { id: number };

    if (!id) {
        return NextResponse.json(
            {
                message:
                    "Bad Request. Field 'id' is missing in POST request body.",
            },
            { status: 400 }
        );
    }

    try {
        // await prisma.naudotojas.delete({
        //     where: {
        //         id: Number(id),
        //     },
        // });

        // cascade delete
        await prisma.naudotojas.update({
            where: {
                id: id,
            },
            data: {
                deleted: true,
            },
        });

        return NextResponse.json(
            { message: "Naudotojas deleted." },
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
