import { useQuery } from '@tanstack/react-query';

import { getMyFavoriteArtists } from '@/features/my-page/api/favoriteArtists';

import type { FavoriteArtist } from '../types/favoriteArtist';

const FAVORITE_ARTISTS_QUERY_KEY = ['my', 'favorite-artists'];

export const useFavoriteArtistsQuery = () =>
  useQuery({
    queryFn: async () => {
      const data = await getMyFavoriteArtists();

      return data.items.map<FavoriteArtist>(item => ({
        category: item.category_type,
        id: String(item.id),
        imageUrl: item.profile_image,
        name: item.name,
      }));
    },
    queryKey: FAVORITE_ARTISTS_QUERY_KEY,
  });
