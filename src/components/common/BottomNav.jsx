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
    <nav className="w-full px-2 sm:px-3 py-1.5" aria-label="Bottom Navigation">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 sm:py-1.5 px-2 sm:px-3 rounded-2xl transition-all duration-200 ${
                isActive 
                  ? 'text-deepViolet font-bold' 
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              {/* Active Background Pill with subtle neumorphic glow */}
              {isActive && (
                <span className="absolute inset-0 rounded-2xl bg-deepViolet/10 -z-10 animate-in fade-in zoom-in-95 duration-200" />
              )}

              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'}`} />
              </div>

              <span className={`text-[10px] sm:text-[11px] tracking-tight mt-1 transition-all ${
                isActive ? 'text-deepViolet font-bold scale-100' : 'text-slate-500 font-medium'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
