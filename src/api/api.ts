import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

import type { AuthState } from '@/features/auth/types/authTypes';

import { BACKEND_BASE_URL, ROUTES_PATHS } from '@/constants';
import { isTransformable, toCamel, toSnake } from '@/utils';

type AuthStore = Omit<AuthState, 'accessToken'> & {
  getAccessToken: () => null | string;
};

type AxiosRequestConfigWithRetry = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const createAuthHeader = (accessToken: string) => `Bearer ${accessToken}`;

const REQUEST_TIMEOUT_MS = 10000;

const defaultConfig = {
  baseURL: BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: REQUEST_TIMEOUT_MS,
  withCredentials: true,
};

export const refreshApi = axios.create(defaultConfig);
export const api = axios.create(defaultConfig);

refreshApi.interceptors.response.use(response => {
  if (response.data && isTransformable(response.data)) {
    response.data = toCamel(response.data);
  }
  return response;
});

let isInterceptorsSetup = false;

export const setupAxiosInterceptors = (store: AuthStore) => {
  if (isInterceptorsSetup) {
    return;
  }
  isInterceptorsSetup = true;

  const { clearAccessToken, getAccessToken, refreshAccessToken } = store;

  api.interceptors.request.use(config => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = createAuthHeader(accessToken);
    }

    if (config.params && isTransformable(config.params)) {
      config.params = toSnake(config.params);
    }

    if (config.data && isTransformable(config.data)) {
      config.data = toSnake(config.data);
    }

    return config;
  });

  // 토큰 갱신 중복 요청 방지용 프로미스
  let refreshAccessTokenPromise: null | Promise<null | string> = null;

  const getRefreshedToken = async (): Promise<null | string> => {
    if (!refreshAccessTokenPromise) {
      refreshAccessTokenPromise = refreshAccessToken().finally(() => {
        refreshAccessTokenPromise = null;
      });
    }
    return refreshAccessTokenPromise;
  };

  api.interceptors.response.use(
    response => {
      if (response.data && isTransformable(response.data)) {
        response.data = toCamel(response.data);
      }
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfigWithRetry;
      const isUnauthorized = error.response?.status === 401;
      const canRetry = originalRequest && !originalRequest._retry;

      if (isUnauthorized && canRetry) {
        originalRequest._retry = true;

        try {
          const refreshedAccessToken = await getRefreshedToken();

          if (refreshedAccessToken) {
            originalRequest.headers.Authorization =
              createAuthHeader(refreshedAccessToken);

            return api(originalRequest);
          }
        } catch {
          // noop: 실패 시 아래 공통 처리로 이동
        }

        clearAccessToken();
        if (typeof window !== 'undefined') {
          window.location.href = ROUTES_PATHS.LOGIN;
        }
      }

      if (error.response?.data && isTransformable(error.response.data)) {
        error.response.data = toCamel(error.response.data);
      }
      return Promise.reject(error);
    },
  );
};
