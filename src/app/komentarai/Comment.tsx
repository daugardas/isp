import React, { useState } from 'react';

const Comment = ({ commentData, onReply, onEdit, onDelete, onReact, naudotojasId, isReply = false }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(commentData.komentaras);
    const [editErrorMessage, setEditErrorMessage] = useState('');
    const userName = commentData.naudotojas ? commentData.naudotojas.vardas : 'Nežinomasis';

    const isUserComment = commentData.naudotojasId === naudotojasId;

    const handleEdit = () => {
        setIsEditing(true);
        setEditErrorMessage('');
    };

    const handleSave = () => {
        if (/[<>/"\\]/.test(editedComment)) {
            setEditErrorMessage('Komentaro turinyje negali būti simbolių <, >, /, \\ ar "');
            return;
        }
        onEdit(commentData.id, editedComment);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedComment(commentData.komentaras);
        setIsEditing(false);
        setEditErrorMessage('');
    };

    const handleReaction = (reactionType) => {
        onReact(commentData.id, reactionType);
    };

    const handleDelete = () => {
        if (window.confirm("Ar tikrai norite ištrinti šį komentarą?")) {
            onDelete(commentData.id);
        }
    };

    return (
        <div className="comment">
            <div className="comment-content">
                {isEditing ? (
                    <>
                        <textarea value={editedComment} onChange={(e) => setEditedComment(e.target.value)} />
                        {editErrorMessage && <p className="error-message">{editErrorMessage}</p>}
                    </>
                ) : (
                    <p>{userName}: {commentData.komentaras}</p>
                )}
            </div>
            <span className="date">Paskelbtas: {commentData.data.toLocaleDateString()}</span>
            {isUserComment && !isEditing && (
                <>
                    <Button text="Redaguoti" onClick={handleEdit} />
                    <Button text="Šalinti" onClick={handleDelete} />
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
