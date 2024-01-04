// Comment.js
import React from 'react';

const Comment = ({ commentData, onReply, naudotojasId, isReply = false }) => {
    // Check if the comment belongs to the logged-in user
    const isUserComment = commentData.naudotojasId === naudotojasId;

    return (
        <div className="comment">
            <div className="comment-content">
                <p>{commentData.naudotojasId}: {commentData.komentaras}</p>
            </div>
            <span className="date">Posted on: {commentData.data.toLocaleDateString()}</span>
            {isUserComment && (
                <>
                    <Button text="Redaguoti" onClick={() => {/* Edit logic here */ }} />
                    <Button text="Šalinti" onClick={() => {/* Delete logic here */ }} />
                </>
            )}
            {!isReply && <Button text="Atsakyti" onClick={() => onReply(commentData.id)} />}
            {commentData.atsakymai && commentData.atsakymai.length > 0 && (
                <div className="replies">
                    {commentData.atsakymai.map(reply => (
                        <Comment key={reply.id} commentData={reply} onReply={onReply} naudotojasId={naudotojasId} isReply={true} />
                    ))}
                </div>
            )}
        </div>
    );
};

const Button = ({ text, onClick }) => {
    return (
        <button className="reaction-button" onClick={onClick}>{text}</button>
    );
};

export default Comment;
