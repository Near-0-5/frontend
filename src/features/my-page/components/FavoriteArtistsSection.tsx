import type { KeyboardEvent, MouseEvent } from 'react';

import { useArtistNavigation } from '@/hooks/useArtistNavigation';

import type { FavoriteArtist } from '../types/favoriteArtist';

import { useFavoriteArtistMutation } from '../hooks/useFavoriteArtistMutation';

type FavoriteArtistsSectionProps = {
  artists: FavoriteArtist[];
};

export default function FavoriteArtistsSection({
  artists,
}: FavoriteArtistsSectionProps) {
  const { remove } = useFavoriteArtistMutation();
  const { navigateToArtist } = useArtistNavigation();

  const handleUnfollow = (
    event: MouseEvent<HTMLButtonElement>,
    artistId: number,
  ) => {
    event.stopPropagation();
    remove.mutate(artistId);
  };

  const handleCardKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    artistId: number,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigateToArtist(artistId);
    }
  };

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-white">선호 아티스트</h2>

      <div className="grid grid-cols-3 gap-6">
        {artists.map(artist => {
          const artistId = Number(artist.id);

          return (
            <div
              className="cursor-pointer overflow-hidden rounded-2xl bg-[#0E1625] transition hover:opacity-90"
              key={artist.id}
              onClick={() => navigateToArtist(artistId)}
              onKeyDown={event => handleCardKeyDown(event, artistId)}
              role="button"
              tabIndex={0}
            >
              <img
                alt={artist.name}
                className="h-40 w-full bg-[#0E1625] object-cover"
                onError={e => {
                  e.currentTarget.src = '/images/default-artist.png';
                }}
                src={artist.profileImage ?? '/images/default-artist.png'}
              />

              <div className="p-4">
                <p className="text-sm font-semibold text-white">
                  {artist.name}
                </p>

                {artist.followerCount != null && (
                  <p className="text-xs text-white/60">
                    {artist.followerCount} 팔로워
                  </p>
                )}

                <button
                  className="mt-3 w-full rounded-full bg-[#E5E7EB] py-2 text-sm font-medium text-black"
                  onClick={event => handleUnfollow(event, artistId)}
                  type="button"
                >
                  팔로우 취소
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
