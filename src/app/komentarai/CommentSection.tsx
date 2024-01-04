import React from 'react';
import Comment from './Comment';

const CommentSection = ({ komentarai }) => {
    return (
        <div className="comment-section">
            <textarea placeholder="Write a comment..."></textarea>
            <button disabled>Post Comment</button>
            {komentarai.map((comment) => (
                <Comment key={comment.id} commentData={comment} />
            ))}
        </div>
    );
};

const CommentForm = () => {
    return (
        <div>
            <textarea placeholder="Write a comment..." disabled></textarea>
            <button disabled>Post Comment</button>
        </div>
    );
};


export default CommentSection;
