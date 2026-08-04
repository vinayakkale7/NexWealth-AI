import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Loader2, Plus, ArrowRight } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import toast from 'react-hot-toast';

const CATEGORIES = [
  'Stocks', 'Mutual Funds', 'ETF', 'Gold', 'Fixed Deposit', 'PPF', 'NPS', 'EPF', 'Bonds', 'Crypto', 'Real Estate', 'Cash'
];

export default function AddAssetModal({ isOpen, onClose }) {
  const addInvestment = useAppStore(state => state.addInvestment);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    category: 'Stocks',
    shares: '',
    avgPrice: '',
    ltp: '',
    purchaseDate: '',
    broker: '',
    account: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Asset Name is required';
    if (!formData.shares || Number(formData.shares) <= 0) newErrors.shares = 'Valid quantity is required';
    if (!formData.avgPrice || Number(formData.avgPrice) < 0) newErrors.avgPrice = 'Valid purchase price is required';
    if (!formData.ltp || Number(formData.ltp) < 0) newErrors.ltp = 'Valid current price is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      // change is just mocked based on LTP vs AvgPrice
      const changePct = (((Number(formData.ltp) - Number(formData.avgPrice)) / Number(formData.avgPrice)) * 100).toFixed(2);
      const payload = {
        name: formData.name,
        symbol: formData.symbol || formData.name.substring(0, 4).toUpperCase(),
        category: formData.category,
        shares: Number(formData.shares),
        avgPrice: Number(formData.avgPrice),
        ltp: Number(formData.ltp),
        change: `${changePct >= 0 ? '+' : ''}${changePct}%`
      };

      await addInvestment(payload);
      toast.success('Asset added successfully!');
      
      // Reset form
      setFormData({
        name: '', symbol: '', category: 'Stocks', shares: '', avgPrice: '', ltp: '', purchaseDate: '', broker: '', account: '', notes: ''
      });
      onClose();
    } catch (error) {
      toast.error('Failed to add asset. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto hide-scrollbar glass-panel rounded-3xl border border-white/10 shadow-premium bg-background"
          >
            <div className="sticky top-0 z-20 flex items-center justify-between p-6 border-b border-white/10 bg-background/95 backdrop-blur-md">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Add New Asset</h2>
                <p className="text-sm text-text-secondary">Manually enter a holding into your portfolio.</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors text-text-secondary hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Asset Name */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1">Asset Name <span className="text-red-400">*</span></label>
                  <input 
                    type="text" 
                    placeholder="e.g. Reliance Industries"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full bg-black/20 border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent-teal/50'} rounded-xl py-3 px-4 text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-accent-teal/50 transition-all`} 
                  />
                  {errors.name && <span className="text-[10px] text-red-400 font-medium">{errors.name}</span>}
                </div>

                {/* Ticker / Symbol */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Ticker / Symbol</label>
                  <input 
                    type="text" 
                    placeholder="e.g. RELIANCE"
                    value={formData.symbol}
                    onChange={(e) => setFormData({...formData, symbol: e.target.value.toUpperCase()})}
                    className="w-full bg-black/20 border border-white/10 focus:border-accent-teal/50 rounded-xl py-3 px-4 text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-accent-teal/50 transition-all" 
                  />
                </div>

                {/* Category */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Category <span className="text-red-400">*</span></label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-black/20 border border-white/10 focus:border-accent-teal/50 rounded-xl py-3 px-4 text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-accent-teal/50 transition-all appearance-none" 
                  >
                    {CATEGORIES.map(cat => <option key={cat} value={cat} className="bg-background">{cat}</option>)}
                  </select>
                </div>

                {/* Quantity */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Quantity <span className="text-red-400">*</span></label>
                  <input 
                    type="number" 
                    step="any"
                    placeholder="e.g. 150"
                    value={formData.shares}
                    onChange={(e) => setFormData({...formData, shares: e.target.value})}
                    className={`w-full bg-black/20 border ${errors.shares ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent-teal/50'} rounded-xl py-3 px-4 text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-accent-teal/50 transition-all`} 
                  />
                </div>

                {/* Purchase Price */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Purchase Price (Avg) <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-medium">₹</span>
                    <input 
                      type="number" 
                      step="any"
                      placeholder="0.00"
                      value={formData.avgPrice}
                      onChange={(e) => setFormData({...formData, avgPrice: e.target.value})}
                      className={`w-full bg-black/20 border ${errors.avgPrice ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent-teal/50'} rounded-xl py-3 pl-8 pr-4 text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-accent-teal/50 transition-all`} 
                    />
                  </div>
                </div>

                {/* Current Price */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Current Price (LTP) <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-medium">₹</span>
                    <input 
                      type="number" 
                      step="any"
                      placeholder="0.00"
                      value={formData.ltp}
                      onChange={(e) => setFormData({...formData, ltp: e.target.value})}
                      className={`w-full bg-black/20 border ${errors.ltp ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent-teal/50'} rounded-xl py-3 pl-8 pr-4 text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-accent-teal/50 transition-all`} 
                    />
                  </div>
                </div>

                {/* Purchase Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Purchase Date</label>
                  <input 
                    type="date" 
                    value={formData.purchaseDate}
                    onChange={(e) => setFormData({...formData, purchaseDate: e.target.value})}
                    className="w-full bg-black/20 border border-white/10 focus:border-accent-teal/50 rounded-xl py-3 px-4 text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-accent-teal/50 transition-all" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                {/* Broker */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Broker</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Zerodha, Groww"
                    value={formData.broker}
                    onChange={(e) => setFormData({...formData, broker: e.target.value})}
                    className="w-full bg-black/20 border border-white/10 focus:border-accent-teal/50 rounded-xl py-3 px-4 text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-accent-teal/50 transition-all" 
                  />
                </div>

                {/* Account */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Investment Account</label>
                  <select 
                    value={formData.account}
                    onChange={(e) => setFormData({...formData, account: e.target.value})}
                    className="w-full bg-black/20 border border-white/10 focus:border-accent-teal/50 rounded-xl py-3 px-4 text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-accent-teal/50 transition-all appearance-none" 
                  >
                    <option value="" className="bg-background">Default Portfolio</option>
                    <option value="spouse" className="bg-background">Spouse's Portfolio</option>
                    <option value="huf" className="bg-background">HUF Account</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Notes</label>
                <textarea 
                  rows={3}
                  placeholder="Optional details..."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full bg-black/20 border border-white/10 focus:border-accent-teal/50 rounded-xl py-3 px-4 text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-accent-teal/50 transition-all resize-none" 
                />
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-white/10 mt-2">
                <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-teal text-white font-bold text-sm hover:bg-accent-teal/90 shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
                  Add Asset
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
