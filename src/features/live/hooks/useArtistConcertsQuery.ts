import { useQuery } from '@tanstack/react-query';

import { getArtistStreamList } from '@/features/live/api/live';

export const useArtistConcertsQuery = (artistName: string | undefined) =>
  useQuery({
    enabled: !!artistName,
    queryFn: () => getArtistStreamList(artistName!),
    queryKey: ['artist', 'concerts', artistName],
    select: data => {
      const ongoing = data.items.filter(item => item.status === 'LIVE');
      const upcoming = data.items.filter(item => item.status === 'READY');

      return { ongoing, upcoming };
    },
  });
