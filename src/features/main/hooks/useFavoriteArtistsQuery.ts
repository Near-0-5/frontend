import { useQuery } from '@tanstack/react-query';

import type { GetFavoriteArtistsResponse } from '@/features/main/types/favoriteArtist';

import { getFavoriteArtists } from '@/features/main/api/favoriteArtist';

export const useFavoriteArtistsQuery = () =>
  useQuery<GetFavoriteArtistsResponse, Error>({
    queryFn: getFavoriteArtists,
    queryKey: ['favoriteArtists'],
    staleTime: 1000 * 60,
  });
