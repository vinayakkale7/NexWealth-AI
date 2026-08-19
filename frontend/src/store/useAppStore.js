import { create } from 'zustand';
import * as authApi from '../services/auth';
import * as portfolioApi from '../services/portfolio';
import * as goalsApi from '../services/goals';
import * as familyApi from '../services/family';
import { aiService } from '../services/aiService';
import { mockNotifications, mockAdvisorHistory, mockReports, DEMO_PORTFOLIO, DEMO_GOALS, DEMO_FAMILY } from '../data/mock/db';

export const calculatePortfolioStats = (portfolio) => {
  const totalNetWorth = portfolio.reduce((sum, item) => sum + ((item.shares || 0) * (item.ltp || 0)), 0);
  const totalInvested = portfolio.reduce((sum, item) => sum + ((item.shares || 0) * (item.avgPrice || 0)), 0);
  const todaysGain = portfolio.reduce((sum, item) => {
    const changePct = parseFloat(String(item.change || '0').replace('+', '').replace('%', '')) || 0;
    const value = (item.shares || 0) * (item.ltp || 0);
    return sum + (value * (changePct / 100));
  }, 0);
  
  const categoryAllocation = portfolio.reduce((acc, item) => {
    const val = (item.shares || 0) * (item.ltp || 0);
    const cat = item.category || 'Other';
    acc[cat] = (acc[cat] || 0) + val;
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
    set({
      user: null,
      isAuthenticated: false,
      portfolio: [],
      goals: [],
      family: [],
      aiPortfolioHealth: null,
      aiGoalAnalysis: null,
      aiTaxInsights: null,
      advisorHistory: []
    });
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
      // Fetch cached AI health on load without auto-calling Gemini
      get().fetchCachedAIHealth();
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
      set({
        isDemoMode: true,
        portfolio: DEMO_PORTFOLIO,
        goals: DEMO_GOALS,
        family: DEMO_FAMILY,
        aiPortfolioHealth: {
          health_score: 84,
          risk_score: 45,
          diversification_score: 80,
          risk_level: "Moderate",
          summary: "Demo Portfolio of 10 holdings across 6 asset classes with balanced equity and gold allocation.",
          strengths: ["Strong exposure to Bluechip Equities & Flexi Cap Funds", "Solid 20% Gold Allocation"],
          weaknesses: ["Tech sector weighting slightly elevated"],
          recommendations: ["Deploy upcoming SIPs into Debt instruments to lock in yields."],
          confidence: 94.0,
          timestamp: "Demo Active"
        },
        notifications: [
          { id: 'd1', title: 'Demo Mode Activated', message: 'You are now exploring the demo portfolio.', time: 'Just now', type: 'system', isRead: false }
        ]
      });
    } else {
      set({ isDemoMode: false, aiPortfolioHealth: null });
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

  // ==========================================
  // AI Financial Intelligence Engine State
  // ==========================================
  aiPortfolioHealth: null,
  aiGoalAnalysis: null,
  aiTaxInsights: null,
  isAnalyzingAI: false,
  advisorHistory: [],

  fetchCachedAIHealth: async () => {
    if (get().isDemoMode) return;
    try {
      const res = await aiService.getPortfolioHealth(false);
      if (res && res.cached && res.data) {
        set({ aiPortfolioHealth: res.data });
      }
    } catch (err) {
      console.warn("Cached AI health check skipped:", err);
    }
  },

  runAIAnalysis: async () => {
    set({ isAnalyzingAI: true });
    try {
      const data = await aiService.analyzePortfolio();
      set({ aiPortfolioHealth: data, isAnalyzingAI: false });
      return data;
    } catch (err) {
      set({ isAnalyzingAI: false });
      throw err;
    }
  },

  fetchGoalAnalysis: async () => {
    try {
      const data = await aiService.getGoalAnalysis();
      set({ aiGoalAnalysis: data });
      return data;
    } catch (err) {
      console.error("Goal analysis error:", err);
      throw err;
    }
  },

  fetchTaxInsights: async () => {
    try {
      const data = await aiService.getTaxInsights();
      set({ aiTaxInsights: data });
      return data;
    } catch (err) {
      console.error("Tax insights error:", err);
      throw err;
    }
  },

  addAdvisorMessage: (message) => set((state) => ({ advisorHistory: [...state.advisorHistory, message] })),

  sendAIChat: async (messageText) => {
    const userMsg = { id: Date.now().toString(), role: 'user', content: messageText };
    get().addAdvisorMessage(userMsg);

    try {
      const res = await aiService.chat(messageText);
      const assistantMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: res.response,
        reasoning: res.reasoning,
        confidence: res.confidence || 92
      };
      get().addAdvisorMessage(assistantMsg);
      return assistantMsg;
    } catch (err) {
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I encountered an error connecting to the AI advisor. Please verify your connection or try again.",
        isError: true,
        confidence: 0
      };
      get().addAdvisorMessage(errorMsg);
      throw err;
    }
  },

  // Other Mocks & Future Phases
  notifications: mockNotifications,
  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, isRead: true } : n)
  })),
  clearAllNotifications: () => set({ notifications: [] }),

  reports: mockReports,
}));

export default useAppStore;
