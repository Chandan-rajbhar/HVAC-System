import React from 'react';
import { useHVAC } from '../../context/HVACContext';
import { 
  X, 
  ShieldCheck, 
  Zap, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  Layers,
  ArrowRight
} from 'lucide-react';

export default function CompartmentDetailModal() {
  const { 
    selectedCompartment, 
    setSelectedCompartment, 
    setReplacementModalCompartment,
    power
  } = useHVAC();

  if (!selectedCompartment) return null;

  const comp = selectedCompartment;
  const isOperational = comp.status === 'operational';

  const handleStartReplacement = () => {
    setSelectedCompartment(null);
    setReplacementModalCompartment(comp);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-3.5 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-[350px] max-h-[82%] bg-polar-100 rounded-3xl shadow-2xl border border-white/90 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-4 px-5 bg-polar-200 border-b border-polar-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
            <div>
              <h3 className="text-sm font-bold text-deepViolet">{comp.name}</h3>
              <p className="text-[10px] text-slate-500 font-mono">Compartment #{comp.slot} • {comp.position}</p>
            </div>
          </div>

          <button
            onClick={() => setSelectedCompartment(null)}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
          {/* Authentic Video Capture Image */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-300 shadow-sm bg-black h-40">
            <img 
              src={comp.image} 
              alt={comp.name} 
              className="w-full h-full object-cover object-center" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 text-white">
              <div className="flex items-center justify-between w-full">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400">
                    Modular Slide Cassette
                  </span>
                  <p className="text-xs font-bold text-white">{comp.shortName}</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-emerald-500/90 text-white flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" /> Synced
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-3 rounded-2xl neu-flat space-y-1">
            <span className="text-[10px] font-bold text-deepViolet uppercase tracking-wider">Product Overview</span>
            <p className="text-xs text-slate-700 leading-relaxed">
              {comp.description}
            </p>
          </div>

          {/* Technical Specifications Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] space-y-0.5">
              <span className="text-[9px] text-slate-400 uppercase font-mono">Hardware Spec</span>
              <p className="font-bold text-slate-800">{comp.spec}</p>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] space-y-0.5">
              <span className="text-[9px] text-slate-400 uppercase font-mono">Defined Lifespan</span>
              <p className="font-bold text-slate-800">
                {comp.id === 'filtration' ? '90 Days / 4 Seasons' : `${comp.lifeMonths} Months`}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] space-y-0.5">
              <span className="text-[9px] text-slate-400 uppercase font-mono">Last Serviced</span>
              <p className="font-bold text-slate-800">{comp.lastService}</p>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] space-y-0.5">
              <span className="text-[9px] text-slate-400 uppercase font-mono">Next Swap Due</span>
              <p className="font-bold text-deepViolet">{comp.nextDue}</p>
            </div>
          </div>

          {/* Rear Electrical Prong Highlights */}
          <div className="p-3 rounded-2xl bg-deepViolet-50 border border-deepViolet-200 space-y-1">
            <div className="flex items-center gap-1.5 text-deepViolet font-bold text-xs">
              <Zap className="w-3.5 h-3.5 text-deepViolet" />
              <span>Rear Electrical Prong Connection</span>
            </div>
            <p className="text-[11px] text-deepViolet-900 leading-relaxed">
              {comp.electricalProngs}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-polar-200 border-t border-polar-300 flex items-center gap-2">
          <button
            onClick={() => setSelectedCompartment(null)}
            className="flex-1 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-all"
          >
            Close
          </button>
          <button
            onClick={handleStartReplacement}
            className="flex-1 py-2.5 rounded-xl bg-deepViolet text-white text-xs font-bold hover:bg-deepViolet-600 active:scale-98 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-deepViolet/20"
          >
            <span>Replace Module</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
