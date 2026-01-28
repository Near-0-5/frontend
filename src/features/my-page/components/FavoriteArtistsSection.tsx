import type { FavoriteArtist } from '../types/artist';

type FavoriteArtistsSectionProps = {
  artists: FavoriteArtist[];
};

export default function FavoriteArtistsSection({
  artists,
}: FavoriteArtistsSectionProps) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-white">선호 아티스트</h2>

      <div className="grid grid-cols-3 gap-6">
        {artists.map(artist => (
          <div
            className="overflow-hidden rounded-2xl bg-[#0E1625]"
            key={artist.id}
          >
            <img
              alt={artist.name}
              className="h-40 w-full object-cover"
              src={artist.imageUrl}
            />

            <div className="p-4">
              <p className="text-sm font-semibold text-white">{artist.name}</p>
              <p className="text-xs text-white/60">
                {artist.followerCount} 팔로워
              </p>

              <button
                className="mt-3 w-full rounded-full bg-[#E5E7EB] py-2 text-sm font-medium text-black"
                type="button"
              >
                팔로우 취소
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
