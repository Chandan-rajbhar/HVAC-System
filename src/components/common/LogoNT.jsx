import React from 'react';

export default function LogoNT({ size = 'md', variant = 'full', className = '' }) {
  // size: 'sm', 'md', 'lg'
  const dimensionClass = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  }[size] || 'w-9 h-9';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Authentic Circular NT Monogram */}
      <div className={`relative ${dimensionClass} shrink-0 rounded-full bg-polar-200 border-2 border-deepViolet shadow-sm flex items-center justify-center overflow-hidden`}>
        <svg viewBox="0 0 100 100" className="w-full h-full p-0.5">
          {/* Subtle outer circular detail ring */}
          <circle cx="50" cy="50" r="46" stroke="#241A6E" strokeWidth="2.5" fill="none" />
          <circle cx="50" cy="50" r="41" stroke="#241A6E" strokeWidth="0.8" strokeDasharray="2 1.5" fill="none" opacity="0.6" />
          
          {/* Arc Text: Engineered for simplicity */}
          <path id={`arc-${size}`} d="M 18,50 A 32,32 0 1,1 82,50" fill="none" />
          <text fontSize="5.2" fontFamily="system-ui, sans-serif" fontWeight="700" fill="#241A6E" letterSpacing="1.8">
            <textPath href={`#arc-${size}`} startOffset="50%" textAnchor="middle">ENGINEERED FOR SIMPLICITY</textPath>
          </text>
          
          {/* Stylized NT Emblem in Terracotta Red */}
          <text 
            x="50" 
            y="61" 
            textAnchor="middle" 
            fontSize="30" 
            fontFamily="'Space Grotesk', serif" 
            fontWeight="800" 
            fill="#C84B31"
            letterSpacing="-1.5"
          >
            NT
          </text>
          
          {/* Bottom subtitle */}
          <text 
            x="50" 
            y="74" 
            textAnchor="middle" 
            fontSize="6.2" 
            fontFamily="system-ui, sans-serif" 
            fontWeight="800" 
            fill="#241A6E"
            letterSpacing="0.8"
          >
            NO-TECH
          </text>
          <text 
            x="50" 
            y="81" 
            textAnchor="middle" 
            fontSize="4.2" 
            fontFamily="system-ui, sans-serif" 
            fontWeight="600" 
            fill="#64748B"
            letterSpacing="1.2"
          >
            HVAC SYSTEMS
          </text>
        </svg>
      </div>

      {variant === 'full' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-['Space_Grotesk'] text-deepViolet font-extrabold tracking-wider text-base leading-none">
              NO-TECH
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-deepViolet/10 text-deepViolet uppercase tracking-widest leading-none">
              HVAC
            </span>
          </div>
          <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase mt-0.5">
            Smart Companion
          </span>
        </div>
      )}
    </div>
  );
}
