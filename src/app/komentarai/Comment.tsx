// Comment.js
import React, { useState } from 'react';

const Comment = ({ commentData, onReply, onEdit, onDelete, onReact, naudotojasId, isReply = false }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(commentData.komentaras);
    const userName = commentData.naudotojas ? commentData.naudotojas.vardas : 'Unknown User';

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

    const handleReaction = (reactionType) => {
        onReact(commentData.id, reactionType);
    };

    return (
        <div className="comment">
            <div className="comment-content">
                {isEditing ? (
                    <textarea value={editedComment} onChange={(e) => setEditedComment(e.target.value)} />
                ) : (
                    <p>{userName}: {commentData.komentaras}</p> // Use userName
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
            <div className="reactions">
                <button onClick={() => handleReaction('sirdis')}>❤️</button>
                <button onClick={() => handleReaction('patinka')}>👍</button>
                <button onClick={() => handleReaction('nepatinka')}>👎</button>
                <button onClick={() => handleReaction('juokinga')}>😂</button>
                <button onClick={() => handleReaction('pikta')}>😠</button>
                <button onClick={() => handleReaction('verkia')}>😢</button>
                <button onClick={() => handleReaction('stebina')}>😮</button>
            </div>
            {commentData.atsakymai && commentData.atsakymai.length > 0 && (
                <div className="replies">
                    {commentData.atsakymai.map(reply => (
                        <Comment
                            key={reply.id}
                            commentData={reply}
                            onReply={onReply}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onReact={onReact}
                            naudotojasId={naudotojasId}
                            isReply={true}
                        />
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
