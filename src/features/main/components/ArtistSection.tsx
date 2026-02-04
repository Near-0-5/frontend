import { useNavigate } from 'react-router';

import { SectionHeader } from '@/components';
import { ROUTES_PATHS } from '@/constants';
import { useArtistListQuery } from '@/queries/artist';

export type ArtistSectionProps = {
  title: string;
};

const MOCK_ARTISTS = [
  {
    id: 1,
    name: 'LE SSERAFIM',
    profile_image: '/images/artist-le-sserafim.png',
  },
  {
    id: 2,
    name: 'NewJeans',
    profile_image: '/images/artist-newjeans.png',
  },
  {
    id: 3,
    name: 'BTS',
    profile_image: '/images/artist-bts.png',
  },
];

export default function ArtistSection({ title }: ArtistSectionProps) {
  const navigate = useNavigate();

  const { data, isError, isLoading, isSuccess } = useArtistListQuery();
  const rawList = data?.items ?? [];

  const useMock = isError || !isSuccess || rawList.length === 0;

  const list = useMock
    ? MOCK_ARTISTS
    : rawList.map(artist => ({
        id: artist.id,
        name: artist.name,
        profile_image: artist.profile_image,
      }));

  console.log('[ArtistSection] data =', data);
  console.log('[ArtistSection] rawList.length =', rawList.length);
  console.log('[ArtistSection] useMock =', useMock);
  console.log('[ArtistSection] isSuccess =', isSuccess);
  console.log('[ArtistSection] isError =', isError);

  const isLoadingState = isLoading && !data && !useMock;
  const showEmptyMessage = !useMock && isSuccess && list.length === 0;

  const handleClickMore = () => {
    navigate(ROUTES_PATHS.ARTIST_LIST);
  };

  return (
    <section className="w-full px-6 py-10 md:px-10">
      <div className="mx-auto max-w-293">
        <SectionHeader onMoreClick={handleClickMore} title={title} />

        {isLoadingState ? (
          <div className="py-10 text-center text-gray-400">
            아티스트를 불러오는 중입니다...
          </div>
        ) : showEmptyMessage ? (
          <div className="py-10 text-center text-gray-400">
            추천 아티스트가 없습니다.
          </div>
        ) : (
          <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
            {list.map(({ id, name, profile_image }) => (
              <article
                className="flex w-34.5 shrink-0 flex-col items-center justify-center"
                key={id}
              >
                <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-transparent transition-colors hover:border-[#DC196D]">
                  {profile_image ? (
                    <img
                      alt={name}
                      className="h-full w-full object-cover"
                      src={profile_image}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-700 text-[10px] text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <p className="mt-2 text-xs font-medium text-white">{name}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
