import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { ROUTES_PATHS } from '@/constants';
import { useAuthStore } from '@/store/authStore';

export default function NaverCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuthStore();

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');

    const userDataString = searchParams.get('user');

    if (accessToken && refreshToken) {
      const user = userDataString
        ? JSON.parse(decodeURIComponent(userDataString))
        : null;

      login(user, accessToken, refreshToken);

      navigate(ROUTES_PATHS.MAIN);
    } else {
      console.error('토큰을 받지 못했습니다');
      navigate(ROUTES_PATHS.LOGIN);
    }
  }, [searchParams, login, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070913]">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-white"></div>
        <p className="text-lg text-white">로그인 처리 중...</p>
      </div>
    </div>
  );
}
