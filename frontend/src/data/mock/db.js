export const DEMO_PORTFOLIO = [
  { id: '1', name: 'HDFC Bank Ltd.', symbol: 'HDFCBANK', category: 'Stocks', shares: 450, avgPrice: 1540.50, ltp: 1680.20, change: '+4.2%' },
  { id: '2', name: 'Reliance Industries', symbol: 'RELIANCE', category: 'Stocks', shares: 120, avgPrice: 2450.00, ltp: 2940.10, change: '+12.5%' },
  { id: '3', name: 'Infosys Ltd.', symbol: 'INFY', category: 'Stocks', shares: 300, avgPrice: 1420.00, ltp: 1390.50, change: '-2.1%' },
  { id: '4', name: 'TCS Ltd.', symbol: 'TCS', category: 'Stocks', shares: 100, avgPrice: 3200.00, ltp: 3850.50, change: '+18.4%' },
  { id: '5', name: 'Parag Parikh Flexi Cap', symbol: 'PPFAS', category: 'Mutual Funds', shares: 800, avgPrice: 45.20, ltp: 58.90, change: '+18.5%' },
  { id: '6', name: 'Motilal Oswal Midcap', symbol: 'MOTILAL', category: 'Mutual Funds', shares: 500, avgPrice: 30.10, ltp: 42.50, change: '+28.2%' },
  { id: '7', name: 'Gold ETF', symbol: 'GOLDETF', category: 'Gold', shares: 150, avgPrice: 4800.00, ltp: 6300.00, change: '+21.0%' },
  { id: '8', name: 'Public Provident Fund', symbol: 'PPF', category: 'PPF', shares: 1, avgPrice: 1500000.00, ltp: 1500000.00, change: '+0.0%' },
  { id: '9', name: 'HDFC Fixed Deposit', symbol: 'FD', category: 'Fixed Deposit', shares: 1, avgPrice: 500000.00, ltp: 500000.00, change: '+0.0%' },
  { id: '10', name: 'Liquid Savings (Emergency)', symbol: 'CASH', category: 'Cash', shares: 1, avgPrice: 300000.00, ltp: 300000.00, change: '+0.0%' },
];

export const mockPortfolio = []; // empty by default for new accounts

export const DEMO_GOALS = [
  { id: '1', title: 'Dream House', target: 50000000, current: 12500000, deadline: '2030', icon: 'Home', color: '#8B5CF6' },
  { id: '2', title: 'Luxury Car', target: 8000000, current: 6500000, deadline: '2027', icon: 'Car', color: '#3B82F6' },
  { id: '3', title: 'European Vacation', target: 1500000, current: 800000, deadline: '2025', icon: 'Target', color: '#10B981' },
  { id: '4', title: 'Retirement', target: 100000000, current: 15000000, deadline: '2045', icon: 'TrendingUp', color: '#F59E0B' },
  { id: '5', title: 'Emergency Fund', target: 1000000, current: 300000, deadline: '2024', icon: 'ShieldCheck', color: '#EF4444' },
];

export const mockGoals = [];

export const mockNotifications = [
  { id: '1', title: 'Dividend Received', message: 'HDFC Bank credited ₹6,750 to your account.', time: '2 hours ago', isRead: false, type: 'portfolio' },
  { id: '2', title: 'Tax Harvesting Alert', message: 'You can offset ₹35,000 in STCG. Review now.', time: '5 hours ago', isRead: false, type: 'tax' },
  { id: '3', title: 'SIP Executed', message: '₹50,000 SIP in Parag Parikh Flexi Cap successful.', time: '1 day ago', isRead: true, type: 'portfolio' },
  { id: '4', title: 'Goal Milestone', message: 'You reached 25% of your Dream Home goal!', time: '2 days ago', isRead: true, type: 'goals' },
];

export const DEMO_FAMILY = [
  { id: '1', name: 'Vinayak Kale', role: 'Owner', access: 'Full Access', isPro: true, avatar: 'VK' },
  { id: '2', name: 'Sneha Kale', role: 'Co-Owner', access: 'Full Access', isPro: true, avatar: 'SK' },
  { id: '3', name: 'Aarav Kale', role: 'Child', access: 'View Only', isPro: false, avatar: 'AK' },
];

export const mockFamily = [];

export const mockAdvisorHistory = [
  { id: '1', role: 'assistant', content: 'Hello Vinayak! I\'ve analyzed your portfolio today. Based on the recent market dip, your equity allocation has fallen to 65% (target is 70%).\n\nI recommend rebalancing by deploying ₹5,00,000 from your liquid funds into index funds.', reasoning: 'Analyzed 45 market indicators. NIFTY50 is trading at key support levels. Buying opportunity detected for long-term goals.', confidence: 94 },
  { id: '2', role: 'user', content: 'Should I invest the 5L all at once or spread it out?' }
];

export const mockReports = [
  { id: '1', title: 'Q2 2026 Portfolio Performance', date: 'Jul 1, 2026', type: 'Performance' },
  { id: '2', title: 'FY 2025-26 Tax Summary', date: 'Apr 15, 2026', type: 'Tax' },
  { id: '3', title: 'Asset Allocation Analysis', date: 'Jun 1, 2026', type: 'Analysis' },
];
