import { FollowButton } from '@/components';
import { DUMMY_ARTISTS } from '@/constants/mockData';
import HeroBanner from '@/features/main/components/HeroBanner';

export default function ArtistListPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <HeroBanner />

      <main className="px-6 pt-6 pb-16 lg:px-20">
        <h2 className="mb-6 text-lg font-bold tracking-[-0.04em] lg:text-xl">
          아티스트
        </h2>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DUMMY_ARTISTS.map(artist => (
            <article
              className="flex h-full flex-col rounded-3xl bg-[#10131C] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
              key={artist.id}
            >
              <div className="h-66.5 w-full overflow-hidden rounded-2xl bg-gray-700">
                {artist.imageUrl && (
                  <img
                    alt={artist.name}
                    className="h-full w-full object-cover"
                    src={artist.imageUrl}
                  />
                )}
              </div>

              <div className="mt-4 flex flex-1 flex-col">
                <div className="space-y-1">
                  <h3 className="text-base font-bold tracking-[-0.04em] lg:text-lg">
                    {artist.name}
                  </h3>
                  <p className="text-xs text-[#D9D9D9]">아이돌콘</p>
                  <p className="text-xs text-[#D9D9D9]">
                    {artist.followerText ?? '3.2M 팔로워'}
                  </p>
                </div>

                <div className="mt-4">
                  <FollowButton initialIsFollowing={false} />
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
