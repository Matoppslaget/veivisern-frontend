
interface TypingAnimationProps {
    keyIndex: number;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ keyIndex }) => {
    return (
        <div key={keyIndex} className="flex justify-start">
            <div className="bg-blue-400 rounded-lg p-4 text-white max-w-sm">
                <div className="flex items-center space-x-2 bg-blue-400">
                    <div className="w-4 h-4 rounded-full bg-blue-400 bg-gradient-to-r from-blue-600 to-blue-800 animate-pulse"></div>
                    <div className="w-4 h-4 rounded-full bg-blue-400 bg-gradient-to-r from-blue-600 to-blue-800 animate-pulse delay-75"></div>
                    <div className="w-4 h-4 rounded-full bg-blue-400 bg-gradient-to-r from-blue-600 to-blue-800 animate-pulse delay-150"></div>
                </div>
            </div>
        </div>
    );
};

export default TypingAnimation;