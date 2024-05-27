import React from 'react';
import ProductDetails from './ProductDetails';
import { Message } from '../../types/Chat';

interface ChatHistoryProps {
    chatLog: Message[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chatLog }) => {
    return (
        <>
            {chatLog.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`${message.type === 'user' ? 'bg-green-600 text-white' : ''} rounded-lg p-4  max-w-sm`}>
                        {message.type === 'product' && message.product && <ProductDetails product={message.product} />}
                        {message.type === 'user' && message.message}
                    </div>
                </div>
            ))}
        </>
    );
};

export default ChatHistory;
