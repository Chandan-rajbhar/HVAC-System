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

  return (
    <div className="w-full px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between">
      {/* Brand Identity (Always visible and uniform across all pages) */}
      <LogoNT size="sm" variant="full" />

      {/* Header Actions: Notification Bell */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={handleNotificationClick}
          className={`relative p-2 rounded-xl neu-button transition-all ${isNotificationPage
            ? 'bg-deepViolet/10 text-deepViolet shadow-inner ring-1 ring-deepViolet/20'
            : 'text-slate-700 hover:text-deepViolet active:scale-95'
            }`}
          title={isNotificationPage ? 'Close Notifications' : 'Notifications & Alerts'}
          aria-label={isNotificationPage ? 'Close Notifications' : 'Notifications'}
        >
          <Bell className={`w-4 h-4 ${isNotificationPage ? 'text-deepViolet fill-deepViolet/20' : 'text-deepViolet'}`} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-status-attention text-white text-[9.5px] font-bold flex items-center justify-center shadow-xs">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
