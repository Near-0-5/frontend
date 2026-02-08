import { useQuery } from '@tanstack/react-query';

import { getMyFavoriteArtists } from '@/features/my-page/api/favoriteArtists';

import type { FavoriteArtist } from '../types/favoriteArtist';

const FAVORITE_ARTISTS_QUERY_KEY = ['my', 'favorite-artists'];

export const useFavoriteArtistsQuery = () =>
  useQuery({
    queryFn: async () => {
      const data = await getMyFavoriteArtists();

      return data.items.map<FavoriteArtist>(item => ({
        agency: '',
        followerCount: 0,

        id: Number(item.id),
        name: item.name,

        profileImage: item.profile_image ?? null,
      }));
    },
    queryKey: FAVORITE_ARTISTS_QUERY_KEY,
  });
