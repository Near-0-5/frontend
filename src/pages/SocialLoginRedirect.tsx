import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { ROUTES_PATHS } from '@/constants';
import { REDIRECT_KEY, useAuthStore } from '@/features/auth';

const SEARCH_PARAMS = {
  ACCESS_TOKEN: 'access_token',
  IS_NEW_USER: 'is_new_user',
};

function SocialLoginRedirect() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setAccessToken = useAuthStore(state => state.setAccessToken);

  useEffect(() => {
    const accessToken = searchParams.get(SEARCH_PARAMS.ACCESS_TOKEN);

    if (accessToken) {
      setAccessToken(accessToken);

      const REDIRECT_PATH = localStorage.getItem(REDIRECT_KEY);

      if (REDIRECT_PATH) {
        // 직전 페이지가 있는 경우 직전 페이지로 이동
        localStorage.removeItem(REDIRECT_KEY);

        navigate(REDIRECT_PATH, { replace: true });
      } else {
        navigate(ROUTES_PATHS.MAIN, { replace: true });
      }
    } else {
      console.error('토큰을 받지 못했습니다');

      navigate(ROUTES_PATHS.LOGIN, { replace: true });
    }
  }, [searchParams, navigate, setAccessToken]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070913]">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-white" />
        <p className="text-lg text-white">로그인 처리 중...</p>
      </div>
    </div>
  );
}

export default SocialLoginRedirect;
