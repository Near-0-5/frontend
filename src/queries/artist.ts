import { useQuery } from '@tanstack/react-query';

import { api } from '@/api/api';

export type Artist = {
  agency: string;
  description: string;
  follower_count: number;
  id: number;
  name: string;
  profile_image: null | string;
};

export type ArtistListResponse = {
  items: Artist[];
  page: number;
  page_size: number;
  total: number;
};

export const useArtistListQuery = () =>
  useQuery<ArtistListResponse>({
    queryFn: async () => {
      const { data } = await api.get('/api/v1/artists', {
        params: {
          page: 1,
          page_size: 20,
          sort_by: 'latest',
        },
      });
      return data;
    },
    queryKey: ['artists', 'list', 'main'],
  });
