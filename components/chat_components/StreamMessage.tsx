
import React from 'react';

interface StreamMessageProps {
    isStreaming: boolean;
    keyIndex: number;
    messageStream: string;
}

const StreamMessage: React.FC<StreamMessageProps> = ({ isStreaming, keyIndex, messageStream }) => {
    if (!isStreaming) return null;
    return (
        <div key={keyIndex} className="flex justify-start">
            <div className="bg-blue-400 rounded-lg p-4 text-white max-w-sm">
                {messageStream}
            </div>
        </div>
    );
};

export default StreamMessage;
