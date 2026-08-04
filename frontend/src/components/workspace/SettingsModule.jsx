import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, Bell, Key, CreditCard, Palette, Globe, Smartphone, Monitor } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

const SETTINGS_SECTIONS = [
  { id: 'profile', icon: User, label: 'Profile & Account' },
  { id: 'security', icon: Shield, label: 'Security' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'workspace', icon: Globe, label: 'Workspace' },
  { id: 'theme', icon: Palette, label: 'Appearance' },
  { id: 'connected', icon: Key, label: 'Connected Accounts' }
];

export default function SettingsModule() {
  const [activeSection, setActiveSection] = useState('profile');
  const user = useAppStore(state => state.user);

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">Settings</h1>
          <p className="text-text-secondary">Manage your workspace preferences and account security.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-1">
          {SETTINGS_SECTIONS.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button 
                key={section.id} 
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold tracking-tight ${isActive ? 'bg-white/10 text-white shadow-sm' : 'text-text-secondary hover:bg-white/5 hover:text-white'}`}
              >
                <Icon size={18} className={isActive ? 'text-accent-teal' : 'text-text-muted'} />
                {section.label}
              </button>
            );
          })}
        </div>
        
        {/* Content Area */}
        <div className="flex-1 glass-panel rounded-3xl p-8 border border-white/5 min-h-[600px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeSection === 'profile' && (
              <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-2xl">
                <h2 className="text-xl font-bold text-white mb-8 tracking-tight">Profile Information</h2>
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-accent-purple to-accent-blue p-[2px] shadow-glow-purple">
                    <div className="w-full h-full bg-background rounded-full flex items-center justify-center text-3xl font-black text-white">
                      {user?.fullName?.charAt(0) || 'V'}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-bold hover:bg-white/20 transition-all">Change Avatar</button>
                    <button className="text-xs font-bold text-red-400 hover:text-red-300">Remove Photo</button>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Full Name</label>
                      <input type="text" defaultValue={user?.fullName || "Vinayak Kale"} className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-sm font-medium text-white focus:outline-none focus:border-accent-teal/50 focus:ring-1 focus:ring-accent-teal/50 transition-all" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Phone Number</label>
                      <input type="text" defaultValue="+91 98765 43210" className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-sm font-medium text-white focus:outline-none focus:border-accent-teal/50 focus:ring-1 focus:ring-accent-teal/50 transition-all" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Email Address</label>
                    <input type="email" defaultValue={user?.email || "vinayak@example.com"} disabled className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-sm font-medium text-text-muted cursor-not-allowed" />
                    <p className="text-xs text-text-muted mt-1">Email cannot be changed directly. Please contact support.</p>
                  </div>
                  <div className="pt-8 border-t border-white/5 mt-4">
                    <button className="px-6 py-3 rounded-xl bg-accent-teal text-white text-sm font-bold shadow-glow hover:bg-accent-teal/90 transition-all hover:-translate-y-0.5">Save Changes</button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 'security' && (
              <motion.div key="security" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-2xl">
                <h2 className="text-xl font-bold text-white mb-8 tracking-tight">Security & Authentication</h2>
                <div className="space-y-6">
                  <div className="p-5 rounded-2xl border border-white/5 bg-white/5 flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-bold mb-1">Two-Factor Authentication</h3>
                      <p className="text-sm text-text-secondary">Add an extra layer of security to your account.</p>
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-accent-purple text-white text-sm font-bold shadow-glow-purple hover:bg-accent-purple/90 transition-all">Enable 2FA</button>
                  </div>
                  <div className="p-5 rounded-2xl border border-white/5 bg-white/5">
                    <h3 className="text-white font-bold mb-4">Active Sessions</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-4 border-b border-white/5">
                        <div className="flex items-center gap-3">
                          <Monitor className="text-accent-teal" size={20} />
                          <div>
                            <span className="text-sm font-bold text-white block">Windows 11 • Edge Browser</span>
                            <span className="text-xs text-text-muted">Mumbai, India (Current Session)</span>
                          </div>
                        </div>
                        <span className="px-2 py-1 rounded bg-accent-teal/20 text-accent-teal text-[10px] font-bold uppercase tracking-wider">Active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Smartphone className="text-text-muted" size={20} />
                          <div>
                            <span className="text-sm font-bold text-white block">iPhone 14 Pro • Safari</span>
                            <span className="text-xs text-text-muted">Pune, India (Last active 2 days ago)</span>
                          </div>
                        </div>
                        <button className="text-xs font-bold text-red-400 hover:text-red-300">Revoke</button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection !== 'profile' && activeSection !== 'security' && (
              <motion.div key="other" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center justify-center h-full text-center opacity-70">
                <Globe size={48} className="text-accent-teal mb-4" />
                <h2 className="text-xl font-bold text-white mb-2 tracking-tight">Coming Soon</h2>
                <p className="text-sm text-text-muted max-w-xs">These settings are being migrated to the new workspace architecture.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
