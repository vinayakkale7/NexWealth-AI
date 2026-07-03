import api from './api';

export const getPortfolio = async () => {
  const response = await api.get('/portfolio');
  return response.data;
};

export const createHolding = async (holding) => {
  const response = await api.post('/portfolio', holding);
  return response.data;
};

export const updateHolding = async (id, holding) => {
  const response = await api.put(`/portfolio/${id}`, holding);
  return response.data;
};

export const deleteHolding = async (id) => {
  const response = await api.delete(`/portfolio/${id}`);
  return response.data;
};
