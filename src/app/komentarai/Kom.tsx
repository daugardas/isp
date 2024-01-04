"use client";
import React, { useEffect, useState } from 'react';
import CommentSection from "./CommentSection";
import { fetchComments } from './serverFunctions'; // Adjust the path as necessary

const Kom = ({ modulisId, naudotojasId }) => {
    const [komentarai, setKomentarai] = useState([]);

    useEffect(() => {
        const loadComments = async () => {
            const fetchedComments = await fetchComments(modulisId);
            setKomentarai(fetchedComments);
        };

        loadComments();
    }, [modulisId]); // Add modulisId as a dependency

    return (
        <CommentSection
            komentarai={komentarai}
            modulisId={modulisId}
            naudotojasId={naudotojasId}
        />
    );
}

export default Kom;
