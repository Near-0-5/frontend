import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { ArtistList } from '@/features/main/types/artist';

import { ARTIST_QUERY_KEYS, fetchArtistList } from '@/features/main/api/artist';

type UseArtistListQueryParams = {
  page: number;
  pageSize: number;
};

export const useArtistListQuery = ({
  page,
  pageSize,
}: UseArtistListQueryParams) =>
  useQuery<ArtistList>({
    placeholderData: keepPreviousData,
    queryFn: () => fetchArtistList({ page, pageSize }),
    queryKey: ARTIST_QUERY_KEYS.LIST(page, pageSize),
  });
