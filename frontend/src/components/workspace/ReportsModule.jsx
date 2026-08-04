import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, FileBarChart, PieChart, Calendar, Eye, X, Sparkles, TrendingUp } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

const ICONS = { Performance: FileBarChart, Tax: FileText, Analysis: PieChart };

const ReportPreviewModal = ({ isOpen, onClose, report }) => (
  <AnimatePresence>
    {isOpen && report && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-background/90 backdrop-blur-md" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl h-[85vh] flex flex-col glass-panel rounded-3xl border border-white/10 shadow-premium bg-card overflow-hidden"
        >
          {/* Header */}
          <div className="shrink-0 flex items-center justify-between p-4 border-b border-white/10 bg-black/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white leading-tight">{report.title}</h2>
                <p className="text-xs text-text-muted">{report.date} • {report.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-teal/10 text-accent-teal hover:bg-accent-teal/20 transition-colors text-sm font-bold">
                <Download size={16} /> Download PDF
              </button>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors text-text-secondary hover:text-white"><X size={20} /></button>
            </div>
          </div>
          
          {/* Mock PDF Content */}
          <div className="flex-1 overflow-y-auto p-8 bg-[#f8f9fa] text-gray-900 shadow-inner custom-scrollbar relative">
            <div className="max-w-2xl mx-auto bg-white p-10 min-h-full shadow-sm border border-gray-200 rounded-sm">
              <header className="border-b-2 border-gray-800 pb-6 mb-8 flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-2">NexWealth AI</h1>
                  <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">{report.type} Report</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p className="font-bold">Family Trust</p>
                  <p>{report.date}</p>
                </div>
              </header>

              <section className="mb-10">
                <h2 className="text-xl font-bold mb-4 text-gray-900 border-b border-gray-200 pb-2">Executive Summary</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Over the specified period, the portfolio has demonstrated resilient growth, outperforming the benchmark index by 2.4%. Key drivers were strategic allocations in mid-cap equities and defensive tech stocks.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded border border-gray-100">
                    <span className="text-xs text-gray-500 font-bold uppercase block mb-1">Period Return</span>
                    <span className="text-2xl font-black text-emerald-600 flex items-center gap-2"><TrendingUp size={20} /> +12.4%</span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded border border-gray-100">
                    <span className="text-xs text-gray-500 font-bold uppercase block mb-1">Ending Value</span>
                    <span className="text-2xl font-black text-gray-900">₹1,58,40,000</span>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-bold mb-4 text-gray-900 border-b border-gray-200 pb-2">AI Insights & Optimization</h2>
                <div className="p-5 bg-indigo-50 border border-indigo-100 rounded text-indigo-900 flex gap-4">
                  <Sparkles className="shrink-0 mt-1" />
                  <p className="text-sm leading-relaxed">
                    <strong>Tax Loss Harvesting Identified:</strong> You have unrealized short-term capital losses of ₹42,000 in HDFC. Liquidating this position before March 31st can offset identical gains in Reliance Industries, saving approximately ₹6,300 in taxes.
                  </p>
                </div>
              </section>

              <footer className="mt-20 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
                Generated securely by NexWealth AI. Confidential and strictly for intended recipients.
              </footer>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default function ReportsModule() {
  const reports = useAppStore(state => state.reports);
  const [selectedReport, setSelectedReport] = useState(null);

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">Report Library</h1>
          <p className="text-text-secondary">Generate, view, and download comprehensive financial reports.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-4 cursor-pointer hover:bg-white/5 transition-colors border border-dashed border-white/20 hover:border-white/40">
          <div className="w-16 h-16 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue shadow-glow">
            <FileText size={32} />
          </div>
          <div>
            <h3 className="text-white font-bold mb-1 tracking-tight">Generate New Report</h3>
            <p className="text-xs text-text-muted">Custom performance, tax, or wealth report.</p>
          </div>
        </motion.div>

        {reports.map((report, i) => {
          const Icon = ICONS[report.type] || FileText;
          return (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i + 1) * 0.1 }}
              key={report.id} 
              className="glass-panel p-6 rounded-2xl flex flex-col justify-between group border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="p-3 rounded-xl bg-white/5 text-white border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Icon size={24} className="group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[10px] font-bold px-2 py-1 bg-white/5 rounded text-text-secondary uppercase tracking-wider border border-white/10">{report.type}</span>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-2 leading-tight tracking-tight">{report.title}</h3>
                <div className="flex items-center gap-2 text-xs font-medium text-text-muted mb-6">
                  <Calendar size={12} />
                  <span>{report.date}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button onClick={() => setSelectedReport(report)} className="flex-1 py-2.5 rounded-xl bg-white/5 text-sm font-bold text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    <Eye size={16} /> Preview
                  </button>
                  <button className="p-2.5 rounded-xl bg-accent-teal/10 text-accent-teal hover:bg-accent-teal/20 transition-colors border border-accent-teal/20">
                    <Download size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <ReportPreviewModal isOpen={!!selectedReport} onClose={() => setSelectedReport(null)} report={selectedReport} />
    </div>
  );
}
