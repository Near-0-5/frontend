import type { SocialLoginProvider } from '@/features/auth';

import { capitalize } from '@/utils';

export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const ROUTES_PATHS = {
  ARTIST: '/artist',
  ARTIST_DETAIL: '/artist-detail/:id',
  ARTIST_LIST: '/artist-list',
  CONCERT_DETAIL: '/concert/:id',
  FAVORITE: '/favorite',
  LOGIN: '/login',
  MAIN: '/',
  MYPAGE: '/my-page',
  NOT_FOUND: '*',
  SIGNUP: '/signup',
  SOCIAL_LOGIN_REDIRECT: '/auth/oauth2/callback',
  STREAMING_DETAIL: '/live-stream/:id',
  STREAMING_LIST: '/stream-list',
} as const;

export const API_ROUTES = {
  AUTH: {
    LOGOUT: `/auth/logout`,
    REFRESH_ACCESS_TOKEN: `/auth/refresh`,
    SOCIAL_LOGIN_CALLBACK: (provider: SocialLoginProvider) => {
      const capitalizedProvider = capitalize(provider);

      return `${BACKEND_BASE_URL}/auth/login?provider=${capitalizedProvider}`;
    },
    USER_ME: `/users/me`,
  },
  STREAMS: {
    CREDENTIALS: (sessionId: number) =>
      `/streams/sessions/${sessionId}/credentials`,
    DETAIL: (sessionId: number) => `/streams/sessions/${sessionId}`,
    LIST: `/streams/sessions`,
    REFRESH: (sessionId: number) => `/streams/sessions/${sessionId}/refresh`,
    STATUS: (sessionId: number) => `/streams/sessions/${sessionId}/status`,
  },
};
