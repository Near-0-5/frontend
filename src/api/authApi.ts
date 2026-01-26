import { apiClient } from './axiosInstance';

type AuthResponse = {
  access_token: string;
  refresh_token: string;
  user: User;
};

type User = {
  birth_date: string;
  created_at: string;
  email: string;
  gender: string;
  id: string;
  name: string;
  nickname: string;
  phone_number: string;
};

export const authApi = {
  kakaoLogin: async (code: string): Promise<AuthResponse> => {
    const { data } = await apiClient.post('/api/v1/auth/kakao/callback', {
      authorization_code: code,
    });
    return data;
  },

  logout: async () => {
    const { data } = await apiClient.post('/api/v1/auth/logout');
    return data;
  },

  naverLogin: async (code: string): Promise<AuthResponse> => {
    const { data } = await apiClient.post('/api/v1/auth/naver/callback', {
      authorization_code: code,
    });
    return data;
  },
};
