import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { aiService } from '../services/aiService';
import './AdvisorPage.css';

const suggestedPrompts = [
  "Analyze my portfolio",
  "How can I reduce taxes?",
  "Am I diversified?",
  "Suggest better SIP allocation."
];

export default function AdvisorPage() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    if (!text.trim()) return;
    
    const userMsg = { id: Date.now(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);
    setError(null);

    try {
      const data = await aiService.chat(text);
      
      const aiMsg = {
        id: Date.now() + 1,
        role: 'ai',
        content: data.response
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      setError("Failed to get response from AI. Please try again.");
    } finally {
      setIsTyping(false);
    }
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
                <span className="online-dot"></span> Powered by Google Gemini
              </p>
            </div>
          </div>
          <button className="btn-icon" title="Clear Conversation" onClick={() => { setMessages([]); setError(null); }}>
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
                I can analyze your family portfolio, suggest tax optimization strategies, or help you rebalance your assets based on your actual data.
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
                      {msg.role === 'user' ? (
                        <p>{msg.content}</p>
                      ) : (
                        <div className="markdown-body">
                           <ReactMarkdown remarkPlugins={[remarkGfm]}>
                             {msg.content}
                           </ReactMarkdown>
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
                
                {error && (
                  <motion.div 
                    className="message-wrapper ai-message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="message-avatar">
                      <AlertCircle size={16} className="text-warning" />
                    </div>
                    <div className="message-content glass-panel border border-warning">
                      <p className="text-warning text-sm">{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
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
              disabled={isTyping}
            />
            <button 
              type="submit" 
              className={`send-btn ${inputValue.trim() && !isTyping ? 'active' : ''}`}
              disabled={!inputValue.trim() || isTyping}
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
