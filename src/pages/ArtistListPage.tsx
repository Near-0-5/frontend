import { FollowButton } from '@/components';
import { Loading } from '@/components/ui/Loading';
import HeroBanner from '@/features/main/components/HeroBanner';
import { useArtistListQuery } from '@/queries/artist';

export default function ArtistListPage() {
  const { data, isError, isLoading } = useArtistListQuery();
  const artists = data?.items ?? [];

  return (
    <div className="min-h-screen bg-[#1A1F2E] text-white">
      <HeroBanner />

      <main className="px-6 pt-6 pb-16 lg:px-20">
        <h2 className="mb-6 text-lg font-bold tracking-[-0.04em] lg:text-xl">
          아티스트
        </h2>

        {isLoading && (
          <div className="flex h-40 items-center justify-center">
            <Loading size="md" />
          </div>
        )}

        {isError && (
          <p className="text-sm text-red-400">
            아티스트 목록을 불러오지 못했습니다.
          </p>
        )}

        {!isLoading && !isError && (
          <>
            {artists.length === 0 ? (
              <p className="text-sm text-[#D9D9D9]">
                등록된 아티스트가 아직 없습니다.
              </p>
            ) : (
              <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {artists.map(artist => (
                  <article
                    className="flex h-full flex-col rounded-3xl bg-[#10131C] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
                    key={artist.id}
                  >
                    <div className="h-66.5 w-full overflow-hidden rounded-2xl bg-gray-700">
                      {artist.profile_image && (
                        <img
                          alt={artist.name}
                          className="h-full w-full object-cover"
                          src={artist.profile_image}
                        />
                      )}
                    </div>

                    <div className="mt-4 flex flex-1 flex-col">
                      <div className="space-y-1">
                        <h3 className="text-base font-bold tracking-[-0.04em] lg:text-lg">
                          {artist.name}
                        </h3>
                        <p className="text-xs text-[#D9D9D9]">
                          {artist.agency}
                        </p>
                        <p className="text-xs text-[#D9D9D9]">
                          {artist.follower_count.toLocaleString()} 팔로워
                        </p>
                      </div>

                      <div className="mt-4">
                        <FollowButton initialIsFollowing={false} />
                      </div>
                    </div>
                  </article>
                ))}
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}
