import type { Artist } from '@/features/main/types/artist';

import { FollowButton } from '@/components';
import HeroBanner from '@/features/main/components/HeroBanner';
import { useArtistListQuery } from '@/features/main/hooks/useArtistListQuery';
import {
  useAddFavoriteArtistMutation,
  useDeleteFavoriteArtistMutation,
} from '@/features/main/hooks/useFavoriteArtistMutations';
import { useFavoriteArtistsQuery } from '@/features/main/hooks/useFavoriteArtistsQuery';
import { useArtistNavigation } from '@/hooks/useArtistNavigation';

const MOCK_ARTISTS: Artist[] = [
  {
    agency: '쏘스뮤직',
    followerCount: 1234567,
    id: 1,
    name: 'LE SSERAFIM',
    profileImage: '/images/artist-le-sserafim.png',
  },
  {
    agency: 'ADOR',
    followerCount: 2345678,
    id: 2,
    name: 'NewJeans',
    profileImage: '/images/artist-newjeans.png',
  },
  {
    agency: 'BIGHIT MUSIC',
    followerCount: 3456789,
    id: 3,
    name: 'BTS',
    profileImage: '/images/artist-bts.png',
  },
];

export default function ArtistListPage() {
  const { data, isError, isSuccess } = useArtistListQuery();

  const { data: favoriteArtistsData } = useFavoriteArtistsQuery();

  const { mutate: addFavorite } = useAddFavoriteArtistMutation();
  const { mutate: deleteFavorite } = useDeleteFavoriteArtistMutation();
  const { navigateToArtist } = useArtistNavigation();

  const rawArtists: Artist[] = data?.items ?? [];
  const useMock = isError || !isSuccess || rawArtists.length === 0;

  const artists: Artist[] = useMock
    ? MOCK_ARTISTS
    : rawArtists.map(artist => ({
        agency: artist.agency,
        description: artist.description ?? null,
        followerCount: artist.followerCount,
        id: artist.id,
        name: artist.name,
        profileImage: artist.profileImage,
      }));

  const showEmptyMessage = !useMock && isSuccess && artists.length === 0;

  return (
    <div className="min-h-screen bg-[#1A1F2E] text-white">
      <HeroBanner />
      <main className="px-6 pt-6 pb-16 lg:px-20">
        <h2 className="mb-6 text-lg font-bold tracking-[-0.04em] lg:text-xl">
          아티스트
        </h2>
        {isError && !useMock && (
          <p className="mb-4 text-sm text-red-400">
            아티스트 목록을 불러오지 못했습니다.
          </p>
        )}
        {showEmptyMessage ? (
          <p className="text-sm text-[#D9D9D9]">
            등록된 아티스트가 아직 없습니다.
          </p>
        ) : (
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {artists.map(artist => {
              const isFollowing =
                favoriteArtistsData?.items.some(fav => fav.id === artist.id) ??
                false;
              return (
                <article
                  className="flex h-full flex-col rounded-3xl bg-[#10131C] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
                  key={artist.id}
                >
                  <div
                    className="flex h-full cursor-pointer flex-col text-left focus:outline-none"
                    onClick={() => navigateToArtist(artist.id)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        navigateToArtist(artist.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="h-66.5 w-full overflow-hidden rounded-2xl bg-gray-700">
                      {artist.profileImage ? (
                        <img
                          alt={artist.name}
                          className="h-full w-full object-cover"
                          src={artist.profileImage}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <h3 className="text-base font-bold tracking-[-0.04em] lg:text-lg">
                            {artist.name}
                          </h3>
                          <p className="text-xs text-[#D9D9D9]">
                            {artist.agency}
                          </p>
                          <p className="text-xs text-[#D9D9D9]">
                            {artist.followerCount} 팔로워
                          </p>
                        </div>
                        <div
                          onClick={e => e.stopPropagation()}
                          onKeyDown={e => e.stopPropagation()}
                          role="presentation"
                        >
                          <FollowButton
                            className="mt-1 shrink-0"
                            initialIsFollowing={isFollowing}
                            onToggle={nextIsFollowing => {
                              if (nextIsFollowing) {
                                addFavorite({ artistId: artist.id });
                              } else {
                                deleteFavorite({ artistId: artist.id });
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
}
