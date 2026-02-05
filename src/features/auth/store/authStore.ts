import type { AxiosError } from 'axios';

import { create } from 'zustand';

import type { AuthState } from '@/features/auth/types/authTypes';

import { refreshApi } from '@/api';
import { API_ROUTES, LOCAL_STORAGE_KEYS } from '@/constants';

const parseIsLoggedIn = (value: null | string) => value === 'true';

const getStoredIsLoggedIn = () =>
  parseIsLoggedIn(localStorage.getItem(LOCAL_STORAGE_KEYS.IS_LOGGED_IN));

const setLoggedInStorage = (isLoggedIn: boolean) => {
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.IS_LOGGED_IN,
    isLoggedIn ? 'true' : 'false',
  );
};

const clearLoggedInStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.IS_LOGGED_IN);
};

const isAuthExpectedError = (error: unknown) => {
  const status = (error as AxiosError | undefined)?.response?.status;
  return status === 401 || status === 403;
};

export const useAuthStore = create<AuthState>((set, get) => {
  const updateAccessToken = (accessToken: null | string) => {
    if (accessToken) {
      setLoggedInStorage(true);
    } else {
      setLoggedInStorage(false);
    }

    set({ accessToken });
  };

  return {
    accessToken: null,
    clearAccessToken: () => updateAccessToken(null),
    initializeAuth: async () => {
      const { accessToken, refreshAccessToken } = get();
      const isLoggedIn = getStoredIsLoggedIn();
      const shouldCheckAuth = isLoggedIn || Boolean(accessToken);

      if (!shouldCheckAuth) {
        setLoggedInStorage(false);
        return;
      }

      if (!accessToken) {
        await refreshAccessToken();
      }
    },
    isLoggedIn: () => Boolean(get().accessToken),
    logout: async () => {
      try {
        await refreshApi.post(API_ROUTES.AUTH.LOGOUT);
      } catch (error) {
        if (!isAuthExpectedError(error)) {
          console.error('로그아웃 API 호출 실패:', error);
        }
      } finally {
        updateAccessToken(null);
        clearLoggedInStorage();
      }
    },
    refreshAccessToken: async () => {
      try {
        const response = await refreshApi.post<{ accessToken: string }>(
          API_ROUTES.AUTH.REFRESH_ACCESS_TOKEN,
        );
        const refreshedAccessToken = response.data?.accessToken ?? null;
        updateAccessToken(refreshedAccessToken);

        return refreshedAccessToken;
      } catch (error) {
        if (!isAuthExpectedError(error)) {
          console.error('토큰 갱신 API 호출 실패:', error);
        }

        updateAccessToken(null);

        return null;
      }
    },
    setAccessToken: (accessToken: null | string) =>
      updateAccessToken(accessToken),
  };
});
