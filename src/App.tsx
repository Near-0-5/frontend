import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';

import { MainLayout } from '@/components';
import { LOCAL_STORAGE_KEYS, ROUTES_PATHS } from '@/constants';
import { ProtectedRoute, useAuthStore } from '@/features/auth';
import { NotFound } from '@/pages';
import {
  PROTECTED_ROUTES,
  PUBLIC_ROUTES,
  PUBLIC_ROUTES_WITH_LAYOUT,
} from '@/routes';

const parseIsLoggedIn = (value: null | string) => value === 'true';

function App() {
  const { accessToken, refreshAccessToken } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.IS_LOGGED_IN, 'true');
      return;
    }

    if (!isInitializing) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.IS_LOGGED_IN, 'false');
    }
  }, [accessToken, isInitializing]);

  // 새로고침시 토큰 복구
  useEffect(() => {
    const initAuth = async () => {
      const isLoggedIn = parseIsLoggedIn(
        localStorage.getItem(LOCAL_STORAGE_KEYS.IS_LOGGED_IN),
      );
      const shouldCheckAuth = isLoggedIn || Boolean(accessToken);

      if (!shouldCheckAuth) {
        setIsInitializing(false);
        return;
      }

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
