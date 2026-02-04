import { useQuery } from '@tanstack/react-query';

import { STREAM_KEYS } from '@/constants/querykeys';
import {
  getStreamCredentials,
  getStreamDetail,
} from '@/features/live/api/live';

export const useStreamSession = (sessionId: number) => {
  const detailQuery = useQuery({
    enabled: !!sessionId,
    queryFn: () => getStreamDetail(sessionId),
    queryKey: STREAM_KEYS.DETAIL(sessionId),
  });

  const streamDetail = detailQuery.data;

  const tokenQuery = useQuery({
    enabled: !!streamDetail && streamDetail.status === 'LIVE',
    queryFn: async () => {
      const data = await getStreamCredentials(sessionId);
      return data.playbackUrl;
    },
    queryKey: STREAM_KEYS.TOKEN(sessionId),

    refetchInterval: 1000 * 60 * 50,

    refetchOnWindowFocus: false,
  });

  return {
    error: detailQuery.error || tokenQuery.error,
    isError: detailQuery.isError || tokenQuery.isError,
    isLoading: detailQuery.isLoading || tokenQuery.isLoading,
    loadStreamSession: detailQuery.refetch,
    playbackUrl: tokenQuery.data || null,

    refreshPlaybackToken: tokenQuery.refetch,
    streamDetail: streamDetail || null,
  };
};
