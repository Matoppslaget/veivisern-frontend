import React from 'react';

interface SendButtonProps {
    disabled?: boolean;
}

const SendButton: React.FC<SendButtonProps> = ({ disabled = false }) => (
    <button
        type="submit"
        className={`mb-1 me-1 flex h-12 w-11 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:bg-[#D7D7D7] disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:bg-white dark:text-black dark:focus-visible:outline-white disabled:dark:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary ${disabled ? 'cursor-not-allowed' : ''}`}
        disabled={disabled}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 32 32" className="icon-2xl">
            <path fill="currentColor" fillRule="evenodd" d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z" clipRule="evenodd" />
        </svg>
    </button>
);

export default SendButton;