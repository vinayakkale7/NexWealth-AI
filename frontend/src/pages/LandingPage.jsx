import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, BrainCircuit, Activity, Lock, Users, LineChart, 
  ArrowRight, CheckCircle2, ChevronRight, Menu, X, Sparkles, 
  Zap, TrendingUp, Download, LockKeyhole
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';

/* -------------------------------------------------------------------------- */
/*                                 COMPONENTS                                 */
/* -------------------------------------------------------------------------- */

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-2xl border-b border-white/5' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal/50 rounded-lg">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-teal to-accent-blue flex items-center justify-center shadow-glow group-hover:-translate-y-0.5 transition-transform">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">NexWealth AI</span>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {['Features', 'How it Works', 'AI Advisor', 'Security', 'Pricing'].map(item => (
            <a key={item} href="#" className="relative text-sm font-medium text-text-secondary hover:text-white transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal/50 rounded-md px-1 py-0.5">
              {item}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a href="#" className="text-sm font-medium text-white hover:text-accent-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal/50 rounded-md px-2 py-1">Log in</a>
          <button className="glass-panel px-5 py-2.5 rounded-full text-sm font-semibold text-white hover:bg-white/10 transition-all shadow-glow hover:shadow-glow-purple hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/50">
            Start Free
          </button>
        </div>

        <button className="lg:hidden text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal/50 rounded-md p-1" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-20 left-0 w-full glass-panel border-t-0 p-6 flex flex-col gap-4"
          >
            {['Features', 'How it Works', 'AI Advisor', 'Security', 'Pricing'].map(item => (
              <a key={item} href="#" className="text-text-secondary hover:text-white font-medium">{item}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const BackgroundEffects = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute inset-0 mesh-gradient opacity-40" />
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent-teal/10 blur-[150px] animate-blob" />
    <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-accent-purple/10 blur-[150px] animate-blob animation-delay-2000" />
    <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-accent-blue/10 blur-[150px] animate-blob animation-delay-4000" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light" />
  </div>
);

// MOCK DATA for Hero Dashboard
const nwData = [
  { month: 'Jan', value: 95 },
  { month: 'Feb', value: 102 },
  { month: 'Mar', value: 108 },
  { month: 'Apr', value: 105 },
  { month: 'May', value: 115 },
  { month: 'Jun', value: 124 },
];
const allocData = [
  { name: 'Equity', value: 65, color: '#10B981' },
  { name: 'Debt', value: 20, color: '#3B82F6' },
  { name: 'Gold', value: 15, color: '#8B5CF6' }
];

const HeroDashboardMock = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, rotateY: 20, scale: 0.95, x: 30 }}
      animate={{ opacity: 1, rotateY: 0, scale: 1, x: 0 }}
      transition={{ duration: 1, type: 'spring', damping: 25 }}
      className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square z-10"
    >
      {/* Main Dashboard Panel */}
      <div className="absolute inset-2 md:inset-6 glass-panel rounded-3xl p-6 flex flex-col gap-5 overflow-hidden shadow-float bg-background/40">
        
        {/* Top Stats */}
        <div className="flex justify-between items-start border-b border-white/5 pb-5">
          <div>
            <div className="text-[10px] text-text-secondary uppercase tracking-widest font-semibold mb-1">Family Net Worth</div>
            <div className="flex items-end gap-3">
              <div className="text-4xl font-bold text-white tracking-tighter">₹1.24 Cr</div>
              <div className="text-xs font-medium text-accent-emerald bg-accent-emerald/10 border border-accent-emerald/20 px-2 py-0.5 rounded flex items-center gap-1 mb-1">
                <TrendingUp className="w-3 h-3" /> +18.4%
              </div>
            </div>
          </div>
          <div className="text-right">
             <div className="text-[10px] text-text-secondary uppercase tracking-widest font-semibold mb-1">AI Health</div>
             <div className="text-2xl font-bold text-accent-teal tracking-tighter">82<span className="text-xs text-text-muted tracking-normal">/100</span></div>
          </div>
        </div>

        {/* Mid Section: Charts */}
        <div className="flex-1 flex gap-4 h-40">
          <div className="w-2/3 glass-panel rounded-2xl p-4 flex flex-col relative overflow-hidden bg-background/20">
            <div className="text-xs text-text-secondary mb-2 relative z-10">Net Worth Timeline</div>
            <div className="absolute inset-0 pt-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={nwData}>
                  <defs>
                    <linearGradient id="colorNw" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#14B8A6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#14B8A6" strokeWidth={2} fillOpacity={1} fill="url(#colorNw)" isAnimationActive={true} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="w-1/3 glass-panel rounded-2xl p-4 flex flex-col items-center justify-center relative bg-background/20">
            <div className="text-xs text-text-secondary absolute top-4 left-4">Allocation</div>
            <div className="w-full h-24 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie data={allocData} cx="50%" cy="50%" innerRadius={25} outerRadius={35} paddingAngle={5} dataKey="value" stroke="none">
                    {allocData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Section: Actionable Insights */}
        <div className="h-auto glass-panel rounded-2xl p-4 border border-accent-purple/20 bg-accent-purple/5 shadow-inner">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-accent-purple" />
            <span className="text-xs font-semibold text-white tracking-wide">AI Recommendation</span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Harvest ₹42,000 in short-term capital losses from <span className="text-white font-medium">HDFC Bank</span> to offset your recent gains.
          </p>
          <button className="mt-3 text-[11px] bg-accent-purple/10 border border-accent-purple/20 text-accent-purple hover:bg-accent-purple/20 px-3 py-1.5 rounded-lg font-medium transition-colors">
            Review Strategy
          </button>
        </div>
        
        {/* Animated grid background inside dashboard */}
        <div className="absolute inset-0 micro-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] pointer-events-none -z-10 opacity-30" />
      </div>

      {/* Floating Widgets */}
      <motion.div 
        animate={{ y: [-6, 6, -6] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-2 -left-2 glass-panel p-4 rounded-2xl flex items-center gap-3 shadow-premium z-20 bg-background/60"
      >
        <div className="w-8 h-8 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 flex items-center justify-center">
          <LineChart className="w-4 h-4 text-accent-emerald" />
        </div>
        <div>
          <div className="text-[10px] text-text-secondary font-medium tracking-wide">Portfolio XIRR</div>
          <div className="text-sm font-bold text-white tracking-tight">+18.4%</div>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [6, -6, 6] }} 
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 -right-2 glass-panel p-4 rounded-2xl flex items-center gap-3 shadow-premium z-20 bg-background/60"
      >
        <div className="w-8 h-8 rounded-full bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center">
          <Zap className="w-4 h-4 text-accent-blue" />
        </div>
        <div>
          <div className="text-[10px] text-text-secondary font-medium tracking-wide">Upcoming SIP</div>
          <div className="text-sm font-bold text-white tracking-tight">₹50,000 <span className="text-[10px] font-normal text-text-muted">in 2d</span></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AnimatedCounter = ({ value, suffix = '' }) => {
  return <span>{value}{suffix}</span>;
};

