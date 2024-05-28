
interface TypingAnimationProps {
    isLoading: boolean;
    keyIndex: number;
    noProducts: number;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ isLoading, keyIndex, noProducts }) => {
    if (!isLoading) return null;
    return (
        <div className='justify-end'>
            <span className='sr-only'>Henter {noProducts} produkter</span>
            <div className='h-8 w-8 animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-8 w-8 animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-8 w-8 animate-bounce'></div>
        </div>
    );
};

export default TypingAnimation;