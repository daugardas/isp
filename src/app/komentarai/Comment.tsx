import React from 'react';
import Reply from './Reply';

const Comment = ({ commentData }) => {
    return (
        <div className="comment">
            <div className="comment-content">
                <p>{commentData.naudotojasId}: {commentData.komentaras}</p>
                {/* Add reaction list here */}
            </div>
            <span className="date">Posted on: {commentData.data.toLocaleDateString()}</span>
            <Button text="React" disabled />
            <Button text="Edit" disabled />
            <Button text="Delete" disabled />
            <Button text="Reply" disabled />

            {/* Optionally, include Reply component */}
            <div class="reply">
                <div class="reply-content">
                    <p>Jane Smith: This is a reply to the above comment.</p>
                    <div class="reaction-list">
                        + (2) - (1)
                    </div>
                </div>
                <span class="date">Posted on: 2024-01-05</span>
                <div class="reactions">
                    <button class="reaction-button" disabled>React</button>
                </div>
                <button disabled>Edit</button>
                <button disabled>Delete</button>
                <button disabled>Reply</button>
            </div>
        </div>
    );
};

const Button = ({ text, disabled }) => {
    return (
        <button className="reaction-button" disabled={disabled}>{text}</button>
    );
};



export default Comment;
