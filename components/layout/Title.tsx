'use client';

import { Syne } from 'next/font/google';
import { useState } from 'react';

interface TitleProps {
  style: string;
  isLogo?: boolean;
}

const syne = Syne({ subsets: ['latin'] });

export default function Title({ style, isLogo = false }: TitleProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={style}>
      {isLogo ? (
        <div
          className="overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <span
            className={`${syne.className} hidden md:inline text-[#2D2D2D] text-2xl tracking-[0.2em] font-semibold transition-transform duration-500 ease-in-out ${
              hovered ? 'translate-x-4' : '-translate-x-full'
            }`}
          >
            🦉 MATOPPSLAGET
          </span>
          <span className="md:hidden">🦉</span>
        </div>
      ) : (
        <h1
          className={`${syne.className} text-center font-semibold text-[#2D2D2D] tracking-[0.2em] text-3xl pb-4 sm:text-5xl sm:pb-12 md:text-6xl`}
        >
          🦉 MATOPPSLAGET
        </h1>
      )}
    </div>
  );
}
