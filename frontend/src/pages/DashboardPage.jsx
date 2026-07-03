import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Wallet, Target, ShieldAlert, 
  Plus, Upload, FileText, Sparkles 
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  AreaChart, Area, XAxis, YAxis
} from 'recharts';
import './DashboardPage.css';

const donutData = [
  { name: 'Mutual Funds', value: 45, color: 'var(--accent-blue)' },
  { name: 'Stocks', value: 30, color: 'var(--accent-teal)' },
  { name: 'Real Estate', value: 15, color: 'var(--accent-emerald)' },
  { name: 'Gold', value: 10, color: 'var(--status-warning)' },
];

const areaData = [
  { name: 'Jan', value: 1200000 },
  { name: 'Feb', value: 1250000 },
  { name: 'Mar', value: 1320000 },
  { name: 'Apr', value: 1280000 },
  { name: 'May', value: 1450000 },
  { name: 'Jun', value: 1580000 },
];

export default function DashboardPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header mb-8">
        <h1 className="greeting">Good Morning, Vinayak</h1>
        <p className="subtitle">Here's your family's financial snapshot for today.</p>
      </div>

      <motion.div 
        className="summary-cards grid grid-cols-4 gap-6 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="stat-card glass-panel" variants={itemVariants}>
          <div className="stat-header">
            <span className="stat-label">Family Net Worth</span>
            <div className="stat-icon bg-blue"><Wallet size={18} /></div>
          </div>
          <div className="stat-value">₹1,58,00,000</div>
          <div className="stat-change positive">
            <TrendingUp size={14} /> <span>+2.4% this month</span>
          </div>
        </motion.div>

        <motion.div className="stat-card glass-panel" variants={itemVariants}>
          <div className="stat-header">
            <span className="stat-label">Monthly Growth</span>
            <div className="stat-icon bg-teal"><TrendingUp size={18} /></div>
          </div>
          <div className="stat-value">₹3,45,000</div>
          <div className="stat-change positive">
            <TrendingUp size={14} /> <span>+1.2% vs last month</span>
          </div>
        </motion.div>

        <motion.div className="stat-card glass-panel" variants={itemVariants}>
          <div className="stat-header">
            <span className="stat-label">Goal Progress</span>
            <div className="stat-icon bg-emerald"><Target size={18} /></div>
          </div>
          <div className="stat-value">68%</div>
          <div className="stat-progress-bar">
            <div className="progress-fill" style={{ width: '68%' }}></div>
          </div>
          <div className="stat-change text-muted text-sm mt-2">
            Retirement goal on track
          </div>
        </motion.div>

        <motion.div className="stat-card glass-panel" variants={itemVariants}>
          <div className="stat-header">
            <span className="stat-label">Risk Score</span>
            <div className="stat-icon bg-warning"><ShieldAlert size={18} /></div>
          </div>
          <div className="stat-value">Moderate</div>
          <div className="stat-change negative mt-2">
            <span>Action: Rebalance suggested</span>
          </div>
        </motion.div>
      </motion.div>

      <div className="dashboard-grid grid grid-cols-3 gap-6 mb-8">
        <motion.div 
          className="chart-card glass-panel col-span-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="card-header">
            <h3>Net Worth Timeline</h3>
            <select className="chart-select">
              <option>6 Months</option>
              <option>1 Year</option>
              <option>All Time</option>
            </select>
          </div>
          <div className="chart-container" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-teal)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent-teal)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)'}} />
                <YAxis hide={true} domain={['dataMin - 100000', 'dataMax + 100000']} />
                <Tooltip 
                  contentStyle={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
                  itemStyle={{ color: 'white' }}
                />
                <Area type="monotone" dataKey="value" stroke="var(--accent-teal)" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          className="chart-card glass-panel col-span-1"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="card-header">
            <h3>Asset Allocation</h3>
          </div>
          <div className="chart-container" style={{ height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'white' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="legend-grid">
            {donutData.map((item) => (
              <div key={item.name} className="legend-item">
                <div className="legend-color" style={{ background: item.color }}></div>
                <span className="legend-name">{item.name}</span>
                <span className="legend-value">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="dashboard-grid grid grid-cols-3 gap-6">
        <motion.div 
          className="ai-insight-card glass-panel col-span-2 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="ai-bg-glow"></div>
          <div className="card-header border-none">
            <h3 className="flex items-center gap-2">
              <Sparkles className="text-teal" size={20} />
              AI Insight of the Day
            </h3>
          </div>
          <div className="insight-content">
            <p>Your portfolio is currently <strong>over-indexed in Large Cap IT stocks (35%)</strong>. Considering the recent market volatility, we recommend rebalancing 10% towards defensive sectors like FMCG or increasing your Gold allocation to optimize your risk-adjusted returns.</p>
            
            <div className="insight-actions mt-4">
              <button className="btn btn-primary btn-sm">View Rebalance Plan</button>
              <button className="btn btn-secondary btn-sm">Dismiss</button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="quick-actions-card glass-panel col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="actions-list">
            <button className="action-item">
              <div className="action-icon"><Plus size={18} /></div>
              <span>Add Investment</span>
            </button>
            <button className="action-item">
              <div className="action-icon"><Upload size={18} /></div>
              <span>Upload Statement</span>
            </button>
            <button className="action-item">
              <div className="action-icon"><FileText size={18} /></div>
              <span>Generate Tax Report</span>
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Floating AI Assistant Button */}
      <motion.button 
        className="floating-ai-btn btn btn-primary"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        whileHover={{ scale: 1.05 }}
      >
        <Sparkles size={24} />
      </motion.button>
    </div>
  );
}
