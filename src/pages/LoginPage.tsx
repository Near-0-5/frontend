import { Link } from 'react-router';

import { KakaoIcon, NaverIcon } from '@/assets';
import { Button } from '@/components';
import { ROUTES_PATHS } from '@/constants';

const KAKAO_LOGIN_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/auth/kakao/login`;
const NAVER_LOGIN_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/auth/naver/login`;

export default function LoginPage() {
  const handleKakoLogin = () => {
    window.location.href = KAKAO_LOGIN_URL;
  };

  const handleNaverLogin = () => {
    window.location.href = NAVER_LOGIN_URL;
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex w-1/2 flex-col items-center justify-center bg-[#070913]">
        <div className={`flex w-123 flex-col items-start justify-center`}>
          <Link
            className="mb-5 max-w-45 rounded px-2 py-2 text-white opacity-50"
            to={ROUTES_PATHS.MAIN}
          >
            {'< 메인 페이지로 이동'}
          </Link>

          <h1 className={'mb-7 text-4xl font-bold text-white'}>Near 0.5</h1>
          <p className={'mb-7 text-gray-400'}>
            아티스트와 팬을 연결하는 플랫폼
          </p>
          <div className="flex w-full flex-col space-y-4">
            <p className={'mb-7 h-8 w-16 text-white'}>로그인</p>
            <Button
              className="h-13 bg-[#03c75a] text-white hover:bg-[#02b350]"
              onClick={handleNaverLogin}
            >
              <NaverIcon />
              네이버 간편 로그인
            </Button>
            <Button
              className="h-13 bg-[#fee500] text-black hover:bg-[#f5dc00]"
              onClick={handleKakoLogin}
            >
              <KakaoIcon />
              카카오 간편 로그인
            </Button>
          </div>
        </div>
      </div>
      <div className="flex w-1/2 justify-center bg-gradient-to-br from-[#0e0325] via-[#984e9d] to-[#a50a66] px-8">
        <div className="flex w-80 max-w-xs flex-col items-center justify-center gap-6">
          <div className="text-center text-5xl font-bold text-white">
            <h2>아티스트와</h2>
            <h2>더 가까이</h2>
          </div>
          <div className="max-w-2xl text-center text-white">
            <p>내 방에서 아티스트의 라이브 콘서트를</p>
            <p>지금 바로 즐겨보세요</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-4xl leading-9 font-bold text-white">
                100+
              </div>
              <div className="text-sm leading-5 text-white/80">아티스트</div>
            </div>
            <div className="h-full border opacity-30" />
            <div className="text-center">
              <div className="text-4xl leading-9 font-bold text-white">1M+</div>
              <div className="text-sm leading-5 text-white/80">팬들</div>
            </div>
            <div className="h-full border opacity-30" />
            <div className="text-center">
              <div className="text-4xl leading-9 font-bold text-white">
                24/7
              </div>
              <div className="text-sm leading-5 text-white/80">라이브</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
