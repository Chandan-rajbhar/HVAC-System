import React from 'react';

export default function LogoNT({ 
  size = 'md', 
  variant = 'full', 
  className = '', 
  title = 'LOCAL INDUSTRIES' 
}) {
  // size: 'sm', 'md', 'lg', 'xl'
  const dimensionClass = {
    sm: 'w-8 h-8 sm:w-9 sm:h-9',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  }[size] || 'w-10 h-10';

  const isSmall = size === 'sm' || size === 'md';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Authentic Circular NT Monogram with crisp white medallion finish */}
      <div 
        className={`relative ${dimensionClass} shrink-0 rounded-full bg-white border border-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.9)] flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 duration-200`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full p-0.5 select-none">
          {/* Outer circular detail ring */}
          <circle cx="50" cy="50" r="46" stroke="#241A6E" strokeWidth="2.5" fill="none" />
          <circle cx="50" cy="50" r="41" stroke="#241A6E" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.6" />

          {/* Precision dial notches at 12, 3, 6, 9 o'clock */}
          <line x1="50" y1="4" x2="50" y2="9" stroke="#241A6E" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="50" y1="91" x2="50" y2="96" stroke="#241A6E" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="4" y1="50" x2="9" y2="50" stroke="#241A6E" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="91" y1="50" x2="96" y2="50" stroke="#241A6E" strokeWidth="1.8" strokeLinecap="round" />

          {/* For larger sizes, show detailed engraving text */}
          {!isSmall && (
            <>
              <path id={`arc-${size}`} d="M 18,50 A 32,32 0 1,1 82,50" fill="none" />
              <text fontSize="5.2" fontFamily="system-ui, sans-serif" fontWeight="700" fill="#241A6E" letterSpacing="1.8">
                <textPath href={`#arc-${size}`} startOffset="50%" textAnchor="middle">ENGINEERED FOR SIMPLICITY</textPath>
              </text>
              <text x="50" y="74" textAnchor="middle" fontSize="6.2" fontFamily="system-ui, sans-serif" fontWeight="800" fill="#241A6E" letterSpacing="0.8">
                NO-TECH
              </text>
              <text x="50" y="81" textAnchor="middle" fontSize="4.2" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#64748B" letterSpacing="1.2">
                HVAC SYSTEMS
              </text>
            </>
          )}

          {/* Stylized NT Emblem in Terracotta Red */}
          <text
            x="50"
            y={isSmall ? "61" : "59"}
            textAnchor="middle"
            fontSize={isSmall ? "35" : "30"}
            fontFamily="'Space Grotesk', -apple-system, sans-serif"
            fontWeight="900"
            fill="#C84B31"
            letterSpacing="-1.5"
          >
            NT
          </text>

          {/* Underline bar under NT */}
          <line
            x1={isSmall ? "32" : "36"}
            y1={isSmall ? "68" : "65"}
            x2={isSmall ? "68" : "64"}
            y2={isSmall ? "68" : "65"}
            stroke="#241A6E"
            strokeWidth={isSmall ? "2.6" : "2"}
            strokeLinecap="round"
          />
        </svg>
      </div>

      {variant === 'full' && (
        <span className="font-['Space_Grotesk'] text-white font-extrabold tracking-wider text-[15px] sm:text-base leading-none drop-shadow-xs transition-colors group-hover:opacity-95">
          {title}
        </span>
      )}
    </div>
  );
}