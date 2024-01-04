// CommentSection.js
import React, { useState } from 'react';
import Comment from './Comment';
import { addComment, editComment, deleteComment } from './serverFunctions';

const CommentSection = ({ komentarai, modulisId, naudotojasId, refreshComments, onSortChange, onFilterChange }) => {
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [replyToCommentId, setReplyToCommentId] = useState(null);

    const handleAddCommentClick = () => {
        setShowCommentBox(true);
        setReplyToCommentId(null);
    };

    const handleReplyClick = (commentId) => {
        setReplyToCommentId(commentId);
        setShowCommentBox(true);
    };

    const handleAddButtonClick = async () => {
        if (/[<>/"\\]/.test(commentText)) {
            setErrorMessage('Komentaro turinyje negali būti simbolių <, >, /, \\ ar ".');
            return;
        }

        const result = await addComment({
            komentaras: commentText,
            naudotojasId,
            modulisId,
            atsakymasIKomentaraId: replyToCommentId
        });

        if (result.error) {
            console.error(result.error);
            setErrorMessage(result.error);
        } else {
            console.log(result.message);
            setCommentText('');
            refreshComments();
            setErrorMessage('');
        }
        setShowCommentBox(false);
    };

    const handleCancelClick = () => {
        setCommentText('');
        setShowCommentBox(false);
        setErrorMessage('');
    };

    const handleEditComment = async (commentId, updatedComment) => {
        const result = await editComment(commentId, updatedComment);
        if (result.error) {
            console.error(result.error);
            // Handle error (e.g., show error message)
        } else {
            refreshComments();
        }
    };

    const handleDeleteComment = async (commentId) => {
        const result = await deleteComment(commentId);
        if (result.error) {
            console.error(result.error);
            // Handle error
        } else {
            refreshComments();
        }
    };

    const isFilterActive = filter => filter !== 'all';
    const hasComments = komentarai.length > 0;

    // Filter out replies from top-level comments
    const topLevelComments = komentarai.filter(comment => !comment.atsakymasIKomentaraId);

    return (
        <div className="comment-section">
            {/* ... existing elements */}
            <div>
                <label>Rūšiuoti pagal: </label>
                <select onChange={(e) => onSortChange(e.target.value)}>
                    <option value="date">Datą</option>
                    <option value="user">Naudotoją</option>
                </select>
                <label> Filtruoti: </label>
                <select onChange={(e) => onFilterChange(e.target.value)}>
                    <option value="all">Visi komentarai</option>
                    <option value="my-comments">Mano komentarai</option>
                    <option value="todays-comments">Šiandienos komentarai</option>
                </select>
            </div>
            <button onClick={handleAddCommentClick}>Pridėti komentarą</button>
            {showCommentBox && (
                <div>
                    <textarea
                        placeholder="Rašykite komentarą..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    ></textarea>
                    <button onClick={handleAddButtonClick}>Pridėti</button>
                    <button onClick={handleCancelClick}>Atšaukti</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            )}
            {topLevelComments.length ? (
                topLevelComments.map((comment) => (
                    <Comment
                        key={comment.id}
                        commentData={comment}
                        onReply={handleReplyClick}
                        onEdit={handleEditComment}
                        onDelete={handleDeleteComment}
                        naudotojasId={naudotojasId}
                    />
                ))
            ) : isFilterActive(onFilterChange) && (
                <p className="no-comments-message">Nėra komentarų šiam filtrui.</p>
            )}
            {!hasComments && !isFilterActive(onFilterChange) && (
                <p className="no-comments-message">Kol kas komentarų nėra.</p>
            )}
        </div>
    );
};

export default CommentSection;
