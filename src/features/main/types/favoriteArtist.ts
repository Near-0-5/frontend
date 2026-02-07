export type AddFavoriteArtistRequest = {
  artistId: number;
};

export type AddFavoriteArtistResponse = {
  artistId: number;
  artistName: string;
  createdAt: string;
  profileImgUrl: string;
  userId: number;
};

export type DeleteFavoriteArtistParams = {
  artistId: number;
};

export type FavoriteArtistItem = {
  agency: string;
  categoryType: string;
  createdAt: string;
  groupType: string;
  id: number;
  memberCount: number;
  name: string;
  profileImage: null | string;
};

export type GetFavoriteArtistsResponse = {
  items: FavoriteArtistItem[];
  total: number;
};
