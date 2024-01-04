import React, { useState } from 'react';
import Comment from './Comment';
import { addComment } from './serverFunctions'; // Adjust the path as necessary

const CommentSection = ({ komentarai, modulisId, naudotojasId, refreshComments }) => {
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddCommentClick = () => {
        setShowCommentBox(true);
    };

    const handleAddButtonClick = async () => {
        // Check for disallowed symbols
        if (/[<>/"\\]/.test(commentText)) {
            setErrorMessage('Comments cannot contain the symbols <, >, /, \\, or ".');
            return;
        }

        const result = await addComment({
            komentaras: commentText,
            naudotojasId,
            modulisId
        });

        if (result.error) {
            console.error(result.error);
            setErrorMessage(result.error);
        } else {
            console.log(result.message);
            setCommentText('');
            refreshComments(); // Refresh comments after successful addition
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
            <button onClick={handleAddCommentClick}>Add Comment</button>
            {showCommentBox && (
                <div>
                    <textarea
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    ></textarea>
                    <button onClick={handleAddButtonClick}>Add</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            )}
            {komentarai.map((comment) => (
                <Comment key={comment.id} commentData={comment} />
            ))}
        </div>
    );
};

export default CommentSection;
