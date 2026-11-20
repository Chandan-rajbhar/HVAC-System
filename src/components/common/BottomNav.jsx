import React from 'react';
import { useHVAC } from '../../context/HVACContext';
import { Home, Sliders, BarChart3, MoreHorizontal, User } from 'lucide-react';

export default function BottomNav() {
  const { currentScreen, setCurrentScreen } = useHVAC();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'control', label: 'Control', icon: Sliders },
    { id: 'energy', label: 'Energy', icon: BarChart3 },
    { id: 'more', label: 'More', icon: MoreHorizontal },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="w-full px-3 sm:px-4 pb-2.5 sm:pb-3.5 pt-0.5">
      <nav
        className="w-full bg-white rounded-[28px] sm:rounded-[32px] shadow-[0_4px_25px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.03)] border border-slate-100/90 px-1.5 sm:px-2 py-2 select-none"
        aria-label="Bottom Navigation"
      >
        <div className="flex items-center justify-between">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className="relative flex flex-col items-center justify-center flex-1 py-0.5 group focus:outline-none cursor-pointer"
              >
                {/* Icon Container with Active Pill Highlight */}
                <div
                  className={`relative flex items-center justify-center w-12 sm:w-14 h-7 sm:h-7.5 rounded-full transition-all duration-200 ${isActive
                    ? 'bg-[#EEF2FD] text-[#3F3AC7]'
                    : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                >
                  <Icon
                    className={`w-[18px] h-[18px] sm:w-[19px] sm:h-[19px] transition-all duration-200 ${
                      isActive
                        ? 'stroke-[2.2]'
                        : 'stroke-[1.8]'
                    }`}
                  />
                </div>

                {/* Label */}
                <span
                  className={`text-[10px] sm:text-[10.5px] tracking-tight mt-0.5 transition-colors duration-200 ${isActive
                    ? 'text-[#3F3AC7] font-bold'
                    : 'text-slate-400 group-hover:text-slate-600 font-medium'
                    }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}