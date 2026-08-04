import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, TrendingUp, TrendingDown, Plus, Trash2, X, PieChart, Upload, ArrowRight } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const AssetDetailsDrawer = ({ isOpen, onClose, asset }) => (
  <AnimatePresence>
    {isOpen && asset && (
      <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" />
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 glass-panel border-l border-white/10 shadow-premium bg-background/95 overflow-y-auto"
        >
          <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur-md z-10">
            <h2 className="text-lg font-bold text-white">Asset Details</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors text-text-secondary hover:text-white">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col mb-8">
              <span className="text-3xl font-bold text-white">{asset.name}</span>
              <span className="text-text-muted">{asset.symbol} • {asset.category}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="glass-panel p-4 rounded-xl bg-white/5">
                <span className="text-xs text-text-muted uppercase tracking-wider block mb-1">Total Value</span>
                <span className="text-xl font-bold text-white">₹{Number((asset.shares ?? 0) * (asset.ltp ?? 0)).toLocaleString('en-IN')}</span>
              </div>
              <div className="glass-panel p-4 rounded-xl bg-white/5">
                <span className="text-xs text-text-muted uppercase tracking-wider block mb-1">Units Held</span>
                <span className="text-xl font-bold text-white">{asset.shares ?? 0}</span>
              </div>
              <div className="glass-panel p-4 rounded-xl bg-white/5">
                <span className="text-xs text-text-muted uppercase tracking-wider block mb-1">Avg Price</span>
                <span className="text-xl font-bold text-white">₹{Number(asset.avgPrice ?? 0).toFixed(2)}</span>
              </div>
              <div className="glass-panel p-4 rounded-xl bg-white/5">
                <span className="text-xs text-text-muted uppercase tracking-wider block mb-1">Current Price</span>
                <span className="text-xl font-bold text-white">₹{Number(asset.ltp ?? 0).toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-medium text-white mb-4">Performance</h3>
              <div className="w-full bg-white/5 rounded-full h-2 mb-2">
                <div className="bg-accent-emerald h-2 rounded-full" style={{ width: '65%' }} />
              </div>
              <p className="text-xs text-text-secondary">This asset has outperformed the NIFTY 50 by 12% over the last year.</p>
            </div>
            
            <button className="w-full py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-all">
              View Transactions
            </button>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export default function PortfolioModule() {
  const portfolio = useAppStore(state => state.portfolio);
  const deleteInvestment = useAppStore(state => state.deleteInvestment);

  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All Assets');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  
  const setAddAssetModalOpen = useAppStore(state => state.setAddAssetModalOpen);
  const setImportModalOpen = useAppStore(state => state.setImportModalOpen);
  const toggleDemoMode = useAppStore(state => state.toggleDemoMode);

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

  if (portfolio.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-accent-teal/20 to-accent-blue/20 flex items-center justify-center border border-white/10 shadow-glow">
          <PieChart className="w-10 h-10 text-accent-teal" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">No investments yet</h1>
        <p className="text-text-secondary mb-8 max-w-sm">
          Connect your accounts or add your first asset manually to start tracking your family's net worth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={() => setAddAssetModalOpen(true)} className="px-6 py-3 bg-white text-background rounded-full text-sm font-bold hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2">
            <Plus size={18} /> Add First Asset
          </button>
          <button onClick={() => setImportModalOpen(true)} className="px-6 py-3 glass-panel rounded-full text-sm font-bold text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            <Upload size={18} /> Import Portfolio
          </button>
        </div>
        <button onClick={toggleDemoMode} className="mt-6 text-sm text-accent-teal hover:text-accent-teal/80 transition-colors flex items-center gap-1">
          Explore Demo Portfolio <ArrowRight size={14} />
        </button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Portfolio</h1>
          <p className="text-text-secondary">Detailed view of all your investments and assets.</p>
        </div>
        <button onClick={() => setAddAssetModalOpen(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-all shadow-glow hover:-translate-y-0.5">
          <Plus size={16} /> Add Asset
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 glass-panel p-4 rounded-2xl border border-white/5">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar max-w-full">
          {['All Assets', 'Equity', 'Mutual Funds', 'Gold', 'Bonds'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === tab ? 'bg-white/15 text-white shadow-sm' : 'text-text-muted hover:text-white hover:bg-white/5'}`}
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

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-2xl overflow-hidden min-h-[400px] border border-white/5"
      >
        <div className="overflow-x-auto w-full hide-scrollbar">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="py-4 px-6 text-xs font-bold text-text-muted uppercase tracking-wider">Asset</th>
                <th className="py-4 px-6 text-xs font-bold text-text-muted uppercase tracking-wider">Category</th>
                <th className="py-4 px-6 text-xs font-bold text-text-muted uppercase tracking-wider text-right">Units</th>
                <th className="py-4 px-6 text-xs font-bold text-text-muted uppercase tracking-wider text-right">Avg Price</th>
                <th className="py-4 px-6 text-xs font-bold text-text-muted uppercase tracking-wider text-right">LTP</th>
                <th className="py-4 px-6 text-xs font-bold text-text-muted uppercase tracking-wider text-right">Total Value</th>
                <th className="py-4 px-6 text-xs font-bold text-text-muted uppercase tracking-wider text-right">P&L</th>
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
                    const totalValue = Number(holding.shares ?? 0) * Number(holding.ltp ?? 0);
                    const changeStr = holding.change || '';
                    const isPositive = changeStr.startsWith('+') && changeStr !== '+0.0%';
                    const isNeutral = changeStr === '+0.0%' || changeStr === '';
                    return (
                      <motion.tr 
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, backgroundColor: 'rgba(239,68,68,0.1)' }}
                        key={holding.id}
                        onClick={() => setSelectedAsset(holding)}
                        className="hover:bg-white/[0.04] transition-colors group cursor-pointer"
                      >
                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="font-semibold text-white">{holding.name}</span>
                            <span className="text-xs text-text-muted">{holding.symbol}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-2 py-1 rounded text-[10px] uppercase tracking-wider font-bold bg-white/5 text-text-secondary border border-white/5">
                            {holding.category}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right text-white font-medium">{holding.shares ?? 0}</td>
                        <td className="py-4 px-6 text-right text-text-secondary">₹{Number(holding.avgPrice ?? 0).toFixed(2)}</td>
                        <td className="py-4 px-6 text-right text-white font-medium">₹{Number(holding.ltp ?? 0).toFixed(2)}</td>
                        <td className="py-4 px-6 text-right text-white font-bold">₹{totalValue.toLocaleString('en-IN')}</td>
                        <td className="py-4 px-6 text-right">
                          <div className={`flex items-center justify-end gap-1 font-medium ${isNeutral ? 'text-text-muted' : isPositive ? 'text-accent-emerald' : 'text-red-400'}`}>
                            {isPositive && <TrendingUp size={14} />}
                            {!isPositive && !isNeutral && <TrendingDown size={14} />}
                            {changeStr}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setItemToDelete(holding);
                              setDeleteModalOpen(true);
                            }}
                            className="text-text-muted hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-red-500/10"
                          >
                            <Trash2 size={16} />
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

      {/* Drawers and Modals */}
      <AssetDetailsDrawer isOpen={!!selectedAsset} onClose={() => setSelectedAsset(null)} asset={selectedAsset} />

      <AnimatePresence>
        {isDeleteModalOpen && itemToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="relative w-full max-w-sm bg-card border border-white/10 rounded-2xl p-6 shadow-2xl z-10">
              <button onClick={() => setDeleteModalOpen(false)} className="absolute top-4 right-4 text-text-muted hover:text-white"><X size={20} /></button>
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mb-4"><Trash2 size={24} /></div>
              <h3 className="text-xl font-bold text-white mb-2">Delete Asset?</h3>
              <p className="text-sm text-text-secondary mb-6">Are you sure you want to remove <strong>{itemToDelete.name}</strong> from your portfolio?</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteModalOpen(false)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5">Cancel</button>
                <button onClick={handleDelete} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.3)]">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
