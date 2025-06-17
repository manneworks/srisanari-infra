'use client';

import { FC } from 'react';

interface CarouselButtonProps {
  onClick: () => void;
  enabled: boolean;
  className?: string;
}

export const PrevButton: FC<CarouselButtonProps> = ({ onClick, enabled, className = '' }) => (
  <button
    className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-200 focus:outline-none ${!enabled ? 'opacity-50 cursor-default' : 'opacity-80 hover:opacity-100'} ${className}`}
    onClick={onClick}
    disabled={!enabled}
    aria-label="Previous slide"
  >
    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

export const NextButton: FC<CarouselButtonProps> = ({ onClick, enabled, className = '' }) => (
  <button
    className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-200 focus:outline-none ${!enabled ? 'opacity-50 cursor-default' : 'opacity-80 hover:opacity-100'} ${className}`}
    onClick={onClick}
    disabled={!enabled}
    aria-label="Next slide"
  >
    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
);
