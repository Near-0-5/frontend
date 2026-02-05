import { useMutation, useQueryClient } from '@tanstack/react-query';

import type {
  AddFavoriteArtistRequest,
  AddFavoriteArtistResponse,
  DeleteFavoriteArtistParams,
} from '@/features/main/types/favoriteArtist';

import {
  addFavoriteArtist,
  deleteFavoriteArtist,
} from '@/features/main/api/favoriteArtist';

export const useAddFavoriteArtistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AddFavoriteArtistResponse,
    Error,
    AddFavoriteArtistRequest
  >({
    mutationFn: addFavoriteArtist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favoriteArtists'] });
      queryClient.invalidateQueries({ queryKey: ['artists', 'list', 'main'] });
    },
  });
};

export const useDeleteFavoriteArtistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteFavoriteArtistParams>({
    mutationFn: deleteFavoriteArtist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favoriteArtists'] });
      queryClient.invalidateQueries({ queryKey: ['artists', 'list', 'main'] });
    },
  });
};
