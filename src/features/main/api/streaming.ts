import type {
  StreamSession,
  StreamSessionDetail,
  StreamSessions,
} from '@/features/main/types/streaming';

import { api } from '@/api/api';

const toStreamSession = (src: StreamSession): StreamSession => src;

export const fetchStreamingList = async (
  status: StreamSession['status'],
): Promise<StreamSessions> => {
  const { data } = await api.get<StreamSessions>('/streams/sessions', {
    params: { status },
  });

  return {
    items: data.items.map(toStreamSession),
    nextCursor: data.nextCursor,
  };
};

export const fetchStreamingDetail = async (
  id: number,
): Promise<StreamSessionDetail> => {
  const { data } = await api.get<StreamSessionDetail>(
    `/streams/sessions/${id}`,
  );

  return {
    ...toStreamSession(data),
    description: data.description ?? null,
  };
};
