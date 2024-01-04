// Kom.tsx
import React from 'react';
import prisma from "@/lib/db";
import CommentSection from "./CommentSection";
import { CommentView } from './interfaces';

const Kom: React.FC = async () => {
    const komentarai: CommentView[] = await prisma.komentaras.findMany({
        select: {
            id: true,
            komentaras: true,
            data: true,
            naudotojas: true
        },
    });

    return <CommentSection komentarai={komentarai} />;
}

export default Kom;
