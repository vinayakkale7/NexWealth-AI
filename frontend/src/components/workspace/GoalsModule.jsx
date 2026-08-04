import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Plus, Home, Car, GraduationCap, ChevronRight, TrendingUp, X, Sparkles } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

const ICONS = { Home, GraduationCap, Car };

export default function GoalsModule() {
  const goals = useAppStore(state => state.goals);
  const updateGoalTarget = useAppStore(state => state.updateGoalTarget);
  
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [simulatorValue, setSimulatorValue] = useState(0);

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Financial Goals</h1>
          <p className="text-text-secondary">Track and simulate your progress towards life milestones.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-all shadow-glow hover:-translate-y-0.5">
          <Plus size={16} /> New Goal
        </button>
      </div>

      {/* AI Suggestions Banner */}
      <div className="glass-panel p-4 rounded-xl border border-accent-purple/30 bg-accent-purple/5 flex items-start gap-4">
        <div className="p-2 rounded-lg bg-accent-purple/20 text-accent-purple shrink-0 mt-0.5">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-accent-purple mb-1">AI Goal Optimization</h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            Your "New Home" goal is on track. However, considering current inflation rates, increasing your monthly SIP by ₹5,000 would increase the probability of success from 82% to 95%.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal, index) => {
          const Icon = ICONS[goal.icon] || Target;
          const progress = (goal.current / goal.target) * 100;
          return (
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={goal.id} 
              onClick={() => { setSelectedGoal(goal); setSimulatorValue(goal.target); }}
              className="text-left glass-panel p-6 rounded-2xl relative overflow-hidden group cursor-pointer border border-white/5 hover:border-white/20 hover:-translate-y-1 hover:shadow-glow transition-all"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon size={120} />
              </div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-glass" style={{ backgroundColor: `${goal.color}20`, border: `1px solid ${goal.color}40` }}>
                  <Icon size={24} style={{ color: goal.color }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{goal.title}</h3>
                  <p className="text-sm text-text-muted">Target: {goal.deadline}</p>
                </div>
              </div>

              <div className="mb-4 relative z-10">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-2xl font-bold text-white">₹{(goal.current / 100000).toFixed(1)}L</span>
                  <span className="text-sm font-medium text-text-secondary">of ₹{(goal.target / 100000).toFixed(1)}L</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(progress, 100)}%` }} transition={{ duration: 1, delay: 0.2 }} className="h-full rounded-full" style={{ backgroundColor: goal.color }} />
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-between items-center relative z-10">
                <div className="flex items-center gap-2 text-sm text-accent-emerald font-medium">
                  <TrendingUp size={16} />
                  <span>On Track</span>
                </div>
                <ChevronRight size={16} className="text-text-muted group-hover:text-white transition-colors group-hover:translate-x-1" />
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedGoal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedGoal(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="relative w-full max-w-md bg-background/95 glass-panel border border-white/10 rounded-3xl p-6 shadow-premium z-10">
              <button onClick={() => setSelectedGoal(null)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-text-muted hover:text-white"><X size={20} /></button>
              <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2"><Target size={20} style={{ color: selectedGoal.color }} /> Simulate {selectedGoal.title}</h2>
              <p className="text-sm text-text-muted mb-8">Adjust your target to see if it's achievable.</p>
              
              <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-text-secondary uppercase tracking-wider">Target Amount</span>
                  <span className="text-3xl font-black text-white" style={{ color: selectedGoal.color }}>₹{(simulatorValue / 100000).toFixed(1)}L</span>
                </div>
                <input 
                  type="range" min={selectedGoal.current} max={selectedGoal.target * 2} step={100000}
                  value={simulatorValue} onChange={(e) => setSimulatorValue(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer" style={{ accentColor: selectedGoal.color }}
                />
              </div>

              <div className="p-4 rounded-xl bg-accent-purple/10 border border-accent-purple/20 mb-8 flex gap-3">
                <Sparkles size={20} className="text-accent-purple shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-accent-purple mb-1">AI Projection</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    By increasing your target to ₹{(simulatorValue / 100000).toFixed(1)}L, you will need to increase your SIP by <strong className="text-white">₹12,500/mo</strong> to reach this goal by {selectedGoal.deadline}.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => { updateGoalTarget(selectedGoal.id, simulatorValue); setSelectedGoal(null); }} className="flex-1 py-3.5 rounded-full text-white font-bold transition-all hover:opacity-90 hover:-translate-y-0.5" style={{ backgroundColor: selectedGoal.color, boxShadow: `0 0 20px ${selectedGoal.color}40` }}>
                  Save New Target
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
