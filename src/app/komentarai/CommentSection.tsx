import React, { useState } from 'react';
import Comment from './Comment';
import { addComment } from './serverFunctions';

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
            setErrorMessage('Komentaro turinyje negali buti simboliu <, >, /, \\ ar ".');
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

    return (
        <div className="comment-section">
            <div>
                <label>Rūšiuoti pagal: </label>
                <select onChange={(e) => onSortChange(e.target.value)}>
                    <option value="date">Datą</option>
                    <option value="user">Naudotoją</option>
                </select>
                <label>    Filtruoti: </label>
                <select onChange={(e) => onFilterChange(e.target.value)}>
                    <option value="all">Visi komentarai</option>
                    <option value="top-level">Komentarai be atsakymo</option>
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
            {komentarai.map((comment) => (
                <Comment key={comment.id} commentData={comment} onReply={handleReplyClick} />
            ))}
        </div>
    );
};

export default CommentSection;
