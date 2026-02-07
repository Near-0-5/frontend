import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { ROUTES_PATHS } from '@/constants/urls';

//스트리밍 카드 클릭시 concertId를 받아 콘서트 상세 페이지로 이동하는 기능을 제공하는 훅입니다
export const useConcertNavigation = () => {
  const navigate = useNavigate();

  const navigateToConcert = useCallback(
    (concertId: number) => {
      if (!concertId || isNaN(concertId)) {
        console.error('유효하지 않은 콘서트 ID입니다.');
        return;
      }

      const path = ROUTES_PATHS.CONCERT_DETAIL.replace(
        ':id',
        String(concertId),
      );
      navigate(path);
    },
    [navigate],
  );

  return { navigateToConcert };
};
