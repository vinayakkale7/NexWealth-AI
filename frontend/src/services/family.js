import api from './api';

export const getFamilyMembers = async () => {
  const response = await api.get('/family');
  return response.data;
};
