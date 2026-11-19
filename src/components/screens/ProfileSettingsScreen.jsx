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
  Phone,
  ShieldCheck,
  Zap,
  Wrench,
  Radio,
  CheckCircle2,
  Activity
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
  const [isClosing, setIsClosing] = useState(false);
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

  const handleOpenSection = (sectionId) => {
    setIsClosing(false);
    setActiveSection(sectionId);
  };

  const handleCloseSection = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveSection(null);
      setIsClosing(false);
    }, 220);
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
      description: 'Manage your HVAC installations',
      icon: Home,
      action: () => handleOpenSection('systems')
    },
    {
      id: 'preferences',
      title: 'App Preferences',
      description: 'Units & push notification alerts',
      icon: Settings,
      action: () => handleOpenSection('preferences')
    },
    {
      id: 'devices',
      title: 'Connected Devices',
      description: 'Wi-Fi & bus telemetry',
      icon: Wifi,
      action: () => handleOpenSection('devices')
    },
    {
      id: 'about',
      title: 'About App',
      description: 'Version 1.0.0 (VIVID-400)',
      icon: Clock,
      action: () => handleOpenSection('about')
    },
    {
      id: 'support',
      title: 'Help & Support',
      description: '24/7 contractor contacts & FAQs',
      icon: HelpCircle,
      action: () => handleOpenSection('support')
    },
    {
      id: 'logout',
      title: 'Log Out',
      description: 'Sign out from your account',
      icon: LogOut,
      action: () => handleOpenSection('logout')
    },
  ];

  return (
    <div className="flex-1 w-full min-h-full flex flex-col relative overflow-hidden">
      {/* ============================================================== */}
      {/* 1. MAIN PROFILE VIEW (Default state)                           */}
      {/* ============================================================== */}
      <div className="flex-1 px-4 sm:px-5 py-3.5 space-y-3.5 pb-10 overflow-y-auto no-scrollbar animate-in fade-in duration-300">
        {/* Header Bar with Back Button */}
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

        {/* Customer Profile Header Card */}
        <div className="p-5 rounded-3xl neu-flat flex flex-col items-center text-center relative overflow-hidden">
          {/* Avatar with Initials & Edit Pencil Icon */}
          <div className="relative mb-2.5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-deepViolet to-sky-500 text-white flex items-center justify-center font-extrabold text-2xl shadow-md border-2 border-white">
              {userProfile.initials || 'JS'}
            </div>

            <button
              onClick={() => setIsEditingName(true)}
              className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white text-deepViolet border border-slate-200 shadow-md hover:bg-slate-100 transition-all active:scale-90"
              title="Edit Profile"
              aria-label="Edit Profile"
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
                className="px-2.5 py-1 text-sm font-bold text-slate-800 bg-white border border-deepViolet rounded-xl text-center outline-hidden shadow-inner"
                autoFocus
              />
              <button
                onClick={() => handleSaveName()}
                className="p-1.5 rounded-xl bg-deepViolet text-white text-xs font-bold active:scale-95"
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

        {/* Navigation & Settings Cards */}
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onClick={item.action}
                className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between cursor-pointer hover:border-deepViolet/40 hover:shadow-sm active:scale-98 transition-all group"
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

        {/* Local Industries Authentic Brand Footer */}
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
      </div>

      {/* ============================================================== */}
      {/* 2. SUBPAGE 1: PREFERENCES (Smooth Mobile Push Screen)          */}
      {/* ============================================================== */}
      {activeSection === 'preferences' && (
        <div className={`absolute inset-0 z-30 bg-polar-200 flex flex-col ${isClosing ? 'animate-mobile-page-exit' : 'animate-mobile-page-enter'}`}>
          {/* Subpage Header Bar with Mobile Back Navigation */}
          <div className="shrink-0 px-4 sm:px-5 py-3.5 bg-polar-200/95 backdrop-blur-md border-b border-polar-300 flex items-center justify-between z-10 select-none">
            <button
              onClick={handleCloseSection}
              className="flex items-center gap-1.5 py-1 px-2 -ml-1 rounded-xl text-deepViolet hover:bg-deepViolet/10 active:scale-95 transition-all group"
              title="Return to Profile"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5] group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-xs font-bold">Profile</span>
            </button>

            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
              App Preferences
            </h2>

            <div className="p-1.5 rounded-lg bg-deepViolet/10 text-deepViolet">
              <Settings className="w-4 h-4" />
            </div>
          </div>

          {/* Subpage Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-3.5 space-y-4 no-scrollbar">
            {/* Group 1: Units & Display */}
            <div>
              <p className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase px-1 mb-1.5">
                Display & Units
              </p>
              <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">Temperature Unit</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Display climate readings across dials, schedules & status
                    </p>
                  </div>
                </div>

                {/* iOS/Android Segmented Control */}
                <div className="grid grid-cols-2 p-1 rounded-2xl bg-polar-200 border border-slate-200">
                  <button
                    onClick={() => tempUnit !== 'F' && toggleTempUnit()}
                    className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 ${
                      tempUnit === 'F'
                        ? 'bg-deepViolet text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-900 active:scale-98'
                    }`}
                  >
                    <span>°F</span>
                    <span className="text-[10px] font-normal opacity-90">Fahrenheit</span>
                  </button>
                  <button
                    onClick={() => tempUnit !== 'C' && toggleTempUnit()}
                    className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 ${
                      tempUnit === 'C'
                        ? 'bg-deepViolet text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-900 active:scale-98'
                    }`}
                  >
                    <span>°C</span>
                    <span className="text-[10px] font-normal opacity-90">Celsius</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Group 2: Push Notifications */}
            <div>
              <p className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase px-1 mb-1.5">
                Push Notifications
              </p>
              <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs divide-y divide-slate-100">
                {/* Filter Alerts Toggle */}
                <div className="flex items-center justify-between pb-3">
                  <div className="flex items-start gap-2.5 pr-2">
                    <div className="p-2 rounded-xl bg-deepViolet/10 text-deepViolet shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Filter Alerts</h4>
                      <p className="text-[10.5px] text-slate-500 mt-0.5 leading-snug">
                        Warns before seasonal media indexing advances
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleNotif('filter')}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${
                      notificationsEnabled.filter ? 'bg-deepViolet' : 'bg-slate-300'
                    }`}
                    aria-label="Toggle Filter Alerts"
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                      notificationsEnabled.filter ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* Maintenance Alerts Toggle */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-start gap-2.5 pr-2">
                    <div className="p-2 rounded-xl bg-status-attention/10 text-status-attention shrink-0 mt-0.5">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Maintenance Alerts</h4>
                      <p className="text-[10.5px] text-slate-500 mt-0.5 leading-snug">
                        Cassette inspection and certified contractor alerts
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleNotif('maintenance')}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${
                      notificationsEnabled.maintenance ? 'bg-deepViolet' : 'bg-slate-300'
                    }`}
                    aria-label="Toggle Maintenance Alerts"
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                      notificationsEnabled.maintenance ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* Energy Alerts Toggle */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-start gap-2.5 pr-2">
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-600 shrink-0 mt-0.5">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Energy Alerts</h4>
                      <p className="text-[10.5px] text-slate-500 mt-0.5 leading-snug">
                        Daily summaries and peak demand efficiency tips
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleNotif('energy')}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${
                      notificationsEnabled.energy ? 'bg-deepViolet' : 'bg-slate-300'
                    }`}
                    aria-label="Toggle Energy Alerts"
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                      notificationsEnabled.energy ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* Sound & Haptics Toggle */}
                <div className="flex items-center justify-between pt-3">
                  <div className="flex items-start gap-2.5 pr-2">
                    <div className="p-2 rounded-xl bg-sky-50 text-sky-600 shrink-0 mt-0.5">
                      <Radio className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Sound & Audio Feedback</h4>
                      <p className="text-[10.5px] text-slate-500 mt-0.5 leading-snug">
                        Subtle acoustic feedback when adjusting climate dials
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleNotif('sound')}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${
                      notificationsEnabled.sound ? 'bg-deepViolet' : 'bg-slate-300'
                    }`}
                    aria-label="Toggle Sound"
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                      notificationsEnabled.sound ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Group 3: Local Sync Status Card */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs animate-pulse" />
                <div>
                  <p className="text-xs font-bold text-slate-800">Cloud Sync Active</p>
                  <p className="text-[10px] text-slate-500">Preferences save automatically</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Synced
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. SUBPAGE 2: MY SYSTEMS (Smooth Mobile Push Screen)           */}
      {/* ============================================================== */}
      {activeSection === 'systems' && (
        <div className={`absolute inset-0 z-30 bg-polar-200 flex flex-col ${isClosing ? 'animate-mobile-page-exit' : 'animate-mobile-page-enter'}`}>
          <div className="shrink-0 px-4 sm:px-5 py-3.5 bg-polar-200/95 backdrop-blur-md border-b border-polar-300 flex items-center justify-between z-10 select-none">
            <button
              onClick={handleCloseSection}
              className="flex items-center gap-1.5 py-1 px-2 -ml-1 rounded-xl text-deepViolet hover:bg-deepViolet/10 active:scale-95 transition-all group"
              title="Return to Profile"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5] group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-xs font-bold">Profile</span>
            </button>

            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
              My Systems
            </h2>

            <div className="p-1.5 rounded-lg bg-deepViolet/10 text-deepViolet">
              <Home className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-3.5 space-y-3.5 no-scrollbar">
            {/* Primary System Installation Card */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">Primary Installation</span>
                  <h3 className="text-sm font-extrabold text-slate-900">Living Suite • Master</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-polar-200/80 border border-slate-200 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Hardware Model:</span>
                  <span className="font-bold text-slate-800">{specs.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Serial Number:</span>
                  <span className="font-mono font-bold text-deepViolet">{specs.serialNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Nominal Capacity:</span>
                  <span className="font-bold text-slate-800">{specs.nominalTonnage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Max Airflow:</span>
                  <span className="font-bold text-slate-800">{specs.totalBlowerAirflow}</span>
                </div>
              </div>

              {/* Health and Synchronization status */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-slate-600 font-medium">4 Cassette Modules Locked</span>
                </div>
                <span className="text-emerald-600 font-extrabold">100% Health</span>
              </div>
            </div>

            {/* Modular Bays Overview */}
            <div>
              <p className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase px-1 mb-1.5">
                Installed Cassettes (Quick-Swap)
              </p>
              <div className="space-y-2">
                {[
                  { slot: 1, name: 'Evaporator Coil', spec: 'Hydrophilic Micro-Channel' },
                  { slot: 2, name: 'Filtration Dispenser', spec: 'Motorized Seasonal Roll' },
                  { slot: 3, name: 'ECM Blower Assembly', spec: 'High-Efficiency Impeller' },
                  { slot: 4, name: 'Auxiliary Heating', spec: 'PTC Ceramic Modulating Array' },
                ].map((comp) => (
                  <div key={comp.slot} className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-deepViolet/10 text-deepViolet font-bold flex items-center justify-center text-[11px]">
                        #{comp.slot}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{comp.name}</h4>
                        <p className="text-[10.5px] text-slate-500">{comp.spec}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                      Synchronized
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Diagnostic Action */}
            <button
              onClick={() => {
                handleCloseSection();
                setCurrentScreen('system');
              }}
              className="w-full py-3 px-4 rounded-2xl bg-deepViolet text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-deepViolet-800 active:scale-98 transition-all"
            >
              <Activity className="w-4 h-4" />
              <span>Open Diagnostics & Telemetry</span>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. SUBPAGE 3: CONNECTED DEVICES (Smooth Mobile Push Screen)     */}
      {/* ============================================================== */}
      {activeSection === 'devices' && (
        <div className={`absolute inset-0 z-30 bg-polar-200 flex flex-col ${isClosing ? 'animate-mobile-page-exit' : 'animate-mobile-page-enter'}`}>
          <div className="shrink-0 px-4 sm:px-5 py-3.5 bg-polar-200/95 backdrop-blur-md border-b border-polar-300 flex items-center justify-between z-10 select-none">
            <button
              onClick={handleCloseSection}
              className="flex items-center gap-1.5 py-1 px-2 -ml-1 rounded-xl text-deepViolet hover:bg-deepViolet/10 active:scale-95 transition-all group"
              title="Return to Profile"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5] group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-xs font-bold">Profile</span>
            </button>

            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Connected Devices
            </h2>

            <div className="p-1.5 rounded-lg bg-deepViolet/10 text-deepViolet">
              <Wifi className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-3.5 space-y-3.5 no-scrollbar">
            {/* Wi-Fi Telemetry Card */}
            <div>
              <p className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase px-1 mb-1.5">
                Local Wi-Fi Network
              </p>
              <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                      <Wifi className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Local-Industries-IoT-5G</h3>
                      <p className="text-[10px] text-slate-500">Dedicated Smart Appliance Band</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    Connected (100%)
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-polar-200/80 border border-slate-200 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Signal Strength:</span>
                    <span className="font-bold text-slate-800">-42 dBm (Excellent)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">IP Address:</span>
                    <span className="font-mono font-bold text-slate-800">192.168.1.142</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Security:</span>
                    <span className="font-bold text-slate-800">WPA3-Personal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hardware Bus Interconnect */}
            <div>
              <p className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase px-1 mb-1.5">
                Internal Hardware Bus
              </p>
              <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Rear Electrical Prong Bus:</span>
                  <span className="font-bold text-deepViolet">Synchronized (240V/30A)</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Magnetic Interlock Rail:</span>
                  <span className="font-bold text-emerald-600">Engaged & Latched</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-600 font-medium">Cassette Bus Latency:</span>
                  <span className="font-mono font-bold text-slate-800">&lt; 2 ms (Direct)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. SUBPAGE 4: ABOUT APP (Smooth Mobile Push Screen)             */}
      {/* ============================================================== */}
      {activeSection === 'about' && (
        <div className={`absolute inset-0 z-30 bg-polar-200 flex flex-col ${isClosing ? 'animate-mobile-page-exit' : 'animate-mobile-page-enter'}`}>
          <div className="shrink-0 px-4 sm:px-5 py-3.5 bg-polar-200/95 backdrop-blur-md border-b border-polar-300 flex items-center justify-between z-10 select-none">
            <button
              onClick={handleCloseSection}
              className="flex items-center gap-1.5 py-1 px-2 -ml-1 rounded-xl text-deepViolet hover:bg-deepViolet/10 active:scale-95 transition-all group"
              title="Return to Profile"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5] group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-xs font-bold">Profile</span>
            </button>

            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
              About Application
            </h2>

            <div className="p-1.5 rounded-lg bg-deepViolet/10 text-deepViolet">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-3.5 space-y-3.5 no-scrollbar">
            {/* App Branding Card */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-deepViolet to-sky-600 flex items-center justify-center text-white shadow-lg mb-2">
                <span className="text-xl font-extrabold font-['Space_Grotesk'] tracking-wider">NT</span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">
                NO-TECH HVAC Smart Companion
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Version 1.0.0 • Build 2026.11
              </p>
            </div>

            {/* Specifications Details */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Hardware Series:</span>
                <span className="font-bold text-deepViolet">{specs.model}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Firmware Build:</span>
                <span className="font-mono font-bold text-emerald-600">v4.2.1-modular-bus</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Serial Identification:</span>
                <span className="font-mono font-bold text-slate-800">{specs.serialNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Warranty:</span>
                <span className="font-bold text-slate-800">{specs.warranty}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Safety Rating:</span>
                <span className="font-bold text-slate-800">UL 1995 / AHRI Certified</span>
              </div>
            </div>

            <div className="text-center text-[10.5px] text-slate-400 py-2">
              © 2026 Local Industries. Engineered for seamless modular comfort.
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 6. SUBPAGE 5: HELP & SUPPORT (Smooth Mobile Push Screen)       */}
      {/* ============================================================== */}
      {activeSection === 'support' && (
        <div className={`absolute inset-0 z-30 bg-polar-200 flex flex-col ${isClosing ? 'animate-mobile-page-exit' : 'animate-mobile-page-enter'}`}>
          <div className="shrink-0 px-4 sm:px-5 py-3.5 bg-polar-200/95 backdrop-blur-md border-b border-polar-300 flex items-center justify-between z-10 select-none">
            <button
              onClick={handleCloseSection}
              className="flex items-center gap-1.5 py-1 px-2 -ml-1 rounded-xl text-deepViolet hover:bg-deepViolet/10 active:scale-95 transition-all group"
              title="Return to Profile"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5] group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-xs font-bold">Profile</span>
            </button>

            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Help & Support
            </h2>

            <div className="p-1.5 rounded-lg bg-deepViolet/10 text-deepViolet">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-3.5 space-y-3.5 no-scrollbar">
            {/* Direct Contractor Hotline Card */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900">Contractor Hotline</h3>
                    <p className="text-[11px] text-slate-500">{specs.contractor.company}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9.5px] font-bold">
                  24/7 Priority
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-polar-200/70 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">Direct Telephone Line</p>
                  <p className="font-mono text-sm font-extrabold text-deepViolet">{specs.contractor.phone}</p>
                </div>
                <a
                  href={`tel:${specs.contractor.phone}`}
                  className="px-4 py-2 rounded-xl bg-deepViolet text-white font-bold text-xs shadow-md hover:bg-deepViolet-800 active:scale-95 transition-all"
                >
                  Call Now
                </a>
              </div>
            </div>

            {/* Quick Support FAQs */}
            <div>
              <p className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase px-1 mb-1.5">
                Quick Answers
              </p>
              <div className="space-y-2">
                {[
                  {
                    q: 'How do I replace a modular compartment cassette?',
                    a: 'Tilt the front recessed handle forward ~30° to disengage the magnetic lock, then pull straight out. The rear high-amp electrical prongs disconnect automatically with zero loose wires.'
                  },
                  {
                    q: 'How does the automatic filtration roll work?',
                    a: 'A motorized micro-stepper indexes fresh media across seasonal cycles based on airflow pressure differentials, maintaining clean air without manual replacement.'
                  },
                  {
                    q: 'What is the warranty coverage?',
                    a: 'All VIVID-400 series modules are protected by our 10-Year Modular Quick-Swap Guarantee backed by certified Local Industries contractors.'
                  }
                ].map((faq, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                    <h4 className="text-xs font-bold text-slate-800">{faq.q}</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 7. LOG OUT CONFIRMATION (Smooth Mobile Bottom Sheet)           */}
      {/* ============================================================== */}
      {activeSection === 'logout' && (
        <div className={`fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-end justify-center ${isClosing ? 'animate-backdrop-out' : 'animate-backdrop-in'}`}>
          <div className={`w-full max-w-[420px] bg-white rounded-t-[32px] p-6 shadow-2xl border-t border-slate-100 flex flex-col text-center pb-8 ${isClosing ? 'animate-mobile-sheet-exit' : 'animate-mobile-sheet-enter'}`}>
            {/* Drag Pill Handle */}
            <div className="w-12 h-1.5 rounded-full bg-slate-300 mx-auto mb-4" />

            <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <LogOut className="w-6 h-6 stroke-[2.2]" />
            </div>

            <h3 className="text-base font-extrabold text-slate-900">
              Sign Out of Companion Account
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 px-4 leading-relaxed">
              Are you sure you want to sign out of <span className="font-bold text-slate-700">{userProfile.name}</span> on this device?
            </p>

            <div className="grid grid-cols-2 gap-2.5 mt-5">
              <button
                onClick={handleCloseSection}
                className="py-3 rounded-2xl neu-button text-xs font-bold text-slate-700 active:scale-98 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleCloseSection();
                  setCurrentScreen('home');
                }}
                className="py-3 rounded-2xl bg-red-600 text-white text-xs font-bold shadow-lg shadow-red-500/20 hover:bg-red-700 active:scale-98 transition-all"
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
