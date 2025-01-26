'use client';

import React, { forwardRef } from 'react';

interface PrimaryButtonProps {
  onClick: () => void;
  buttonText: string;
  ref: React.Ref<HTMLButtonElement>;
}

export default function PrimaryButton({
  onClick,
  buttonText,
  ref,
}: PrimaryButtonProps) {
  return (
    <button
      className="p-3 w-full text-white bg-lime-700 rounded-md hover:bg-lime-600"
      onClick={onClick}
      ref={ref}
    >
      {buttonText}
    </button>
  );
}
