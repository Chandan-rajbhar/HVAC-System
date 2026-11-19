import React, { useState } from 'react';
import { useHVAC } from '../../context/HVACContext';
import { 
  Zap, 
  ArrowLeft, 
  Calendar, 
  Leaf, 
  TrendingDown, 
  Lightbulb, 
  CheckCircle2
} from 'lucide-react';

export default function EnergyScreen() {
  const { energyData, setCurrentScreen, previousScreen } = useHVAC();
  const [timeframe, setTimeframe] = useState('week'); // 'day' | 'week' | 'month'
  const [activeBarIndex, setActiveBarIndex] = useState(null);

  // Data mapping
  const currentData = timeframe === 'day' 
    ? energyData.daily 
    : timeframe === 'week' 
      ? energyData.weekly 
      : energyData.monthly;

  const maxVal = Math.max(...currentData.map(d => d.kwh), 1);

  const getSummaryData = () => {
    switch (timeframe) {
      case 'day':
        return {
          title: "Today's Usage",
          kwh: '4.8',
          comparison: '12% vs yesterday',
          cost: '$0.67'
        };
      case 'month':
        return {
          title: "This Month's Usage",
          kwh: '321.0',
          comparison: '15% vs last month',
          cost: '$44.94'
        };
      case 'week':
      default:
        return {
          title: "This Week's Usage",
          kwh: '85.5',
          comparison: '12% vs last week',
          cost: '$11.97'
        };
    }
  };

  const summary = getSummaryData();

  return (
    <div className="flex-1 px-4 sm:px-5 py-3.5 space-y-3.5 pb-10 animate-in fade-in duration-300">
      {/* 1. Header Bar with Back Button, Title & Calendar Action */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentScreen(previousScreen && previousScreen !== 'energy' ? previousScreen : 'home')}
            className="p-1.5 rounded-xl neu-button text-deepViolet hover:text-deepViolet-800 active:scale-95 transition-all"
            title="Go back"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
          <div>
            <h2 className="text-lg font-extrabold text-deepViolet tracking-tight leading-tight">
              Energy Usage
            </h2>
            <p className="text-[10px] text-slate-500 font-medium">
              Real-time consumption & savings
            </p>
          </div>
        </div>

        {/* Date Selector Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl neu-button text-deepViolet text-xs font-bold shadow-xs">
          <Calendar className="w-3.5 h-3.5 text-deepViolet" />
          <span className="text-[10.5px]">Nov 2026</span>
        </div>
      </div>

      {/* 2. Timeframe Filter Pills (Day, Week, Month) */}
      <div className="p-1 rounded-2xl bg-polar-300/60 flex items-center gap-1">
        {[
          { id: 'day', label: 'Day' },
          { id: 'week', label: 'Week' },
          { id: 'month', label: 'Month' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setTimeframe(tab.id);
              setActiveBarIndex(null);
            }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
              timeframe === tab.id
                ? 'bg-deepViolet text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Primary Energy Summary & Interactive Consumption Chart */}
      <div className="p-4 rounded-3xl neu-flat space-y-3.5">
        {/* Top Summary Row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-deepViolet/10 text-deepViolet">
              <Zap className="w-5 h-5 fill-deepViolet/20" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {summary.title}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-800 font-mono">
                  {summary.kwh}
                </span>
                <span className="text-xs font-bold text-slate-500 font-mono">
                  kWh
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10.5px] font-bold text-emerald-600 mt-0.5">
                <TrendingDown className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{summary.comparison}</span>
              </div>
            </div>
          </div>

          {/* Eco Efficiency Leaf Badge */}
          <div className="p-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 shadow-xs">
            <Leaf className="w-4 h-4 fill-emerald-500/20" />
          </div>
        </div>

        {/* Interactive Bar Chart */}
        <div className="pt-2">
          {/* Active Hover / Tap Tooltip */}
          <div className="h-6 flex items-center justify-between text-[11px] mb-1">
            <span className="text-slate-400 font-mono text-[10px]">kWh Consumption</span>
            {activeBarIndex !== null ? (
              <span className="text-deepViolet font-bold font-mono bg-deepViolet/10 px-2 py-0.5 rounded-md animate-in fade-in">
                {currentData[activeBarIndex].label}: {currentData[activeBarIndex].kwh} kWh (~${currentData[activeBarIndex].cost})
              </span>
            ) : (
              <span className="text-slate-400 text-[10px]">Tap bars for details</span>
            )}
          </div>

          {/* Bars Container */}
          <div className="h-36 w-full flex items-end justify-between gap-1.5 pt-2 border-b border-slate-200">
            {currentData.map((item, idx) => {
              const heightPercent = Math.max(12, Math.round((item.kwh / maxVal) * 100));
              const isSelected = activeBarIndex === idx;

              return (
                <div 
                  key={idx}
                  onClick={() => setActiveBarIndex(idx)}
                  className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group"
                >
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full max-w-[28px] rounded-t-xl transition-all duration-300 relative ${
                      isSelected
                        ? 'bg-deepViolet shadow-md'
                        : 'bg-gradient-to-t from-deepViolet/40 to-sky-400/80 group-hover:from-deepViolet/60 group-hover:to-sky-500'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-deepViolet" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* X-Axis Labels */}
          <div className="flex justify-between items-center pt-2 text-[10px] font-semibold text-slate-500 font-mono">
            {currentData.map((item, idx) => (
              <span 
                key={idx} 
                onClick={() => setActiveBarIndex(idx)}
                className={`flex-1 text-center cursor-pointer ${activeBarIndex === idx ? 'text-deepViolet font-bold scale-105' : ''}`}
              >
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Energy Insights Card */}
      <div className="p-4 rounded-3xl neu-flat flex items-center justify-between gap-3 bg-gradient-to-r from-amber-50/50 to-white">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-700 shrink-0">
            <Lightbulb className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">
              Energy Insights
            </h4>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
              You're using 12% less energy this week!
            </p>
            <p className="text-[10px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Auto-advance filter airflow optimized</span>
            </p>
          </div>
        </div>

        {/* Mini Growth Indicator */}
        <div className="flex items-end gap-1 h-8 shrink-0 px-2 py-1 bg-emerald-100/60 rounded-xl">
          <div className="w-1.5 h-3 bg-emerald-400 rounded-sm" />
          <div className="w-1.5 h-4 bg-emerald-500 rounded-sm" />
          <div className="w-1.5 h-6 bg-emerald-600 rounded-sm" />
        </div>
      </div>

      {/* 5. Efficiency Score Card */}
      <div className="p-4 rounded-3xl neu-flat flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Circular Efficiency Ring */}
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="26"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="6"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                fill="none"
                stroke="#10B981"
                strokeWidth="6"
                strokeDasharray={`${2 * Math.PI * 26}`}
                strokeDashoffset={`${2 * Math.PI * 26 * (1 - 0.92)}`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-xs font-black text-slate-800 font-mono">
              92%
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Efficiency Score
            </span>
            <h4 className="text-sm font-extrabold text-emerald-600 leading-tight">
              Excellent
            </h4>
            <p className="text-[10.5px] text-slate-500 mt-0.5">
              Keep it up! Peak rating maintained.
            </p>
          </div>
        </div>

        <div className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
          Top 5%
        </div>
      </div>
    </div>
  );
}
