// Comment.js
import React, { useState } from 'react';

const Comment = ({ commentData, onReply, onEdit, onDelete, naudotojasId, isReply = false }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(commentData.komentaras);

    const isUserComment = commentData.naudotojasId === naudotojasId;

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        onEdit(commentData.id, editedComment);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedComment(commentData.komentaras);
        setIsEditing(false);
    };

    return (
        <div className="comment">
            <div className="comment-content">
                {isEditing ? (
                    <textarea value={editedComment} onChange={(e) => setEditedComment(e.target.value)} />
                ) : (
                    <p>{commentData.naudotojasId}: {commentData.komentaras}</p>
                )}
            </div>
            <span className="date">Posted on: {commentData.data.toLocaleDateString()}</span>
            {isUserComment && !isEditing && (
                <>
                    <Button text="Redaguoti" onClick={handleEdit} />
                    <Button text="Šalinti" onClick={() => onDelete(commentData.id)} />
                </>
            )}
            {isEditing && (
                <>
                    <Button text="Išsaugoti" onClick={handleSave} />
                    <Button text="Atšaukti" onClick={handleCancel} />
                </>
            )}
            {!isReply && <Button text="Atsakyti" onClick={() => onReply(commentData.id)} />}
            {commentData.atsakymai && commentData.atsakymai.length > 0 && (
                <div className="replies">
                    {commentData.atsakymai.map(reply => (
                        <Comment key={reply.id} commentData={reply} onReply={onReply} onEdit={onEdit} onDelete={onDelete} naudotojasId={naudotojasId} isReply={true} />
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
