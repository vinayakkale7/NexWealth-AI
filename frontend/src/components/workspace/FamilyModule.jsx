import React from 'react';
import { motion } from 'framer-motion';
import { Users, Crown, Settings2, UserPlus, ShieldAlert } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

export default function FamilyModule() {
  const family = useAppStore(state => state.family);

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Family Management</h1>
          <p className="text-text-secondary">Manage access, view joint assets, and plan generations ahead.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all">
          <UserPlus size={16} />
          <span>Invite Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {family.map((member, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={member.id} 
              className="glass-panel p-5 rounded-2xl flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent-purple/80 to-accent-blue/80 flex items-center justify-center p-[2px] shadow-glow">
                  <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{member.avatar}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{member.name}</h3>
                    {member.role === 'Owner' && <Crown size={14} className="text-amber-400" />}
                    {member.isPro && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-accent-purple/20 text-accent-purple border border-accent-purple/30">PRO</span>
                    )}
                  </div>
                  <p className="text-sm text-text-muted">{member.role} • {member.access}</p>
                </div>
              </div>
              <button className="p-2 rounded-xl border border-white/10 text-text-muted hover:text-white hover:bg-white/10 transition-all">
                <Settings2 size={18} />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-sm font-medium text-text-secondary mb-4 flex items-center gap-2">
              <ShieldAlert size={16} className="text-accent-blue" />
              Access & Security
            </h3>
            <p className="text-sm text-text-muted mb-4 leading-relaxed">
              Joint accounts are protected by multi-party approval. High-value transactions require authentication from all Full Access members.
            </p>
            <button className="w-full py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white hover:bg-white/10 transition-colors">
              Review Permissions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
