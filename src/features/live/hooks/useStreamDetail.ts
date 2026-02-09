import { useQuery } from '@tanstack/react-query';

import { STREAM_KEYS } from '@/constants/querykeys';
import { getStreamDetail } from '@/features/live/api/live';

export const useStreamDetail = (sessionId: number) => {
  const detailQuery = useQuery({
    enabled: !!sessionId,
    queryFn: () => getStreamDetail(sessionId),
    queryKey: STREAM_KEYS.DETAIL(sessionId),
  });

  return {
    error: detailQuery.error,
    isError: detailQuery.isError,
    isLoading: detailQuery.isLoading,
    refetch: detailQuery.refetch,
    streamDetail: detailQuery.data || null,
  };
};
