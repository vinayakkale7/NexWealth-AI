import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Home, Plane, GraduationCap, Calculator, Sparkles, Plus, ArrowRight } from 'lucide-react';
import './GoalsPage.css';

const goalsData = [
  { id: 1, title: 'Retirement Fund', icon: Target, target: 50000000, current: 32000000, date: '2045', color: 'var(--accent-teal)' },
  { id: 2, title: 'Dream House', icon: Home, target: 15000000, current: 4500000, date: '2028', color: 'var(--accent-blue)' },
  { id: 3, title: 'Child Education', icon: GraduationCap, target: 8000000, current: 2400000, date: '2035', color: 'var(--status-warning)' },
  { id: 4, title: 'Europe Vacation', icon: Plane, target: 800000, current: 650000, date: '2027', color: 'var(--status-success)' },
];

export default function GoalsPage() {
  const [extraInvestment, setExtraInvestment] = useState(5000);

  return (
    <div className="goals-page">
      <div className="goals-header flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Financial Goals</h1>
          <p className="text-muted">Track and project your family's financial milestones.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} /> Add Goal
        </button>
      </div>

      <div className="goals-grid grid grid-cols-2 gap-6 mb-8">
        {goalsData.map((goal, idx) => {
          const progress = (goal.current / goal.target) * 100;
          return (
            <motion.div 
              key={goal.id}
              className="goal-card glass-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="goal-card-header">
                <div className="flex items-center gap-3">
                  <div className="goal-icon" style={{ backgroundColor: `${goal.color}22`, color: goal.color }}>
                    <goal.icon size={20} />
                  </div>
                  <div>
                    <h3>{goal.title}</h3>
                    <span className="goal-date">Target: {goal.date}</span>
                  </div>
                </div>
                <div className="goal-percentage" style={{ color: goal.color }}>
                  {progress.toFixed(1)}%
                </div>
              </div>

              <div className="goal-progress-section mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-primary font-medium">₹{(goal.current / 100000).toFixed(1)}L</span>
                  <span className="text-muted">of ₹{(goal.target / 100000).toFixed(1)}L</span>
                </div>
                <div className="progress-track">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progress}%`, backgroundColor: goal.color, boxShadow: `0 0 10px ${goal.color}` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Calculator */}
        <motion.div 
          className="calculator-card glass-panel col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="card-header border-none pb-0 mb-4">
            <h3 className="flex items-center gap-2"><Calculator size={18} className="text-blue" /> Goal Accelerator</h3>
          </div>
          <div className="calculator-content">
            <p className="text-sm text-muted mb-4">See how extra monthly investments accelerate your Dream House goal.</p>
            
            <div className="form-group mb-6">
              <label>Extra Monthly SIP</label>
              <div className="range-container mt-2">
                <input 
                  type="range" 
                  min="1000" 
                  max="50000" 
                  step="1000" 
                  value={extraInvestment}
                  onChange={(e) => setExtraInvestment(Number(e.target.value))}
                  className="range-slider"
                />
                <div className="text-center mt-3 font-semibold text-xl">₹{extraInvestment.toLocaleString()}</div>
              </div>
            </div>

            <div className="projection-result bg-glass p-4 rounded-lg text-center">
              <div className="text-sm text-muted mb-1">New Projected Completion</div>
              <div className="text-2xl font-bold text-teal flex items-center justify-center gap-2">
                Dec 2026 <ArrowRight size={18} className="text-success" />
              </div>
              <div className="text-xs text-success mt-1">1.5 years earlier than planned</div>
            </div>
          </div>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div 
          className="ai-recommendation-card glass-panel col-span-2 relative overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="ai-bg-glow alt-glow"></div>
          <div className="card-header border-none">
            <h3 className="flex items-center gap-2">
              <Sparkles className="text-teal" size={20} />
              AI Goal Optimization
            </h3>
          </div>
          
          <div className="recommendation-list mt-2">
            <div className="rec-item">
              <div className="rec-icon bg-warning text-warning"><Target size={16} /></div>
              <div className="rec-text">
                <h4>Child Education Goal at Risk</h4>
                <p>Based on 8% education inflation, your target of ₹80L may fall short. We recommend increasing the target to ₹1.2Cr and stepping up your SIP by ₹4,000.</p>
              </div>
              <button className="btn btn-secondary btn-sm">Review</button>
            </div>

            <div className="rec-item">
              <div className="rec-icon bg-success text-success"><Plane size={16} /></div>
              <div className="rec-text">
                <h4>Europe Vacation Achievable Early</h4>
                <p>Your Liquid Fund allocation for this goal has outperformed. You can safely withdraw the required ₹8L by October 2026 instead of 2027.</p>
              </div>
              <button className="btn btn-secondary btn-sm">Move Funds</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
