import type { ArtistDetail } from '@/types/artistDetail';

import { api } from '@/api';

export const fetchArtistDetail = async (
  artistId: number,
): Promise<ArtistDetail> => {
  const { data } = await api.get<ArtistDetail>(`/artists/${artistId}`);
  return data;
};
