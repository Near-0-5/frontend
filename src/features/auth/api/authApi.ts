import { api } from '@/api/api';
import { API_ROUTES } from '@/constants';

export const deleteUserAccount = async () => {
  const response = await api.delete(API_ROUTES.ENDPOINTS.USER_ME);
  return response.data;
};
