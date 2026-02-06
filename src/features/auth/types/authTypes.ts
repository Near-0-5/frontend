export type AuthState = {
  accessToken: null | string;
  clearAccessToken: () => void;
  initializeAuth: () => Promise<void>;
  isInitialized: boolean;
  isLoggedIn: () => boolean;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<null | string>;
  setAccessToken: (accessToken: null | string) => void;
};