const Stats = () => (
  <section className="py-24 border-y border-white/5 bg-black/20 relative z-10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-teal/5 to-transparent opacity-30" />
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5 relative z-10">
      {[
        { label: 'Families', value: '12,000', icon: '👨‍👩‍👧', suffix: '+' },
        { label: 'Assets Managed', value: '₹125', icon: '📈', suffix: ' Cr+' },
        { label: 'Security', value: '99.99', icon: '🔒', suffix: '%' },
        { label: 'Average Growth', value: '15', icon: '🚀', suffix: '%' },
      ].map((stat, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="text-center px-4 group"
        >
          <div className="text-2xl mb-4 transform group-hover:-translate-y-1 transition-transform opacity-80">{stat.icon}</div>
          <div className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-2 drop-shadow-sm">
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-xs font-medium text-text-secondary uppercase tracking-widest">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  </section>
);

const BentoFeatures = () => {
  return (
    <section className="py-40 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tighter leading-tight">Intelligence at every layer</h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            Not just a tracker. NexWealth actively works to optimize your portfolio and reduce your tax burden, automatically.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[420px]">
          {/* Main Card (Wide) */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="md:col-span-2 glass-panel rounded-3xl p-10 md:p-12 flex flex-col justify-between relative overflow-hidden group shadow-premium"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 max-w-md">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-inner">
                <BrainCircuit className="w-6 h-6 text-accent-purple" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">AI Portfolio Advisor</h3>
              <p className="text-text-secondary text-base leading-relaxed">
                Chat with your portfolio. Ask complex questions and get data-driven answers instantly, powered by custom financial models.
              </p>
            </div>
            
            {/* Mock UI: AI Advisor snippet */}
            <div className="absolute right-[-5%] bottom-[-5%] w-2/3 h-[75%] glass-panel rounded-tl-3xl p-6 border-b-0 border-r-0 transform group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-700 shadow-float bg-background/80 micro-grid">
               <div className="flex items-center gap-3 mb-5">
                 <div className="w-8 h-8 rounded-full bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center shadow-glow-purple"><Sparkles className="w-4 h-4 text-accent-purple"/></div>
                 <div className="bg-white/5 px-4 py-1.5 rounded-full text-[11px] text-white border border-white/10 font-medium tracking-wide">Rebalancing suggested</div>
               </div>
               <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tr-sm text-sm text-text-primary mb-5 ml-11 border border-white/10 shadow-inner">
                 Increase Debt allocation by 5% to reduce portfolio volatility ahead of elections.
               </div>
               <div className="h-20 ml-11 flex items-end gap-2 px-2">
                 {[40, 70, 30, 90, 60].map((h, i) => (
                   <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} transition={{ delay: 0.2 + (i*0.1) }} className="flex-1 bg-gradient-to-t from-accent-purple/40 to-accent-blue/40 rounded-t-sm border-t border-white/20" />
                 ))}
               </div>
            </div>
          </motion.div>

          {/* Tall Card */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="glass-panel rounded-3xl p-10 flex flex-col justify-between relative overflow-hidden group shadow-premium"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-accent-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-inner">
                <Users className="w-6 h-6 text-accent-teal" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Joint Portfolio</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Merge portfolios seamlessly with granular access control and shared goals.</p>
            </div>
            
            {/* Mock UI: Joint Portfolio */}
            <div className="glass-panel p-6 rounded-2xl mt-8 shadow-float z-10 bg-background/80 micro-grid border-white/10">
              <div className="flex -space-x-3 justify-center mb-8">
                <div className="w-12 h-12 rounded-full border-2 border-background bg-gradient-to-br from-accent-teal to-accent-emerald flex items-center justify-center font-bold text-white z-20 shadow-inner text-sm">V</div>
                <div className="w-12 h-12 rounded-full border-2 border-background bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center font-bold text-white z-10 shadow-inner text-sm">P</div>
              </div>
              <div className="flex justify-between text-[10px] text-text-secondary mb-3 font-medium uppercase tracking-wider">
                <span>Vinayak (65%)</span>
                <span>Priya (35%)</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden shadow-inner">
                <div className="w-[65%] h-full bg-gradient-to-r from-accent-teal to-accent-blue" />
              </div>
            </div>
          </motion.div>

          {/* Small Card 1: ITR Summary */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="glass-panel rounded-3xl p-10 flex flex-col relative overflow-hidden group shadow-premium"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 z-10 shadow-inner">
              <Download className="w-6 h-6 text-accent-emerald" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 z-10 tracking-tight">ITR Reports</h3>
            <p className="text-sm text-text-secondary z-10 leading-relaxed">One-click capital gains tax reports for your CA.</p>
            
            <div className="absolute right-6 bottom-6 w-36 h-28 glass-panel rounded-xl opacity-40 group-hover:opacity-100 group-hover:-rotate-2 group-hover:-translate-y-2 transition-all duration-700 flex flex-col items-center justify-center gap-2.5 shadow-float bg-white/5">
               <div className="w-10 h-1 bg-white/20 rounded-full" />
               <div className="w-14 h-1 bg-white/20 rounded-full" />
               <div className="w-12 h-1 bg-white/20 rounded-full" />
               <div className="mt-3 w-8 h-8 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 flex items-center justify-center shadow-inner"><Download className="w-3 h-3 text-accent-emerald" /></div>
            </div>
          </motion.div>

          {/* Small Card 2: Encrypted Vault */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="md:col-span-2 glass-panel rounded-3xl p-10 flex flex-col justify-between relative overflow-hidden group shadow-premium"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-inner">
                <LockKeyhole className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Encrypted Vault</h3>
              <p className="text-text-secondary text-sm max-w-sm leading-relaxed">Military-grade AES-256 encryption for all your sensitive financial documents.</p>
            </div>
            
            {/* Mock UI: Vault list */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 w-72 glass-panel rounded-2xl p-5 shadow-float transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 bg-background/80 micro-grid">
               {[1,2,3].map(i => (
                 <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                   <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                     <Lock className="w-3 h-3 text-accent-teal" />
                   </div>
                   <div className="w-full">
                     <div className="h-1.5 w-3/4 bg-white/20 rounded-full mb-2" />
                     <div className="h-1 w-1/2 bg-white/10 rounded-full" />
                   </div>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TimelineSection = () => {
  const steps = [
    { title: "Connect", desc: "Link via secure API" },
    { title: "Analyze", desc: "Deep portfolio scan" },
    { title: "Insights", desc: "Find tax/growth gaps" },
    { title: "Optimize", desc: "1-click rebalance" },
  ];

  return (
    <section className="py-40 border-y border-white/5 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-24 text-center tracking-tighter">The Wealth Engine Workflow</h2>
        
        <div className="relative flex justify-between items-start max-w-4xl mx-auto hide-scrollbar overflow-x-auto pb-8 gap-4">
          {/* Background Line */}
          <div className="absolute top-6 left-0 w-full h-[1px] bg-white/10" />
          
          {/* Animated Line */}
          <motion.div 
            className="absolute top-6 left-0 h-[1px] bg-gradient-to-r from-accent-teal via-accent-blue to-accent-purple" 
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {/* AI Pulse */}
          <motion.div
            className="absolute top-[22px] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_3px_rgba(255,255,255,0.8)] z-20"
            initial={{ left: "0%", opacity: 0 }}
            whileInView={{ left: "100%", opacity: [0, 1, 1, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: "linear", delay: 0.5 }}
          />

          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 * i }}
              className="relative flex flex-col items-center min-w-[120px] z-10 group"
            >
              <div className="w-12 h-12 rounded-full glass-panel bg-background flex items-center justify-center mb-5 shadow-glow group-hover:shadow-glow-purple group-hover:-translate-y-1 transition-all duration-300">
                <CheckCircle2 className="w-5 h-5 text-accent-teal" />
              </div>
              <h4 className="text-white font-bold text-sm mb-1 text-center group-hover:text-accent-teal transition-colors tracking-tight">{step.title}</h4>
              <p className="text-[11px] text-text-secondary text-center tracking-wide">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AIChatSection = () => {
  return (
    <section className="py-40 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <div className="w-full lg:w-1/2">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tighter">Talk to your wealth.<br/>Literally.</h2>
            <p className="text-lg text-text-secondary mb-10 leading-relaxed max-w-lg">
              Unlike static dashboards, our AI understands context. Ask about tax harvesting, goal projections, or market impacts in plain English.
            </p>
            <button className="flex items-center gap-2 text-white text-sm font-semibold group bg-white/5 hover:bg-white/10 px-6 py-3 rounded-full transition-all border border-white/10 hover:border-white/20 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
              See how the AI works 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 rounded-3xl relative shadow-premium bg-background/60 micro-grid"
          >
             {/* User Message */}
             <div className="flex justify-end mb-8">
               <div className="bg-white/5 backdrop-blur-xl px-5 py-3 rounded-2xl rounded-tr-sm text-sm text-white shadow-inner border border-white/10">
                 How can we reduce our capital gains tax this year?
               </div>
             </div>

             {/* AI Response Cluster */}
             <div className="relative">
               <div className="absolute -left-12 -top-4 w-32 h-32 bg-accent-purple/10 blur-3xl rounded-full animate-pulse-slow pointer-events-none" />
               <div className="flex gap-4 relative z-10">
                 <div className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shadow-glow-purple border border-white/20">
                   <Sparkles className="w-3.5 h-3.5 text-white" />
                 </div>
                 <div className="space-y-4 w-full">
                   <div className="glass-panel bg-background/80 px-5 py-4 rounded-2xl rounded-tl-sm text-text-primary text-sm leading-relaxed border-white/10 shadow-inner">
                     Based on your recent exit from Reliance, you have ₹4.2L in STCG. I recommend tax-loss harvesting these three underperforming mutual funds before March 31st.
                   </div>
                   
                   {/* Mini fractured UI */}
                   <div className="flex gap-4">
                     <div className="glass-panel bg-background/80 p-4 rounded-xl flex-1 border-accent-emerald/20 shadow-inner hover:-translate-y-1 hover:border-accent-emerald/40 transition-all cursor-pointer group">
                        <div className="text-[10px] text-text-secondary mb-1 uppercase tracking-wider font-semibold">Est. Savings</div>
                        <div className="text-lg font-bold text-accent-emerald tracking-tight">₹62,400</div>
                     </div>
                     <div className="glass-panel bg-background/80 p-4 rounded-xl flex items-center justify-center gap-2 border-accent-blue/20 shadow-inner hover:bg-white/5 transition-colors cursor-pointer hover:-translate-y-1">
                        <Activity className="w-4 h-4 text-accent-blue" />
                        <span className="text-sm font-semibold text-white tracking-tight">View Strategy</span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Priyanka Patil",
      role: "Senior Manager",
      company: "Siemens Energy",
      initials: "PP",
      color: "from-accent-purple to-accent-blue",
      text: "NexWealth AI consolidated our messy family portfolios across 4 different brokers in seconds. The AI advisor's tax harvesting suggestions saved us ₹1.2L last year.",
      rating: 5
    },
    {
      name: "Rahul Verma",
      role: "Product Designer",
      company: "Stripe",
      initials: "RV",
      color: "from-accent-emerald to-accent-teal",
      text: "The joint portfolio feature is a game changer. My wife and I can finally see our combined net worth and track our shared goals in one beautiful dashboard.",
      rating: 5
    },
    {
      name: "Rajesri Bavane",
      role: "Financial Analyst",
      company: "TCS",
      initials: "RB",
      color: "from-accent-blue to-accent-purple",
      text: "As someone in finance, I was skeptical. But the level of granularity, the real-time XIRR calculations, and the military-grade encryption blew me away. Truly premium.",
      rating: 5
    }
  ];

  return (
    <section className="py-40 px-6 relative z-10 border-t border-white/5 bg-gradient-to-b from-background to-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter">Trusted by the best</h2>
          <p className="text-lg text-text-secondary">Join elite families managing over ₹500 Cr on NexWealth AI.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -6 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="glass-panel p-8 rounded-3xl flex flex-col justify-between shadow-premium group cursor-pointer bg-background/40"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-accent-teal fill-accent-teal" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="text-text-primary text-sm leading-[1.7] mb-8">"{t.text}"</p>
              </div>
              
              <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-inner border border-white/20 bg-gradient-to-br ${t.color}`}>
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold flex items-center gap-1.5 tracking-tight">
                    {t.name}
                    <svg className="w-3 h-3 text-accent-teal" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  </h4>
                  <p className="text-[11px] text-text-secondary tracking-wide">{t.role}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-40 px-6 relative z-10">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-teal/5 to-transparent pointer-events-none opacity-50" />
    <div className="max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-panel rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-premium border-white/10 bg-background/60 micro-grid"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-accent-teal/10 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-[1.1] drop-shadow-sm">
          Ready to build wealth<br/>together?
        </h2>
        <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto leading-relaxed">
          Join modern families managing their financial future with the world's most advanced AI wealth OS.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-background rounded-full text-sm font-bold hover:bg-gray-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
            Start Free Trial
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 glass-panel rounded-full text-sm font-bold text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20">
            Watch Demo <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-white/5 bg-background relative z-10 pt-24 pb-12 backdrop-blur-3xl">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-20">
        <div className="col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2 mb-6 group cursor-pointer inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal/50 rounded-lg">
            <Sparkles className="w-5 h-5 text-accent-teal group-hover:rotate-12 transition-transform" />
            <span className="text-white font-bold text-lg tracking-tight">NexWealth AI</span>
          </div>
          <p className="text-text-secondary text-sm mb-8 max-w-xs leading-[1.7]">
            The intelligent operating system for modern family wealth management. Bank-grade security, unparalleled insights.
          </p>
          
          <div className="mb-6">
            <p className="text-[10px] font-semibold text-text-muted mb-3 uppercase tracking-widest">Subscribe to our Newsletter</p>
            <div className="flex gap-2 max-w-sm">
              <input type="email" placeholder="Enter your email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-accent-teal focus:bg-white/10 w-full transition-all shadow-inner" />
              <button className="bg-white text-background px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1"></div>
        
        <div>
          <h4 className="text-white font-semibold mb-6 text-sm tracking-tight">Product</h4>
          <ul className="space-y-3 text-sm text-text-secondary">
            <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-sm">Features</a></li>
            <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-sm">Security</a></li>
            <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-sm">Pricing</a></li>
            <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-sm">Changelog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6 text-sm tracking-tight">Company</h4>
          <ul className="space-y-3 text-sm text-text-secondary">
            <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-sm">About Us</a></li>
            <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-sm">Careers</a></li>
            <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-sm">Blog</a></li>
            <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-sm">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6 text-sm tracking-tight">Legal</h4>
          <ul className="space-y-3 text-sm text-text-secondary">
            <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-sm">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-sm">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-sm">Security Practices</a></li>
            <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-sm text-accent-emerald flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse"></span> Systems Operational</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-text-muted">
        <p>© {new Date().getFullYear()} NexWealth AI. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          </a>
          <a href="#" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
          </a>
          <a href="#" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

/* -------------------------------------------------------------------------- */
/*                               MAIN PAGE RENDER                             */
/* -------------------------------------------------------------------------- */

export default function LandingPage() {
  return (
    <div className="bg-background min-h-screen text-text-primary relative font-sans">
      <BackgroundEffects />
      <Navbar />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center z-10 px-6 pb-24">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Hero Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel mb-8 hover:border-white/10 transition-colors cursor-pointer group shadow-sm bg-white/5">
                <Shield className="w-3.5 h-3.5 text-accent-teal group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-accent-teal uppercase tracking-widest">Bank-grade Security</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[1.05] tracking-tighter mb-8 drop-shadow-sm">
                Wealth <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-teal via-accent-blue to-accent-purple animate-pulse-slow">
                  Meets Intelligence
                </span>
              </h1>
              
              <p className="text-lg text-text-secondary max-w-lg mb-10 leading-[1.7]">
                Consolidate, analyze, and optimize your entire portfolio automatically. Built for families who demand precision and performance.
              </p>
              
              <div className="flex flex-wrap items-center gap-6">
                <button className="bg-white text-background px-8 py-3.5 rounded-full text-sm font-bold hover:bg-gray-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
                  Start Free Trial
                </button>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {["from-accent-teal to-accent-emerald", "from-accent-blue to-accent-purple", "from-accent-purple to-accent-teal"].map((color, i) => (
                      <div key={i} className={`w-8 h-8 rounded-full border-2 border-background z-${40-i*10} shadow-sm bg-gradient-to-br ${color} flex items-center justify-center text-[10px] font-bold text-white`}>
                        {['A', 'K', 'S'][i]}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex text-accent-teal">
                      {[1,2,3,4,5].map(i => <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                    </div>
                    <div className="text-[11px] text-text-secondary font-medium mt-0.5 tracking-wide">Trusted by 12k+</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hero Right Dashboard Mock */}
            <HeroDashboardMock />
          </div>
        </section>

        <Stats />
        <BentoFeatures />
        <TimelineSection />
        <AIChatSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
