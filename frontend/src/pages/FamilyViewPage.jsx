import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, User, Landmark, TrendingUp, Heart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import './FamilyViewPage.css';

const contributionData = [
  { name: 'Mutual Funds', Vinayak: 4500000, Priya: 3200000 },
  { name: 'Stocks', Vinayak: 2400000, Priya: 1800000 },
  { name: 'Fixed Deposits', Vinayak: 1000000, Priya: 1500000 },
  { name: 'Real Estate', Vinayak: 8000000, Priya: 8000000 },
  { name: 'Gold', Vinayak: 200000, Priya: 1200000 },
];

export default function FamilyViewPage() {
  const [viewMode, setViewMode] = useState('family'); // 'personal' or 'family'

  return (
    <div className="family-page">
      <div className="view-toggle-container mb-8">
        <div className="view-toggle glass-panel">
          <button 
            className={`toggle-btn ${viewMode === 'personal' ? 'active' : ''}`}
            onClick={() => setViewMode('personal')}
          >
            <User size={16} /> My Portfolio
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'family' ? 'active' : ''}`}
            onClick={() => setViewMode('family')}
          >
            <Users size={16} /> Family Portfolio
          </button>
        </div>
      </div>

      {viewMode === 'family' && (
        <motion.div 
          className="family-content fade-in"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Comparison Cards */}
          <div className="comparison-grid grid grid-cols-3 gap-6 mb-8">
            <div className="compare-card glass-panel husband-card">
              <div className="member-avatar">V</div>
              <h3>Vinayak</h3>
              <div className="member-net-worth">₹1,61,00,000</div>
              <div className="contribution-pill">50.6% of Family Wealth</div>
            </div>
            
            <div className="compare-card glass-panel wife-card">
              <div className="member-avatar">P</div>
              <h3>Priya</h3>
              <div className="member-net-worth">₹1,57,00,000</div>
              <div className="contribution-pill">49.4% of Family Wealth</div>
            </div>

            <div className="compare-card glass-panel combined-card">
              <div className="member-avatar combined-icon"><Heart size={20} /></div>
              <h3>Combined</h3>
              <div className="member-net-worth text-teal">₹3,18,00,000</div>
              <div className="contribution-pill">Total Family Wealth</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="glass-panel p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Landmark className="text-blue" size={20} /> Asset Split
                </h3>
              </div>
              <div className="chart-wrapper" style={{ height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={contributionData} layout="vertical" margin={{ left: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" horizontal={true} vertical={false} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)'}} />
                    <Tooltip 
                      contentStyle={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                      itemStyle={{ color: 'white' }}
                      formatter={(value) => `₹${value.toLocaleString()}`}
                    />
                    <Legend />
                    <Bar dataKey="Vinayak" stackId="a" fill="var(--accent-blue)" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="Priya" stackId="a" fill="var(--accent-teal)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-panel p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="text-emerald" size={20} /> Family Timeline
                </h3>
              </div>
              
              <div className="timeline-container">
                <div className="timeline-item">
                  <div className="timeline-marker bg-teal"></div>
                  <div className="timeline-content">
                    <h4>First House Purchase</h4>
                    <span className="timeline-date">Jan 2024</span>
                    <p>Combined ₹40L for downpayment on Bangalore property.</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker bg-blue"></div>
                  <div className="timeline-content">
                    <h4>Education Fund Started</h4>
                    <span className="timeline-date">Aug 2023</span>
                    <p>Started ₹20k monthly SIP for child's education.</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker bg-emerald"></div>
                  <div className="timeline-content">
                    <h4>Crossed ₹2Cr Net Worth</h4>
                    <span className="timeline-date">Mar 2022</span>
                    <p>Combined family net worth crossed the 2 Crore milestone.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {viewMode === 'personal' && (
        <motion.div 
          className="personal-content flex items-center justify-center fade-in"
          style={{ height: '400px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center text-muted">
            <User size={48} className="mx-auto mb-4 opacity-50" />
            <p>Your personal portfolio view goes here.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
