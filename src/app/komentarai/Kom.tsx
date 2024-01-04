// Kom.js
"use client";
import React, { useEffect, useState } from 'react';
import CommentSection from "./CommentSection";
import { fetchComments } from './serverFunctions';

const Kom = ({ modulisId, naudotojasId }) => {
    const [komentarai, setKomentarai] = useState([]);
    const [filteredComments, setFilteredComments] = useState([]);
    const [sortOption, setSortOption] = useState('date');
    const [filterOption, setFilterOption] = useState('all'); // 'all', 'my-comments', 'todays-comments'

    const loadComments = async () => {
        const fetchedComments = await fetchComments(modulisId);
        setKomentarai(fetchedComments);
        applyFilterAndSort(fetchedComments);
    };

    useEffect(() => {
        loadComments();
    }, [modulisId]);

    useEffect(() => {
        applyFilterAndSort(komentarai);
    }, [sortOption, filterOption, komentarai]);

    const applyFilterAndSort = (comments) => {
        let tempComments = [...comments];
        const today = new Date();

        if (filterOption === 'my-comments') {
            tempComments = tempComments.filter(comment => comment.naudotojasId === naudotojasId);
        } else if (filterOption === 'todays-comments') {
            tempComments = tempComments.filter(comment => {
                const commentDate = new Date(comment.data);
                return commentDate.toDateString() === today.toDateString();
            });
        }

        // Apply sorting
        tempComments.sort((a, b) => {
            if (sortOption === 'date') {
                return new Date(b.data) - new Date(a.data);
            } else if (sortOption === 'user') {
                return String(a.naudotojasId).localeCompare(String(b.naudotojasId));
            }
            return 0;
        });

        setFilteredComments(tempComments);
    };

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
};

export default Kom;
