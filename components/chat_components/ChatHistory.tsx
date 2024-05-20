import React from 'react';

interface ChatMessage {
    type: string;
    message: string;
}

interface ChatHistoryProps {
    chatLog: ChatMessage[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chatLog }) => {
    return (
        <>
            {chatLog.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`${message.type === 'user' ? 'bg-green-600' : 'bg-blue-400'} rounded-lg p-4 text-white max-w-sm`}>
                        {message.message}
                    </div>
                </div>
            ))}
        </>
    );
};

export default ChatHistory;
