import { useQuery } from '@tanstack/react-query';

import { api } from '@/api/api';

export type StreamSession = {
  category: string;
  concert_title: string;
  id: number;
  session_name: string;
  start_at: string;
  status: StreamSessionStatus;
  thumbnail_url: null | string;
};

export type StreamSessionsResponse = {
  items: StreamSession[];
  next_cursor: null | number;
};

export type StreamSessionStatus = 'COMPLETED' | 'ONGOING' | 'READY';

export const useStreamingListQuery = (status: StreamSessionStatus) =>
  useQuery<StreamSessionsResponse>({
    queryFn: async () => {
      const { data } = await api.get('/api/v1/streams/sessions', {
        params: { status },
      });
      return data;
    },
    queryKey: ['streams', 'sessions', status],
  });
