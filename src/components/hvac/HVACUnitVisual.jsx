import React, { useState } from 'react';
import { useHVAC } from '../../context/HVACContext';
import { Sparkles, ChevronRight } from 'lucide-react';

export default function HVACUnitVisual({ onSelectCompartment }) {
  const { 
    power, 
    mode, 
    faceplateColor, 
    faceplateColors, 
    compartments,
    setSelectedCompartment
  } = useHVAC();

  // Active faceplate style configuration
  const currentFaceplate = faceplateColors.find(f => f.id === faceplateColor) || faceplateColors[0];

  const handleCompartmentClick = (comp) => {
    if (onSelectCompartment) {
      onSelectCompartment(comp);
    } else if (setSelectedCompartment) {
      setSelectedCompartment(comp);
    }
  };

  // Dynamic styling for faceplate colors
  const getFaceplateBg = () => {
    switch (faceplateColor) {
      case 'tan':
        return 'bg-[#C8B69E] text-stone-900 border-[#B5A28A]';
      case 'red':
        return 'bg-[#C83228] text-white border-[#A3241C]';
      case 'blue':
        return 'bg-[#1D4ED8] text-white border-[#1E40AF]';
      case 'white':
      default:
        return 'bg-[#F8FAFC] text-slate-800 border-slate-200/90';
    }
  };

  const getHandleColor = () => {
    if (faceplateColor === 'red' || faceplateColor === 'blue') {
      return 'bg-white/25 border-white/40 shadow-inner';
    }
    return 'bg-slate-300/70 border-slate-300 shadow-inner';
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Interactive In-Wall Architectural HVAC Unit */}
      <div className="relative w-full max-w-[260px] flex flex-col items-center">
        {/* Subtle Ambient Airflow Glow when Active */}
        {power && (
          <div className={`absolute -inset-2 rounded-3xl blur-2xl opacity-25 transition-all duration-700 pointer-events-none ${
            mode === 'cooling' ? 'bg-cyan-400' : mode === 'heating' ? 'bg-amber-400' : 'bg-deepViolet'
          }`} />
        )}

        {/* Outer In-Wall Cabinet Bezel */}
        <div className="relative w-full rounded-2xl p-2 bg-gradient-to-b from-slate-300 via-slate-200 to-slate-400 shadow-neumorph-flat border border-slate-300/70">
          {/* Top Cabinet Header Band */}
          <div className="h-6 bg-slate-900 rounded-t-xl px-3 flex items-center justify-between border-b border-slate-800 text-[9px] font-semibold tracking-wider text-slate-300">
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${
                power ? 'bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse' : 'bg-slate-600'
              }`} />
              <span className="font-bold text-white tracking-widest text-[8.5px]">NO-TECH HVAC</span>
            </div>
            <span className="text-[7.5px] text-slate-400 uppercase tracking-widest font-mono">
              {power ? 'ONLINE' : 'STANDBY'}
            </span>
          </div>

          {/* Seamlessly Integrated 4 Modular Compartments */}
          <div className="space-y-1 pt-1">
            {compartments.map((comp) => {
              const isLedOn = power && comp.status === 'operational';
              const isOverdue = comp.status === 'attention';

              return (
                <div 
                  key={comp.id} 
                  onClick={() => handleCompartmentClick(comp)}
                  className={`relative rounded-xl py-2 px-3 cursor-pointer border transition-all duration-200 ${getFaceplateBg()} shadow-xs hover:shadow-md hover:scale-[1.01] active:scale-[0.99] group`}
                  title={`Inspect ${comp.name}`}
                >
                  {/* Top Row: Operational Status LED & Component Name */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isLedOn 
                            ? 'bg-emerald-400 shadow-[0_0_8px_#10B981]' 
                            : isOverdue 
                            ? 'bg-red-500 shadow-[0_0_8px_#EF4444] animate-ping' 
                            : 'bg-slate-400/50'
                        }`} 
                      />
                      <span className={`text-[10px] font-bold tracking-wider uppercase ${
                        faceplateColor === 'red' || faceplateColor === 'blue' ? 'text-white' : 'text-slate-800'
                      }`}>
                        {comp.shortName}
                      </span>
                    </div>

                    <ChevronRight className={`w-3 h-3 transition-transform group-hover:translate-x-0.5 ${
                      faceplateColor === 'red' || faceplateColor === 'blue' ? 'text-white/70' : 'text-slate-400'
                    }`} />
                  </div>

                  {/* Ergonomic Flush Pull Handle */}
                  <div className="w-full flex justify-center my-1">
                    <div className={`w-20 h-2.5 rounded-full flex items-center justify-center border ${getHandleColor()}`}>
                      <div className="w-9 h-0.5 rounded-full bg-black/20" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Air Intake Return Grille */}
          <div className="mt-1.5 pt-1 border-t border-slate-300/80 flex flex-col items-center">
            <div className="w-full h-2 rounded bg-slate-400/30 flex items-center justify-center px-2 gap-1 overflow-hidden">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="h-full w-0.5 bg-slate-400/80 rounded" />
              ))}
            </div>
            <span className="text-[7px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">
              Flush In-Wall Intake Grille
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
