// pages/api/addComment.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { komentaras, modulisId } = req.body;
    // Assuming you have user session handling to get naudotojasId
    const naudotojasId = req.session.user.id; // Replace with your session logic

    try {
        const newComment = await prisma.komentaras.create({
            data: {
                komentaras,
                modulisId,
                naudotojasId,
                data: new Date(),
            },
        });
        res.status(200).json(newComment);
    } catch (error) {
        res.status(500).json({ error: "Error adding comment" });
    }
}
