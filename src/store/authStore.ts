import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  accessToken: null | string;
  isAuthenticated: boolean;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  refreshToken: null | string;
  user: null | User;
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

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      accessToken: null,
      isAuthenticated: false,
      login: (user, accessToken, refreshToken) =>
        set({
          accessToken,
          isAuthenticated: true,
          refreshToken,
          user,
        }),
      logout: () =>
        set({
          accessToken: null,
          isAuthenticated: false,
          refreshToken: null,
          user: null,
        }),
      refreshToken: null,
      user: null,
    }),
    {
      name: 'auth-storage',
    },
  ),
);
