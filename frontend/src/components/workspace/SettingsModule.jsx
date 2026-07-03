import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Bell, Key, CreditCard, Palette, Globe } from 'lucide-react';

const SETTINGS_SECTIONS = [
  { id: 'profile', icon: User, label: 'Profile & Account' },
  { id: 'security', icon: Shield, label: 'Security' },
  { id: 'billing', icon: CreditCard, label: 'Billing & Plan' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'connected', icon: Key, label: 'Connected Accounts' },
  { id: 'appearance', icon: Palette, label: 'Appearance' },
  { id: 'language', icon: Globe, label: 'Language & Region' },
];

export default function SettingsModule() {
  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Settings</h1>
          <p className="text-text-secondary">Manage your preferences and account security.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-1">
          {SETTINGS_SECTIONS.map((section, idx) => {
            const Icon = section.icon;
            const isActive = idx === 0;
            return (
              <button 
                key={section.id} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${isActive ? 'bg-white/10 text-white' : 'text-text-secondary hover:bg-white/5 hover:text-white'}`}
              >
                <Icon size={18} className={isActive ? 'text-accent-teal' : 'text-text-muted'} />
                {section.label}
              </button>
            );
          })}
        </div>
        
        <div className="flex-1 glass-panel rounded-2xl p-8">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-accent-purple to-accent-blue p-[2px]">
                <div className="w-full h-full bg-background rounded-full flex items-center justify-center text-2xl font-bold text-white">
                  VK
                </div>
              </div>
              <button className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-all">
                Change Avatar
              </button>
            </div>

            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-text-muted uppercase tracking-wider">First Name</label>
                  <input type="text" defaultValue="Vinayak" className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-accent-teal/50 transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-text-muted uppercase tracking-wider">Last Name</label>
                  <input type="text" defaultValue="Kale" className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-accent-teal/50 transition-all" />
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-text-muted uppercase tracking-wider">Email Address</label>
                <input type="email" defaultValue="vinayak.kale@example.com" disabled className="w-full bg-black/40 border border-white/5 rounded-xl py-2.5 px-4 text-sm text-text-muted cursor-not-allowed" />
                <p className="text-xs text-text-muted mt-1">Email cannot be changed directly. Contact support.</p>
              </div>

              <div className="pt-6 border-t border-white/10 mt-2">
                <button className="px-6 py-2.5 rounded-xl bg-accent-teal text-white text-sm font-bold shadow-glow hover:bg-accent-teal/90 transition-all">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
