import React from 'react';
import Comment from './Comment';

const CommentSection = () => {
    const comments = [
        { id: 1, author: "Jonas", text: "Man nepatinka!", timestamp: Date.now() },
        { id: 2, author: "Ema", text: "Labai prastas ;(", timestamp: Date.now() - 10000000 },
        // Add more hardcoded comments here
    ];

    return (
        <div className="comment-section bg-black rounded-lg shadow-md p-4">
            <div className="header flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Komentarai</h2>
                <div>
                    <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Filtruoti
                    </button>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Rusiuoti
                    </button>
                </div>
            </div>

            <div className="new-comment mb-4">
                <textarea className="bg-gray-100 rounded p-2 w-full text-black" placeholder="Naujas komentaras..."></textarea>
                <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-2">
                    Saugoti
                </button>
            </div>

            {comments.map(comment => (
                <Comment key={comment.id} author={comment.author} text={comment.text} timestamp={comment.timestamp} />
            ))}
        </div>
    );
};

export default CommentSection;
