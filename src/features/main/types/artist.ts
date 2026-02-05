export type Artist = {
  agency: string;
  description?: null | string;
  followerCount: number;
  id: number;
  name: string;
  profileImage: null | string;
};

export type ArtistList = {
  items: Artist[];
};
