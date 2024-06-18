import React from 'react';
import ProductDetails from './ProductDetails';
import { Message } from '../../types/Chat';
import { KassalappProduct } from '@/types/Kassalapp';
import ProductSceleton from './ProductSceleton';

interface ChatHistoryProps {
    chatLog: Message[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chatLog }) => {
    const sortedChatLog = [...chatLog].sort((a, b) => a.renderKey - b.renderKey);
    return (
        <ul>
            {sortedChatLog.map((message: Message) => (
                <li key={message.renderKey} id={'' + message.renderKey}>
                    <div id={`${message.type === 'user' ? 'message' + message.renderKey : 'product' + message.renderKey}`} className={`mt-2 flex ${message.type === 'user' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`${message.type === 'user' ? 'border-2 border-blue-300 border-opacity-50' : ''} rounded-lg p-2 `}>
                            {message.type === 'user' && message.message}
                            {message.type === 'product' && message.product && <ProductDetails product={message.product} evaluated={message.evaluated ?? false} />}
                        </div>
                    </div>
                </li>

            ))}
        </ul>
    );
};

export default ChatHistory;
