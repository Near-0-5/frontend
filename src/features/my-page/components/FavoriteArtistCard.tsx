type FavoriteArtist = {
  id: number;
  name: string;
};

type FavoriteArtistCardProps = {
  artist: FavoriteArtist;
};

export default function FavoriteArtistCard({
  artist,
}: FavoriteArtistCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[#1a1f2e] px-4 py-3">
      <span className="text-sm font-medium text-white">{artist.name}</span>

      <span aria-label="좋아요" role="img">
        ❤️
      </span>
    </div>
  );
}
