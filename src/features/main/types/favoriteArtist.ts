export type AddFavoriteArtistRequest = {
  artistId: number;
};

export type AddFavoriteArtistResponse = {
  userId: number;
  artistId: number;
  artistName: string;
  profileImgUrl: string;
  createdAt: string;
};

export type DeleteFavoriteArtistParams = {
  artistId: number;
};
