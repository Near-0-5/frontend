import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';

import { MainLayout } from '@/components';
import { ROUTES_PATHS } from '@/constants';
import { ProtectedRoute, useAuthStore } from '@/features/auth';
import { NotFound } from '@/pages';
import {
  PROTECTED_ROUTES,
  PUBLIC_ROUTES,
  PUBLIC_ROUTES_WITH_LAYOUT,
} from '@/routes';

function App() {
  const { accessToken, refreshAccessToken } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  /**
   * 새로고침시 토큰 복구
   *
   * - 마운트 시에만 한번 실행(빈 의존성 배열 사용)
   * - 토큰이 없으면 갱신 시도(쿠키에 리프레시 토큰이 있다고 가정)
   */
  useEffect(() => {
    const initAuth = async () => {
      if (!accessToken) {
        await refreshAccessToken();
      }
      setIsInitializing(false);
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isInitializing) {
    return null;
  }

  return (
    <Routes>
      {PUBLIC_ROUTES.map(route => (
        <Route element={route.element} key={route.path} path={route.path} />
      ))}

      <Route element={<MainLayout />}>
        {PUBLIC_ROUTES_WITH_LAYOUT.map(route => (
          <Route element={route.element} key={route.path} path={route.path} />
        ))}

        <Route element={<ProtectedRoute />}>
          {PROTECTED_ROUTES.map(route => (
            <Route element={route.element} key={route.path} path={route.path} />
          ))}
        </Route>
      </Route>

      <Route element={<NotFound />} path={ROUTES_PATHS.NOT_FOUND} />
    </Routes>
  );
}

export default App;
