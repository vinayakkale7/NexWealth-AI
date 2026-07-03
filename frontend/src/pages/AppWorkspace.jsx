import React, { useEffect } from 'react';
import WorkspaceLayout from '../layouts/WorkspaceLayout';
import DashboardModule from '../components/workspace/DashboardModule';
import PortfolioModule from '../components/workspace/PortfolioModule';
import GoalsModule from '../components/workspace/GoalsModule';
import AdvisorModule from '../components/workspace/AdvisorModule';
import FamilyModule from '../components/workspace/FamilyModule';
import ReportsModule from '../components/workspace/ReportsModule';
import TaxCenterModule from '../components/workspace/TaxCenterModule';
import SettingsModule from '../components/workspace/SettingsModule';
import { AnimatePresence, motion } from 'framer-motion';
import useAppStore from '../store/useAppStore';
import CommandPalette from '../components/shared/CommandPalette';
import NotificationDrawer from '../components/shared/NotificationDrawer';

export default function AppWorkspace() {
  const activeModule = useAppStore(state => state.activeModule);
  const setCommandPaletteOpen = useAppStore(state => state.setCommandPaletteOpen);

  // Setup Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCommandPaletteOpen]);

  const renderModule = () => {
    switch (activeModule) {
      case 'Dashboard': return <DashboardModule />;
      case 'Portfolio': return <PortfolioModule />;
      case 'Goals': return <GoalsModule />;
      case 'AI Advisor': return <AdvisorModule />;
      case 'Family': return <FamilyModule />;
      case 'Reports': return <ReportsModule />;
      case 'Tax Center': return <TaxCenterModule />;
      case 'Settings': return <SettingsModule />;
      default: return <DashboardModule />;
    }
  };

  return (
    <>
      <WorkspaceLayout>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="h-full w-full"
          >
            {renderModule()}
          </motion.div>
        </AnimatePresence>
      </WorkspaceLayout>
      <CommandPalette />
      <NotificationDrawer />
    </>
  );
}
