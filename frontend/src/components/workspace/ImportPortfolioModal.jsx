import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, FileSpreadsheet, Server, Zap, CheckCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const BROKERS = ['Zerodha', 'Groww', 'Upstox', 'Angel One'];

export default function ImportPortfolioModal({ isOpen, onClose }) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

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

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      toast.success('File uploaded successfully! Processing holdings...');
      onClose();
    }, 2000);
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
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue to-accent-emerald flex items-center justify-center shadow-glow">
                  <Server className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Import Portfolio</h2>
                  <p className="text-sm text-text-secondary">Sync your holdings automatically via CSV or Broker API.</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors text-text-secondary hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-8">
              
              {/* Drag and Drop Zone */}
              <div 
                className={`relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-all ${dragActive ? 'border-accent-teal bg-accent-teal/10' : 'border-white/10 hover:border-white/30 bg-black/20'}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input 
                  type="file" 
                  accept=".csv,.xlsx" 
                  onChange={handleChange} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {isUploading ? (
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 size={48} className="text-accent-teal animate-spin" />
                    <p className="text-white font-bold">Uploading File...</p>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <UploadCloud size={32} className="text-accent-teal" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Click or drag file to this area to upload</h3>
                    <p className="text-sm text-text-secondary max-w-sm">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files.</p>
                    
                    <div className="flex items-center gap-2 mt-6">
                      <FileSpreadsheet size={16} className="text-accent-blue" />
                      <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Supported formats: CSV, XLSX</span>
                    </div>
                  </>
                )}
              </div>

              {/* Supported Brokers */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                    <Zap size={16} className="text-accent-purple" />
                    Broker Integration (Coming Soon)
                  </h3>
                  <span className="px-2 py-1 rounded bg-accent-purple/20 text-accent-purple text-[10px] font-bold uppercase tracking-wider">Beta</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {BROKERS.map(broker => (
                    <div key={broker} className="glass-panel p-4 rounded-xl border border-white/5 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed flex flex-col items-center justify-center text-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="text-lg font-black text-white">{broker[0]}</span>
                      </div>
                      <span className="text-xs font-bold text-white">{broker}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
