import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, TrendingUp, TrendingDown, MoreHorizontal, Plus, Trash2, X } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

export default function PortfolioModule() {
  const portfolio = useAppStore(state => state.portfolio);
  const deleteInvestment = useAppStore(state => state.deleteInvestment);
  const addInvestment = useAppStore(state => state.addInvestment);

  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All Assets');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const filteredPortfolio = useMemo(() => {
    return portfolio.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.symbol.toLowerCase().includes(search.toLowerCase());
      const matchesTab = activeTab === 'All Assets' || (activeTab === 'Mutual Funds' ? item.category === 'Mutual Funds' : item.category === activeTab);
      return matchesSearch && matchesTab;
    });
  }, [portfolio, search, activeTab]);

  const handleDelete = () => {
    if (itemToDelete) {
      deleteInvestment(itemToDelete.id);
      setDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Portfolio</h1>
          <p className="text-text-secondary">Detailed view of all your investments and assets.</p>
        </div>
        <button 
          onClick={() => alert('Mock Add Investment modal would open here')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-teal text-white font-medium hover:bg-accent-teal/90 transition-all shadow-glow"
        >
          <Plus size={16} /> Add Asset
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 glass-panel p-4 rounded-2xl">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar max-w-full">
          {['All Assets', 'Equity', 'Mutual Funds', 'Gold', 'Bonds'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === tab ? 'bg-white/10 text-white shadow-glow' : 'text-text-muted hover:text-white hover:bg-white/5'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search holdings..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-accent-teal/50 transition-all"
            />
          </div>
          <button className="p-2 rounded-xl border border-white/10 text-text-muted hover:text-white hover:bg-white/10 transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Holdings Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-2xl overflow-hidden min-h-[400px]"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="py-4 px-6 text-xs font-medium text-text-muted uppercase tracking-wider">Asset</th>
                <th className="py-4 px-6 text-xs font-medium text-text-muted uppercase tracking-wider">Category</th>
                <th className="py-4 px-6 text-xs font-medium text-text-muted uppercase tracking-wider text-right">Units</th>
                <th className="py-4 px-6 text-xs font-medium text-text-muted uppercase tracking-wider text-right">Avg Price</th>
                <th className="py-4 px-6 text-xs font-medium text-text-muted uppercase tracking-wider text-right">LTP</th>
                <th className="py-4 px-6 text-xs font-medium text-text-muted uppercase tracking-wider text-right">Total Value</th>
                <th className="py-4 px-6 text-xs font-medium text-text-muted uppercase tracking-wider text-right">P&L</th>
                <th className="py-4 px-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 relative">
              <AnimatePresence>
                {filteredPortfolio.length === 0 ? (
                  <tr key="empty">
                    <td colSpan="8">
                      <div className="flex flex-col items-center justify-center py-20 text-text-muted">
                        <Search size={40} className="mb-4 opacity-50" />
                        <p className="text-white font-medium mb-1">No assets found</p>
                        <p className="text-sm">Try adjusting your search or filters.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredPortfolio.map((holding) => {
                    const totalValue = holding.shares * holding.ltp;
                    const isPositive = holding.change.startsWith('+') && holding.change !== '+0.0%';
                    const isNeutral = holding.change === '+0.0%';
                    return (
                      <motion.tr 
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, backgroundColor: 'rgba(239,68,68,0.1)' }}
                        key={holding.id} 
                        className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                      >
                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="font-semibold text-white">{holding.name}</span>
                            <span className="text-xs text-text-muted">{holding.symbol}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-2 py-1 rounded text-xs font-medium bg-white/5 text-text-secondary border border-white/5">
                            {holding.category}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right text-white font-medium">{holding.shares}</td>
                        <td className="py-4 px-6 text-right text-text-secondary">₹{holding.avgPrice.toFixed(2)}</td>
                        <td className="py-4 px-6 text-right text-white font-medium">₹{holding.ltp.toFixed(2)}</td>
                        <td className="py-4 px-6 text-right text-white font-bold">₹{totalValue.toLocaleString('en-IN')}</td>
                        <td className="py-4 px-6 text-right">
                          <div className={`flex items-center justify-end gap-1 font-medium ${isNeutral ? 'text-text-muted' : isPositive ? 'text-accent-emerald' : 'text-red-400'}`}>
                            {isPositive && <TrendingUp size={14} />}
                            {!isPositive && !isNeutral && <TrendingDown size={14} />}
                            {holding.change}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setItemToDelete(holding);
                              setDeleteModalOpen(true);
                            }}
                            className="text-text-muted hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && itemToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setDeleteModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm bg-card border border-white/10 rounded-2xl p-6 shadow-2xl z-10"
            >
              <button 
                onClick={() => setDeleteModalOpen(false)}
                className="absolute top-4 right-4 text-text-muted hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mb-4">
                <Trash2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Delete Asset?</h3>
              <p className="text-sm text-text-secondary mb-6">
                Are you sure you want to remove <strong>{itemToDelete.name}</strong> from your portfolio? This action cannot be undone.
              </p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setDeleteModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
