"use client";
import React, { useEffect, useState } from 'react';
import CommentSection from "./CommentSection";
import { fetchComments } from './serverFunctions';

const Kom = ({ modulisId, naudotojasId }) => {
    const [komentarai, setKomentarai] = useState([]);

    const loadComments = async () => {
        const fetchedComments = await fetchComments(modulisId);
        setKomentarai(fetchedComments);
    };

    useEffect(() => {
        loadComments();
    }, [modulisId]);

    return (
        <CommentSection
            komentarai={komentarai}
            modulisId={modulisId}
            naudotojasId={naudotojasId}
            refreshComments={loadComments}
        />
    );
}

export default Kom;
