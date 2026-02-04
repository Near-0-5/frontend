import type { StreamCredentials, StreamDetail } from '@/features/live/types';

import { api } from '@/api';
import { API_ROUTES } from '@/constants';

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
