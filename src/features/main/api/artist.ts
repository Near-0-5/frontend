import type { ArtistList } from '@/features/main/types/artist';

import { api } from '@/api/api';

export const ARTIST_QUERY_KEYS = {
  MAIN_LIST: ['artists', 'list', 'main'] as const,
};

export const fetchArtistList = async (): Promise<ArtistList> => {
  const { data } = await api.get<ArtistList>('/artists', {
    params: { page: 1, page_size: 20, sort_by: 'latest' },
  });

  return data;
};
