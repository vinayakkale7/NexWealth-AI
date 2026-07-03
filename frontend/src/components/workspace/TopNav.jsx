import React from 'react';
import { Search, Bell, Moon, Sun, ChevronDown, User, Settings2 } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

export default function TopNav({ activeModule }) {
  const setNotificationsOpen = useAppStore(state => state.setNotificationsOpen);
  const notifications = useAppStore(state => state.notifications);
  const setCommandPaletteOpen = useAppStore(state => state.setCommandPaletteOpen);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-30 px-6 flex items-center justify-between">
      {/* Left side: Breadcrumb & Date */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="hover:text-white cursor-pointer transition-colors">Workspace</span>
          <span className="text-border-light">/</span>
          <span className="text-white font-medium">{activeModule}</span>
        </div>
        <span className="text-xs text-text-muted mt-0.5">{currentDate}</span>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <button 
            onClick={() => setCommandPaletteOpen(true)}
            className="w-64 bg-black/20 border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-sm text-text-muted text-left hover:border-accent-teal/50 transition-all"
          >
            Search commands, assets...
          </button>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-text-muted">⌘</span>
            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-text-muted">K</span>
          </div>
        </div>

        <div className="w-px h-5 bg-border mx-1" />

        {/* Action Icons */}
        <button 
          onClick={() => setNotificationsOpen(true)}
          className="p-2 rounded-full text-text-secondary hover:text-white hover:bg-white/10 transition-colors relative"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent-teal border-2 border-background" />
          )}
        </button>

        <button className="p-2 rounded-full text-text-secondary hover:text-white hover:bg-white/10 transition-colors">
          <Moon size={18} />
        </button>

        {/* Workspace Switcher */}
        <button className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
          <div className="w-5 h-5 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue">
            <User size={12} />
          </div>
          <span className="text-sm font-medium text-white">Family Trust</span>
          <ChevronDown size={14} className="text-text-muted" />
        </button>
      </div>
    </header>
  );
}
