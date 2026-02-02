import type {
  StreamCredentials,
  StreamDetail,
} from '@/features/live/types/stream';

import { api } from '@/api/api';
import { API_ROUTES } from '@/constants';

type LoginResponse = {
  accessToken: string;
  isAdmin: boolean;
  refreshToken: string;
};

export const loginTest = async (userId: number) => {
  const { data } = await api.post<LoginResponse>(
    API_ROUTES.ENDPOINTS.TESTLOGIN,
    null,
    {
      params: { userId },
    },
  );
  return data;
};

export const getStreamDetail = async (sessionId: number) => {
  const { data } = await api.get<StreamDetail>(
    API_ROUTES.STREAMS.DETAIL(sessionId),
  );
  return data;
};

export const getStreamCredentials = async (sessionId: number) => {
  const { data } = await api.get<StreamCredentials>(
    API_ROUTES.STREAMS.CREDENTIALS(sessionId),
  );
  return data;
};

export const refreshStreamCredentials = async (sessionId: number) => {
  const { data } = await api.post<StreamCredentials>(
    API_ROUTES.STREAMS.REFRESH(sessionId),
  );
  return data;
};
