export type FavoriteArtist = {
  category: string;
  followerCount?: number;
  id: string;
  imageUrl: null | string;
  name: string;
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
