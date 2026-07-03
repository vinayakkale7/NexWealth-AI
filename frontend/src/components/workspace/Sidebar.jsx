import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  PieChart, 
  Target, 
  BrainCircuit, 
  Users, 
  FileText, 
  Receipt, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';

const MENU_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Portfolio', icon: PieChart },
  { name: 'Goals', icon: Target },
  { name: 'AI Advisor', icon: BrainCircuit },
  { name: 'Family', icon: Users },
  { name: 'Reports', icon: FileText },
  { name: 'Tax Center', icon: Receipt },
  { name: 'Settings', icon: Settings },
];

export default function Sidebar({ isCollapsed, setCollapsed, activeModule, setActiveModule }) {
  return (
    <motion.aside
      initial={{ width: 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative z-20 h-screen bg-card backdrop-blur-3xl border-r border-border flex flex-col justify-between"
    >
      <div className="p-4 flex-1 flex flex-col gap-6">
        <div className="flex items-center justify-between px-2">
          {!isCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-teal to-accent-blue flex items-center justify-center shadow-glow">
                <BrainCircuit size={18} className="text-white" />
              </div>
              <span className="font-semibold text-lg tracking-tight">NexWealth AI</span>
            </motion.div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 mx-auto rounded-lg bg-gradient-to-tr from-accent-teal to-accent-blue flex items-center justify-center shadow-glow">
              <BrainCircuit size={18} className="text-white" />
            </div>
          )}
        </div>

        <nav className="flex-1 flex flex-col gap-1">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.name;
            
            return (
              <button
                key={item.name}
                onClick={() => setActiveModule(item.name)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
                  ${isActive ? 'text-white bg-white/5' : 'text-text-secondary hover:text-white hover:bg-white/5'}
                `}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-teal/10 to-transparent border-l-2 border-accent-teal"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon size={20} className={`relative z-10 transition-colors ${isActive ? 'text-accent-teal' : 'group-hover:text-white'}`} />
                {!isCollapsed && (
                  <span className="relative z-10 text-sm font-medium">{item.name}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-border flex flex-col gap-4">
        {!isCollapsed && (
          <div className="p-4 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex items-center gap-3 mb-2">
              <Zap size={16} className="text-accent-purple" />
              <span className="text-sm font-medium text-white">Pro Plan</span>
            </div>
            <p className="text-xs text-text-muted mb-3 relative z-10">Advanced AI and Tax Optimization active.</p>
            <button className="relative z-10 w-full py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              Upgrade
            </button>
          </div>
        )}

        <div className="flex items-center justify-between gap-3 px-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-accent-purple to-accent-blue p-[2px]">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <span className="text-xs font-bold text-white">VK</span>
              </div>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white leading-tight">Vinayak Kale</span>
                <span className="text-xs text-text-muted">Pro Member</span>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg text-text-muted hover:text-white hover:bg-white/10 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
