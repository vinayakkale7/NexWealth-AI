import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PieChart, Target, Bot, LineChart, FileText, Bell, Settings, User, Users } from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: PieChart, label: 'Holdings', path: '/holdings' },
  { icon: Target, label: 'Goals', path: '/goals' },
  { icon: Bot, label: 'AI Advisor', path: '/advisor' },
  { icon: Users, label: 'Family View', path: '/family' },
  { icon: LineChart, label: 'Insights', path: '/insights' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
];

const bottomItems = [
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar glass-sidebar">
      <div className="sidebar-header">
        <div className="logo-icon"></div>
        <h2>NexWealth</h2>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-group">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <item.icon className="nav-icon" size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        {bottomItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <item.icon className="nav-icon" size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
        
        <div className="user-profile">
          <div className="avatar">VK</div>
          <div className="user-info">
            <span className="user-name">Vinayak</span>
            <span className="user-plan">Pro Member</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
