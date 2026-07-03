import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Sparkles, Send, ShieldCheck, Zap } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

export default function AdvisorModule() {
  const history = useAppStore(state => state.advisorHistory);
  const addMessage = useAppStore(state => state.addAdvisorMessage);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    addMessage({ id: Date.now().toString(), role: 'user', content: input });
    setInput('');
    setIsTyping(true);
    
    // Mock AI delay and response
    setTimeout(() => {
      addMessage({ 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: 'I understand you are asking about optimal investment strategies. Based on your current ₹1.58Cr net worth and moderate risk profile, deploying funds via a Systematic Transfer Plan (STP) over 6 months minimizes market timing risk while keeping funds active.',
        reasoning: 'VIX is currently elevated (above 15), suggesting near-term volatility. STP mitigates sequence of returns risk.',
        confidence: 88
      });
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] pb-6">
      <div className="flex justify-between items-end mb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-3">
            AI Advisor
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-gradient-to-r from-accent-purple to-accent-blue text-white shadow-glow-purple">PRO</span>
          </h1>
          <p className="text-text-secondary">Ask anything about your portfolio, taxes, or market trends.</p>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-2xl flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-accent-purple/5 blur-[100px] animate-blob" />
          <div className="absolute bottom-[20%] right-[20%] w-[40%] h-[40%] rounded-full bg-accent-blue/5 blur-[100px] animate-blob animation-delay-2000" />
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 relative z-10 hide-scrollbar">
          {history.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col gap-2 max-w-[80%] ${msg.role === 'user' ? 'self-end' : ''}`}
            >
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-3 ml-2 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-purple to-accent-blue flex items-center justify-center shadow-glow-purple">
                    <BrainCircuit size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-text-secondary">NexWealth AI</span>
                </div>
              )}
              
              <div className={`${
                msg.role === 'user' 
                  ? 'bg-accent-blue/20 border-accent-blue/30 rounded-tr-sm' 
                  : 'bg-white/5 border-white/10 rounded-tl-sm'
                } border rounded-2xl p-4 text-white text-sm leading-relaxed backdrop-blur-md shadow-glow whitespace-pre-wrap`}
              >
                {msg.content}
              </div>
              
              {msg.reasoning && (
                <div className="bg-black/20 border border-white/5 rounded-xl p-3 mt-1 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs text-text-muted font-medium uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Zap size={12}/> Analysis</span>
                    <span className="flex items-center gap-1 text-accent-emerald"><ShieldCheck size={12}/> {msg.confidence}% Confidence</span>
                  </div>
                  <div className="text-xs text-text-secondary">{msg.reasoning}</div>
                </div>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-text-muted p-2 ml-10"
            >
              <div className="flex gap-1">
                <motion.div className="w-1.5 h-1.5 rounded-full bg-accent-purple" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
                <motion.div className="w-1.5 h-1.5 rounded-full bg-accent-purple" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.5, delay: 0.1, repeat: Infinity }} />
                <motion.div className="w-1.5 h-1.5 rounded-full bg-accent-purple" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.5, delay: 0.2, repeat: Infinity }} />
              </div>
              <span className="text-xs font-medium">Analyzing...</span>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="p-4 relative z-10 flex gap-3 overflow-x-auto hide-scrollbar shrink-0">
          {['Simulate ₹50k monthly SIP', 'Tax harvesting opportunities', 'Analyze my debt funds'].map((q) => (
            <button 
              key={q} 
              onClick={() => { setInput(q); handleSend(); }}
              className="whitespace-nowrap px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-text-secondary hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Sparkles size={12} className="text-accent-teal" />
              {q}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/10 relative z-10 shrink-0 bg-black/20 backdrop-blur-xl">
          <div className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Ask me to analyze a stock, plan a goal, or optimize taxes..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-4 pr-12 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 transition-all shadow-inner"
            />
            <button 
              onClick={handleSend}
              className="absolute right-3 p-2 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue text-white shadow-glow-purple hover:opacity-90 transition-opacity"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
