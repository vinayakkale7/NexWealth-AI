import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutDashboard, PieChart, Target, BrainCircuit, Users, FileText, Receipt, Settings } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

const COMMANDS = [
  { id: 'dashboard', name: 'Go to Dashboard', icon: LayoutDashboard, action: 'Dashboard' },
  { id: 'portfolio', name: 'Open Portfolio', icon: PieChart, action: 'Portfolio' },
  { id: 'goals', name: 'View Goals', icon: Target, action: 'Goals' },
  { id: 'advisor', name: 'Ask AI Advisor', icon: BrainCircuit, action: 'AI Advisor' },
  { id: 'family', name: 'Manage Family', icon: Users, action: 'Family' },
  { id: 'reports', name: 'Generate Report', icon: FileText, action: 'Reports' },
  { id: 'tax', name: 'Tax Center', icon: Receipt, action: 'Tax Center' },
  { id: 'settings', name: 'Open Settings', icon: Settings, action: 'Settings' },
];

export default function CommandPalette() {
  const isOpen = useAppStore(state => state.isCommandPaletteOpen);
  const setOpen = useAppStore(state => state.setCommandPaletteOpen);
  const setActiveModule = useAppStore(state => state.setActiveModule);
  
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = COMMANDS.filter(cmd => 
    cmd.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setSelectedIndex(0);
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      }
      if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault();
        setActiveModule(filteredCommands[selectedIndex].action);
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, setActiveModule, setOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-start justify-center pt-[15vh] px-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-2xl bg-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center px-4 py-3 border-b border-white/10">
                <Search size={20} className="text-text-muted mr-3" />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="What do you need?"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none text-white text-lg focus:outline-none placeholder:text-text-muted"
                />
                <div className="flex gap-1 ml-2">
                  <span className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded text-text-muted font-medium">ESC</span>
                </div>
              </div>

              <div className="max-h-[300px] overflow-y-auto p-2 hide-scrollbar">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd, i) => {
                    const Icon = cmd.icon;
                    const isSelected = i === selectedIndex;
                    return (
                      <div 
                        key={cmd.id}
                        onMouseEnter={() => setSelectedIndex(i)}
                        onClick={() => {
                          setActiveModule(cmd.action);
                          setOpen(false);
                        }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${
                          isSelected ? 'bg-white/10' : 'hover:bg-white/5'
                        }`}
                      >
                        <Icon size={18} className={isSelected ? 'text-white' : 'text-text-secondary'} />
                        <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-text-secondary'}`}>
                          {cmd.name}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-text-muted text-sm">
                    No commands found.
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
