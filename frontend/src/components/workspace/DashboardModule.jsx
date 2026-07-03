import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Wallet, Activity, Sparkles, Target } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

const mockChartData = [
  { name: 'Jan', value: 1200000 },
  { name: 'Feb', value: 1250000 },
  { name: 'Mar', value: 1240000 },
  { name: 'Apr', value: 1350000 },
  { name: 'May', value: 1420000 },
  { name: 'Jun', value: 1580000 },
];

const StatCard = ({ title, value, change, isPositive, icon: Icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="glass-panel p-5 rounded-2xl relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Icon size={64} />
    </div>
    <div className="flex justify-between items-start mb-4 relative z-10">
      <h3 className="text-text-secondary text-sm font-medium">{title}</h3>
      <div className="p-2 rounded-lg bg-white/5 border border-white/10">
        <Icon size={16} className="text-accent-teal" />
      </div>
    </div>
    <div className="relative z-10">
      <h2 className="text-3xl font-bold text-white mb-2">{value}</h2>
      <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-accent-emerald' : 'text-red-400'}`}>
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        <span>{change}</span>
        <span className="text-text-muted ml-1">vs last month</span>
      </div>
    </div>
  </motion.div>
);

export default function DashboardModule() {
  const portfolio = useAppStore(state => state.portfolio);

  const totalValue = useMemo(() => {
    return portfolio.reduce((acc, item) => acc + (item.shares * item.ltp), 0);
  }, [portfolio]);

  const allocation = useMemo(() => {
    const alloc = { Equity: 0, 'Mutual Funds': 0, Gold: 0, Bonds: 0 };
    portfolio.forEach(item => {
      if(alloc[item.category] !== undefined) alloc[item.category] += (item.shares * item.ltp);
    });
    
    const colors = { Equity: '#10B981', 'Mutual Funds': '#3B82F6', Gold: '#8B5CF6', Bonds: '#F59E0B' };
    
    return Object.entries(alloc)
      .filter(([_, val]) => val > 0)
      .map(([name, val]) => ({
        name,
        value: Number(((val / totalValue) * 100).toFixed(1)),
        color: colors[name] || '#ccc'
      }));
  }, [portfolio, totalValue]);

  return (
    <div className="flex flex-col gap-6 pb-20">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Good Morning, Vinayak</h1>
          <p className="text-text-secondary">Here's your family's financial overview today.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-accent-teal/20 to-accent-blue/20 border border-white/10 text-white hover:from-accent-teal/30 hover:to-accent-blue/30 transition-all shadow-glow">
          <Sparkles size={16} className="text-accent-teal" />
          <span className="font-medium text-sm">Generate AI Report</span>
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Net Worth" value={`₹${totalValue.toLocaleString('en-IN')}`} change="+4.2%" isPositive={true} icon={Wallet} delay={0.1} />
        <StatCard title="Monthly Growth" value="₹2,45,000" change="+1.8%" isPositive={true} icon={TrendingUp} delay={0.2} />
        <StatCard title="Today's Gain" value="-₹12,400" change="-0.4%" isPositive={false} icon={Activity} delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-panel p-6 rounded-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Portfolio Timeline</h3>
            <div className="flex gap-2 bg-black/20 p-1 rounded-lg border border-white/5">
              {['1W', '1M', '3M', '1Y', 'ALL'].map(period => (
                <button key={period} className={`px-3 py-1 rounded text-xs font-medium ${period === '1Y' ? 'bg-white/10 text-white shadow-sm' : 'text-text-muted hover:text-white'}`}>
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/100000}L`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Side Panel */}
        <div className="flex flex-col gap-6">
          {/* AI Wealth Score */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-panel p-6 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/20 blur-3xl rounded-full pointer-events-none" />
            <h3 className="text-sm font-medium text-text-secondary mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-accent-purple" />
              AI Wealth Score
            </h3>
            <div className="flex items-end gap-3 mb-2">
              <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-blue">84</span>
              <span className="text-text-muted text-lg mb-1">/ 100</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2 mb-4">
              <div className="bg-gradient-to-r from-accent-purple to-accent-blue h-2 rounded-full" style={{ width: '84%' }} />
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Your portfolio is well diversified. Consider increasing your emergency fund by ₹2L to optimize security.
            </p>
          </motion.div>

          {/* Asset Allocation */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-panel p-6 rounded-2xl flex-1"
          >
            <h3 className="text-sm font-medium text-text-secondary mb-4">Asset Allocation</h3>
            <div className="flex items-center justify-between">
              <div className="w-[120px] h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={allocation} innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value" stroke="none">
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
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <div className="flex flex-col">
                      <span className="text-sm text-white font-medium">{item.name}</span>
                      <span className="text-xs text-text-muted">{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
