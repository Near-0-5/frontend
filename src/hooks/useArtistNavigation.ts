import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { ROUTES_PATHS } from '@/constants/urls';

//컨텐츠(카드, 프로필이미지) 클릭시 artistId를 받아 아티스트 상세 페이지로 이동하는 기능을 제공하는 훅입니다
export const useArtistNavigation = () => {
  const navigate = useNavigate();

  const navigateToArtist = useCallback(
    (artistId: number) => {
      if (!artistId || isNaN(artistId)) {
        console.error('유효하지 않은 아티스트 ID입니다.');
        return;
      }

      const path = ROUTES_PATHS.ARTIST_DETAIL.replace(':id', String(artistId));
      navigate(path);
    },
    [navigate],
  );

  return { navigateToArtist };
};
