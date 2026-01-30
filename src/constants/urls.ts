export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const ROUTES_PATHS = {
  ARTIST: '/artist',
  ARTIST_LIST: '/artist-list',
  FAVORITE: '/favorite',
  KAKAO_CALLBACK: '/auth/kakao/callback',
  LOGIN: '/login',
  MAIN: '/main',
  MYPAGE: '/my-page',
  NOT_FOUND: '*',
  SIGNUP: '/signup',
  STREAMING: '/live-stream/:id',
  STREAMING_LIST: '/stream-list',
} as const;

export const API_ROUTES = {
  ENDPOINTS: {
    LOGOUT: `/auth/logout`,
    REFRESH_ACCESS_TOKEN: `/auth/refresh`,
    USER_ME: `/users/me`,
  },
  EXTERNAL: {
    GOOGLE_LOGIN: `${BACKEND_BASE_URL}/auth/login?provider=Google`,
    KAKAO_LOGIN: `${BACKEND_BASE_URL}/auth/login?provider=Kakao`,
    NAVER_LOGIN: `${BACKEND_BASE_URL}/auth/login?provider=Naver`,
  },
};
