import React from 'react';

export default function LogoNT({ 
  size = 'md', 
  variant = 'full', 
  className = '', 
  title = 'NO-TECH',
  subtitle = 'HVAC SYSTEMS'
}) {
  // size: 'xs', 'sm', 'md', 'lg', 'xl'
  const dimensionClass = {
    xs: 'w-5 h-5',
    sm: 'w-6 h-6 sm:w-[26px] sm:h-[26px]',
    md: 'w-7 h-7 sm:w-8 sm:h-8',
    lg: 'w-10 h-10 sm:w-12 sm:h-12',
    xl: 'w-16 h-16'
  }[size] || 'w-6 h-6 sm:w-[26px] sm:h-[26px]';

  const isSmall = size === 'xs' || size === 'sm' || size === 'md';

  return (
    <div className={`flex items-center gap-1.5 sm:gap-2 ${className}`}>
      {/* Authentic Circular NT Monogram with crisp white medallion finish */}
      <div 
        className={`relative ${dimensionClass} shrink-0 rounded-full bg-white border border-white/70 shadow-[0_1px_4px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.9)] flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 duration-200`}
      >
        <img
          src="/assets/logo.jpg"
          alt="NO-TECH Logo"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* SVG Fallback */}
        <svg viewBox="0 0 100 100" className="w-full h-full p-0.5 select-none absolute inset-0 -z-10">
          {/* Outer circular detail ring */}
          <circle cx="50" cy="50" r="46" stroke="#241A6E" strokeWidth="2.5" fill="none" />
          <circle cx="50" cy="50" r="41" stroke="#241A6E" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.6" />

          {/* Precision dial notches at 12, 3, 6, 9 o'clock */}
          <line x1="50" y1="4" x2="50" y2="9" stroke="#241A6E" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="50" y1="91" x2="50" y2="96" stroke="#241A6E" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="4" y1="50" x2="9" y2="50" stroke="#241A6E" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="91" y1="50" x2="96" y2="50" stroke="#241A6E" strokeWidth="1.8" strokeLinecap="round" />

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
        <div className="flex flex-col text-left select-none justify-center">
          <span className="font-['Space_Grotesk'] text-white font-black tracking-wide text-[11.5px] sm:text-[12.5px] leading-tight drop-shadow-xs">
            {title}
          </span>
          {subtitle && (
            <span className="text-[6.5px] sm:text-[7px] font-bold tracking-[0.18em] text-slate-300/85 uppercase leading-tight font-mono mt-[0.5px]">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}