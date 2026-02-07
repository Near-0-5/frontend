import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api';

const FAVORITE_ARTISTS_QUERY_KEY = ['users', 'me', 'favorite-artists'] as const;

export function useFavoriteArtistMutation() {
  const queryClient = useQueryClient();

  const add = useMutation<void, Error, number>({
    mutationFn: async artistId => {
      await api.post('/users/me/favorite-artists', {
        artist_id: artistId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FAVORITE_ARTISTS_QUERY_KEY,
      });
    },
  });

  const remove = useMutation<void, Error, number>({
    mutationFn: async artistId => {
      await api.delete(`/users/me/favorite-artists/${artistId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FAVORITE_ARTISTS_QUERY_KEY,
      });
    },
  });

  return { add, remove };
}
