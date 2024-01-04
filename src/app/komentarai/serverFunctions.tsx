"use server";

import prisma from "@/lib/db";
import { auth } from "@/lib/auth";

export async function fetchComments(modulisId) {
    try {
        const comments = await prisma.komentaras.findMany({
            where: {
                modulisId: modulisId
            },
            include: {
                atsakymai: true
            },
        });
        return comments;
    } catch (error) {
        console.error('Error fetching comments:', error);
        return [];
    }
}


export async function addComment(commentData) {
    const session = await auth();
    if (!session || !session.user) {
        return { error: "User must be logged in to post a comment" };
    }

    const { komentaras, naudotojasId, modulisId, atsakymasIKomentaraId } = commentData;

    if (!komentaras || isNaN(naudotojasId) || isNaN(modulisId)) {
        return { error: "Missing required fields for the comment" };
    }

    try {
        await prisma.komentaras.create({
            data: {
                komentaras,
                data: new Date(),
                naudotojasId,
                modulisId,
                ...(atsakymasIKomentaraId && { atsakymasIKomentaraId }),
            },
        });
        return { message: "Comment added successfully" };
    } catch (error) {
        return { error: "Error adding comment: " + error.message };
    }
}
