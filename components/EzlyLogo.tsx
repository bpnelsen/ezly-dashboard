import React from 'react';

const EzlyLogo = ({ className = "w-32 h-12" }: { className?: string }) => {
  return (
    <svg viewBox="0 0 400 120" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Roof Peak / Checkmark */}
      <path 
        d="M140 20 L200 0 L260 20" 
        fill="none" 
        stroke="#14b8a6" 
        strokeWidth="12" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* EZLY Wordmark */}
      <text 
        x="200" 
        y="85" 
        fontFamily="sans-serif" 
        fontWeight="bold" 
        fontSize="80" 
        fill="#0F3A7D" 
        textAnchor="middle" 
        letterSpacing="2"
      >
        EZLY
      </text>

      {/* Foundation Line */}
      <rect 
        x="60" 
        y="110" 
        width="280" 
        height="8" 
        fill="#14b8a6" 
        rx="4" 
      />
    </svg>
  );
};

export default EzlyLogo;
