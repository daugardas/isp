import React from 'react';

const Comment = ({ commentData, onReply, isReply = false }) => {
    return (
        <div className="comment">
            <div className="comment-content">
                <p>{commentData.naudotojasId}: {commentData.komentaras}</p>
            </div>
            <span className="date">Posted on: {commentData.data.toLocaleDateString()}</span>
            <Button text="React" disabled />
            <Button text="Edit" disabled />
            <Button text="Delete" disabled />
            {!isReply && <Button text="Reply" onClick={() => onReply(commentData.id)} />}

            {commentData.atsakymai && commentData.atsakymai.length > 0 && (
                <div className="replies">
                    {commentData.atsakymai.map(reply => (
                        <Comment key={reply.id} commentData={reply} onReply={onReply} isReply={true} />
                    ))}
                </div>
            )}
        </div>
    );
};

const Button = ({ text, onClick, disabled }) => {
    return (
        <button className="reaction-button" onClick={onClick} disabled={disabled}>{text}</button>
    );
};

export default Comment;
