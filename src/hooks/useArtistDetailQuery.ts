import { useQuery } from '@tanstack/react-query';

import { fetchArtistDetail } from '@/api/artistDetail';

//특정 아티스트의 상세 정보를 조회하는 쿼리 훅입니다
export const useArtistDetailQuery = (artistId: number) =>
  useQuery({
    enabled: !!artistId,
    queryFn: () => fetchArtistDetail(artistId),
    queryKey: ['artist', 'detail', artistId],
  });
