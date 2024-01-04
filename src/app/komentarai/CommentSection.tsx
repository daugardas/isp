import React, { useState } from 'react';
import Comment from './Comment';
import { addComment } from './serverFunctions'; // Adjust the path as necessary

const CommentSection = ({ komentarai, modulisId, naudotojasId }) => {
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [commentText, setCommentText] = useState('');

    const handleAddCommentClick = () => {
        setShowCommentBox(true);
    };

    const handleAddButtonClick = async () => {
        const result = await addComment({
            komentaras: commentText,
            naudotojasId,
            modulisId
        });
        if (result.error) {
            console.error(result.error);
        } else {
            console.log(result.message);
            setCommentText('');
            // Refresh or update comments list to show the new comment
        }
        setShowCommentBox(false);
    };

    const handleCancelClick = () => {
        setCommentText('');
        setShowCommentBox(false);
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
                </div>
            )}
            {komentarai.map((comment) => (
                <Comment key={comment.id} commentData={comment} />
            ))}
        </div>
    );
};

export default CommentSection;
