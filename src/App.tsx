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
  const { initializeAuth } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await initializeAuth();
      setIsInitializing(false);
    };

    initAuth();
  }, [initializeAuth]);

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
