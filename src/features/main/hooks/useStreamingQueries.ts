import { useQuery } from '@tanstack/react-query';

import type {
  StreamSessionDetail,
  StreamSessions,
  StreamSessionStatus,
} from '@/features/main/types/streaming';

import {
  fetchStreamingDetail,
  fetchStreamingList,
} from '@/features/main/api/streaming';
import { STREAMING_KEYS } from '@/features/main/constants/streamingKeys';

export const useStreamingListQuery = (status: StreamSessionStatus) =>
  useQuery<StreamSessions>({
    queryFn: () => fetchStreamingList(status),
    queryKey: STREAMING_KEYS.list(status),
  });

export const useStreamingDetailQuery = (id: number) =>
  useQuery<StreamSessionDetail>({
    enabled: !!id,
    queryFn: () => fetchStreamingDetail(id),
    queryKey: STREAMING_KEYS.detail(id),
  });
