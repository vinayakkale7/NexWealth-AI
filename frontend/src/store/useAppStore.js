import { create } from 'zustand';
import * as authApi from '../services/auth';
import * as portfolioApi from '../services/portfolio';
import * as goalsApi from '../services/goals';
import * as familyApi from '../services/family';
import { mockNotifications, mockAdvisorHistory, mockReports, DEMO_PORTFOLIO, DEMO_GOALS, DEMO_FAMILY } from '../data/mock/db';

export const calculatePortfolioStats = (portfolio) => {
  const totalNetWorth = portfolio.reduce((sum, item) => sum + (item.shares * item.ltp), 0);
  const totalInvested = portfolio.reduce((sum, item) => sum + (item.shares * item.avgPrice), 0);
  const todaysGain = portfolio.reduce((sum, item) => {
    // mock daily change based on the string e.g. "+1.2%"
    const changePct = parseFloat(item.change.replace('+', '').replace('%', '')) || 0;
    const value = item.shares * item.ltp;
    return sum + (value * (changePct / 100));
  }, 0);
  
  const categoryAllocation = portfolio.reduce((acc, item) => {
    const val = item.shares * item.ltp;
    acc[item.category] = (acc[item.category] || 0) + val;
    return acc;
  }, {});

  const totalReturn = totalInvested > 0 ? ((totalNetWorth - totalInvested) / totalInvested) * 100 : 0;

  return { totalNetWorth, totalInvested, todaysGain, categoryAllocation, totalReturn };
};

const useAppStore = create((set, get) => ({
  // Auth State
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isSyncing: true,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const data = await authApi.login(email, password);
      localStorage.setItem('token', data.access_token);
      const user = await authApi.getMe();
      set({ user, isAuthenticated: true, isLoading: false });
      get().fetchAllData();
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  register: async (email, password, fullName) => {
    set({ isLoading: true });
    try {
      await authApi.register(email, password, fullName);
      await get().login(email, password);
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false, portfolio: [], goals: [], family: [] });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = await authApi.getMe();
        set({ user, isAuthenticated: true });
        get().fetchAllData();
      } catch {
        get().logout();
      }
    }
  },

  fetchAllData: async () => {
    if (get().isDemoMode) return;
    set({ isSyncing: true });
    try {
      const [portfolio, goals, family] = await Promise.all([
        portfolioApi.getPortfolio(),
        goalsApi.getGoals(),
        familyApi.getFamilyMembers()
      ]);
      set({ portfolio, goals, family, isSyncing: false });
    } catch (err) {
      console.error("Error fetching data", err);
      set({ isSyncing: false });
    }
  },

  // Demo Mode
  isDemoMode: false,
  toggleDemoMode: () => {
    const isDemo = !get().isDemoMode;
    if (isDemo) {
      // Enable Demo
      set({
        isDemoMode: true,
        portfolio: DEMO_PORTFOLIO,
        goals: DEMO_GOALS,
        family: DEMO_FAMILY,
        notifications: [
          { id: 'd1', title: 'Demo Mode Activated', message: 'You are now exploring the demo portfolio.', time: 'Just now', type: 'system', isRead: false }
        ]
      });
    } else {
      // Disable Demo
      set({ isDemoMode: false });
      get().fetchAllData();
    }
  },

  // Active Module State
  activeModule: 'Dashboard',
  setActiveModule: (module) => set({ activeModule: module }),

  // Theme & Preferences
  theme: 'dark',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  
  // UI States
  isSidebarCollapsed: false,
  setSidebarCollapsed: (isCollapsed) => set({ isSidebarCollapsed: isCollapsed }),
  
  isCommandPaletteOpen: false,
  setCommandPaletteOpen: (isOpen) => set({ isCommandPaletteOpen: isOpen }),
  
  isNotificationsOpen: false,
  setNotificationsOpen: (isOpen) => set({ isNotificationsOpen: isOpen }),

  isAddAssetModalOpen: false,
  setAddAssetModalOpen: (isOpen) => set({ isAddAssetModalOpen: isOpen }),

  isImportModalOpen: false,
  setImportModalOpen: (isOpen) => set({ isImportModalOpen: isOpen }),

  // Portfolio
  portfolio: [],
  addInvestment: async (investment) => {
    const newAsset = await portfolioApi.createHolding(investment);
    set((state) => ({ portfolio: [...state.portfolio, newAsset] }));
  },
  deleteInvestment: async (id) => {
    await portfolioApi.deleteHolding(id);
    set((state) => ({ portfolio: state.portfolio.filter(item => item.id !== id) }));
  },
  updateInvestment: async (id, updates) => {
    const updated = await portfolioApi.updateHolding(id, updates);
    set((state) => ({
      portfolio: state.portfolio.map(item => item.id === id ? updated : item)
    }));
  },
  
  // Goals
  goals: [],
  updateGoalTarget: async (id, newTarget) => {
    const goal = get().goals.find(g => g.id === id);
    if(goal) {
      const updated = await goalsApi.updateGoal(id, { ...goal, target: newTarget });
      set((state) => ({
        goals: state.goals.map(g => g.id === id ? updated : g)
      }));
    }
  },

  // Family
  family: [],

  // Mocks (Future Phases)
  notifications: mockNotifications,
  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, isRead: true } : n)
  })),
  clearAllNotifications: () => set({ notifications: [] }),

  advisorHistory: mockAdvisorHistory,
  addAdvisorMessage: (message) => set((state) => ({ advisorHistory: [...state.advisorHistory, message] })),

  reports: mockReports,
}));

export default useAppStore;
