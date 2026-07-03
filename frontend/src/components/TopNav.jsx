import React from 'react';
import { Search, Bell, Sparkles } from 'lucide-react';
import './TopNav.css';

export default function TopNav({ title = 'Dashboard' }) {
  return (
    <header className="top-nav glass-nav">
      <div className="nav-left">
        <h1>{title}</h1>
      </div>
      
      <div className="nav-right">
        <div className="search-bar glass-panel">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search transactions, assets..." className="search-input" />
          <div className="search-shortcut">⌘K</div>
        </div>

        <button className="btn-icon">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <button className="btn btn-primary nav-ai-btn">
          <Sparkles size={16} />
          <span>Ask AI</span>
        </button>
      </div>
    </header>
  );
}
