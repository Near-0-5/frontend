import { useCallback } from 'react';
import { useNavigate } from 'react-router';

export const useArtistNavigation = () => {
  const navigate = useNavigate();

  const navigateToArtist = useCallback(
    (artistId: number) => {
      if (!artistId || isNaN(artistId)) {
        console.error('유효하지 않은 아티스트 ID입니다.');
        return;
      }

      navigate(`/artist-detail/${artistId}`);
    },
    [navigate],
  );

  return { navigateToArtist };
};
