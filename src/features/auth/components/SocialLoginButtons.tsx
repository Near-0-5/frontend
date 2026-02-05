import { useSearchParams } from 'react-router';

import { GoogleIcon, KakaoIcon, NaverIcon } from '@/assets';
import { Button } from '@/components';
import { API_ROUTES } from '@/constants';
import {
  REDIRECT_KEY,
  REDIRECT_PARAM,
  SOCIAL_LOGIN_PROVIDERS,
  type SocialLoginProvider,
} from '@/features/auth';
import { cn } from '@/utils';

const SOCIAL_LOGIN_CONFIG = {
  google: {
    className: 'bg-white text-[#1F1F1F] hover:bg-[#E8E8E8]',
    icon: <GoogleIcon />,
    text: '구글 간편 로그인',
  },
  kakao: {
    className: 'bg-[#fee500] text-black hover:bg-[#f5dc00]',
    icon: <KakaoIcon />,
    text: '카카오 간편 로그인',
  },
  naver: {
    className: 'bg-[#03C75A] text-white hover:bg-[#02b351]',
    icon: <NaverIcon />,
    text: '네이버 간편 로그인',
  },
} as const;

function SocialLoginButtons() {
  const [searchParams] = useSearchParams();

  const handleLogin = (provider: SocialLoginProvider) => {
    // 직전 페이지 경로를 저장
    const redirect = searchParams.get(REDIRECT_PARAM);

    if (redirect) {
      localStorage.setItem(REDIRECT_KEY, redirect);
    }

    // 소셜 로그인 페이지로 이동
    window.location.href = API_ROUTES.AUTH.SOCIAL_LOGIN_CALLBACK(provider);
  };

  return (
    <div className="flex w-full flex-col space-y-4">
      {SOCIAL_LOGIN_PROVIDERS.map(provider => {
        const config = SOCIAL_LOGIN_CONFIG[provider];

        return (
          <Button
            className={cn('h-13 cursor-pointer border-none', config.className)}
            key={provider}
            onClick={() => handleLogin(provider)}
          >
            {config.icon}
            {config.text}
          </Button>
        );
      })}
    </div>
  );
}

export default SocialLoginButtons;
