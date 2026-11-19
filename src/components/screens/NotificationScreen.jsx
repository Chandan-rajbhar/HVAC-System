import React, { useState } from 'react';
import { useHVAC } from '../../context/HVACContext';
import { 
  ArrowLeft,
  ShieldCheck, 
  Zap, 
  Wrench, 
  Radio, 
  ChevronRight, 
  Info,
  CheckCircle2
} from 'lucide-react';

export default function NotificationScreen() {
  const { 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    setCurrentScreen,
    previousScreen,
    unreadCount
  } = useHVAC();

  const [filterType, setFilterType] = useState('all'); // 'all', 'unread', 'care'

  const filteredNotifications = notifications.filter(item => {
    if (filterType === 'unread') return !item.read;
    if (filterType === 'care') return item.type === 'filter' || item.type === 'maintenance';
    return true;
  });

  const careCount = notifications.filter(n => n.type === 'filter' || n.type === 'maintenance').length;

  const getIcon = (type) => {
    switch (type) {
      case 'filter':
      case 'care':
        return <ShieldCheck className="w-3.5 h-3.5 text-deepViolet" />;
      case 'sync':
        return <Radio className="w-3.5 h-3.5 text-emerald-600" />;
      case 'energy':
        return <Zap className="w-3.5 h-3.5 text-amber-600" />;
      case 'maintenance':
        return <Wrench className="w-3.5 h-3.5 text-status-attention" />;
      default:
        return <Info className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  const handleNotificationClick = (item) => {
    markNotificationRead(item.id);
    if (item.type === 'filter' || item.type === 'maintenance') {
      setCurrentScreen('care');
    }
  };

  const handleBack = () => {
    setCurrentScreen(previousScreen && previousScreen !== 'notifications' ? previousScreen : 'home');
  };

  return (
    <div className="flex-1 px-3.5 sm:px-4 py-3 space-y-2.5 pb-8 animate-in fade-in duration-300">
      {/* 1. Header Area with Back Action & Mark All Read Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handleBack}
            className="p-1.5 rounded-xl neu-button text-deepViolet hover:text-deepViolet-800 active:scale-95 transition-all"
            title="Go back"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
          <h2 className="text-base font-extrabold text-deepViolet tracking-tight">
            Notification
          </h2>
        </div>

        {/* Mark All Read Button */}
        <button
          onClick={markAllNotificationsRead}
          disabled={unreadCount === 0}
          className="px-2.5 py-1 rounded-xl neu-button text-deepViolet hover:text-deepViolet-800 active:scale-95 transition-all text-[11px] font-bold disabled:opacity-40 disabled:cursor-not-allowed"
          title="Mark all notifications as read"
        >
          Mark all read
        </button>
      </div>

      {/* 2. Compact Filter Pills */}
      <div className="p-1.5 rounded-xl neu-flat">
        <div className="flex items-center gap-1 bg-polar-300/60 p-0.5 rounded-lg text-[11px] w-full">
          <button
            onClick={() => setFilterType('all')}
            className={`flex-1 py-1 rounded-md font-semibold transition-all text-center ${
              filterType === 'all'
                ? 'bg-deepViolet text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilterType('unread')}
            className={`flex-1 py-1 rounded-md font-semibold transition-all flex items-center justify-center gap-1 ${
              filterType === 'unread'
                ? 'bg-deepViolet text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Unread</span>
            {unreadCount > 0 && (
              <span className={`px-1 rounded-full text-[9px] font-bold ${filterType === 'unread' ? 'bg-white/20 text-white' : 'bg-status-attention text-white'}`}>
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setFilterType('care')}
            className={`flex-1 py-1 rounded-md font-semibold transition-all text-center ${
              filterType === 'care'
                ? 'bg-deepViolet text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Care ({careCount})
          </button>
        </div>
      </div>

      {/* 3. Equal-Sized Notifications List */}
      <div className="space-y-2">
        {filteredNotifications.length === 0 ? (
          <div className="py-10 px-4 rounded-2xl neu-flat flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full neu-inset flex items-center justify-center text-slate-400 mb-2">
              <CheckCircle2 className="w-6 h-6 stroke-[1.5] text-status-operational" />
            </div>
            <h3 className="text-xs font-bold text-slate-700">
              {filterType === 'unread' 
                ? 'No unread notifications' 
                : filterType === 'care' 
                  ? 'No maintenance alerts' 
                  : 'Notification feed is empty'}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5 max-w-[220px]">
              {filterType === 'unread' 
                ? "You're completely up to date."
                : filterType === 'care'
                  ? 'All modular cassettes are normal.'
                  : 'No system alerts recorded.'}
            </p>
            {filterType !== 'all' && notifications.length > 0 && (
              <button
                onClick={() => setFilterType('all')}
                className="mt-3 px-2.5 py-1 rounded-lg bg-polar-300 text-deepViolet text-[11px] font-bold hover:bg-polar-400 transition-colors"
              >
                View all notifications ({notifications.length})
              </button>
            )}
          </div>
        ) : (
          filteredNotifications.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNotificationClick(item)}
              className={`h-[76px] p-2.5 rounded-xl transition-all cursor-pointer border flex items-center gap-2.5 overflow-hidden ${
                item.read 
                  ? 'bg-polar-200/60 border-polar-300 text-slate-700 hover:bg-polar-100' 
                  : 'bg-white border-deepViolet/25 shadow-xs text-slate-900 ring-1 ring-deepViolet/10 hover:border-deepViolet/40'
              }`}
            >
              {/* Uniform Icon */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                item.read ? 'bg-polar-300/60' : 'bg-deepViolet/10'
              }`}>
                {getIcon(item.type)}
              </div>

              {/* Uniform Content Area */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                {/* Top Row: Badge + Unread Dot + Time + Chevron */}
                <div className="flex items-center justify-between gap-1.5 leading-none mb-0.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-[9px] font-bold text-deepViolet/80 uppercase tracking-wider truncate">
                      {item.badge}
                    </span>
                    {!item.read && (
                      <span className="w-1.5 h-1.5 rounded-full bg-status-attention shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-[9px] text-slate-400 font-mono shrink-0 whitespace-nowrap">
                    <span>{item.time}</span>
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                  </div>
                </div>

                {/* Title (Single Line) */}
                <h4 className={`text-[11.5px] leading-snug truncate ${item.read ? 'font-medium text-slate-700' : 'font-bold text-deepViolet'}`}>
                  {item.title}
                </h4>

                {/* Message (Uniform 2-Line Clamp) */}
                <p className="text-[10px] text-slate-500 leading-tight line-clamp-2 mt-0.5">
                  {item.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
