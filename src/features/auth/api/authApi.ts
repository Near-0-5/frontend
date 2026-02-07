import { api } from '@/api/api';
import { API_ROUTES } from '@/constants';

export const deleteUserAccount = async (reason?: string) => {
  const response = await api.delete(API_ROUTES.AUTH.USER_ME, {
    params: reason ? { reason } : undefined,
  });

  return response.data;
};
