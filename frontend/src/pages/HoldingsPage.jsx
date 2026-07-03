import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowUpDown, ChevronRight, X, PieChart, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './HoldingsPage.css';

const holdingsData = [
  { id: 1, name: 'Parag Parikh Flexi Cap Fund', type: 'Mutual Fund', invested: 450000, current: 620000, return: 37.7, date: '2022-01-15' },
  { id: 2, name: 'HDFC Bank Ltd', type: 'Stocks', invested: 200000, current: 245000, return: 22.5, date: '2023-04-10' },
  { id: 3, name: 'SBI Fixed Deposit', type: 'FD', invested: 500000, current: 535000, return: 7.0, date: '2023-11-05' },
  { id: 4, name: 'Reliance Industries', type: 'Stocks', invested: 350000, current: 480000, return: 37.1, date: '2021-08-20' },
  { id: 5, name: 'Physical Gold (24k)', type: 'Gold', invested: 150000, current: 185000, return: 23.3, date: '2023-01-12' },
  { id: 6, name: 'PPF Account', type: 'PPF', invested: 1500000, current: 2150000, return: 43.3, date: '2015-05-10' },
];

const performanceData = [
  { name: 'Jan', value: 450000 },
  { name: 'Feb', value: 470000 },
  { name: 'Mar', value: 460000 },
  { name: 'Apr', value: 520000 },
  { name: 'May', value: 580000 },
  { name: 'Jun', value: 620000 },
];

export default function HoldingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  
  const filteredHoldings = holdingsData.filter(h => 
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    h.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="holdings-page">
      {/* Controls Bar */}
      <div className="controls-bar mb-6">
        <div className="search-box glass-panel">
          <Search size={18} className="text-muted" />
          <input 
            type="text" 
            placeholder="Search holdings..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="action-buttons">
          <button className="btn btn-secondary btn-sm">
            <Filter size={16} /> Filters
          </button>
          <button className="btn btn-secondary btn-sm">
            <ArrowUpDown size={16} /> Sort
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="table-container glass-panel">
        <table className="holdings-table">
          <thead>
            <tr>
              <th>Asset Name</th>
              <th>Category</th>
              <th>Invested Value</th>
              <th>Current Value</th>
              <th>Returns</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredHoldings.map((asset, idx) => (
              <motion.tr 
                key={asset.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedAsset(asset)}
                className="cursor-pointer hover-row"
              >
                <td className="font-medium">{asset.name}</td>
                <td><span className={`badge badge-${asset.type.toLowerCase().replace(' ', '-')}`}>{asset.type}</span></td>
                <td>₹{asset.invested.toLocaleString()}</td>
                <td>₹{asset.current.toLocaleString()}</td>
                <td className={asset.return >= 0 ? 'text-success' : 'text-negative'}>
                  {asset.return >= 0 ? '+' : ''}{asset.return}%
                </td>
                <td className="text-right"><ChevronRight size={18} className="text-muted" /></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Side Drawer Overlay */}
      <AnimatePresence>
        {selectedAsset && (
          <div className="drawer-overlay">
            <motion.div 
              className="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAsset(null)}
            />
            
            <motion.div 
              className="side-drawer glass-panel"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="drawer-header">
                <div>
                  <h2>{selectedAsset.name}</h2>
                  <span className={`badge badge-${selectedAsset.type.toLowerCase().replace(' ', '-')}`}>{selectedAsset.type}</span>
                </div>
                <button className="btn-icon" onClick={() => setSelectedAsset(null)}>
                  <X size={24} />
                </button>
              </div>

              <div className="drawer-content">
                {/* Drawer Summary Cards */}
                <div className="drawer-stats grid grid-cols-2 gap-4 mb-6">
                  <div className="drawer-stat-card">
                    <div className="stat-label">Current Value</div>
                    <div className="stat-value">₹{selectedAsset.current.toLocaleString()}</div>
                  </div>
                  <div className="drawer-stat-card">
                    <div className="stat-label">Total Return</div>
                    <div className={`stat-value ${selectedAsset.return >= 0 ? 'text-success' : 'text-negative'}`}>
                      {selectedAsset.return >= 0 ? '+' : ''}{selectedAsset.return}%
                    </div>
                  </div>
                </div>

                {/* Performance Chart */}
                <div className="drawer-section mb-6">
                  <h3 className="flex items-center gap-2 mb-4"><Activity size={18} className="text-teal" /> Performance</h3>
                  <div className="drawer-chart">
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={performanceData}>
                        <defs>
                          <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--accent-teal)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="var(--accent-teal)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} />
                        <Tooltip 
                          contentStyle={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="var(--accent-teal)" strokeWidth={2} fillOpacity={1} fill="url(#colorPerf)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="drawer-section">
                  <h3 className="flex items-center gap-2 mb-4"><PieChart size={18} className="text-blue" /> Allocation Details</h3>
                  <div className="details-list">
                    <div className="detail-item">
                      <span className="text-muted">Invested Amount</span>
                      <span>₹{selectedAsset.invested.toLocaleString()}</span>
                    </div>
                    <div className="detail-item">
                      <span className="text-muted">Investment Date</span>
                      <span>{new Date(selectedAsset.date).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-item">
                      <span className="text-muted">Folio/Account No.</span>
                      <span>1928475620</span>
                    </div>
                  </div>
                </div>
                
                <div className="drawer-actions mt-8 flex gap-4">
                  <button className="btn btn-primary flex-1">Add Transaction</button>
                  <button className="btn btn-secondary flex-1">View Full Report</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
