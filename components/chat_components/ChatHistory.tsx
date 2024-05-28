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
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`${message.type === 'user' ? 'bg-blue-300' : ''} rounded-lg p-4 `}>
                        {message.type === 'product' && message.product && <ProductDetails product={message.product} />}
                        {message.type === 'user' && message.message}
                    </div>
                </div>
            ))}
        </>
    );
};

export default ChatHistory;
