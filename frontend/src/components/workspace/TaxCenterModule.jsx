import React from 'react';
import { motion } from 'framer-motion';
import { Receipt, AlertCircle, ArrowUpRight, ArrowDownRight, CheckCircle2 } from 'lucide-react';

export default function TaxCenterModule() {
  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Tax Center</h1>
          <p className="text-text-secondary">AI-driven tax optimization and liability tracking.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-5 rounded-2xl col-span-1 md:col-span-2 relative overflow-hidden group border-l-2 border-accent-blue">
          <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
            <Receipt size={160} />
          </div>
          <h3 className="text-sm font-medium text-text-secondary mb-1">Estimated Tax Liability (FY 26-27)</h3>
          <h2 className="text-4xl font-bold text-white mb-2">₹4,25,000</h2>
          <p className="text-sm text-text-muted flex items-center gap-1">
            <AlertCircle size={14} className="text-amber-400" /> Advance tax due on Sept 15
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <h3 className="text-sm font-medium text-text-secondary mb-2">STCG</h3>
          <h2 className="text-2xl font-bold text-white mb-1">₹45,200</h2>
          <div className="flex items-center gap-1 text-xs text-red-400 font-medium">
            <ArrowUpRight size={14} /> +12% YoY
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <h3 className="text-sm font-medium text-text-secondary mb-2">LTCG</h3>
          <h2 className="text-2xl font-bold text-white mb-1">₹1,85,000</h2>
          <div className="flex items-center gap-1 text-xs text-accent-emerald font-medium">
            <CheckCircle2 size={14} /> Exemption Applied
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-white mb-4">AI Tax Savings Suggestions</h3>
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-accent-purple/10 to-transparent border border-accent-purple/20 flex items-start gap-4">
            <div className="p-2 rounded-lg bg-accent-purple/20 text-accent-purple mt-1">
              <Receipt size={20} />
            </div>
            <div>
              <h4 className="font-bold text-white mb-1">Tax Harvesting Opportunity</h4>
              <p className="text-sm text-text-secondary mb-3">You have unrealized losses of ₹35,000 in your Tech portfolio. Booking these can offset your current STCG liability.</p>
              <button className="px-4 py-1.5 rounded-lg bg-accent-purple text-white text-sm font-medium hover:bg-accent-purple/90 transition-colors">
                Review Assets
              </button>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4">
            <div className="p-2 rounded-lg bg-white/10 text-white mt-1">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h4 className="font-bold text-white mb-1">Section 80C Optimized</h4>
              <p className="text-sm text-text-secondary">Your ELSS investments have successfully maxed out the ₹1.5L limit for this financial year.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
