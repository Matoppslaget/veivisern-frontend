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
                <div key={index} className={`flex 'justify-end'`}>
                    <div className={`${message.type === 'user' ? 'bg-green-600 text-white' : 'border border-gray-500'} rounded-lg p-4  max-w-sm`}>
                        {message.message}
                    </div>
                </div>
            ))}
        </>
    );
};

export default ChatHistory;
