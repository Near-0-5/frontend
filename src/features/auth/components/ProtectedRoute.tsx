import { Navigate, Outlet, useLocation } from 'react-router';

import { ROUTES_PATHS } from '@/constants';
import { useAuthStore } from '@/features/auth/store/authStore';

export function ProtectedRoute() {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn());
  const location = useLocation();

  if (!isLoggedIn) {
    const REDIRECT_PATH = `${ROUTES_PATHS.LOGIN}?redirect=${encodeURIComponent(location.pathname)}`;

    return <Navigate replace to={REDIRECT_PATH} />;
  }

  return <Outlet />;
}
