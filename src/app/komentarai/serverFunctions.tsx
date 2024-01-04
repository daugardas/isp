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

export async function editComment(commentId, updatedComment) {
    try {
        await prisma.komentaras.update({
            where: { id: commentId },
            data: { komentaras: updatedComment },
        });
        return { message: "Comment updated successfully" };
    } catch (error) {
        return { error: "Error updating comment: " + error.message };
    }
}

// Function to delete a comment
export async function deleteComment(commentId) {
    try {
        await prisma.komentaras.delete({
            where: { id: commentId },
        });
        return { message: "Comment deleted successfully" };
    } catch (error) {
        return { error: "Error deleting comment: " + error.message };
    }
}

export async function addReaction(commentId, userId, reactionType) {
    try {
        // Check if the user already reacted
        const existingReaction = await prisma.reakcija.findFirst({
            where: {
                komentarasId: commentId,
                naudotojasId: userId
            }
        });

        if (existingReaction) {
            // Update reaction if it already exists
            await prisma.reakcija.update({
                where: { id: existingReaction.id },
                data: { reakcija: reactionType },
            });
        } else {
            // Create new reaction
            await prisma.reakcija.create({
                data: {
                    reakcija: reactionType,
                    komentarasId: commentId,
                    naudotojasId: userId
                },
            });
        }

        return { message: "Reaction updated successfully" };
    } catch (error) {
        return { error: "Error updating reaction: " + error.message };
    }
}
