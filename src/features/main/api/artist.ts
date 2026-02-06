import type { ArtistList } from '@/features/main/types/artist';

import { api } from '@/api/api';

export const ARTIST_QUERY_KEYS = {
  LIST: (page: number, pageSize: number) =>
    ['artists', 'list', page, pageSize] as const,
};

type FetchArtistListParams = {
  page: number;
  pageSize: number;
};

export const fetchArtistList = async ({
  page,
  pageSize,
}: FetchArtistListParams): Promise<ArtistList> => {
  const { data } = await api.get<ArtistList>('/artists', {
    params: { page, page_size: pageSize, sort_by: 'oldest' },
  });

  return data;
};
