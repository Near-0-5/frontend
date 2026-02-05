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
