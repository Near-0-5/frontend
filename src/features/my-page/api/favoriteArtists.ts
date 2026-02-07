import { api } from '@/api/api';

type FavoriteArtistsResponse = {
  items: {
    category_type: string;
    id: number;
    name: string;
    profile_image: null | string;
  }[];
  total: number;
};

export const getMyFavoriteArtists = async () => {
  const { data } = await api.get<FavoriteArtistsResponse>(
    '/users/me/favorite-artists',
  );

  return data;
};
