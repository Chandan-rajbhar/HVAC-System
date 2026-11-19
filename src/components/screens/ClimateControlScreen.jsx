import React, { useState } from 'react';
import { useHVAC } from '../../context/HVACContext';
import { 
  Plus, 
  Minus, 
  Flame, 
  Snowflake, 
  Wind, 
  Disc, 
  Check, 
  Loader2, 
  ArrowLeft,
  ChevronDown,
  CheckCircle2,
  MoveVertical,
  Power
} from 'lucide-react';

export default function ClimateControlScreen() {
  const {
    power,
    togglePower,
    currentTemp,
    targetTemp,
    adjustTargetTemp,
    tempUnit,
    toggleTempUnit,
    formatTemp,
    getNumericTemp,
    mode,
    setMode,
    fanSpeed,
    setFanSpeed,
    swingMode,
    setSwingMode,
    setCurrentScreen,
    previousScreen,
    lastSync
  } = useHVAC();

  const [applyState, setApplyState] = useState('idle'); // 'idle' | 'loading' | 'success'
  const [fanDropdownOpen, setFanDropdownOpen] = useState(false);

  const minTemp = tempUnit === 'C' ? 16 : 60;
  const maxTemp = tempUnit === 'C' ? 30 : 85;
  const numericTarget = getNumericTemp(targetTemp);
  const targetPercent = Math.max(0, Math.min(100, ((numericTarget - minTemp) / (maxTemp - minTemp)) * 100));

  const modes = [
    { id: 'cooling', label: 'Cool', icon: Snowflake },
    { id: 'heating', label: 'Heat', icon: Flame },
    { id: 'fan', label: 'Fan', icon: Wind },
    { id: 'auto', label: 'Auto', icon: Disc },
  ];

  const fanSpeedOptions = [
    { id: 'auto', label: 'Auto' },
    { id: 'low', label: 'Low' },
    { id: 'med', label: 'Medium' },
    { id: 'high', label: 'High' },
    { id: 'turbo', label: 'Turbo' },
  ];

  const handleApplySettings = () => {
    setApplyState('loading');
    setTimeout(() => {
      setApplyState('success');
      setTimeout(() => {
        setApplyState('idle');
      }, 2500);
    }, 900);
  };

  // SVG Dial Geometry (240 degree arc)
  const radius = 88;
  const stroke = 12;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * (240 / 360);
  const strokeDashoffset = arcLength - (arcLength * targetPercent) / 100;
  // Rotation angle for thumb
  const angle = 150 + (targetPercent * 240) / 100;
  const thumbRad = (angle * Math.PI) / 180;
  const cx = 110;
  const cy = 110;
  const thumbX = cx + radius * Math.cos(thumbRad);
  const thumbY = cy + radius * Math.sin(thumbRad);

  const getModeIcon = () => {
    switch (mode) {
      case 'heating':
        return <Flame className="w-6 h-6 text-amber-500 animate-pulse" />;
      case 'fan':
        return <Wind className="w-6 h-6 text-sky-500 animate-spin" style={{ animationDuration: '4s' }} />;
      case 'auto':
        return <Disc className="w-6 h-6 text-deepViolet animate-spin" style={{ animationDuration: '8s' }} />;
      case 'cooling':
      default:
        return <Snowflake className="w-6 h-6 text-cyan-500" />;
    }
  };

  return (
    <div className="flex-1 px-4 sm:px-5 py-3.5 space-y-3.5 pb-10 animate-in fade-in duration-300">
      {/* 1. Header Bar with Back Button, Title & Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentScreen(previousScreen && previousScreen !== 'control' ? previousScreen : 'home')}
            className="p-1.5 rounded-xl neu-button text-deepViolet hover:text-deepViolet-800 active:scale-95 transition-all"
            title="Go back"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
          <div>
            <h2 className="text-lg font-extrabold text-deepViolet tracking-tight leading-tight">
              System Control
            </h2>
            <p className="text-[10px] text-slate-500 font-medium">
              Adjust your HVAC settings
            </p>
          </div>
        </div>

        {/* System Connected Badge & Unit Switch */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold shadow-xs">
            <span className={`w-1.5 h-1.5 rounded-full ${power ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
            <span>{power ? 'Connected' : 'Standby'}</span>
          </div>

          <button
            onClick={toggleTempUnit}
            className="px-2 py-1 rounded-xl neu-button text-deepViolet text-[10.5px] font-bold font-mono hover:text-deepViolet-800"
            title="Switch °F / °C"
          >
            °{tempUnit}
          </button>
        </div>
      </div>

      {/* 2. Premium Circular Temperature Adjustment Dial */}
      <div className={`p-5 rounded-3xl neu-flat flex flex-col items-center relative overflow-hidden transition-opacity duration-300 ${
        power ? 'opacity-100' : 'opacity-50'
      }`}>
        {/* Subtle ambient colored glow based on active mode */}
        <div className={`absolute w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-700 ${
          mode === 'cooling' ? 'bg-cyan-400' : mode === 'heating' ? 'bg-amber-400' : 'bg-deepViolet'
        }`} />

        {/* Circular SVG Gauge */}
        <div className="relative w-[220px] h-[200px] flex items-center justify-center">
          <svg className="w-full h-full transform" viewBox="0 0 220 220">
            <defs>
              <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="85%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
            </defs>

            {/* Background Track Arc (240 deg) */}
            <circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth={stroke}
              strokeDasharray={`${arcLength} ${circumference}`}
              strokeLinecap="round"
              transform="rotate(150 110 110)"
            />

            {/* Active Progress Arc */}
            <circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke="url(#tempGradient)"
              strokeWidth={stroke}
              strokeDasharray={`${arcLength} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(150 110 110)"
              className="transition-all duration-300 ease-out"
            />

            {/* Glowing Indicator Thumb */}
            <circle
              cx={thumbX}
              cy={thumbY}
              r="8"
              fill="#FFFFFF"
              stroke="#241A6E"
              strokeWidth="3.5"
              className="drop-shadow-md transition-all duration-300 ease-out"
            />
          </svg>

          {/* Central Elevated White Disc */}
          <div className="absolute w-36 h-36 rounded-full bg-white shadow-neumorph-flat border border-slate-100 flex flex-col items-center justify-center p-3 text-center">
            {/* Mode Icon */}
            <div className="mb-0.5">
              {getModeIcon()}
            </div>

            {/* Target Temp */}
            <div className="text-3xl font-black text-slate-800 font-mono tracking-tight leading-none">
              {formatTemp(targetTemp)}
            </div>

            {/* Current Indoor Temp Comparison */}
            <span className="text-[10px] font-semibold text-slate-400 mt-1">
              Current: {formatTemp(currentTemp)}
            </span>
          </div>
        </div>

        {/* Floating Minus and Plus Stepper Buttons */}
        <div className="flex items-center gap-6 mt-1">
          <button
            onClick={() => adjustTargetTemp(-1)}
            disabled={!power}
            className="w-10 h-10 rounded-2xl neu-button flex items-center justify-center text-slate-700 hover:text-deepViolet active:scale-95 transition-all disabled:opacity-40 shadow-sm"
            aria-label="Decrease target temperature"
          >
            <Minus className="w-5 h-5 stroke-[2.5]" />
          </button>

          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Target Temp
          </span>

          <button
            onClick={() => adjustTargetTemp(1)}
            disabled={!power}
            className="w-10 h-10 rounded-2xl neu-button flex items-center justify-center text-slate-700 hover:text-deepViolet active:scale-95 transition-all disabled:opacity-40 shadow-sm"
            aria-label="Increase target temperature"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 3. HVAC Operating Modes (Cool, Heat, Fan, Auto) */}
      <div className="grid grid-cols-4 gap-2">
        {modes.map((m) => {
          const Icon = m.icon;
          const isSelected = mode === m.id;

          return (
            <button
              key={m.id}
              onClick={() => power && setMode(m.id)}
              disabled={!power}
              className={`py-3 px-2 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-200 border ${
                isSelected
                  ? 'bg-deepViolet text-white border-deepViolet shadow-md scale-102 font-bold'
                  : 'bg-white/80 border-slate-200/90 text-slate-600 hover:text-deepViolet hover:bg-white font-semibold'
              } disabled:opacity-40`}
            >
              <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
              <span className="text-[11px]">{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Additional Controls Card (Fan Speed, Swing Mode, Apply Settings) */}
      <div className="p-4 rounded-3xl neu-flat space-y-3.5">
        {/* Fan Speed Row */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-deepViolet/10 text-deepViolet">
              <Wind className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Fan Speed</h4>
              <p className="text-[10px] text-slate-400">Quad brushless DC blower</p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setFanDropdownOpen(prev => !prev)}
              disabled={!power}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-polar-200 border border-polar-300 text-deepViolet text-xs font-bold capitalize hover:bg-polar-300 transition-all disabled:opacity-40"
            >
              <span>{fanSpeed}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {fanDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-32 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-30 animate-in fade-in zoom-in-95">
                {fanSpeedOptions.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setFanSpeed(opt.id);
                      setFanDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-polar-200 ${
                      fanSpeed === opt.id ? 'font-bold text-deepViolet bg-deepViolet/5' : 'text-slate-700'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {fanSpeed === opt.id && <Check className="w-3.5 h-3.5 text-deepViolet" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Swing Mode Row */}
        <div className="relative flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-deepViolet/10 text-deepViolet">
              <MoveVertical className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Swing Mode</h4>
              <p className="text-[10px] text-slate-400">Motorized louver oscillation</p>
            </div>
          </div>

          <button
            onClick={() => setSwingMode(prev => prev === 'on' ? 'off' : 'on')}
            disabled={!power}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              swingMode === 'on'
                ? 'bg-deepViolet text-white border-deepViolet shadow-xs'
                : 'bg-polar-200 text-slate-600 border-polar-300 hover:bg-polar-300'
            } disabled:opacity-40`}
          >
            {swingMode === 'on' ? 'On' : 'Off'}
          </button>
        </div>

        {/* Master Power Toggle Button Row */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${power ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
              <Power className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">System Power</h4>
              <p className="text-[10px] text-slate-400">{power ? 'Inverter running' : 'System idle'}</p>
            </div>
          </div>

          <button
            onClick={togglePower}
            className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
              power
                ? 'bg-deepViolet text-white shadow-xs'
                : 'neu-button text-slate-600'
            }`}
          >
            {power ? 'Turn Off' : 'Turn On'}
          </button>
        </div>

        {/* Primary Apply Settings Button */}
        <div className="pt-2">
          <button
            onClick={handleApplySettings}
            disabled={applyState === 'loading' || !power}
            className={`w-full py-3 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 ${
              applyState === 'success'
                ? 'bg-emerald-600 text-white shadow-glow-green'
                : 'bg-deepViolet text-white hover:bg-deepViolet-800'
            } disabled:opacity-50`}
          >
            {applyState === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
            {applyState === 'success' && <Check className="w-4 h-4 stroke-[3]" />}
            {applyState === 'idle' && <Check className="w-4 h-4 stroke-[2.5]" />}
            <span>
              {applyState === 'loading' 
                ? 'Applying to System Bus...' 
                : applyState === 'success' 
                  ? 'Settings Applied!' 
                  : 'Apply Settings'}
            </span>
          </button>
        </div>
      </div>

      {/* 5. System Status Card */}
      <div className="p-3.5 rounded-2xl bg-white/90 border border-slate-200/90 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">
              System Status: {power ? 'Running Smoothly' : 'Standby Mode'}
            </h4>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Sync: {lastSync} • 2.5 Ton Inverter Nominal
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 shrink-0">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </div>
      </div>
    </div>
  );
}
