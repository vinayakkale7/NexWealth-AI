import React from 'react';
import { motion } from 'framer-motion';
import { Receipt, TrendingDown, ArrowUpRight, ArrowDownRight, FileText, Download, ShieldAlert, Zap } from 'lucide-react';

const TaxStatCard = ({ title, value, change, isPositive, icon: Icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }}
    className="glass-panel p-5 rounded-2xl relative overflow-hidden group border border-white/5"
  >
    <div className="absolute top-0 right-0 p-4 opacity-5">
      <Icon size={64} className="text-white" />
    </div>
    <div className="flex justify-between items-start mb-4 relative z-10">
      <h3 className="text-text-secondary text-sm font-bold uppercase tracking-widest">{title}</h3>
      <div className="p-2 rounded-lg bg-white/5 border border-white/10">
        <Icon size={16} className="text-accent-teal" />
      </div>
    </div>
    <div className="relative z-10">
      <h2 className="text-3xl font-black text-white mb-2">{value}</h2>
      {change && (
        <div className={`flex items-center gap-1 text-sm font-bold ${isPositive ? 'text-accent-emerald' : 'text-red-400'}`}>
          {isPositive ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
          <span>{change}</span>
          <span className="text-text-muted ml-1 font-medium">projected liability</span>
        </div>
      )}
    </div>
  </motion.div>
);

export default function TaxCenterModule() {
  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">Tax Center</h1>
          <p className="text-text-secondary">Analyze capital gains, harvest losses, and prepare your ITR.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-teal text-white font-bold hover:bg-accent-teal/90 transition-all shadow-glow hover:-translate-y-0.5">
          <Download size={16} /> Export Tax P&L
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TaxStatCard title="Est. Capital Gains" value="₹2,45,000" change="-₹42,000" isPositive={true} icon={TrendingDown} delay={0.1} />
        <TaxStatCard title="Short Term (STCG)" value="₹85,000" change="Action Req." isPositive={false} icon={Receipt} delay={0.2} />
        <TaxStatCard title="Long Term (LTCG)" value="₹1,60,000" change="Under Exemption" isPositive={true} icon={ShieldAlert} delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass-panel p-6 rounded-2xl border border-white/5">
          <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-6 flex items-center gap-2">
            <Zap size={16} className="text-accent-purple" /> AI Tax Saving Opportunities
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-accent-purple/10 border border-accent-purple/20">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-white">Harvest Short-Term Losses</span>
                <span className="text-xs font-bold px-2 py-1 bg-accent-purple/20 text-accent-purple rounded uppercase">High Impact</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                You have ₹42,000 in unrealized STCG losses in HDFC Bank. Selling this position before March 31st can offset your recent gains in Reliance.
              </p>
              <button className="text-sm font-bold text-accent-purple hover:text-white transition-colors">Review Trade Strategy →</button>
            </div>
            
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-white">Section 80C Optimization</span>
                <span className="text-xs font-bold px-2 py-1 bg-white/10 text-text-muted rounded uppercase">Medium Impact</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                You have only utilized ₹80,000 of your ₹1,50,000 80C limit. Consider investing ₹70,000 in ELSS before the financial year ends to save up to ₹21,000 in taxes.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="glass-panel p-6 rounded-2xl border border-white/5">
          <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-6 flex items-center gap-2">
            <FileText size={16} /> ITR Document Summary
          </h3>
          <div className="space-y-3">
            {[
              { year: 'FY 25-26', status: 'Pending', color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20' },
              { year: 'FY 24-25', status: 'Filed', color: 'text-accent-emerald', bg: 'bg-accent-emerald/10 border-accent-emerald/20' },
              { year: 'FY 23-24', status: 'Filed', color: 'text-accent-emerald', bg: 'bg-accent-emerald/10 border-accent-emerald/20' },
            ].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/10 text-white">
                    <FileText size={16} />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">{doc.year} Tax Summary</span>
                    <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded border mt-1 inline-block ${doc.color} ${doc.bg}`}>{doc.status}</span>
                  </div>
                </div>
                <button className="p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/10 transition-colors">
                  <Download size={18} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
