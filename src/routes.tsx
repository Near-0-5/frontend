// src/routes.tsx
import { ROUTES_PATHS } from '@/constants';
import {
  ArtistListPage,
  LoginPage,
  MainPage,
  MyPage,
  SocialLoginRedirect,
  StreamingPage,
  StreamListPage,
} from '@/pages';

export const PUBLIC_ROUTES = [
  {
    element: <LoginPage />,
    path: ROUTES_PATHS.LOGIN,
  },
  {
    element: <SocialLoginRedirect />,
    path: ROUTES_PATHS.SOCIAL_LOGIN_REDIRECT,
  },
];

export const PUBLIC_ROUTES_WITH_LAYOUT = [
  {
    element: <MainPage />,
    path: ROUTES_PATHS.MAIN,
  },
  {
    element: <ArtistListPage />,
    path: ROUTES_PATHS.ARTIST_LIST,
  },
  {
    element: <StreamListPage />,
    path: ROUTES_PATHS.STREAMING_LIST,
  },
];

export const PROTECTED_ROUTES = [
  {
    element: <StreamingPage />,
    path: ROUTES_PATHS.STREAMING,
  },

  {
    element: <MyPage />,
    path: ROUTES_PATHS.MYPAGE,
  },
];
