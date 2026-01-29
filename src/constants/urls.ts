export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const ROUTES_PATHS = {
  ARTIST: '/artist',
  FAVORITE: '/favorite',
  KAKAO_CALLBACK: '/auth/kakao/callback',
  LOGIN: '/login',
  MAIN: '/',
  MYPAGE: '/mypage',
  NOT_FOUND: '*',
  SIGNUP: '/signup',
  STREAMING: '/live-stream',
};

export const API_ROUTES = {
  ENDPOINTS: {
    LOGOUT: `/auth/logout`,
    REFRESH_ACCESS_TOKEN: `/auth/refresh`,
  },
  EXTERNAL: {
    KAKAO_LOGIN: `${BACKEND_BASE_URL}/auth/kakao/login`,
  },
};
