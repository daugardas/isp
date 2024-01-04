"use client";
import React, { useEffect, useState } from 'react';
import CommentSection from "./CommentSection";
import { fetchComments } from './serverFunctions';

const Kom = ({ modulisId, naudotojasId }) => {
    const [komentarai, setKomentarai] = useState([]);
    const [filteredComments, setFilteredComments] = useState([]);
    const [sortOption, setSortOption] = useState('date'); // Default sorting by date
    const [filterOption, setFilterOption] = useState('all'); // Default filter to show all

    const loadComments = async () => {
        const fetchedComments = await fetchComments(modulisId);
        setKomentarai(fetchedComments);
        setFilteredComments(fetchedComments);
    };

    useEffect(() => {
        loadComments();
    }, [modulisId]);

    useEffect(() => {
        // Apply filter
        let tempComments = komentarai.filter(comment =>
            filterOption === 'top-level' ? !comment.atsakymasIKomentaraId : true
        );

        // Apply sorting
        tempComments = tempComments.sort((a, b) => {
            if (sortOption === 'date') {
                return new Date(b.data) - new Date(a.data);
            } else if (sortOption === 'user') {
                // Convert naudotojasId to string for sorting
                const userIdA = String(a.naudotojasId);
                const userIdB = String(b.naudotojasId);
                return userIdA.localeCompare(userIdB);
            }
            return 0;
        });

        setFilteredComments(tempComments);
    }, [sortOption, filterOption, komentarai]);

    return (
        <CommentSection
            komentarai={filteredComments}
            onSortChange={setSortOption}
            onFilterChange={setFilterOption}
            modulisId={modulisId}
            naudotojasId={naudotojasId}
            refreshComments={loadComments}
        />
    );
}

export default Kom;
