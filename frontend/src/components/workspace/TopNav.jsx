import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, LogOut, User, Palette, Briefcase, HelpCircle, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAppStore from '../../store/useAppStore';

export default function TopNav({ onToggleSidebar }) {
  const activeModule = useAppStore(state => state.activeModule);
  const setNotificationsOpen = useAppStore(state => state.setNotificationsOpen);
  const notifications = useAppStore(state => state.notifications);
  const setCommandPaletteOpen = useAppStore(state => state.setCommandPaletteOpen);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const user = useAppStore(state => state.user);
  const firstName = user?.full_name?.split(' ')[0] || 'User';

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    useAppStore.getState().logout();
    window.location.href = '/login';
  };

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-30 px-6 flex items-center justify-between">
      {/* Left side: Greeting & Sync */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="flex flex-col hidden sm:flex">
          <h2 className="text-white font-bold text-lg tracking-tight">Good Morning, {firstName} 👋</h2>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs font-medium text-text-secondary">{currentDate}</span>
            <span className="w-1 h-1 rounded-full bg-border-light" />
            <span className="text-xs text-text-muted">Last Sync • Just now</span>
          </div>
        </div>
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

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-teal/50"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-accent-purple to-accent-blue flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">{firstName.charAt(0)}</span>
            </div>
            <span className="text-sm font-medium text-white">{firstName}</span>
            <ChevronDown size={14} className={`text-text-muted transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-3 w-56 bg-card/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-premium overflow-hidden z-50 flex flex-col"
              >
                <div className="px-4 py-3 border-b border-white/10 flex flex-col">
                  <span className="text-sm font-bold text-white">{user?.full_name || 'Vinayak Kale'}</span>
                  <span className="text-xs text-text-muted">{user?.email || 'vinayak@example.com'}</span>
                </div>
                
                <div className="p-2 flex flex-col gap-1">
                  <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 text-text-secondary hover:text-white transition-colors text-sm font-medium w-full text-left">
                    <User size={16} /> My Profile
                  </button>
                  <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 text-text-secondary hover:text-white transition-colors text-sm font-medium w-full text-left">
                    <Briefcase size={16} /> Workspace
                  </button>
                  <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 text-text-secondary hover:text-white transition-colors text-sm font-medium w-full text-left">
                    <Palette size={16} /> Theme
                  </button>
                  <button onClick={() => { setNotificationsOpen(true); setIsProfileOpen(false); }} className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/5 text-text-secondary hover:text-white transition-colors text-sm font-medium w-full text-left">
                    <div className="flex items-center gap-3"><Bell size={16} /> Notifications</div>
                    {unreadCount > 0 && <span className="px-1.5 py-0.5 rounded bg-accent-teal/20 text-accent-teal text-[10px] font-bold">{unreadCount}</span>}
                  </button>
                  <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 text-text-secondary hover:text-white transition-colors text-sm font-medium w-full text-left">
                    <HelpCircle size={16} /> Help Center
                  </button>
                </div>

                <div className="p-2 border-t border-white/10">
                  <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors text-sm font-bold w-full text-left">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
