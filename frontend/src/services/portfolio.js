import api from './api';

const mapToFrontend = (holding) => ({
  ...holding,
  avgPrice: holding.avg_price ?? 0,
});

const mapToBackend = (holding) => ({
  ...holding,
  avg_price: holding.avgPrice ?? 0,
});

export const getPortfolio = async () => {
  const response = await api.get('/portfolio');
  return (response.data || []).map(mapToFrontend);
};

export const createHolding = async (holding) => {
  const response = await api.post('/portfolio', mapToBackend(holding));
  return mapToFrontend(response.data);
};

export const updateHolding = async (id, holding) => {
  const response = await api.put(`/portfolio/${id}`, mapToBackend(holding));
  return mapToFrontend(response.data);
};

export const deleteHolding = async (id) => {
  const response = await api.delete(`/portfolio/${id}`);
  return response.data;
};
