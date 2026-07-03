import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User, RefreshCw, BarChart2, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import './AdvisorPage.css';

const suggestedPrompts = [
  "How can we reduce our portfolio risk?",
  "What is our best performing investment?",
  "How can we optimize our tax saving for FY 26-27?",
  "Should we increase our SIP amount for the house goal?"
];

const mockDataChart = [
  { name: 'Current', Risk: 75, Return: 12 },
  { name: 'Proposed', Risk: 55, Return: 11.5 }
];

export default function AdvisorPage() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMsg = { id: Date.now(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        role: 'ai',
        content: `I've analyzed your portfolio regarding your query: "${text}". Here is my assessment based on your current asset allocation and family goals.`,
        hasChart: text.toLowerCase().includes('risk') || text.toLowerCase().includes('perform'),
        confidence: 94,
        sources: ['Portfolio Data', 'Market Trends 2026', 'Tax Regulations FY26']
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="advisor-page">
      <div className="advisor-container glass-panel">
        {/* Header */}
        <div className="advisor-header">
          <div className="flex items-center gap-3">
            <div className="ai-avatar">
              <Sparkles size={20} className="text-teal" />
            </div>
            <div>
              <h2 className="text-xl font-bold">NexWealth AI Advisor</h2>
              <p className="text-sm text-success flex items-center gap-1">
                <span className="online-dot"></span> Online and ready to help
              </p>
            </div>
          </div>
          <button className="btn-icon" title="Clear Conversation" onClick={() => setMessages([])}>
            <RefreshCw size={18} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="advisor-chat-area">
          {messages.length === 0 ? (
            <div className="empty-state fade-in">
              <div className="empty-icon-wrapper mb-6">
                <Sparkles size={48} className="text-blue" />
              </div>
              <h2 className="text-2xl font-bold mb-2">How can I help you today?</h2>
              <p className="text-muted mb-8 max-w-md text-center">
                I can analyze your family portfolio, suggest tax optimization strategies, or help you rebalance your assets.
              </p>
              
              <div className="suggested-prompts grid grid-cols-2 gap-4 max-w-2xl">
                {suggestedPrompts.map((prompt, idx) => (
                  <button 
                    key={idx} 
                    className="prompt-btn glass-panel"
                    onClick={() => handleSend(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="messages-container">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div 
                    key={msg.id}
                    className={`message-wrapper ${msg.role === 'user' ? 'user-message' : 'ai-message'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="message-avatar">
                      {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} className="text-teal" />}
                    </div>
                    <div className="message-content glass-panel">
                      <p>{msg.content}</p>
                      
                      {msg.role === 'ai' && (
                        <div className="ai-enrichments mt-4 pt-4 border-t border-glass">
                          {msg.hasChart && (
                            <div className="ai-chart mb-4" style={{ height: '200px' }}>
                              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                <BarChart2 size={14} className="text-blue" /> Risk vs Return Analysis
                              </h4>
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={mockDataChart} layout="vertical" margin={{ left: 20, right: 20 }}>
                                  <XAxis type="number" hide />
                                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)'}} />
                                  <RechartsTooltip contentStyle={{ background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', borderRadius: '8px' }} />
                                  <Bar dataKey="Risk" fill="var(--status-warning)" radius={[0, 4, 4, 0]} barSize={12} />
                                  <Bar dataKey="Return" fill="var(--status-success)" radius={[0, 4, 4, 0]} barSize={12} />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          )}

                          <div className="ai-reasoning mb-4">
                            <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
                              <ShieldCheck size={14} className="text-teal" /> AI Reasoning
                            </h4>
                            <p className="text-sm text-secondary">
                              By shifting 10% from Mid-Cap to Large-Cap, the overall volatility of the family portfolio decreases significantly (from 75 to 55 on our risk index) while only marginally impacting expected returns (from 12% to 11.5%).
                            </p>
                          </div>

                          <div className="ai-meta flex gap-4 mt-4">
                            <div className="confidence-score badge badge-success flex items-center gap-1">
                              <CheckCircle2 size={12} /> Confidence: {msg.confidence}%
                            </div>
                            <div className="sources flex items-center gap-1 text-xs text-muted">
                              <FileText size={12} /> Sources: {msg.sources.join(', ')}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div 
                    className="message-wrapper ai-message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="message-avatar">
                      <Sparkles size={16} className="text-teal" />
                    </div>
                    <div className="message-content typing-indicator glass-panel">
                      <span></span><span></span><span></span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="advisor-input-area">
          <form 
            className="input-wrapper glass-panel"
            onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
          >
            <input 
              type="text" 
              placeholder="Ask anything about your family's finances..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="chat-input"
            />
            <button 
              type="submit" 
              className={`send-btn ${inputValue.trim() ? 'active' : ''}`}
              disabled={!inputValue.trim()}
            >
              <Send size={18} />
            </button>
          </form>
          <div className="text-center mt-2 text-xs text-muted">
            NexWealth AI can make mistakes. Always verify important financial information.
          </div>
        </div>
      </div>
    </div>
  );
}
