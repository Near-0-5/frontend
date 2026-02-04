export type Artist = {
  agency: string;
  id: number;
  isMain: boolean;
  name: string;
  profileImgUrl: string;
  type: string;
};
export type CategoryType =
  | 'BAND'
  | 'FAN_MEETING'
  | 'K-POP'
  | 'KOREA_TOUR'
  | 'MUSICAL'
  | 'TROT';

export type StreamCredentials = {
  playbackUrl: string;
  streamId?: number;
};

export type StreamDetail = StreamSession & {
  description: string;
  endAt: string;
  lineup: Artist[];
};

export type StreamListResponse = {
  items: StreamSession[];
  nextCursor: null | number;
};

export type StreamSession = {
  category: CategoryType;
  concertTitle: string;
  id: number;
  sessionName: string;
  startAt: string;
  status: StreamStatus;
  thumbnailUrl: string;
};

export type StreamStatus = 'ENDED' | 'LIVE' | 'READY';
