export type StreamSession = {
  category: string;
  concertTitle: string;
  id: number;
  sessionName: string;
  startAt: string;
  status: StreamSessionStatus;
  thumbnailUrl: null | string;
};

export type StreamSessionDetail = StreamSession & {
  description?: null | string;
};

export type StreamSessions = {
  items: StreamSession[];
  nextCursor: null | number;
};

export type StreamSessionStatus = 'ENDED' | 'LIVE' | 'READY';
