import React from 'react';
import { useHVAC } from '../../context/HVACContext';
import LogoNT from './LogoNT';
import { Bell } from 'lucide-react';

export default function Header() {
  const {
    unreadCount,
    currentScreen,
    previousScreen,
    setCurrentScreen,
    navigateToNotifications
  } = useHVAC();

  const isNotificationPage = currentScreen === 'notifications';

  const handleNotificationClick = () => {
    if (isNotificationPage) {
      // Toggle back to the previous screen if already on notifications
      setCurrentScreen(previousScreen && previousScreen !== 'notifications' ? previousScreen : 'home');
    } else {
      navigateToNotifications();
    }
  };

  const handleBrandClick = () => {
    if (currentScreen !== 'home') {
      setCurrentScreen('home');
    }
  };

  return (
    <div className="relative w-full px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between bg-gradient-to-r from-[#1B1454] via-[#281D7A] to-[#382898] text-white shadow-[0_4px_16px_rgba(36,26,110,0.25)] border-b border-indigo-950/40 select-none">
      {/* Subtle top specular sheen & bottom hairline accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Brand Identity: Authentic NT Logo & NO-TECH HVAC SYSTEMS */}
      <button
        type="button"
        onClick={handleBrandClick}
        className="relative z-10 flex items-center text-left group cursor-pointer active:scale-[0.98] transition-transform focus:outline-none"
        title={currentScreen !== 'home' ? 'Return to Home' : 'NO-TECH Home'}
      >
        <LogoNT size="sm" variant="full" title="NO-TECH" subtitle="HVAC SYSTEMS" />
      </button>

      {/* Header Actions: Notification Bell */}
      <div className="relative z-10 flex items-center">
        <button
          onClick={handleNotificationClick}
          className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center transition-all ${
            isNotificationPage
              ? 'bg-white/25 border border-white/40 text-white ring-2 ring-white/30 shadow-inner backdrop-blur-md'
              : 'bg-white/15 hover:bg-white/25 active:bg-white/30 border border-white/20 text-white shadow-xs backdrop-blur-md'
          }`}
          title={isNotificationPage ? 'Close Notifications' : 'Notifications & Alerts'}
          aria-label={isNotificationPage ? 'Close Notifications' : 'Notifications'}
        >
          <Bell className="w-[18px] h-[18px] text-white" />
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[19px] h-[19px] px-1 rounded-full bg-gradient-to-tr from-rose-600 via-red-500 to-rose-500 text-white text-[9.5px] font-black tracking-tight flex items-center justify-center shadow-[0_2px_8px_rgba(244,63,94,0.5)] ring-2 ring-[#281D7A] select-none pointer-events-none">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}