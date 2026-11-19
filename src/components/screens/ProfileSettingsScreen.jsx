import React, { useState } from 'react';
import { useHVAC } from '../../context/HVACContext';
import { 
  ArrowLeft,
  Pencil,
  Home, 
  Settings, 
  Wifi, 
  Clock, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Check, 
  X
} from 'lucide-react';

export default function ProfileSettingsScreen() {
  const {
    tempUnit,
    toggleTempUnit,
    specs,
    userProfile,
    setUserProfile,
    setCurrentScreen,
    previousScreen
  } = useHVAC();

  const [activeSection, setActiveSection] = useState(null); // 'systems' | 'preferences' | 'devices' | 'about' | 'support' | 'logout' | null
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userProfile.name);

  const [notificationsEnabled, setNotificationsEnabled] = useState({
    filter: true,
    maintenance: true,
    energy: false,
    sound: true
  });

  const toggleNotif = (key) => {
    setNotificationsEnabled(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      const names = tempName.trim().split(' ');
      const initials = names.length > 1 ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase() : names[0].slice(0, 2).toUpperCase();
      setUserProfile(prev => ({ ...prev, name: tempName.trim(), initials }));
    }
    setIsEditingName(false);
  };

  const menuItems = [
    {
      id: 'systems',
      title: 'My Systems',
      description: 'Manage your HVAC systems',
      icon: Home,
      action: () => setActiveSection('systems')
    },
    {
      id: 'preferences',
      title: 'Preferences',
      description: 'App settings & preferences',
      icon: Settings,
      action: () => setActiveSection('preferences')
    },
    {
      id: 'devices',
      title: 'Connected Devices',
      description: 'Wi-Fi & device settings',
      icon: Wifi,
      action: () => setActiveSection('devices')
    },
    {
      id: 'about',
      title: 'About App',
      description: 'Version 1.0.0',
      icon: Clock,
      action: () => setActiveSection('about')
    },
    {
      id: 'support',
      title: 'Help & Support',
      description: 'Get help and contact us',
      icon: HelpCircle,
      action: () => setActiveSection('support')
    },
    {
      id: 'logout',
      title: 'Log Out',
      description: 'Sign out from your account',
      icon: LogOut,
      action: () => setActiveSection('logout')
    },
  ];

  return (
    <div className="flex-1 px-4 sm:px-5 py-3.5 space-y-3.5 pb-10 animate-in fade-in duration-300">
      {/* 1. Header Bar with Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen(previousScreen && previousScreen !== 'profile' ? previousScreen : 'home')}
          className="p-1.5 rounded-xl neu-button text-deepViolet hover:text-deepViolet-800 active:scale-95 transition-all"
          title="Go back"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        </button>

        <h2 className="text-base font-extrabold text-deepViolet tracking-tight">
          Profile
        </h2>

        <div className="w-7" /> {/* Spacer for balance */}
      </div>

      {/* 2. Customer Profile Header Card */}
      <div className="p-5 rounded-3xl neu-flat flex flex-col items-center text-center relative overflow-hidden">
        {/* Avatar with Initials & Edit Pencil Icon */}
        <div className="relative mb-2.5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-deepViolet to-sky-500 text-white flex items-center justify-center font-extrabold text-2xl shadow-md border-2 border-white">
            {userProfile.initials || 'JS'}
          </div>

          <button
            onClick={() => setIsEditingName(true)}
            className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white text-deepViolet border border-slate-200 shadow-md hover:bg-slate-100 transition-all"
            title="Edit Profile"
          >
            <Pencil className="w-3 h-3" />
          </button>
        </div>

        {/* Name (View / Edit mode) */}
        {isEditingName ? (
          <div className="flex items-center gap-1.5 mb-1">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="px-2.5 py-1 text-sm font-bold text-slate-800 bg-white border border-deepViolet rounded-xl text-center outline-hidden"
              autoFocus
            />
            <button
              onClick={() => handleSaveName()}
              className="p-1.5 rounded-xl bg-deepViolet text-white text-xs font-bold"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <h3 className="text-base font-extrabold text-slate-900 leading-tight">
            {userProfile.name}
          </h3>
        )}

        {/* Email Address */}
        <p className="text-xs text-slate-500 mt-0.5">
          {userProfile.email}
        </p>

        {/* Active Account Status Badge */}
        <div className="mt-2.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{userProfile.status}</span>
        </div>
      </div>

      {/* 3. Navigation & Settings Cards */}
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              onClick={item.action}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between cursor-pointer hover:border-deepViolet/40 hover:shadow-sm active:scale-99 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${
                  item.id === 'logout' ? 'bg-red-50 text-red-600' : 'bg-deepViolet/10 text-deepViolet'
                }`}>
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold group-hover:text-deepViolet transition-colors ${
                    item.id === 'logout' ? 'text-red-600' : 'text-slate-800'
                  }`}>
                    {item.title}
                  </h4>
                  <p className="text-[10.5px] text-slate-500 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:text-deepViolet transition-all" />
            </div>
          );
        })}
      </div>

      {/* 4. Local Industries Authentic Brand Footer */}
      <div className="pt-2 pb-1 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-extrabold font-['Space_Grotesk'] text-deepViolet tracking-wider">
            LOCAL INDUSTRIES
          </span>
        </div>
        <p className="text-[10px] text-slate-400 font-medium mt-0.5">
          Your Comfort. Connected.
        </p>
      </div>

      {/* ============================================================== */}
      {/* MODALS: Systems / Preferences / Devices / About / Support      */}
      {/* ============================================================== */}

      {/* 1. My Systems Modal */}
      {activeSection === 'systems' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-3.5 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-[350px] max-h-[82%] bg-polar-100 rounded-3xl shadow-2xl border border-white/90 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 px-5 bg-polar-200 border-b border-polar-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-deepViolet text-white">
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-deepViolet">My Systems</h3>
                  <p className="text-[10px] text-slate-500">Connected HVAC Installations</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveSection(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3 overflow-y-auto no-scrollbar">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Living Suite • Master</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[9.5px] font-bold">Online</span>
                </div>
                <p className="text-[11px] text-slate-600">Model: {specs.model}</p>
                <p className="text-[10px] font-mono text-slate-400">SN: {specs.serialNumber}</p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
                  <span className="text-slate-500">4 Modules Synchronized</span>
                  <span className="text-emerald-600 font-semibold">100% Health</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Preferences Modal */}
      {activeSection === 'preferences' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-3.5 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-[350px] max-h-[82%] bg-polar-100 rounded-3xl shadow-2xl border border-white/90 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 px-5 bg-polar-200 border-b border-polar-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-deepViolet text-white">
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-deepViolet">App Preferences</h3>
                  <p className="text-[10px] text-slate-500">Units & notification alerts</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveSection(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3 overflow-y-auto no-scrollbar text-xs">
              {/* Unit Toggle */}
              <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800">Temperature Unit</h4>
                  <p className="text-[10px] text-slate-500">Display readings in °F or °C</p>
                </div>
                <div className="flex items-center gap-1 bg-polar-200 p-1 rounded-xl">
                  <button
                    onClick={() => tempUnit !== 'F' && toggleTempUnit()}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      tempUnit === 'F' ? 'bg-deepViolet text-white shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    °F
                  </button>
                  <button
                    onClick={() => tempUnit !== 'C' && toggleTempUnit()}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      tempUnit === 'C' ? 'bg-deepViolet text-white shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    °C
                  </button>
                </div>
              </div>

              {/* Notification Toggles */}
              <div className="p-3 rounded-2xl bg-white border border-slate-200 space-y-2.5">
                <h4 className="font-bold text-slate-800">Push Notifications</h4>
                {['filter', 'maintenance', 'energy'].map((key) => (
                  <div key={key} className="flex items-center justify-between py-1 border-t border-slate-100">
                    <span className="capitalize text-slate-600 font-medium">{key} Alerts</span>
                    <button
                      onClick={() => toggleNotif(key)}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                        notificationsEnabled[key] ? 'bg-deepViolet' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                        notificationsEnabled[key] ? 'translate-x-4' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Connected Devices Modal */}
      {activeSection === 'devices' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-3.5 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-[350px] max-h-[82%] bg-polar-100 rounded-3xl shadow-2xl border border-white/90 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 px-5 bg-polar-200 border-b border-polar-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-deepViolet text-white">
                  <Wifi className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-deepViolet">Connected Devices</h3>
                  <p className="text-[10px] text-slate-500">Wi-Fi & Bus Telemetry</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveSection(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3 overflow-y-auto no-scrollbar text-xs">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Wi-Fi Network</span>
                  <span className="text-emerald-600 font-bold">Connected (100%)</span>
                </div>
                <p className="text-slate-500">SSID: Local-Industries-IoT-5G</p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-slate-500">Rear Electrical Prong Bus</span>
                  <span className="text-deepViolet font-semibold">Synchronized</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. About App Modal */}
      {activeSection === 'about' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-3.5 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-[350px] max-h-[82%] bg-polar-100 rounded-3xl shadow-2xl border border-white/90 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 px-5 bg-polar-200 border-b border-polar-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-deepViolet text-white">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-deepViolet">About Application</h3>
                  <p className="text-[10px] text-slate-500">Smart Companion System</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveSection(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-2 text-xs">
              <div className="p-3 rounded-2xl bg-white border border-slate-200 space-y-1.5">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Application</span>
                  <span className="font-bold text-slate-800">NO-TECH HVAC Smart Companion</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Version</span>
                  <span className="font-bold text-slate-800">1.0.0 (Build 2026.11)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Hardware Series</span>
                  <span className="font-bold text-deepViolet">VIVID-400 In-Wall Modular</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Firmware</span>
                  <span className="font-mono text-emerald-600 font-semibold">v4.2.1-modular-bus</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Support Modal */}
      {activeSection === 'support' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-3.5 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-[350px] max-h-[82%] bg-polar-100 rounded-3xl shadow-2xl border border-white/90 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 px-5 bg-polar-200 border-b border-polar-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-deepViolet text-white">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-deepViolet">Help & Support</h3>
                  <p className="text-[10px] text-slate-500">Assistance & certified contacts</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveSection(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800">Contractor Hotline</h4>
                  <p className="text-slate-500">{specs.contractor.company}</p>
                  <p className="font-mono text-deepViolet font-bold mt-0.5">{specs.contractor.phone}</p>
                </div>
                <a
                  href={`tel:${specs.contractor.phone}`}
                  className="px-3 py-1.5 rounded-xl bg-deepViolet text-white font-bold"
                >
                  Call
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Logout Confirm Modal */}
      {activeSection === 'logout' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-3.5 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-[330px] bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 flex flex-col text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
              <LogOut className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Sign Out</h3>
            <p className="text-xs text-slate-500 mt-1">
              Are you sure you want to log out of your Local Industries companion account?
            </p>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={() => setActiveSection(null)}
                className="py-2 rounded-xl neu-button text-xs font-bold text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setActiveSection(null);
                  setCurrentScreen('home');
                }}
                className="py-2 rounded-xl bg-red-600 text-white text-xs font-bold shadow-md hover:bg-red-700 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
