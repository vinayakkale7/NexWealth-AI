import api from './api';

export const aiService = {
  getStatus: async () => {
    const response = await api.get('/ai/status');
    return response.data;
  },

  chat: async (message) => {
    const response = await api.post('/ai/chat', { message });
    return response.data;
  },
  
  analyzePortfolio: async () => {
    const response = await api.post('/ai/analyze');
    return response.data;
  },
  
  getPortfolioHealth: async (force = false) => {
    const response = await api.get(`/ai/portfolio-health${force ? '?force=true' : ''}`);
    return response.data;
  },
  
  getTaxInsights: async () => {
    const response = await api.post('/ai/tax-insights');
    return response.data;
  },
  
  getGoalAnalysis: async () => {
    const response = await api.post('/ai/goal-analysis');
    return response.data;
  }
};

export default aiService;
