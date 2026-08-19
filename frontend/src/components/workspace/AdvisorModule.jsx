import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Sparkles, Send, ShieldCheck, Zap, ShieldAlert, FileText, ChevronRight, RefreshCw, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import useAppStore from '../../store/useAppStore';

const ContextCard = ({ title, icon: Icon, children, colorClass }) => (
  <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
    <h3 className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-3 ${colorClass}`}>
      <Icon size={14} /> {title}
    </h3>
    {children}
  </div>
);

// Simple Markdown formatting component for rendering lists, bold text, and line breaks cleanly
const FormattedMessage = ({ text }) => {
  if (!text) return null;

  const lines = text.split('\n');
  return (
    <div className="space-y-2 leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;

        // Headings ### or ## or #
        if (trimmed.startsWith('### ')) {
          return <h4 key={idx} className="text-sm font-bold text-white mt-3 mb-1">{trimmed.replace('### ', '')}</h4>;
        }
        if (trimmed.startsWith('## ')) {
          return <h3 key={idx} className="text-base font-bold text-white mt-4 mb-2">{trimmed.replace('## ', '')}</h3>;
        }
        if (trimmed.startsWith('# ')) {
          return <h2 key={idx} className="text-lg font-black text-white mt-4 mb-2">{trimmed.replace('# ', '')}</h2>;
        }

        // Bullet points
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          const content = trimmed.substring(2);
          return (
            <div key={idx} className="flex items-start gap-2 ml-2">
              <span className="text-accent-teal mt-1 text-xs">•</span>
              <span className="text-text-primary text-sm">{renderFormattedText(content)}</span>
            </div>
          );
        }

        // Numbered list
        if (/^\d+\.\s/.test(trimmed)) {
          const match = trimmed.match(/^(\d+\.)\s(.*)$/);
          return (
            <div key={idx} className="flex items-start gap-2 ml-2">
              <span className="text-accent-purple font-bold text-xs shrink-0">{match[1]}</span>
              <span className="text-text-primary text-sm">{renderFormattedText(match[2])}</span>
            </div>
          );
        }

        return <p key={idx} className="text-text-primary text-sm">{renderFormattedText(trimmed)}</p>;
      })}
    </div>
  );
};

const renderFormattedText = (str) => {
  // Convert **bold** to strong
  const parts = str.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export default function AdvisorModule() {
  const history = useAppStore(state => state.advisorHistory);
  const sendAIChat = useAppStore(state => state.sendAIChat);
  const aiHealth = useAppStore(state => state.aiPortfolioHealth);
  const aiTax = useAppStore(state => state.aiTaxInsights);
  const isDemoMode = useAppStore(state => state.isDemoMode);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastFailedQuery, setLastFailedQuery] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isTyping]);

  const handleSend = async (customQuery) => {
    const textToSend = customQuery || input;
    if (!textToSend.trim() || isTyping) return;
    
    setInput('');
    setIsTyping(true);
    setLastFailedQuery(null);

    try {
      await sendAIChat(textToSend);
    } catch (err) {
      setLastFailedQuery(textToSend);
      toast.error('Failed to get AI response. You can click retry.');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] pb-6">
      <div className="flex justify-between items-end mb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-3 tracking-tight">
            AI Advisor
            <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-widest font-bold bg-gradient-to-r from-accent-purple to-accent-blue text-white shadow-glow-purple">
              Live Engine
            </span>
          </h1>
          <p className="text-text-secondary">Your personal financial intelligence engine grounded in real portfolio data.</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 glass-panel rounded-2xl flex flex-col overflow-hidden relative border border-white/5 bg-background/50">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-accent-purple/5 blur-[100px] animate-blob" />
            <div className="absolute bottom-[20%] right-[20%] w-[40%] h-[40%] rounded-full bg-accent-blue/5 blur-[100px] animate-blob animation-delay-2000" />
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 relative z-10 hide-scrollbar">
            {history.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12 opacity-80">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shadow-glow-purple mb-4">
                  <BrainCircuit size={32} className="text-white" />
                </div>
                <p className="text-white font-bold text-lg mb-1">How can NexWealth AI assist you today?</p>
                <p className="text-sm text-text-muted max-w-md mb-6">
                  Ask about your active asset allocation, portfolio risk evaluation, milestone goals, or tax planning.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
                  {[
                    "Analyze my portfolio.",
                    "What are the biggest risks in my portfolio?",
                    "How can I improve diversification?",
                    "How am I doing toward my goals?"
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs font-semibold text-text-secondary hover:text-white transition-all flex items-center gap-2 group"
                    >
                      <Sparkles size={14} className="text-accent-teal shrink-0 group-hover:scale-110 transition-transform" />
                      <span>{q}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {history.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col gap-2 max-w-[85%] ${msg.role === 'user' ? 'self-end' : ''}`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-3 ml-2 mb-1">
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shadow-glow-purple">
                      <Sparkles size={14} className="text-white" />
                    </div>
                    <span className="text-xs font-bold text-text-secondary tracking-wider uppercase">NexWealth AI</span>
                  </div>
                )}
                
                <div className={`${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-br from-accent-blue/20 to-accent-blue/10 border-accent-blue/30 rounded-tr-sm text-white' 
                    : msg.isError
                    ? 'bg-red-500/10 border-red-500/30 rounded-tl-sm text-red-200'
                    : 'bg-white/5 border-white/10 rounded-tl-sm text-white'
                  } border rounded-2xl p-4 text-sm leading-relaxed backdrop-blur-md shadow-glass`}
                >
                  {msg.role === 'user' ? (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <FormattedMessage text={msg.content} />
                  )}
                </div>
                
                {msg.reasoning && (
                  <div className="bg-black/30 border border-white/5 rounded-xl p-3 mt-1 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[10px] text-text-muted font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5 text-accent-teal"><Zap size={12}/> Analysis Pipeline</span>
                      <span className="flex items-center gap-1.5 text-accent-emerald"><ShieldCheck size={12}/> {msg.confidence}% Grounded</span>
                    </div>
                    <div className="text-xs text-text-secondary leading-relaxed">{msg.reasoning}</div>
                  </div>
                )}

                {msg.isError && lastFailedQuery && (
                  <button 
                    onClick={() => handleSend(lastFailedQuery)}
                    className="self-start mt-1 flex items-center gap-1.5 text-xs font-bold text-accent-teal hover:underline"
                  >
                    <RefreshCw size={12} /> Retry request
                  </button>
                )}
              </motion.div>
            ))}

            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-text-muted p-2 ml-2">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-accent-purple/50 to-accent-blue/50 flex items-center justify-center animate-pulse">
                  <Sparkles size={14} className="text-white" />
                </div>
                <div className="flex gap-1.5 items-center">
                  <motion.div className="w-2 h-2 rounded-full bg-accent-purple" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity }} />
                  <motion.div className="w-2 h-2 rounded-full bg-accent-teal" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, delay: 0.2, repeat: Infinity }} />
                  <motion.div className="w-2 h-2 rounded-full bg-accent-blue" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, delay: 0.4, repeat: Infinity }} />
                  <span className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-2">Synthesizing Real Data...</span>
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-3 relative z-10 flex gap-2 overflow-x-auto hide-scrollbar shrink-0 border-t border-white/5 bg-black/20">
            {[
              'Analyze my portfolio.',
              'What are the biggest risks in my portfolio?',
              'How can I improve diversification?',
              'How am I doing toward my goals?'
            ].map((q) => (
              <button 
                key={q} 
                onClick={() => handleSend(q)}
                disabled={isTyping}
                className="whitespace-nowrap px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-text-secondary hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <Sparkles size={12} className="text-accent-teal shrink-0" />
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-white/10 relative z-10 shrink-0 bg-background/80 backdrop-blur-xl">
            <div className="relative flex items-center">
              <input 
                type="text" 
                placeholder="Ask about your holdings, risks, goals, or tax strategy..."
                value={input} 
                onChange={e => setInput(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                disabled={isTyping}
                className="w-full bg-black/30 border border-white/10 rounded-2xl py-3.5 pl-4 pr-14 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 transition-all"
              />
              <button 
                onClick={() => handleSend()} 
                disabled={!input.trim() || isTyping}
                className="absolute right-2.5 p-2.5 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue text-white shadow-glow-purple hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Context Panel */}
        <div className="w-full lg:w-80 flex flex-col gap-4 overflow-y-auto hide-scrollbar shrink-0">
          <ContextCard title="AI Health Assessment" icon={ShieldAlert} colorClass="text-accent-teal">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Health Score</span>
                <span className="font-bold text-white text-base">{aiHealth?.health_score ? `${aiHealth.health_score}/100` : 'Analyze to view'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Risk Level</span>
                <span className={`font-bold px-2 py-0.5 rounded text-xs ${aiHealth?.risk_level === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-accent-emerald/20 text-accent-emerald'}`}>
                  {aiHealth?.risk_level || 'Moderate'}
                </span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div className="bg-accent-teal h-1.5 rounded-full" style={{ width: `${aiHealth?.health_score || 70}%` }} />
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                {aiHealth?.summary || "Click 'Analyze Portfolio' on the dashboard to generate your verified health score."}
              </p>
            </div>
          </ContextCard>

          <ContextCard title="Tax Suggestions" icon={Zap} colorClass="text-accent-emerald">
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-accent-emerald/10 border border-accent-emerald/20 flex flex-col gap-1">
                <span className="text-xs font-bold text-accent-emerald">Tax Posture</span>
                <span className="text-xs text-white leading-relaxed">
                  {aiTax?.summary || "Review capital gains before financial year-end to maximize exemptions under Indian Tax Laws."}
                </span>
              </div>
              <div className="text-[10px] text-text-muted italic">
                *Informational estimates only; not certified tax advice.
              </div>
            </div>
          </ContextCard>

          <ContextCard title="Active Guardrails" icon={FileText} colorClass="text-accent-purple">
            <div className="space-y-2.5 text-xs text-text-secondary leading-relaxed">
              <div className="flex items-center gap-2 text-white font-semibold">
                <ShieldCheck size={14} className="text-accent-emerald" /> Zero Fabrication
              </div>
              <p>Every response is mathematically bound to your logged-in database state.</p>
              <div className="flex items-center gap-2 text-white font-semibold pt-1">
                <ShieldCheck size={14} className="text-accent-emerald" /> Privacy Protected
              </div>
              <p>Authentication credentials and tokens are strictly excluded from AI prompts.</p>
            </div>
          </ContextCard>
        </div>
      </div>
    </div>
  );
}
