import type {
  AddFavoriteArtistRequest,
  AddFavoriteArtistResponse,
  DeleteFavoriteArtistParams,
  GetFavoriteArtistsResponse,
} from '@/features/main/types/favoriteArtist';

import { api } from '@/api/api';

export const getFavoriteArtists =
  async (): Promise<GetFavoriteArtistsResponse> => {
    const { data } = await api.get<GetFavoriteArtistsResponse>(
      'users/me/favorite-artists',
    );
    return data;
  };

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
