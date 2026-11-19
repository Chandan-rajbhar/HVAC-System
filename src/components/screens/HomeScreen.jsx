import React from 'react';
import { useHVAC } from '../../context/HVACContext';
import {
  Plus,
  Minus,
  Flame,
  Snowflake,
  Wind,
  ShieldCheck,
  Zap,
  Calendar,
  Thermometer,
  Home,
  Power,
  ChevronRight,
  TrendingDown,
  Layers,
  Leaf,
  Droplets,
  Sun
} from 'lucide-react';

export default function HomeScreen() {
  const {
    power,
    togglePower,
    currentTemp,
    targetTemp,
    formatTemp,
    adjustTargetTemp,
    mode,
    setMode,
    systemHealth,
    daysUntilAdvance,
    setCurrentScreen,
    compartments,
    setSelectedCompartment,
    userProfile,
    tempUnit
  } = useHVAC();

  const minTemp = tempUnit === 'C' ? 16 : 60;
  const maxTemp = tempUnit === 'C' ? 30 : 85;
  const numericTarget = tempUnit === 'C' ? Math.round(((targetTemp - 32) * 5) / 9) : Math.round(targetTemp);
  const targetPercent = Math.max(0, Math.min(100, ((numericTarget - minTemp) / (maxTemp - minTemp)) * 100));

  // Semicircular Arc Gauge Geometry (180 degrees) - Enlarged for clearer visibility
  const radius = 50;
  const arcLength = Math.PI * radius;
  const strokeOffset = arcLength - (arcLength * targetPercent) / 100;

  // Thumb position along 180° arc (from 180° on left to 0° on right)
  const thumbAngleRad = Math.PI * (1 - targetPercent / 100);
  const gaugeCx = 65;
  const gaugeCy = 62;
  const thumbX = gaugeCx + radius * Math.cos(thumbAngleRad);
  const thumbY = gaugeCy - radius * Math.sin(thumbAngleRad);

  const getModeInfo = () => {
    switch (mode) {
      case 'heating':
        return {
          label: 'Heat Mode',
          subLabel: 'Warming Active',
          icon: Flame,
          color: 'text-amber-600',
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/20',
          gradStart: '#F59E0B',
          gradMid: '#F97316',
          gradEnd: '#EF4444',
          thumbColor: '#EA580C',
          glowBg: 'bg-amber-400/15',
        };
      case 'fan':
        return {
          label: 'Fan Mode',
          subLabel: 'Circulation',
          icon: Wind,
          color: 'text-sky-600',
          bg: 'bg-sky-500/10',
          border: 'border-sky-500/20',
          gradStart: '#38BDF8',
          gradMid: '#0EA5E9',
          gradEnd: '#06B6D4',
          thumbColor: '#0284C7',
          glowBg: 'bg-sky-400/15',
        };
      case 'auto':
        return {
          label: 'Auto Comfort',
          subLabel: 'Adaptive Balance',
          icon: Leaf,
          color: 'text-emerald-600',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20',
          gradStart: '#10B981',
          gradMid: '#06B6D4',
          gradEnd: '#3B82F6',
          thumbColor: '#059669',
          glowBg: 'bg-emerald-400/15',
        };
      case 'cooling':
      default:
        return {
          label: 'Comfort Mode',
          subLabel: 'Cooling Active',
          icon: Snowflake,
          color: 'text-cyan-600',
          bg: 'bg-cyan-500/10',
          border: 'border-cyan-500/20',
          gradStart: '#06B6D4',
          gradMid: '#3B82F6',
          gradEnd: '#6366F1',
          thumbColor: '#0284C7',
          glowBg: 'bg-cyan-400/15',
        };
    }
  };
  const modeInfo = getModeInfo();
  const ModeIcon = modeInfo.icon;

  return (
    <div className="flex-1 px-4 sm:px-5 pt-2 pb-6 space-y-2.5 animate-in fade-in duration-300">
      {/* 1. Hero Greeting - Name Below Good Morning */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-500 leading-tight">Good morning,</span>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight mt-0.5">
            {userProfile?.name || 'Jordan Smith'}
          </h2>
        </div>

        {/* Outdoor Weather Quick Pill */}
        <div
          onClick={() => setCurrentScreen('climate')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white border border-slate-200/80 shadow-xs text-slate-700 cursor-pointer active:scale-95 transition-all"
          title="View Climate"
        >
          <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span className="text-xs font-black text-slate-800 font-mono leading-none">
            {formatTemp(79)}
          </span>
          <span className="text-[10px] font-semibold text-slate-400">Outside</span>
        </div>
      </div>

      {/* 2. Main Temperature Control Card - Redesigned Modern UI */}
      <div className={`p-4 sm:p-4.5 rounded-3xl neu-flat border border-white/80 space-y-3 relative overflow-hidden transition-all duration-300 shadow-sm ${power ? 'opacity-100' : 'opacity-60'
        }`}>
        {/* Ambient Atmospheric Mode Glow */}
        {power && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            <div className={`absolute -top-10 -right-10 w-44 h-44 rounded-full blur-2xl transition-colors duration-500 ${modeInfo.glowBg}`} />
            <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full blur-2xl bg-deepViolet/5" />
          </div>
        )}

        {/* Top Header Row: Live Status Pill & Interactive Mode Badge */}
        <div className="relative z-10 flex items-center justify-between">
          {/* Status Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-[10px] font-bold shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${power ? 'bg-emerald-400' : 'bg-slate-400'} opacity-75`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${power ? 'bg-emerald-500' : 'bg-slate-400'}`} />
            </span>
            <span>{power ? 'Connected' : 'System Standby'}</span>
          </div>

          {/* Mode Pill / Quick Action */}
          <button
            onClick={() => setCurrentScreen('climate')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 hover:bg-slate-100/90 border border-slate-200/90 text-slate-700 hover:text-deepViolet shadow-xs transition-all text-[10.5px] font-bold group cursor-pointer active:scale-95"
            title="Open Climate Controls"
          >
            <ModeIcon className={`w-3.5 h-3.5 ${modeInfo.color} ${power ? (mode === 'fan' ? 'animate-spin' : 'animate-pulse') : ''}`} style={mode === 'fan' ? { animationDuration: '4s' } : undefined} />
            <span>{modeInfo.label}</span>
            <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Center Section: Indoor Climate & Interactive Target Arc Dial */}
        <div className="relative z-10 flex items-center justify-between gap-2 pt-0.5">
          {/* Left: Indoor Temperature Display */}
          <div className="flex-1 flex flex-col justify-between py-0.5 pr-1">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-deepViolet/12 to-indigo-100/70 border border-deepViolet/15 flex items-center justify-center text-deepViolet shadow-xs shrink-0">
                <Thermometer className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-800 font-mono tracking-tight leading-none">
                  {formatTemp(currentTemp)}
                </div>
                <span className="text-[10px] font-semibold text-slate-400 block mt-1 tracking-tight">
                  Indoor Temperature
                </span>
              </div>
            </div>

            {/* Micro Ambient Status Badges */}
            <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-200/70">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-sky-50/90 text-sky-700 border border-sky-100 text-[9.5px] font-bold">
                <Droplets className="w-3 h-3 text-sky-500 shrink-0" />
                <span>46% Humidity</span>
              </div>
            </div>
          </div>

          {/* Center Subtle Divider */}
          <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-slate-200 to-transparent shrink-0 mx-0.5" />

          {/* Right: Semicircular Target Gauge & Ergonomic Steppers - Enlarged */}
          <div className="flex-1 flex flex-col items-center justify-center pl-1 sm:pl-2">
            <div className="relative w-36 sm:w-40 h-22 sm:h-24 flex items-center justify-center">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 130 72">
                <defs>
                  <linearGradient id="homeTempGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={modeInfo.gradStart} />
                    <stop offset="60%" stopColor={modeInfo.gradMid} />
                    <stop offset="100%" stopColor={modeInfo.gradEnd} />
                  </linearGradient>
                </defs>

                {/* Background 180° Track */}
                <path
                  d="M 15,62 A 50,50 0 0,1 115,62"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="8.5"
                  strokeLinecap="round"
                />

                {/* Active Progress Arc */}
                <path
                  d="M 15,62 A 50,50 0 0,1 115,62"
                  fill="none"
                  stroke="url(#homeTempGrad)"
                  strokeWidth="8.5"
                  strokeDasharray={`${arcLength}`}
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                  className="transition-all duration-300 ease-out"
                />

                {/* Indicator Thumb Pip on Arc */}
                {power && (
                  <circle
                    cx={thumbX}
                    cy={thumbY}
                    r="5.5"
                    fill="#FFFFFF"
                    stroke={modeInfo.thumbColor}
                    strokeWidth="3"
                    className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.28)] transition-all duration-300"
                  />
                )}
              </svg>

              {/* Target Temp Readout with generous padding from the rounded arc */}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-1 sm:pb-1.5 text-center pointer-events-none">
                <span className="text-2xl sm:text-3xl font-black text-slate-800 font-mono tracking-tight leading-none">
                  {formatTemp(targetTemp)}
                </span>
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mt-0.5">
                  Target
                </span>
              </div>
            </div>

            {/* Ergonomic Floating Stepper Buttons - Enlarged */}
            <div className="flex items-center justify-center gap-3.5 mt-1.5 z-10">
              <button
                onClick={() => adjustTargetTemp(-1)}
                disabled={!power}
                className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full neu-button flex items-center justify-center text-slate-600 hover:text-deepViolet active:scale-90 transition-all disabled:opacity-40 cursor-pointer shadow-xs hover:shadow-md"
                aria-label="Decrease target temperature"
              >
                <Minus className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                onClick={() => adjustTargetTemp(1)}
                disabled={!power}
                className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full neu-button flex items-center justify-center text-slate-600 hover:text-deepViolet active:scale-90 transition-all disabled:opacity-40 cursor-pointer shadow-xs hover:shadow-md"
                aria-label="Increase target temperature"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Quick Action Modes Row (Power, Cool, Heat, Fan) */}
      <div className="grid grid-cols-4 gap-2">
        {/* Power Toggle Button */}
        <button
          onClick={togglePower}
          className={`py-2.5 px-2 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-200 border ${power
            ? 'bg-deepViolet text-white border-deepViolet shadow-md'
            : 'neu-button text-slate-600 border-transparent hover:text-deepViolet'
            }`}
        >
          <Power className="w-4 h-4 stroke-[2.2]" />
          <span className="text-[10px] font-bold">{power ? 'Turn Off' : 'Turn On'}</span>
        </button>

        {/* Cool Button */}
        <button
          onClick={() => power && setMode('cooling')}
          disabled={!power}
          className={`py-2.5 px-2 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-200 border ${mode === 'cooling' && power
            ? 'bg-deepViolet text-white border-deepViolet shadow-md font-bold'
            : 'bg-white/90 border-slate-200/90 text-slate-600 hover:text-deepViolet font-semibold'
            } disabled:opacity-40`}
        >
          <Snowflake className="w-4 h-4 text-cyan-500" />
          <span className="text-[10px]">Cool</span>
        </button>

        {/* Heat Button */}
        <button
          onClick={() => power && setMode('heating')}
          disabled={!power}
          className={`py-2.5 px-2 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-200 border ${mode === 'heating' && power
            ? 'bg-deepViolet text-white border-deepViolet shadow-md font-bold'
            : 'bg-white/90 border-slate-200/90 text-slate-600 hover:text-deepViolet font-semibold'
            } disabled:opacity-40`}
        >
          <Flame className="w-4 h-4 text-amber-500" />
          <span className="text-[10px]">Heat</span>
        </button>

        {/* Fan Button */}
        <button
          onClick={() => power && setMode('fan')}
          disabled={!power}
          className={`py-2.5 px-2 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-200 border ${mode === 'fan' && power
            ? 'bg-deepViolet text-white border-deepViolet shadow-md font-bold'
            : 'bg-white/90 border-slate-200/90 text-slate-600 hover:text-deepViolet font-semibold'
            } disabled:opacity-40`}
        >
          <Wind className="w-4 h-4 text-sky-500" />
          <span className="text-[10px]">Fan</span>
        </button>
      </div>

      {/* 4. Two-Column Stats Row: System Health & Energy Usage */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Left: System Health Card */}
        <div
          onClick={() => setCurrentScreen('system')}
          className="p-3.5 rounded-3xl neu-flat cursor-pointer hover:border-deepViolet/40 transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-800">System Health</span>
            </div>
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-bold">
              Healthy
            </span>
          </div>

          {/* Semicircular Gauge (180 deg) */}
          <div className="relative w-full h-16 flex items-center justify-center my-1">
            <svg className="w-28 h-16" viewBox="0 0 100 55">
              <path
                d="M 12,50 A 38,38 0 0,1 88,50"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M 12,50 A 38,38 0 0,1 88,50"
                fill="none"
                stroke="#10B981"
                strokeWidth="7"
                strokeDasharray={`${Math.PI * 38}`}
                strokeDashoffset={`${Math.PI * 38 * (1 - (systemHealth / 100))}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 top-3 flex flex-col items-center justify-center text-center">
              <span className="text-base font-black text-slate-800 font-mono leading-none">
                {systemHealth}%
              </span>
              <span className="text-[8.5px] font-semibold text-slate-400 mt-0.5">
                Overall Status
              </span>
            </div>
          </div>
        </div>

        {/* Right: Energy Usage Card */}
        <div
          onClick={() => setCurrentScreen('energy')}
          className="p-3.5 rounded-3xl neu-flat cursor-pointer hover:border-deepViolet/40 transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-sky-500 fill-sky-400/20" />
              <span className="text-xs font-bold text-slate-800">Energy Usage</span>
            </div>
            <span className="px-1.5 py-0.5 rounded-full bg-polar-300 text-deepViolet text-[9px] font-bold">
              Today ▾
            </span>
          </div>

          {/* Value + Mini Chart */}
          <div className="flex items-end justify-between mt-1">
            <div>
              <div className="text-xl font-black text-slate-800 font-mono leading-tight">
                4.8 <span className="text-[11px] font-bold text-slate-400 font-sans">kWh</span>
              </div>
              <div className="flex items-center gap-0.5 text-[9.5px] font-bold text-emerald-600 mt-0.5">
                <TrendingDown className="w-3 h-3 stroke-[2.5]" />
                <span>12% vs yesterday</span>
              </div>
            </div>

            {/* Mini Gradient Bar Chart */}
            <div className="flex items-end gap-1 h-11 pb-0.5">
              <div className="w-1.5 h-4 bg-sky-300/60 rounded-t-sm" />
              <div className="w-1.5 h-6 bg-sky-400/70 rounded-t-sm" />
              <div className="w-1.5 h-5 bg-sky-400/80 rounded-t-sm" />
              <div className="w-1.5 h-8 bg-sky-500 rounded-t-sm" />
              <div className="w-1.5 h-10 bg-deepViolet rounded-t-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Component Status Card - Full Width */}
      <div className="p-3.5 rounded-3xl neu-flat flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-deepViolet" />
            <span className="text-xs font-bold text-slate-800">Component Status</span>
          </div>
          <button
            onClick={() => setCurrentScreen('more')}
            className="text-[9.5px] font-bold text-deepViolet hover:underline"
          >
            View All →
          </button>
        </div>

        {/* 4 In-Wall Compartment Rows */}
        <div className="space-y-1.5">
          {[
            { id: 'heating', name: 'Heating Compartment', icon: Flame, iconColor: 'text-amber-500', status: 'Normal' },
            { id: 'evaporator', name: 'Evaporator Coil', icon: Snowflake, iconColor: 'text-cyan-500', status: 'Normal' },
            { id: 'blower', name: 'Blower Compartment', icon: Wind, iconColor: 'text-sky-500', status: 'Normal' },
            { id: 'filtration', name: 'Filter System', icon: ShieldCheck, iconColor: 'text-deepViolet', status: 'Good' },
          ].map((comp) => {
            const Icon = comp.icon;
            const matchingComp = compartments.find(c => c.id === comp.id);

            return (
              <div
                key={comp.id}
                onClick={() => matchingComp && setSelectedCompartment(matchingComp)}
                className="flex items-center justify-between p-1 rounded-lg hover:bg-polar-300/40 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${comp.iconColor}`} />
                  <span className="text-[10px] font-medium text-slate-700 truncate">
                    {comp.name}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-600 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{comp.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Maintenance & Filter Care Section - Moved Down Below */}
      <div className="space-y-2">
        {/* Card 1: Maintenance Notice */}
        <div
          onClick={() => setCurrentScreen('care')}
          className="p-2.5 sm:p-3 rounded-2xl neu-flat cursor-pointer hover:border-deepViolet/40 transition-all flex items-center justify-between gap-3 group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shrink-0 group-hover:scale-105 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Maintenance</span>
              </div>
              <p className="text-xs font-black text-slate-800 tracking-tight">
                Next Filter Check in <span className="text-amber-600 font-extrabold">{daysUntilAdvance} days</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50/90 border border-amber-200/80 text-amber-800 text-[10px] font-bold shrink-0">
            <span>Details</span>
            <ChevronRight className="w-3 h-3 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Card 2: Filter System Care Promo */}
        <div
          onClick={() => setCurrentScreen('care')}
          className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-br from-sky-50 via-polar-100 to-indigo-50/60 border border-slate-200/80 cursor-pointer hover:border-deepViolet/40 transition-all flex items-center justify-between gap-3 group shadow-xs"
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Filter Cassette Thumbnail with Leaf */}
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white p-0.5 flex items-center justify-center shrink-0 border border-slate-200 shadow-xs group-hover:scale-105 transition-transform">
              <img
                src="/assets/crop_filtration.jpg"
                alt="Filter Cartridge"
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <Leaf className="w-2.5 h-2.5 text-emerald-600 absolute -top-1 -right-1 drop-shadow-xs" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800 leading-tight">
                Keep your system running at its best.
              </p>
              <span className="text-[10px] font-bold text-deepViolet hover:underline inline-flex items-center gap-0.5 mt-0.5">
                View Details →
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
        </div>
      </div>
    </div>
  );
}
