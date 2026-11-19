import React from 'react';
import { useHVAC } from '../../context/HVACContext';
import { 
  Activity, 
  CheckCircle2, 
  RotateCw, 
  Radio, 
  ShieldCheck, 
  Wind, 
  Flame,
  Snowflake,
  ChevronRight,
  Server
} from 'lucide-react';

export default function SystemMonitoringScreen() {
  const { 
    systemHealth, 
    syncStatus, 
    lastSync, 
    triggerManualSync, 
    compartments, 
    setSelectedCompartment
  } = useHVAC();

  const getCompartmentIcon = (id) => {
    switch (id) {
      case 'heating':
        return Flame;
      case 'evaporator':
        return Snowflake;
      case 'blower':
        return Wind;
      case 'filter':
      default:
        return ShieldCheck;
    }
  };

  return (
    <div className="flex-1 px-4 sm:px-5 py-3.5 sm:py-4 space-y-3.5 sm:space-y-4 pb-8 sm:pb-10 animate-in fade-in duration-300">
      {/* Title & Live Status */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            Diagnostics & Hardware Bus
          </span>
          <h2 className="text-xl font-extrabold text-deepViolet tracking-tight">
            System Monitoring
          </h2>
        </div>

        {/* Manual Re-sync button */}
        <button
          onClick={triggerManualSync}
          disabled={syncStatus === 'syncing'}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl neu-button text-deepViolet text-xs font-bold hover:bg-polar-100 active:scale-95 transition-all"
          title="Query Rear Electrical Bus"
        >
          <RotateCw className={`w-3.5 h-3.5 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
          <span>{syncStatus === 'syncing' ? 'Querying...' : 'Re-Sync'}</span>
        </button>
      </div>

      {/* Primary Health & Bus Telemetry Card */}
      <div className="p-4 rounded-3xl neu-flat space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-deepViolet text-white shadow-xs">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Overall System Health
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-deepViolet font-mono">
                  {systemHealth}%
                </span>
                <span className="text-xs font-bold text-emerald-600">
                  • Optimal Condition
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Bus Sync</span>
            <p className="text-xs font-bold text-emerald-600 flex items-center justify-end gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> 4/4 Docked
            </p>
          </div>
        </div>

        {/* Electrical Connection Bus Status Details */}
        <div className="p-2.5 rounded-2xl bg-polar-200/90 border border-polar-300 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-deepViolet" />
            <div>
              <p className="font-bold text-slate-800 text-[11px]">Prong Interlock Bus</p>
              <p className="text-[10px] text-slate-500">Last synchronized: {lastSync}</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono">
            SYNCED (240V)
          </span>
        </div>
      </div>

      {/* Modular Compartments (Clean, Refined, Uncluttered) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-deepViolet uppercase tracking-wider">
            Modular Compartments
          </span>
          <span className="text-[10px] text-slate-400 font-medium">
            Tap to inspect
          </span>
        </div>

        <div className="space-y-2">
          {compartments.map((comp) => {
            const isOperational = comp.status === 'operational';
            const Icon = getCompartmentIcon(comp.id);

            return (
              <div
                key={comp.id}
                onClick={() => setSelectedCompartment(comp)}
                className="p-3 sm:p-3.5 rounded-2xl neu-flat hover:border-deepViolet/30 active:scale-[0.99] cursor-pointer transition-all duration-200 flex items-center justify-between gap-3 group"
              >
                {/* Left: Minimal Icon & Clean Name */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-polar-200 border border-polar-300/80 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform text-deepViolet">
                    <Icon className="w-4 h-4 stroke-[2]" />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-deepViolet transition-colors truncate">
                      {comp.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-medium truncate">
                      {isOperational ? 'Docked & Synchronized' : 'Attention Required'}
                    </p>
                  </div>
                </div>

                {/* Right: Clean Status Pill & Arrow */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isOperational 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80' 
                      : 'bg-rose-50 text-rose-700 border border-rose-200/80'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      isOperational ? 'bg-emerald-500' : 'bg-rose-500'
                    }`} />
                    <span>{isOperational ? 'Optimal' : 'Service'}</span>
                  </span>

                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-deepViolet group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* In-Wall Cabinet Specifications */}
      <div className="p-4 rounded-3xl neu-flat space-y-2.5">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-deepViolet" />
          <h4 className="text-xs font-bold text-deepViolet uppercase tracking-wider">
            Cabinet Specifications
          </h4>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-2.5 rounded-xl bg-polar-200/70 border border-polar-300/60">
            <span className="text-[9px] text-slate-400 uppercase font-mono block">Form Factor</span>
            <p className="font-bold text-slate-800">In-Wall Flush Mount</p>
          </div>
          <div className="p-2.5 rounded-xl bg-polar-200/70 border border-polar-300/60">
            <span className="text-[9px] text-slate-400 uppercase font-mono block">Stud Fit</span>
            <p className="font-bold text-slate-800">Standard 16" Center</p>
          </div>
          <div className="p-2.5 rounded-xl bg-polar-200/70 border border-polar-300/60">
            <span className="text-[9px] text-slate-400 uppercase font-mono block">Dimensions</span>
            <p className="font-bold text-slate-800">14.5" W × 48" H</p>
          </div>
          <div className="p-2.5 rounded-xl bg-polar-200/70 border border-polar-300/60">
            <span className="text-[9px] text-slate-400 uppercase font-mono block">Bus Interface</span>
            <p className="font-bold text-slate-800">Quick Prong 240V</p>
          </div>
        </div>
      </div>
    </div>
  );
}
