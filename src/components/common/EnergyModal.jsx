import React, { useState } from 'react';
import { useHVAC } from '../../context/HVACContext';
import {
  X,
  Zap,
  TrendingDown,
  Leaf,
  Sparkles,
  Check,
  Calendar,
  BarChart3,
  AlertCircle
} from 'lucide-react';

export default function EnergyModal() {
  const { isEnergyOpen, setIsEnergyOpen, energyData } = useHVAC();
  const [timeframe, setTimeframe] = useState('daily'); // 'daily', 'weekly', 'monthly'
  const [activeBar, setActiveBar] = useState(null);
  const [appliedTips, setAppliedTips] = useState([]);

  if (!isEnergyOpen) return null;

  const dataList = energyData[timeframe] || energyData.daily;
  const maxKwh = Math.max(...dataList.map(d => d.kwh), 1);

  const toggleApplyTip = (id) => {
    setAppliedTips(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-3.5 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-[350px] max-h-[82%] bg-polar-100 rounded-3xl shadow-2xl border border-white/90 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-4 px-5 bg-polar-200 border-b border-polar-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-deepViolet text-white">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-deepViolet">Energy & Efficiency</h3>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold border border-amber-200">
                  Demo Data
                </span>
              </div>
              <p className="text-[10px] text-slate-500">Live power telemetry & historical usage</p>
            </div>
          </div>

          <button
            onClick={() => setIsEnergyOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {/* Key Energy Metrics Card */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-2xl neu-flat">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Est. Monthly Cost</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-extrabold text-deepViolet font-mono">${energyData.rates.monthlyEstimated}</span>
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center">
                  <TrendingDown className="w-3 h-3" /> -11%
                </span>
              </div>
              <p className="text-[9px] text-slate-400 mt-0.5 font-mono">@ $0.14/kWh standard</p>
            </div>

            <div className="p-3 rounded-2xl neu-flat">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Blower Efficiency</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-extrabold text-emerald-600 font-mono">{energyData.rates.efficiencyScore}</span>
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center">
                  <Leaf className="w-3 h-3" />
                </span>
              </div>
              <p className="text-[9px] text-slate-400 mt-0.5">Quad DC brushless array</p>
            </div>
          </div>

          {/* Timeframe Switcher & Interactive Chart */}
          <div className="p-4 rounded-2xl neu-flat space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-deepViolet flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-deepViolet" />
                Consumption Chart
              </span>

              {/* Timeframe selector */}
              <div className="flex items-center gap-1 p-0.5 bg-polar-300 rounded-lg text-[10px]">
                {['daily', 'weekly', 'monthly'].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTimeframe(t);
                      setActiveBar(null);
                    }}
                    className={`px-2 py-0.5 rounded-md font-medium capitalize transition-all ${timeframe === t
                        ? 'bg-deepViolet text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Bar Chart */}
            <div className="pt-4 pb-2">
              <div className="h-36 flex items-end justify-between gap-2 px-1">
                {dataList.map((item, idx) => {
                  const heightPercent = Math.max(12, Math.round((item.kwh / maxKwh) * 100));
                  const isSelected = activeBar === idx;

                  return (
                    <div
                      key={item.label}
                      onClick={() => setActiveBar(isSelected ? null : idx)}
                      className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end cursor-pointer group"
                    >
                      {/* Tooltip on active or hover */}
                      <span className={`text-[9px] font-mono transition-opacity ${isSelected ? 'opacity-100 font-bold text-deepViolet' : 'opacity-0 group-hover:opacity-100 text-slate-500'
                        }`}>
                        {item.kwh}k
                      </span>

                      {/* Bar Pillar */}
                      <div className="w-full bg-slate-200/80 rounded-t-lg overflow-hidden flex items-end h-full">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t-lg transition-all duration-300 ${isSelected
                              ? 'bg-deepViolet shadow-glow-violet'
                              : 'bg-deepViolet/70 hover:bg-deepViolet'
                            }`}
                        />
                      </div>

                      {/* X-axis Label */}
                      <span className={`text-[9px] font-mono transition-colors ${isSelected ? 'text-deepViolet font-bold' : 'text-slate-500'
                        }`}>
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Active Bar Inspector Details */}
              {activeBar !== null && (
                <div className="mt-3 p-2.5 rounded-xl bg-deepViolet text-white text-xs flex items-center justify-between animate-in fade-in duration-150">
                  <div>
                    <span className="text-[10px] text-deepViolet-200 uppercase font-mono">Period: {dataList[activeBar].label}</span>
                    <p className="font-bold">{dataList[activeBar].kwh} kWh consumed</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-deepViolet-200 uppercase font-mono">Estimated Cost</span>
                    <p className="font-bold text-emerald-300 font-mono">${dataList[activeBar].cost}</p>
                  </div>
                </div>
              )}
            </div>

            <p className="text-[9px] text-slate-400 text-center font-medium">
              Tap any column to inspect interval metrics. Values derived from prototype simulation.
            </p>
          </div>

          {/* Actionable Energy-Saving Suggestions */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-deepViolet flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-deepViolet" />
              Smart Energy Optimizations
            </h4>

            {energyData.tips.map((tip) => {
              const isApplied = appliedTips.includes(tip.id);

              return (
                <div
                  key={tip.id}
                  className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between gap-3 hover:border-deepViolet/40 transition-all"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-800">{tip.title}</span>
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        {tip.saving}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{tip.desc}</p>
                  </div>

                  <button
                    onClick={() => toggleApplyTip(tip.id)}
                    className={`py-1 px-2.5 rounded-xl text-[10px] font-bold transition-all flex items-center gap-1 shrink-0 ${isApplied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-polar-300 text-deepViolet hover:bg-deepViolet hover:text-white'
                      }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3 h-3" />
                        Active
                      </>
                    ) : (
                      'Apply'
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Environmental Offset Pill */}
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-emerald-900">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold">{energyData.rates.co2OffsetLbs} lbs CO₂ Offset</p>
              <p className="text-[10px] text-emerald-700/80">Equivalent to planting 3 mature trees this quarter.</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-polar-200 border-t border-polar-300 text-center text-[10px] text-slate-500 font-medium">
          Demonstration energy model. Production data will link to connected HVAC hardware.
        </div>
      </div>
    </div>
  );
}
