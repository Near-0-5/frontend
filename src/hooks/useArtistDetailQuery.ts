import { useQuery } from '@tanstack/react-query';

import { fetchArtistDetail } from '@/api/artistDetail';

export const useArtistDetailQuery = (artistId: number) =>
  useQuery({
    enabled: !!artistId,
    queryFn: () => fetchArtistDetail(artistId),
    queryKey: ['artist', 'detail', artistId],
  });
