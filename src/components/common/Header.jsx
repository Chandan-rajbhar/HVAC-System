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
    <div className="relative w-full px-4 sm:px-4.5 py-2.5 sm:py-3 flex items-center justify-between bg-gradient-to-r from-[#1B1454] via-[#281D7A] to-[#382898] text-white shadow-[0_2px_10px_rgba(27,20,84,0.3)] border-b border-indigo-950/40 select-none">
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
          className={`relative w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
            isNotificationPage
              ? 'bg-white/25 border border-white/40 text-white ring-1.5 ring-white/30 shadow-inner backdrop-blur-md'
              : 'bg-white/15 hover:bg-white/25 active:bg-white/30 border border-white/20 text-white shadow-xs backdrop-blur-md'
          }`}
          title={isNotificationPage ? 'Close Notifications' : 'Notifications & Alerts'}
          aria-label={isNotificationPage ? 'Close Notifications' : 'Notifications'}
        >
          <Bell className="w-4 h-4 text-white" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-rose-500 text-white text-[9.5px] font-extrabold flex items-center justify-center border-2 border-[#33258F] shadow-[0_2px_5px_rgba(0,0,0,0.3)] select-none pointer-events-none">
              <span className="leading-none pt-[0.5px]">{unreadCount}</span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}