import React from 'react';
import { motion } from 'framer-motion';
import { Users, Crown, Settings2, UserPlus, ShieldAlert, PieChart, Activity, Lock } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

export default function FamilyModule() {
  const family = useAppStore(state => state.family);

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">Family Office</h1>
          <p className="text-text-secondary">Manage cross-generational wealth, access, and shared assets.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-all shadow-glow hover:-translate-y-0.5">
          <UserPlus size={16} />
          <span>Invite Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Members Grid */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-6 flex items-center gap-2">
              <Users size={16} /> Family Members
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {family.map((member, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={member.id} 
                  className="p-5 rounded-2xl flex flex-col gap-4 bg-white/5 border border-white/5 group hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-purple/80 to-accent-blue/80 flex items-center justify-center p-[2px] shadow-glow">
                        <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{member.avatar}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white">{member.name}</h3>
                          {member.role === 'Owner' && <Crown size={12} className="text-amber-400" />}
                        </div>
                        <p className="text-xs text-text-muted">{member.role}</p>
                      </div>
                    </div>
                    <button className="p-2 rounded-xl text-text-muted hover:text-white hover:bg-white/10 transition-all">
                      <Settings2 size={16} />
                    </button>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex justify-between items-center text-xs">
                    <span className="text-text-muted">Access Level</span>
                    <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded uppercase tracking-wide">{member.access}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-6 flex items-center gap-2">
              <Activity size={16} /> Shared Activity Timeline
            </h3>
            <div className="flex flex-col gap-6 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-white/5 ml-2">
              {[
                { title: 'New Goal Created', desc: 'Sneha added "Aarav College Fund"', time: '2 hours ago', color: 'bg-accent-purple' },
                { title: 'Asset Added', desc: 'Vinayak added HDFC Fixed Deposit', time: 'Yesterday', color: 'bg-accent-teal' },
                { title: 'Tax Report Generated', desc: 'Downloaded FY 25-26 Summary', time: 'Last Week', color: 'bg-accent-emerald' }
              ].map((event, i) => (
                <div key={i} className="flex gap-4 relative">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-background border-4 border-background shadow-[0_0_0_1px_rgba(255,255,255,0.1)] shrink-0 z-10`}>
                    <div className={`w-2 h-2 rounded-full ${event.color}`} />
                  </div>
                  <div className="flex flex-col pt-0.5">
                    <span className="text-sm font-bold text-white">{event.title}</span>
                    <span className="text-sm text-text-secondary">{event.desc}</span>
                    <span className="text-xs text-text-muted mt-1">{event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Net Worth Split */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-4 flex items-center gap-2">
              <PieChart size={16} /> Net Worth Split
            </h3>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-3xl font-bold text-white">₹1.58Cr</span>
              <span className="text-sm text-text-muted mb-1">Total Family Wealth</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-white">Vinayak</span>
                  <span className="text-text-secondary">₹95L</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-teal rounded-full w-[60%]" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-white">Sneha</span>
                  <span className="text-text-secondary">₹45L</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-purple rounded-full w-[28.5%]" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-white">Joint / Shared</span>
                  <span className="text-text-secondary">₹18L</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-blue rounded-full w-[11.5%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Permissions & Security */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-4 flex items-center gap-2">
              <Lock size={16} /> Permissions Engine
            </h3>
            <div className="p-4 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex flex-col gap-2 mb-4">
              <span className="text-xs font-bold text-accent-blue flex items-center gap-1.5"><ShieldAlert size={14}/> Multi-Party Auth Active</span>
              <p className="text-xs text-white/80 leading-relaxed">
                High-value transactions (over ₹5L) currently require approval from 2 out of 2 Adult members.
              </p>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-white hover:bg-white/10 transition-colors">
              Manage Access Policies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
