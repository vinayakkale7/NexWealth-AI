import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, FileBarChart, PieChart, Calendar, Eye } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

const ICONS = {
  Performance: FileBarChart,
  Tax: FileText,
  Analysis: PieChart
};

export default function ReportsModule() {
  const reports = useAppStore(state => state.reports);

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Report Library</h1>
          <p className="text-text-secondary">Generate, view, and download your comprehensive financial reports.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-4 cursor-pointer hover:bg-white/5 transition-colors border border-dashed border-white/20">
          <div className="w-16 h-16 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue">
            <FileText size={32} />
          </div>
          <div>
            <h3 className="text-white font-medium mb-1">Generate New Report</h3>
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
              className="glass-panel p-6 rounded-2xl flex flex-col justify-between group"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="p-3 rounded-xl bg-white/5 text-white">
                  <Icon size={24} />
                </div>
                <span className="text-[10px] font-medium px-2 py-1 bg-white/5 rounded text-text-muted uppercase tracking-wider border border-white/10">{report.type}</span>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-accent-teal transition-colors">{report.title}</h3>
                <div className="flex items-center gap-2 text-xs text-text-muted mb-6">
                  <Calendar size={12} />
                  <span>{report.date}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="flex-1 py-2 rounded-lg bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    <Eye size={14} /> Preview
                  </button>
                  <button className="p-2 rounded-lg bg-accent-teal/10 text-accent-teal hover:bg-accent-teal/20 transition-colors">
                    <Download size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
