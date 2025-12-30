'use client'
import React from 'react';
import { Star } from 'lucide-react';

interface SectionBadgeProps {
  text: string;
  highlightText?: string;
  highlightColor?: 'primary' | 'tertiary';
  className?: string;
}

const SectionBadge: React.FC<SectionBadgeProps> = ({ 
  text, 
  highlightText,
  highlightColor = 'primary',
  className = '' 
}) => {
  return (
    <span className={`inline-flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Glow effect layers */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-6 h-6 bg-primary rounded-full opacity-20 animate-ping"></div>
          <div className="absolute w-5 h-5 bg-primary rounded-full opacity-40 animate-pulse"></div>
        </div>
        {/* Star icon */}
        <Star className="w-4 h-4 text-primary fill-primary relative z-10 drop-shadow-[0_0_4px_rgba(77,175,239,0.8)]" />
      </div>
      <span className="text-lg md:text-xl font-semibold">
        {highlightText ? (
          <>
            <span className={highlightColor === 'primary' ? 'text-tertiary' : 'text-tertiary'}>
              {text}
            </span>{' '}
            <span className="text-primary">{highlightText}</span>
          </>
        ) : (
          <span className="text-tertiary">{text}</span>
        )}
      </span>
    </span>
  );
};

export default SectionBadge;

