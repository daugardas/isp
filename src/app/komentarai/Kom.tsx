// Kom.tsx
import React from 'react';
import prisma from "@/lib/db";
import Komentarai from "./Komentarai";
import { CommentView } from './interfaces';

const Kom: React.FC = async () => {
    const komentarai: CommentView[] = await prisma.komentaras.findMany({
        select: {
            id: true,
            komentaras: true,
            data: true,
        },
    });

    return <Komentarai komentarai={komentarai} />;
}

export default Kom;
