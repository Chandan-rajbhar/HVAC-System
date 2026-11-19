import React from 'react';
import { HVACProvider, useHVAC } from './context/HVACContext';
import PhoneFrame from './components/common/PhoneFrame';
import Header from './components/common/Header';
import BottomNav from './components/common/BottomNav';
import HomeScreen from './components/screens/HomeScreen';
import ClimateControlScreen from './components/screens/ClimateControlScreen';
import EnergyScreen from './components/screens/EnergyScreen';
import MoreScreen from './components/screens/MoreScreen';
import SystemMonitoringScreen from './components/screens/SystemMonitoringScreen';
import SmartMaintenanceScreen from './components/screens/SmartMaintenanceScreen';
import ProfileSettingsScreen from './components/screens/ProfileSettingsScreen';
import NotificationScreen from './components/screens/NotificationScreen';
import EnergyModal from './components/common/EnergyModal';
import CompartmentDetailModal from './components/hvac/CompartmentDetailModal';
import ReplacementWorkflowModal from './components/hvac/ReplacementWorkflowModal';

function AppContent() {
  const { currentScreen } = useHVAC();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'notifications':
        return <NotificationScreen />;
      case 'control':
        return <ClimateControlScreen />;
      case 'energy':
        return <EnergyScreen />;
      case 'more':
        return <MoreScreen />;
      case 'system':
        return <SystemMonitoringScreen />;
      case 'care':
        return <SmartMaintenanceScreen />;
      case 'profile':
        return <ProfileSettingsScreen />;
      case 'home':
      default:
        return <HomeScreen />;
    }
  };

  return (
    <PhoneFrame
      header={<Header />}
      bottomNav={<BottomNav />}
      modals={
        <>
          <EnergyModal />
          <CompartmentDetailModal />
          <ReplacementWorkflowModal />
        </>
      }
    >
      {renderScreen()}
    </PhoneFrame>
  );
}

export default function App() {
  return (
    <HVACProvider>
      <AppContent />
    </HVACProvider>
  );
}
