import { useQuery } from '@tanstack/react-query';

import type { ArtistList } from '@/features/main/types/artist';

import { ARTIST_QUERY_KEYS, fetchArtistList } from '@/features/main/api/artist';

export const useArtistListQuery = () =>
  useQuery<ArtistList>({
    queryFn: fetchArtistList,
    queryKey: ARTIST_QUERY_KEYS.MAIN_LIST,
  });
