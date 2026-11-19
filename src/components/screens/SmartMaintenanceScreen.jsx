import React from 'react';
import { useHVAC } from '../../context/HVACContext';
import {
  ShieldCheck,
  Wrench,
  Clock,
  RotateCw,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ArrowRight,
  Sparkles,
  Layers,
  History,
  Check
} from 'lucide-react';

export default function SmartMaintenanceScreen() {
  const {
    filterLife,
    daysUntilAdvance,
    seasonsRemaining,
    compartments,
    setReplacementModalCompartment,
    maintenanceHistory,
    systemHealth
  } = useHVAC();

  const filtrationComp = compartments.find(c => c.id === 'filtration') || compartments[3];

  return (
    <div className="flex-1 px-4 sm:px-5 py-3.5 sm:py-4 space-y-4 pb-8 sm:pb-10 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            Modular Lifecycle & Filtration
          </span>
          <h2 className="text-xl font-extrabold text-deepViolet tracking-tight">
            Smart Care
          </h2>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full neu-flat text-[11px] font-bold text-deepViolet">
          <ShieldCheck className="w-3.5 h-3.5 text-deepViolet" />
          <span>Care Active</span>
        </div>
      </div>

      {/* Featured Card: Continuous Auto-Dispense Filtration Mechanism */}
      {/* (Directly aligned with video: "Seasons of internally stored filter material are automatically dispensed") */}
      <div className="p-5 rounded-3xl neu-flat space-y-3 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-deepViolet text-white shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider">
                ● Auto-Dispensing Media
              </span>
              <h3 className="text-sm font-bold text-deepViolet">
                Continuous Filtration Roll
              </h3>
            </div>
          </div>

          <span className="text-2xl font-black text-deepViolet font-mono">
            {filterLife}%
          </span>
        </div>

        {/* Video capture thumbnail of the open filtration roll compartment */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-300 h-28 bg-black shadow-inner">
          <img
            src="/assets/crop_filtration.jpg"
            alt="Modular filtration dispenser"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5 text-white">
            <span className="text-[10px] text-white/90 font-medium">
              Internally stored media automatically advances to maintain peak airflow
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="w-full h-2.5 rounded-full neu-inset overflow-hidden">
            <div
              style={{ width: `${filterLife}%` }}
              className="h-full rounded-full bg-deepViolet shadow-glow-violet transition-all duration-700"
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-0.5">
            <span>Current Segment: Healthy</span>
            <span>{daysUntilAdvance} days to next advance</span>
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-0.5">
            <span className="text-[9px] text-slate-400 uppercase font-mono">Roll Lifespan</span>
            <p className="font-bold text-slate-800 flex items-center gap-1">
              <Clock className="w-3 h-3 text-deepViolet" />
              {seasonsRemaining} of 4 Seasons Left
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-0.5">
            <span className="text-[9px] text-slate-400 uppercase font-mono">Next Media Advance</span>
            <p className="font-bold text-deepViolet flex items-center gap-1">
              <Calendar className="w-3 h-3 text-deepViolet" />
              In {daysUntilAdvance} Days
            </p>
          </div>
        </div>

        {/* Replacement Action Button */}
        <button
          onClick={() => setReplacementModalCompartment(filtrationComp)}
          className="w-full py-2.5 rounded-xl bg-deepViolet text-white text-xs font-bold hover:bg-deepViolet-600 active:scale-98 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-deepViolet/20"
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Interactive Filter Swap Workflow</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Modular Compartments Defined Life Expectancy Tracker */}
      {/* ("From the time of installation, each compartment carries a defined life expectancy.") */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div>
            <h4 className="text-xs font-bold text-deepViolet uppercase tracking-wider">
              Modular Swap Cycles (4)
            </h4>
            <p className="text-[10px] text-slate-500">Scheduled replacement prevents failure</p>
          </div>
        </div>

        {compartments.map((comp) => {
          const isFilter = comp.id === 'filtration';
          const remainingText = isFilter
            ? `${comp.daysRemaining} days remaining`
            : `${comp.lifeMonths - comp.usedMonths} months remaining`;

          const progressPercent = isFilter
            ? Math.round((comp.daysRemaining / 90) * 100)
            : Math.round(((comp.lifeMonths - comp.usedMonths) / comp.lifeMonths) * 100);

          return (
            <div
              key={comp.id}
              className="p-3.5 rounded-2xl neu-flat space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10B981]" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{comp.name}</h5>
                    <span className="text-[10px] font-mono text-slate-500">
                      Slot #{comp.slot} • {comp.replacementCycle}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setReplacementModalCompartment(comp)}
                  className="px-2.5 py-1 rounded-xl neu-button text-[10px] font-bold text-deepViolet hover:bg-deepViolet hover:text-white transition-all"
                >
                  Swap Guide
                </button>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="w-full h-1.5 rounded-full neu-inset overflow-hidden">
                  <div
                    style={{ width: `${progressPercent}%` }}
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>Due: {comp.nextDue}</span>
                  <span className="font-semibold text-deepViolet">{remainingText}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Maintenance History Log */}
      <div className="p-4 rounded-3xl neu-flat space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-deepViolet" />
            <h4 className="text-xs font-bold text-deepViolet uppercase tracking-wider">
              Maintenance History
            </h4>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {maintenanceHistory.length} Recorded
          </span>
        </div>

        <div className="space-y-2">
          {maintenanceHistory.map((item) => (
            <div
              key={item.id}
              className="p-2.5 rounded-2xl bg-white border border-slate-200/80 text-[11px] space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">{item.title}</span>
                <span className="text-[9px] font-mono text-slate-400">{item.date}</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-snug">{item.notes}</p>
              <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono pt-0.5">
                <span>By: {item.technician}</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                  <Check className="w-3 h-3" /> {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
