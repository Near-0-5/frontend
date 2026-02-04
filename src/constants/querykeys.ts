export const STREAM_KEYS = {
  DETAIL: (sessionId: number) => ['streamDetail', sessionId] as const,
  TOKEN: (sessionId: number) => ['streamToken', sessionId] as const,
};
