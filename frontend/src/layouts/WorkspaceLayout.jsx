import React, { useState } from 'react';
import Sidebar from '../components/workspace/Sidebar';
import TopNav from '../components/workspace/TopNav';

import useAppStore from '../store/useAppStore';
import AddAssetModal from '../components/workspace/AddAssetModal';
import ImportPortfolioModal from '../components/workspace/ImportPortfolioModal';

export default function WorkspaceLayout({ children }) {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isDemoMode = useAppStore(state => state.isDemoMode);
  const toggleDemoMode = useAppStore(state => state.toggleDemoMode);
  
  const isAddAssetModalOpen = useAppStore(state => state.isAddAssetModalOpen);
  const setAddAssetModalOpen = useAppStore(state => state.setAddAssetModalOpen);
  const isImportModalOpen = useAppStore(state => state.isImportModalOpen);
  const setImportModalOpen = useAppStore(state => state.setImportModalOpen);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden selection:bg-accent-teal/30 selection:text-white">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent-purple/10 blur-[120px] animate-blob" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent-teal/10 blur-[100px] animate-blob animation-delay-4000" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-accent-blue/10 blur-[90px] animate-blob animation-delay-2000" />
      </div>

      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex flex-col flex-1 relative z-10 overflow-hidden">
        {isDemoMode && (
          <div className="w-full bg-accent-teal text-background py-1.5 px-4 flex items-center justify-center gap-4 z-50 shadow-glow font-medium text-sm">
            <span>Demo Mode Enabled. Explore simulated financial data.</span>
            <button onClick={toggleDemoMode} className="font-bold underline hover:text-white transition-colors">Exit Demo Mode</button>
          </div>
        )}
        <TopNav onToggleSidebar={() => setSidebarCollapsed(!isSidebarCollapsed)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar p-6">
          <div className="max-w-[1400px] mx-auto h-full">
            {children}
          </div>
        </main>
      </div>

      <AddAssetModal isOpen={isAddAssetModalOpen} onClose={() => setAddAssetModalOpen(false)} />
      <ImportPortfolioModal isOpen={isImportModalOpen} onClose={() => setImportModalOpen(false)} />
    </div>
  );
}
