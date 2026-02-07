export type ProfileSummaryProps = {
  bio?: string;
  favoriteArtistCount: number;
  nickname: string;
  onImageChange?: (file: File) => void;
  profileImageUrl?: null | string;
};
