export type FavoriteArtist = {
  agency: string;
  description?: null | string;
  followerCount: number;
  id: number;
  name: string;
  profileImage: null | string;
};

export type FavoriteArtistApiItem = {
  agency: string;
  category_type: string;
  created_at: string;
  group_type: string;
  id: number;
  member_count: number;
  name: string;
  profile_image: null | string;
};
export type FavoriteArtistsResponse = {
  items: FavoriteArtistApiItem[];
  total: number;
};
