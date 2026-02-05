import type { StreamSessionStatus } from '@/features/main/types/streaming';

export const STREAMING_KEYS = {
  detail: (id: number) => ['streams', 'session', id] as const,
  list: (status: StreamSessionStatus) =>
    ['streams', 'sessions', status] as const,
};
