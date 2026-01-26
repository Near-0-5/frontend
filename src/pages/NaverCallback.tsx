import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { ROUTES_PATHS } from '@/constants';
import { useNaverLogin } from '@/hooks/useAuth';

export default function NaverCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isPending, mutate: naverLogin } = useNaverLogin();

  useEffect(() => {
    const code = searchParams.get('code');

    if (!code) {
      console.error('Authorization code not found');
      navigate(ROUTES_PATHS.LOGIN);
      return;
    }

    naverLogin(code);
  }, [searchParams, naverLogin, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070913]">
      <div className="text-white">
        {isPending ? '로그인 처리 중...' : '로그인 중...'}
      </div>
    </div>
  );
}
