export const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const MSW_BASE_URL = 'https://msw.local';

const API_PREFIX = '/api/v1';

export const API_PATHS = {
  auth: {
    testLogin: `${API_PREFIX}/auth/login-test`,
  },
  streams: {
    detail: (session_id: number) =>
      `${API_PREFIX}/streams/sessions/${session_id}`,
    list: `${API_PREFIX}/streams/sessions`,
    refreshToken: (session_id: number) =>
      `${API_PREFIX}/streams/sessions/${session_id}/refresh`,
    status: (session_id: number) =>
      `${API_PREFIX}/streams/sessions/${session_id}/status`,
    token: (session_id: number) =>
      `${API_PREFIX}/streams/sessions/${session_id}/credentials`,
  },
} as const;
