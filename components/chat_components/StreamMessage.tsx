
import React from 'react';

interface StreamMessageProps {
    keyIndex: number;
    messageStream: string;
}

const StreamMessage: React.FC<StreamMessageProps> = ({ keyIndex, messageStream }) => {
    return (
        <div key={keyIndex} className="flex justify-start">
            <div className="bg-blue-400 rounded-lg p-4 text-white max-w-sm">
                {messageStream}
            </div>
        </div>
    );
};

export default StreamMessage;
