import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  INITIAL_HVAC_STATE, 
  COMPARTMENTS as INITIAL_COMPARTMENTS, 
  FACEPLATE_COLORS, 
  INITIAL_NOTIFICATIONS, 
  SYSTEM_SPECS,
  ENERGY_DATA
} from '../data/hvacData';

const HVACContext = createContext();

export function HVACProvider({ children }) {
  // Navigation & Active Screen
  const [currentScreen, setCurrentScreen] = useState('home');
  const [previousScreen, setPreviousScreen] = useState('home');

  const navigateToNotifications = () => {
    if (currentScreen !== 'notifications') {
      setPreviousScreen(currentScreen);
    }
    setCurrentScreen('notifications');
  };

  const closeNotifications = () => {
    setCurrentScreen(previousScreen && previousScreen !== 'notifications' ? previousScreen : 'home');
  };
  
  // HVAC Core State
  const [power, setPower] = useState(INITIAL_HVAC_STATE.power);
  const [currentTemp, setCurrentTemp] = useState(INITIAL_HVAC_STATE.currentTemp);
  const [targetTemp, setTargetTemp] = useState(INITIAL_HVAC_STATE.targetTemp);
  const [tempUnit, setTempUnit] = useState(INITIAL_HVAC_STATE.tempUnit); // 'F' or 'C'
  const [mode, setMode] = useState(INITIAL_HVAC_STATE.mode);
  const [fanSpeed, setFanSpeed] = useState(INITIAL_HVAC_STATE.fanSpeed);
  const [swingMode, setSwingMode] = useState('on'); // 'on' or 'off'
  const [faceplateColor, setFaceplateColor] = useState(INITIAL_HVAC_STATE.faceplateColor);

  // User Profile
  const [userProfile, setUserProfile] = useState({
    name: 'Jordan Smith',
    email: 'jordan@example.com',
    status: 'Active Account',
    initials: 'JS',
    phone: '+1 (555) 234-5678',
    location: 'Residence • Living Suite',
  });
  
  // Health & Filter Status
  const [systemHealth, setSystemHealth] = useState(INITIAL_HVAC_STATE.systemHealth);
  const [filterLife, setFilterLife] = useState(INITIAL_HVAC_STATE.filterLife);
  const [daysUntilAdvance, setDaysUntilAdvance] = useState(INITIAL_HVAC_STATE.daysUntilAdvance);
  const [seasonsRemaining, setSeasonsRemaining] = useState(INITIAL_HVAC_STATE.seasonsRemaining);
  const [syncStatus, setSyncStatus] = useState(INITIAL_HVAC_STATE.syncStatus);
  const [lastSync, setLastSync] = useState(INITIAL_HVAC_STATE.lastSync);
  
  // Compartments
  const [compartments, setCompartments] = useState(INITIAL_COMPARTMENTS);
  
  // Notifications
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  
  // Maintenance History Log
  const [maintenanceHistory, setMaintenanceHistory] = useState([
    {
      id: 'h-1',
      date: 'Nov 09, 2026',
      title: 'Automatic Filter Media Advance',
      compartment: 'Filtration Dispenser',
      technician: 'System Automated',
      type: 'auto',
      status: 'Success',
      notes: 'Media index advanced 18 inches. Static pressure reduced by 0.12 in. w.g.'
    },
    {
      id: 'h-2',
      date: 'Oct 14, 2024',
      title: 'Full Modular Commissioning',
      compartment: 'All 4 Compartments',
      technician: 'Apex Climate Solutions (#ACS-9021)',
      type: 'manual',
      status: 'Verified',
      notes: 'Initial in-wall install and electrical bus synchronization.'
    }
  ]);
  
  // Modals & Drawers
  const [isEnergyOpen, setIsEnergyOpen] = useState(false);
  const [selectedCompartment, setSelectedCompartment] = useState(null);
  const [replacementModalCompartment, setReplacementModalCompartment] = useState(null);
  
  // Desktop Phone Frame display toggle
  const [showPhoneFrame, setShowPhoneFrame] = useState(true);
  const [phoneFrameTheme, setPhoneFrameTheme] = useState('dark'); // 'dark' or 'silver'

  // Temperature conversions
  const formatTemp = (tempF) => {
    if (tempUnit === 'C') {
      const c = Math.round(((tempF - 32) * 5) / 9);
      return `${c}°C`;
    }
    return `${Math.round(tempF)}°F`;
  };

  const getNumericTemp = (tempF) => {
    if (tempUnit === 'C') {
      return Math.round(((tempF - 32) * 5) / 9);
    }
    return Math.round(tempF);
  };

  const adjustTargetTemp = (delta) => {
    if (!power) return;
    setTargetTemp((prev) => {
      // delta is in degrees of current unit
      let newF;
      if (tempUnit === 'C') {
        const currentC = Math.round(((prev - 32) * 5) / 9);
        const nextC = Math.max(16, Math.min(30, currentC + delta));
        newF = Math.round((nextC * 9) / 5 + 32);
      } else {
        newF = Math.max(60, Math.min(85, prev + delta));
      }
      return newF;
    });
  };

  const setTargetTempFromUnit = (value) => {
    if (!power) return;
    if (tempUnit === 'C') {
      const f = Math.round((value * 9) / 5 + 32);
      setTargetTemp(Math.max(60, Math.min(85, f)));
    } else {
      setTargetTemp(Math.max(60, Math.min(85, value)));
    }
  };

  // Toggle power
  const togglePower = () => {
    setPower(prev => !prev);
  };

  // Toggle temp unit
  const toggleTempUnit = () => {
    setTempUnit(prev => prev === 'F' ? 'C' : 'F');
  };

  // Re-synchronize system bus (Simulated)
  const triggerManualSync = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('connected');
      setLastSync('Just now');
      // Update notification
      setNotifications(prev => [
        {
          id: `sync-${Date.now()}`,
          type: 'sync',
          severity: 'success',
          title: 'Manual Bus Sync Complete',
          message: 'All 4 compartments re-verified on the rear electrical prong bus. Diagnostic checks nominal.',
          time: 'Just now',
          read: false,
          badge: 'Diagnostic'
        },
        ...prev
      ]);
    }, 1200);
  };

  // Mark Replacement Complete Workflow
  const markReplacementComplete = (compartmentId) => {
    const comp = compartments.find(c => c.id === compartmentId);
    if (!comp) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#241A6E', '#10B981', '#F1F3F4', '#4632A4']
      });
    } catch {
      // fallback safe
    }

    // Update compartment status
    setCompartments(prev => prev.map(c => {
      if (c.id === compartmentId) {
        if (c.id === 'filtration') {
          return {
            ...c,
            status: 'operational',
            ledStatus: 'green',
            usedDays: 0,
            daysRemaining: 90,
            lastService: 'Replaced media cassette today',
            nextDue: 'In 90 days',
          };
        }
        return {
          ...c,
          status: 'operational',
          ledStatus: 'green',
          usedMonths: 0,
          lastService: 'Swapped modular cassette today',
          nextDue: `In ${c.lifeMonths} months`,
        };
      }
      return c;
    }));

    // Update filter specific stats if filtration
    if (compartmentId === 'filtration') {
      setFilterLife(100);
      setDaysUntilAdvance(90);
      setSeasonsRemaining(4);
    }

    // Boost system health score to optimal
    setSystemHealth(99);

    // Record into maintenance history
    const newLog = {
      id: `h-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      title: `${comp.name} Swap Completed`,
      compartment: comp.name,
      technician: 'Customer Quick-Swap (Verified via Rear Prongs)',
      type: 'manual',
      status: 'Optimal (Green)',
      notes: `Fresh ${comp.shortName} cassette engaged and locked. Rear electrical prong bus verified 100% signal.`
    };
    setMaintenanceHistory(prev => [newLog, ...prev]);

    // Add notification
    const newNotif = {
      id: `rep-${Date.now()}`,
      type: 'care',
      severity: 'success',
      title: `${comp.shortName} Replacement Verified`,
      message: `${comp.name} has been docked and confirmed operational. New replacement lifecycle countdown active.`,
      time: 'Just now',
      read: false,
      badge: 'Care Verified'
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Close replacement modal
    setReplacementModalCompartment(null);
  };

  // Notification actions
  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Backward-compatible notification modal/screen bridge
  const isNotificationOpen = currentScreen === 'notifications';
  const setIsNotificationOpen = (val) => {
    const nextVal = typeof val === 'function' ? val(currentScreen === 'notifications') : val;
    if (nextVal) {
      navigateToNotifications();
    } else {
      closeNotifications();
    }
  };

  return (
    <HVACContext.Provider value={{
      // Navigation
      currentScreen,
      setCurrentScreen,
      previousScreen,
      setPreviousScreen,
      navigateToNotifications,
      closeNotifications,
      navigate: (screen) => setCurrentScreen(screen),
      // HVAC State
      power,
      togglePower,
      currentTemp,
      targetTemp,
      adjustTargetTemp,
      setTargetTempFromUnit,
      tempUnit,
      toggleTempUnit,
      formatTemp,
      getNumericTemp,
      mode,
      setMode,
      fanSpeed,
      setFanSpeed,
      swingMode,
      setSwingMode,
      userProfile,
      setUserProfile,
      faceplateColor,
      setFaceplateColor,
      // Health & Sync
      systemHealth,
      filterLife,
      daysUntilAdvance,
      seasonsRemaining,
      syncStatus,
      lastSync,
      triggerManualSync,
      // Compartments
      compartments,
      selectedCompartment,
      setSelectedCompartment,
      replacementModalCompartment,
      setReplacementModalCompartment,
      markReplacementComplete,
      maintenanceHistory,
      // Notifications
      notifications,
      unreadCount,
      markNotificationRead,
      markAllNotificationsRead,
      clearAllNotifications,
      isNotificationOpen,
      setIsNotificationOpen,
      // Energy
      isEnergyOpen,
      setIsEnergyOpen,
      // Device frame controls
      showPhoneFrame,
      setShowPhoneFrame,
      phoneFrameTheme,
      setPhoneFrameTheme,
      // Static specs
      specs: SYSTEM_SPECS,
      energyData: ENERGY_DATA,
      faceplateColors: FACEPLATE_COLORS,
    }}>
      {children}
    </HVACContext.Provider>
  );
}

export function useHVAC() {
  const context = useContext(HVACContext);
  if (!context) {
    throw new Error('useHVAC must be used within an HVACProvider');
  }
  return context;
}
