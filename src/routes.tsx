import { ROUTES_PATHS } from '@/constants';
import {
  KakaoCallback,
  LoginPage,
  MainPage,
  MyPage,
  StreamingPage,
} from '@/pages';

export const PUBLIC_ROUTES = [
  {
    element: <LoginPage />,
    path: ROUTES_PATHS.LOGIN,
  },
  {
    element: <KakaoCallback />,
    path: ROUTES_PATHS.KAKAO_CALLBACK,
  },
];

export const PUBLIC_ROUTES_WITH_LAYOUT = [
  {
    element: <MainPage />,
    path: ROUTES_PATHS.MAIN,
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
