import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Wallet, Activity, Sparkles, Target, FileText, ChevronRight, X, Shield, ShieldAlert, Zap, Plus, Download, Rocket, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import useAppStore, { calculatePortfolioStats } from '../../store/useAppStore';

const mockChartDataMap = {
  '1W': [{ name: 'Mon', value: 1240000 }, { name: 'Wed', value: 1245000 }, { name: 'Fri', value: 1250000 }],
  '1M': [{ name: 'Week 1', value: 1200000 }, { name: 'Week 2', value: 1220000 }, { name: 'Week 3', value: 1210000 }, { name: 'Week 4', value: 1250000 }],
  '3M': [{ name: 'Month 1', value: 1100000 }, { name: 'Month 2', value: 1150000 }, { name: 'Month 3', value: 1250000 }],
  '1Y': [{ name: 'Jan', value: 900000 }, { name: 'Apr', value: 1050000 }, { name: 'Jul', value: 1150000 }, { name: 'Oct', value: 1250000 }],
  'ALL': [{ name: '2022', value: 500000 }, { name: '2023', value: 800000 }, { name: '2024', value: 1250000 }]
};

const StatCardSkeleton = () => (
  <div className="glass-panel p-5 rounded-2xl animate-pulse bg-white/5 border border-white/5 overflow-hidden">
    <div className="flex justify-between items-start mb-4">
      <div className="h-4 w-24 bg-white/10 rounded"></div>
      <div className="h-8 w-8 bg-white/10 rounded-lg"></div>
    </div>
    <div className="h-8 w-32 bg-white/20 rounded mb-2"></div>
    <div className="h-4 w-20 bg-white/10 rounded"></div>
  </div>
);

const ChartSkeleton = () => (
  <div className="glass-panel p-6 rounded-2xl animate-pulse bg-white/5 border border-white/5 h-[400px] flex flex-col">
    <div className="flex justify-between mb-6">
      <div className="h-6 w-40 bg-white/10 rounded"></div>
      <div className="h-8 w-48 bg-white/10 rounded"></div>
    </div>
    <div className="flex-1 bg-white/5 rounded-xl"></div>
  </div>
);

const StatCard = ({ title, value, change, isPositive, icon: Icon, delay, onClick }) => (
  <motion.button 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    onClick={onClick}
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
    className="w-full text-left glass-panel p-5 rounded-2xl relative overflow-hidden group cursor-pointer hover:-translate-y-1 hover:shadow-glow transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal border border-white/5 hover:border-white/20"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Icon size={64} className="text-white group-hover:text-accent-teal transition-colors" />
    </div>
    <div className="flex justify-between items-start mb-4 relative z-10">
      <h3 className="text-text-secondary text-sm font-medium">{title}</h3>
      <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
        <Icon size={16} className="text-accent-teal" />
      </div>
    </div>
    <div className="relative z-10">
      <h2 className="text-3xl font-bold text-white mb-2">{value}</h2>
      <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-accent-emerald' : 'text-red-400'}`}>
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        <span>{change}</span>
        <span className="text-text-muted ml-1">vs last period</span>
      </div>
    </div>
  </motion.button>
);

const AIReportModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto hide-scrollbar glass-panel rounded-3xl border border-white/10 shadow-premium bg-background/90"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/10 bg-background/95 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shadow-glow-purple">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">AI Wealth Report</h2>
                <p className="text-xs text-text-secondary">Generated on {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors text-text-secondary hover:text-white">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6 md:p-8 space-y-8">
            <section>
              <h3 className="text-sm font-bold text-accent-purple uppercase tracking-widest mb-4">Executive Summary</h3>
              <p className="text-text-primary leading-relaxed">
                Your portfolio is heavily weighted towards Equities (65%), which aligns with your aggressive growth profile. However, you have an opportunity to harvest ₹42,000 in short-term capital losses to optimize your upcoming tax liabilities.
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-panel p-5 rounded-2xl bg-white/5 border border-white/5">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-white mb-2"><Shield className="w-4 h-4 text-accent-teal" /> Portfolio Analysis</h4>
                <p className="text-sm text-text-secondary">Diversification is healthy, but consider shifting 5% from Mid-Caps to Debt instruments to lower volatility.</p>
              </div>
              <div className="glass-panel p-5 rounded-2xl bg-white/5 border border-white/5">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-white mb-2"><Zap className="w-4 h-4 text-accent-emerald" /> Tax Suggestions</h4>
                <p className="text-sm text-text-secondary">Offset your recent Reliance gains by selling underperforming HDFC shares before March 31st.</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const WealthScoreDrawer = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
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
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><Sparkles className="w-5 h-5 text-accent-purple" /> AI Wealth Score Details</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors text-text-secondary hover:text-white">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6 flex flex-col gap-8">
            <div className="flex flex-col items-center justify-center p-8 glass-panel rounded-2xl bg-white/5">
              <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-blue">84</span>
              <span className="text-text-muted text-sm mt-2 uppercase tracking-widest font-semibold">Excellent</span>
            </div>

            <div className="space-y-6">
              {[
                { label: 'Diversification Score', val: 90, color: 'bg-accent-emerald' },
                { label: 'Risk Adjusted Return', val: 75, color: 'bg-accent-teal' },
                { label: 'Tax Efficiency', val: 60, color: 'bg-accent-purple' },
                { label: 'Emergency Fund', val: 100, color: 'bg-accent-blue' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white font-medium">{item.label}</span>
                    <span className="text-text-secondary">{item.val}/100</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${item.val}%` }} transition={{ duration: 1, delay: i * 0.1 }} className={`h-full ${item.color} rounded-full`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const QuickAction = ({ icon: Icon, label, onClick, colorClass }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center justify-center p-4 glass-panel rounded-2xl hover:-translate-y-1 transition-all group border border-white/5 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-accent-teal/50"
  >
    <div className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center ${colorClass} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
      <Icon size={20} className={colorClass.replace('bg-', 'text-')} />
    </div>
    <span className="text-xs font-bold text-white group-hover:text-white/90">{label}</span>
  </button>
);

export default function DashboardModule() {
  const { portfolio, isSyncing, setActiveModule, toggleDemoMode, setAddAssetModalOpen, setImportModalOpen } = useAppStore();
  
  const [timeFilter, setTimeFilter] = useState('1M');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Report Generation State
  const [reportState, setReportState] = useState('idle'); // idle, generating, done
  const [reportProgress, setReportProgress] = useState(0);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const stats = useMemo(() => calculatePortfolioStats(portfolio), [portfolio]);

  const allocation = useMemo(() => {
    const alloc = stats.categoryAllocation || {};
    const colors = { Stocks: '#10B981', 'Mutual Funds': '#3B82F6', Gold: '#8B5CF6', Bonds: '#F59E0B', Cash: '#EF4444', 'Fixed Deposit': '#F59E0B', PPF: '#8B5CF6' };
    const netWorth = stats.totalNetWorth || 1;
    return Object.entries(alloc)
      .filter(([_, val]) => val > 0)
      .map(([name, val]) => ({
        name,
        value: Number(((val / netWorth) * 100).toFixed(1)),
        color: colors[name] || '#ccc'
      }));
  }, [stats]);

  const handleGenerateReport = () => {
    setReportState('generating');
    setReportProgress(0);
    
    // Simulate generation progress
    const interval = setInterval(() => {
      setReportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setReportState('done');
          toast.success('AI Report generated successfully!', {
            style: { background: '#10B981', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' },
            icon: '✨'
          });
          setTimeout(() => {
            setReportState('idle');
            setIsReportModalOpen(true);
          }, 500);
          return 100;
        }
        return prev + 15;
      });
    }, 300);
  };

  if (isSyncing) {
    return (
      <div className="flex flex-col gap-6 pb-20">
        <div className="flex justify-between items-end mb-4">
          <div className="space-y-2">
            <div className="h-8 w-64 bg-white/10 rounded animate-pulse"></div>
            <div className="h-4 w-48 bg-white/5 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><ChartSkeleton /></div>
          <div className="flex flex-col gap-6">
            <StatCardSkeleton />
            <StatCardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (portfolio.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="w-24 h-24 mb-8 rounded-full bg-gradient-to-br from-accent-teal/20 to-accent-blue/20 flex items-center justify-center border border-white/10 shadow-glow">
          <Rocket className="w-10 h-10 text-accent-teal" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Welcome to NexWealth AI</h1>
        <p className="text-lg text-text-secondary mb-10 max-w-md mx-auto">
          Let's build your family's financial workspace. Connect your first asset to unleash the AI advisor.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <button onClick={() => setAddAssetModalOpen(true)} className="w-full sm:w-auto px-8 py-3.5 bg-white text-background rounded-full text-sm font-bold hover:bg-gray-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] focus:outline-none focus:ring-2 focus:ring-white/50 hover:-translate-y-0.5">
            Add First Holding
          </button>
          <button onClick={() => setImportModalOpen(true)} className="w-full sm:w-auto px-8 py-3.5 glass-panel rounded-full text-sm font-bold text-white hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white/20 hover:-translate-y-0.5">
            Import Portfolio
          </button>
          <button onClick={toggleDemoMode} className="w-full sm:w-auto px-8 py-3.5 border border-accent-teal/30 text-accent-teal rounded-full text-sm font-bold hover:bg-accent-teal/10 transition-all focus:outline-none focus:ring-2 focus:ring-accent-teal/50 hover:-translate-y-0.5">
            Explore Demo Portfolio
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">Dashboard Overview</h1>
          <p className="text-text-secondary">AI analysis is up to date.</p>
        </div>
        
        <div className="relative">
          <button 
            onClick={handleGenerateReport}
            disabled={reportState !== 'idle'}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 border border-white/10 text-white hover:border-white/30 transition-all shadow-glow hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent-purple/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {reportState === 'idle' ? <Sparkles size={16} className="text-accent-purple" /> : <Loader2 size={16} className="text-accent-purple animate-spin" />}
            <span className="font-medium text-sm">{reportState === 'generating' ? 'Analyzing...' : 'Generate AI Report'}</span>
          </button>
          
          {reportState === 'generating' && (
            <div className="absolute -bottom-3 left-0 right-0 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-accent-purple to-accent-blue" initial={{ width: 0 }} animate={{ width: `${reportProgress}%` }} />
            </div>
          )}
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Net Worth" 
          value={`₹${(stats.totalNetWorth || 0).toLocaleString('en-IN')}`} 
          change={`${stats.totalReturn > 0 ? '+' : ''}${Number(stats.totalReturn ?? 0).toFixed(1)}%`} 
          isPositive={stats.totalReturn >= 0} 
          icon={Wallet} 
          delay={0.1} 
          onClick={() => setActiveModule('Portfolio')} 
        />
        <StatCard 
          title="Today's Gain" 
          value={`₹${Math.abs(stats.todaysGain || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`} 
          change={`${stats.todaysGain >= 0 ? '+' : ''}${Number((stats.todaysGain || 0) / (stats.totalNetWorth || 1) * 100).toFixed(2)}%`} 
          isPositive={stats.todaysGain >= 0} 
          icon={TrendingUp} 
          delay={0.2} 
          onClick={() => setActiveModule('Portfolio')} 
        />
        <StatCard 
          title="Tax Efficiency" 
          value="60%" 
          change="Action req." 
          isPositive={false} 
          icon={ShieldAlert} 
          delay={0.3} 
          onClick={() => setActiveModule('Tax Center')} 
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <QuickAction icon={Plus} label="Add Holding" colorClass="bg-accent-teal text-accent-teal" onClick={() => setAddAssetModalOpen(true)} />
        <QuickAction icon={Target} label="Create Goal" colorClass="bg-accent-blue text-accent-blue" onClick={() => setActiveModule('Goals')} />
        <QuickAction icon={Shield} label="Invite Family" colorClass="bg-accent-emerald text-accent-emerald" onClick={() => setActiveModule('Family')} />
        <QuickAction icon={Sparkles} label="Ask AI" colorClass="bg-accent-purple text-accent-purple" onClick={() => setActiveModule('AI Advisor')} />
        <QuickAction icon={Download} label="Generate Report" colorClass="bg-white text-white" onClick={handleGenerateReport} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/5"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-lg font-bold text-white tracking-tight">Portfolio Growth</h3>
            <div className="flex gap-1 bg-black/20 p-1 rounded-lg border border-white/10">
              {['1W', '1M', '3M', '1Y', 'ALL'].map(period => (
                <button 
                  key={period} 
                  onClick={() => setTimeFilter(period)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 ${timeFilter === period ? 'bg-white/15 text-white shadow-sm' : 'text-text-muted hover:text-white hover:bg-white/5'}`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartDataMap[timeFilter]}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/100000}L`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(10, 10, 10, 0.9)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                  cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10B981" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  animationDuration={800}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Side Panel */}
        <div className="flex flex-col gap-6">
          {/* AI Wealth Score */}
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => setIsDrawerOpen(true)}
            className="text-left w-full glass-panel p-6 rounded-2xl relative overflow-hidden group cursor-pointer hover:border-accent-purple/30 transition-all border border-white/5 focus:outline-none focus:ring-2 focus:ring-accent-purple/50"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/20 blur-3xl rounded-full pointer-events-none group-hover:bg-accent-purple/30 transition-colors" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-accent-purple mb-4 flex items-center gap-2">
              <Sparkles size={16} />
              AI Wealth Score
            </h3>
            <div className="flex items-end gap-3 mb-2">
              <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-blue group-hover:scale-105 transition-transform origin-left">84</span>
              <span className="text-text-muted text-lg mb-1 font-medium">/ 100</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2 mb-4 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: '84%' }} transition={{ duration: 1, delay: 0.5 }} className="bg-gradient-to-r from-accent-purple to-accent-blue h-full rounded-full" />
            </div>
            <p className="text-sm text-text-secondary leading-relaxed group-hover:text-white transition-colors">
              Click to view detailed health breakdown and AI optimization steps.
            </p>
          </motion.button>

          {/* Asset Allocation */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-panel p-6 rounded-2xl flex-1 border border-white/5"
          >
            <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-4">Asset Allocation</h3>
            <div className="flex items-center justify-between">
              <div className="w-[120px] h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={allocation} innerRadius={45} outerRadius={60} paddingAngle={5} dataKey="value" stroke="none">
                      {allocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-3">
                {allocation.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full shadow-inner" style={{ backgroundColor: item.color }} />
                    <div className="flex flex-col">
                      <span className="text-sm text-white font-bold">{item.name}</span>
                      <span className="text-xs text-text-muted">{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <WealthScoreDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <AIReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />
    </div>
  );
}
