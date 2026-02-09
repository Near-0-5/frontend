import { useNavigate } from 'react-router';

import type { Artist } from '@/features/main/types/artist';

import { SectionHeader } from '@/components';
import { ROUTES_PATHS } from '@/constants';
import { useArtistListQuery } from '@/features/main/hooks/useArtistListQuery';

export type ArtistSectionProps = {
  title: string;
};

const MAX_VISIBLE = 8;

const MOCK_ARTISTS: Pick<Artist, 'id' | 'name' | 'profileImage'>[] = [
  { id: 1, name: 'LE SSERAFIM', profileImage: null },
  { id: 2, name: 'NewJeans', profileImage: null },
  { id: 3, name: 'BTS', profileImage: null },
];

const hasRealImage = (profileImage: null | string) => {
  if (!profileImage) return false;
  if (profileImage === 'noimage') return false;
  return true;
};

export default function ArtistSection({ title }: ArtistSectionProps) {
  const navigate = useNavigate();

  const { data, isError, isLoading, isSuccess } = useArtistListQuery();
  const rawList: Artist[] = data?.items ?? [];

  const useMock = isError || !isSuccess || rawList.length === 0;

  const baseList = useMock
    ? MOCK_ARTISTS
    : rawList.map(artist => ({
        id: artist.id,
        name: artist.name,
        profileImage: artist.profileImage,
      }));

  const list = baseList.slice(0, MAX_VISIBLE);

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
          <div className="flex flex-wrap gap-4 pb-4">
            {list.map(({ id, name, profileImage }) => {
              const showRealImage = hasRealImage(profileImage);

              return (
                <article
                  className="flex min-w-30 flex-col items-center justify-center"
                  key={id}
                >
                  <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-transparent transition-colors hover:border-[#DC196D]">
                    {showRealImage ? (
                      <img
                        alt={name}
                        className="h-full w-full object-cover"
                        src={profileImage as string}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-700 text-[10px] text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-xs font-medium text-white">{name}</p>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
