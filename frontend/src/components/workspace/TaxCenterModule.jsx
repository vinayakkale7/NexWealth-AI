import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Receipt, TrendingDown, ArrowUpRight, ArrowDownRight, FileText, Download, ShieldAlert, Zap, Sparkles, Loader2, Info } from 'lucide-react';
import useAppStore, { calculatePortfolioStats } from '../../store/useAppStore';

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
        <div className={`flex items-center gap-1 text-sm font-bold ${isPositive ? 'text-accent-emerald' : 'text-amber-400'}`}>
          {isPositive ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
          <span>{change}</span>
          <span className="text-text-muted ml-1 font-medium">status</span>
        </div>
      )}
    </div>
  </motion.div>
);

export default function TaxCenterModule() {
  const portfolio = useAppStore(state => state.portfolio);
  const aiTax = useAppStore(state => state.aiTaxInsights);
  const fetchTaxInsights = useAppStore(state => state.fetchTaxInsights);
  const isDemoMode = useAppStore(state => state.isDemoMode);
  
  const [isLoadingTax, setIsLoadingTax] = useState(false);

  useEffect(() => {
    if (!aiTax && portfolio.length > 0 && !isDemoMode) {
      setIsLoadingTax(true);
      fetchTaxInsights()
        .catch(() => {})
        .finally(() => setIsLoadingTax(false));
    }
  }, [portfolio.length, aiTax, fetchTaxInsights, isDemoMode]);

  const stats = useMemo(() => calculatePortfolioStats(portfolio), [portfolio]);
  const unrealizedGain = Math.max(0, stats.totalNetWorth - stats.totalInvested);

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">Tax Center</h1>
          <p className="text-text-secondary">Analyze capital gains, harvest tax opportunities, and organize ITR metrics.</p>
        </div>
      </div>

      {/* Informational Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-3 text-xs text-text-muted">
        <Info size={16} className="text-accent-teal shrink-0" />
        <span>{aiTax?.disclaimer || "Informational estimates only. Not registered tax or financial advice. Consult a certified CA before executing tax strategies."}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TaxStatCard 
          title="Unrealized P&L" 
          value={`₹${unrealizedGain.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`} 
          change={unrealizedGain > 125000 ? "LTCG > Exemption" : "Under ₹1.25L Exemption"} 
          isPositive={unrealizedGain <= 125000} 
          icon={TrendingDown} 
          delay={0.1} 
        />
        <TaxStatCard 
          title="Tax Efficiency Score" 
          value={`${aiTax?.tax_opportunity_score ?? 75}/100`} 
          change="AI Evaluated" 
          isPositive={true} 
          icon={Receipt} 
          delay={0.2} 
        />
        <TaxStatCard 
          title="Section 80C Opportunity" 
          value="₹1.50L Limit" 
          change="ELSS / PPF Eligible" 
          isPositive={true} 
          icon={ShieldAlert} 
          delay={0.3} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass-panel p-6 rounded-2xl border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
              <Zap size={16} className="text-accent-purple" /> AI Tax Saving Observations
            </h3>
            {isLoadingTax && <Loader2 size={16} className="animate-spin text-accent-purple" />}
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-accent-purple/10 border border-accent-purple/20">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-white text-sm">Portfolio Tax Posture</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-accent-purple/20 text-accent-purple rounded uppercase">
                  Confidence {aiTax?.confidence ? `${Math.round(aiTax.confidence)}%` : '90%'}
                </span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed mb-3">
                {aiTax?.summary || "Analyzing your portfolio's unrealized capital gains and 80C opportunities."}
              </p>
            </div>
            
            {aiTax?.recommendations?.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">AI Recommendations</h4>
                {aiTax.recommendations.map((rec, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-text-primary flex items-start gap-2">
                    <Sparkles size={14} className="text-accent-teal shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            )}

            {aiTax?.section_80c_observations?.length > 0 && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white text-xs block mb-1">Section 80C Deduction Notes</span>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {aiTax.section_80c_observations.join(' ')}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="glass-panel p-6 rounded-2xl border border-white/5">
          <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-6 flex items-center gap-2">
            <FileText size={16} /> ITR Preparation Summary
          </h3>
          <div className="space-y-3">
            {[
              { year: 'FY 25-26', status: 'In Progress', color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20' },
              { year: 'FY 24-25', status: 'Filed', color: 'text-accent-emerald', bg: 'bg-accent-emerald/10 border-accent-emerald/20' },
              { year: 'FY 23-24', status: 'Filed', color: 'text-accent-emerald', bg: 'bg-accent-emerald/10 border-accent-emerald/20' },
            ].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/10 text-white">
                    <FileText size={16} />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">{doc.year} Tax Metrics</span>
                    <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded border mt-1 inline-block ${doc.color} ${doc.bg}`}>{doc.status}</span>
                  </div>
                </div>
                <div className="text-xs text-text-muted">
                  Ready for CA Review
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
