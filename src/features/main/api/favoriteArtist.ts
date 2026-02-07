import type {
  AddFavoriteArtistRequest,
  AddFavoriteArtistResponse,
  DeleteFavoriteArtistParams,
} from '@/features/main/types/favoriteArtist';

import { api } from '@/api/api';

export const addFavoriteArtist = async (
  body: AddFavoriteArtistRequest,
): Promise<AddFavoriteArtistResponse> => {
  const { data } = await api.post<AddFavoriteArtistResponse>(
    '/users/me/favorite-artists',
    body,
  );

  return data;
};

export const deleteFavoriteArtist = async ({
  artistId,
}: DeleteFavoriteArtistParams): Promise<void> => {
  await api.delete(`/users/me/favorite-artists/${artistId}`);
};
