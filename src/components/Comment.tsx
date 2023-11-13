import React from 'react';

interface CommentProps {
    author: string;
    text: string;
    timestamp: number; // or Date
}

const Comment: React.FC<CommentProps> = ({ author, text, timestamp }) => {
    return (
        <div className="border p-4 rounded-lg shadow my-2 relative">
            <h4 className="font-bold text-lg text-blue-600">{author}</h4>
            <p className="text-gray-700">{text}</p>
            <div className="flex space-x-2 mt-2">
                <button className="text-sm text-blue-500 hover:text-blue-700">Atsakyti</button>
                <button className="text-sm text-yellow-500 hover:text-yellow-700">Redaguoti</button>
                <button className="text-sm text-red-500 hover:text-red-700">Panaikinti</button>
                <button className="text-sm text-purple-500 hover:text-red-700">Reaguoti</button>
            </div>
            <span className="text-xs text-gray-500">{new Date(timestamp).toLocaleString()}</span>

            {/* Symbol with number 8 */}
            <span className="absolute top-0 right-0 mr-2 mt-2 text-lg text-green-500 border border-blue-500 rounded-full">
                ?<span className="text-xs align-top">8</span>
            </span>
        </div>
    );
};

export default Comment;
