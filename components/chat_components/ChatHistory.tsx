import React from 'react';
import ProductDetails from './ProductDetails';
import { Message } from '../../types/Chat';
import { KassalappProduct } from '@/types/Kassalapp';
import ProductSceleton from './ProductSceleton';

interface ChatHistoryProps {
    chatLog: Message[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chatLog }) => {
    return (
        <>
            {chatLog.map((message, index) => (
                <div key={index} className={`mt-2 flex ${message.type === 'user' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`${message.type === 'user' ? 'border-2 border-blue-300' : ''} rounded-lg p-4 `}>
                        {message.type === 'user' && message.message}
                        {message.type === 'product' && message.product && message.evaluated && <ProductDetails product={message.product} />}
                        {message.type === 'product' && message.product && !message.evaluated && <ProductSceleton product={message.product} />}
                    </div>
                </div>
            ))}
        </>
    );
};

export default ChatHistory;
