import { useState, useEffect } from 'react';
import Message from '@/api/dtos/Message';


interface ChatInputProps {

}


const ChatInput: React.FC<ChatInputProps> = ({ setChatLog }) => {
    const handleSubmit = (event: any) => {
        event.preventDefault();
        setChatLog((prevChatLog) => [...prevChatLog, new Message("user", inputValue)])
        sendMessage(inputValue);
        setInputValue('');
    }



const ChatInput: React.FC<ChatInputProps> = ({ setChatLog }) => {
    return (
        <>
            <form onSubmit={handleSubmit} className="flex-none p-6">
                <div className="flex rounded-lg border border-gray-700  text-black bg-white" >
                    <input type="text" className="flex-grow px-4 py-2 bg-transparent text-black focus:outline-none text-xl" placeholder="Spør meg om et matprodukt..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    <button type="submit" className="bg-stone-400 rounded-lg px-4 py-2 text-black focus:outline-none hover:bg-stone-300 transition-colors duration-300">Send</button>
                </div>
            </form>
        </>
    )
};

export default ChatInput;



