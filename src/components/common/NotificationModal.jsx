import React, { useState } from 'react';
import { useHVAC } from '../../context/HVACContext';
import { 
  X, 
  Bell, 
  Check, 
  Trash2, 
  ShieldCheck, 
  Zap, 
  Wrench, 
  Radio, 
  ChevronRight,
  AlertTriangle,
  Info
} from 'lucide-react';

export default function NotificationModal() {
  const { 
    isNotificationOpen, 
    setIsNotificationOpen, 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    clearAllNotifications,
    setCurrentScreen
  } = useHVAC();

  const [filterType, setFilterType] = useState('all'); // 'all', 'unread', 'care'

  if (!isNotificationOpen) return null;

  const filteredNotifications = notifications.filter(item => {
    if (filterType === 'unread') return !item.read;
    if (filterType === 'care') return item.type === 'filter' || item.type === 'maintenance';
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'filter':
      case 'care':
        return <ShieldCheck className="w-4 h-4 text-deepViolet" />;
      case 'sync':
        return <Radio className="w-4 h-4 text-emerald-600" />;
      case 'energy':
        return <Zap className="w-4 h-4 text-amber-600" />;
      case 'maintenance':
        return <Wrench className="w-4 h-4 text-status-attention" />;
      default:
        return <Info className="w-4 h-4 text-slate-600" />;
    }
  };

  const handleNotificationClick = (item) => {
    markNotificationRead(item.id);
    if (item.type === 'filter' || item.type === 'maintenance') {
      setIsNotificationOpen(false);
      setCurrentScreen('care');
    }
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
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-deepViolet">Notification Center</h3>
              <p className="text-[10px] text-slate-500">Live system alerts & reminders</p>
            </div>
          </div>

          <button
            onClick={() => setIsNotificationOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills & Actions */}
        <div className="px-4 py-2.5 bg-polar-200/50 border-b border-polar-300 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-[11px]">
            {['all', 'unread', 'care'].map((f) => (
              <button
                key={f}
                onClick={() => setFilterType(f)}
                className={`px-2.5 py-1 rounded-full font-medium capitalize transition-all ${
                  filterType === f 
                    ? 'bg-deepViolet text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[10px]">
            <button
              onClick={markAllNotificationsRead}
              className="text-deepViolet hover:underline font-medium"
            >
              Mark all read
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={clearAllNotifications}
              className="text-slate-500 hover:text-status-attention transition-colors"
              title="Clear all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 no-scrollbar">
          {filteredNotifications.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full neu-inset flex items-center justify-center text-slate-400 mb-2">
                <Bell className="w-6 h-6 stroke-[1.5]" />
              </div>
              <p className="text-xs font-semibold text-slate-600">No notifications</p>
              <p className="text-[11px] text-slate-400 mt-0.5">You're all caught up on system updates.</p>
            </div>
          ) : (
            filteredNotifications.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item)}
                className={`p-3 rounded-2xl transition-all cursor-pointer border ${
                  item.read 
                    ? 'bg-polar-200/70 border-polar-300 text-slate-700' 
                    : 'bg-white border-deepViolet/30 shadow-sm text-slate-900 ring-1 ring-deepViolet/10'
                } hover:border-deepViolet/50`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-xl bg-polar-300/60 shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-[10px] font-bold text-deepViolet uppercase tracking-wider">
                        {item.badge}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono">
                        {item.time}
                      </span>
                    </div>

                    <h4 className={`text-xs ${item.read ? 'font-medium' : 'font-bold text-deepViolet'} leading-snug`}>
                      {item.title}
                    </h4>

                    <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
                      {item.message}
                    </p>

                    {(item.type === 'filter' || item.type === 'maintenance') && (
                      <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-deepViolet font-semibold">
                        <span>Open Care & Replacement Guide</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-polar-200 border-t border-polar-300 text-center text-[10px] text-slate-500 font-medium">
          NO-TECH HVAC System Monitoring Active
        </div>
      </div>
    </div>
  );
}
