import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { authApi } from '@/api/authApi';
import { ROUTES_PATHS } from '@/constants';
import { useAuthStore } from '@/store/authStore';

export const useKakaoLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: (code: string) => authApi.kakaoLogin(code),
    onError: error => {
      console.error('Kakao login error:', error);
      navigate(ROUTES_PATHS.LOGIN);
    },
    onSuccess: data => {
      login(data.user, data.access_token, data.refresh_token);
      navigate(ROUTES_PATHS.MAIN);
    },
  });
};

export const useNaverLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: (code: string) => authApi.naverLogin(code),
    onError: error => {
      console.error('Naver login error:', error);
      navigate(ROUTES_PATHS.LOGIN);
    },
    onSuccess: data => {
      login(data.user, data.access_token, data.refresh_token);
      navigate(ROUTES_PATHS.MAIN);
    },
  });
};
