import { create } from 'zustand';
import * as authApi from '../services/auth';
import * as portfolioApi from '../services/portfolio';
import * as goalsApi from '../services/goals';
import * as familyApi from '../services/family';
import { mockNotifications, mockAdvisorHistory, mockReports } from '../data/mock/db';

const useAppStore = create((set, get) => ({
  // Auth State
  user: null,
  isAuthenticated: false,
  isLoading: false,

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
    try {
      const [portfolio, goals, family] = await Promise.all([
        portfolioApi.getPortfolio(),
        goalsApi.getGoals(),
        familyApi.getFamilyMembers()
      ]);
      set({ portfolio, goals, family });
    } catch (err) {
      console.error("Error fetching data", err);
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
