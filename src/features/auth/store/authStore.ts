import type { AxiosError } from 'axios';

import { create } from 'zustand';

import type { AuthState } from '@/features/auth/types/authTypes';

import { refreshApi } from '@/api';
import { API_ROUTES, LOCAL_STORAGE_KEYS } from '@/constants';

const isAuthExpectedError = (error: unknown) => {
  const status = (error as AxiosError | undefined)?.response?.status;
  return status === 401 || status === 403;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  clearAccessToken: () => set({ accessToken: null }),
  isLoggedIn: () => Boolean(get().accessToken),
  logout: async () => {
    try {
      await refreshApi.post(API_ROUTES.AUTH.LOGOUT);
    } catch (error) {
      if (!isAuthExpectedError(error)) {
        console.error('로그아웃 API 호출 실패:', error);
      }
    } finally {
      set({ accessToken: null });
      localStorage.removeItem(LOCAL_STORAGE_KEYS.IS_LOGGED_IN);
    }
  },
  refreshAccessToken: async () => {
    try {
      const response = await refreshApi.post<{ accessToken: string }>(
        API_ROUTES.AUTH.REFRESH_ACCESS_TOKEN,
      );
      const refreshedAccessToken = response.data?.accessToken ?? null;
      set({ accessToken: refreshedAccessToken });

      return refreshedAccessToken;
    } catch (error) {
      if (!isAuthExpectedError(error)) {
        console.error('토큰 갱신 API 호출 실패:', error);
      }

      set({ accessToken: null });

      return null;
    }
  },
  setAccessToken: (accessToken: null | string) => set({ accessToken }),
}));
