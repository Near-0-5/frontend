import { useState } from 'react';
import { useNavigate } from 'react-router';

import { ConcertCard, SectionHeader } from '@/components';
import Modal from '@/components/common/modal/Modal';
import ModalContent from '@/components/common/modal/ModalContent';
import ModalFooter from '@/components/common/modal/ModalFooter';
import { ROUTES_PATHS } from '@/constants';
import { useAuthStore } from '@/features/auth';
import { useStreamingListQuery } from '@/queries/streaming';

export type UpcomingStreamingSectionProps = {
  showMoreButton?: boolean;
  title: string;
};

const FALLBACK_THUMBNAILS = [
  '/images/Upcoming-1.png',
  '/images/Upcoming-2.png',
  '/images/Upcoming-3.png',
  '/images/Upcoming-4.png',
];

const getFallbackThumbnail = (index: number) =>
  FALLBACK_THUMBNAILS[index % FALLBACK_THUMBNAILS.length];

const MOCK_UPCOMING_LIST = [
  {
    concert_title: 'LE SSERAFIM 2024 WORLD TOUR',
    id: 1,
    session_name: '서울 올림픽공원 KSPO DOME',
    start_at: '2026-09-15 20:00 (KST)',
    thumbnail_url: '/images/Upcoming-1.png',
  },
  {
    concert_title: 'CRAZY 앨범 쇼케이스 라이브',
    id: 2,
    session_name: '서울 올림픽공원 KSPO DOME',
    start_at: '2026-09-08 20:00 (KST)',
    thumbnail_url: '/images/Upcoming-2.png',
  },
  {
    concert_title: '팬사인회 생중계',
    id: 3,
    session_name: '광주 한국문화회관',
    start_at: '2026-09-10 15:00 (KST)',
    thumbnail_url: '/images/Upcoming-3.png',
  },
];

export default function UpcomingStreamingSection({
  showMoreButton = true,
  title,
}: UpcomingStreamingSectionProps) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const { data, isError, isSuccess } = useStreamingListQuery('READY');

  // API 리스트
  const rawList = data?.items ?? [];
  // 리스트가 비어 있으면 더미 데이터로 대체
  const list = rawList.length === 0 ? MOCK_UPCOMING_LIST : rawList;

  // 스크린샷용: 카드가 항상 보이게 빈 메시지는 에러일 때만 사용
  const showEmptyMessage = isError && list.length === 0 && isSuccess;

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedConcertTitle, setSelectedConcertTitle] = useState<
    null | string
  >(null);

  const handleClickAlert = (concertTitle: string) => {
    if (!isLoggedIn) {
      navigate(ROUTES_PATHS.LOGIN);
      return;
    }
    setSelectedConcertTitle(concertTitle);
    setIsAlertOpen(true);
  };

  const handleCloseAlert = (isOpen: boolean) => {
    setIsAlertOpen(isOpen);
    if (!isOpen) setSelectedConcertTitle(null);
  };

  const handleClickMore = () => {
    if (!isLoggedIn) {
      navigate(ROUTES_PATHS.LOGIN);
      return;
    }
    navigate(ROUTES_PATHS.STREAMING_LIST);
  };

  return (
    <section className="w-full px-6 py-10 md:px-10">
      <div className="mx-auto max-w-293 space-y-6">
        <SectionHeader
          onMoreClick={handleClickMore}
          showMoreButton={showMoreButton}
          title={title}
        />

        {showEmptyMessage ? (
          <div className="py-10 text-center text-gray-400">
            예정된 콘서트가 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.slice(0, 3).map((concert, index) => (
              <ConcertCard
                dateLabel={concert.start_at}
                key={concert.id}
                locationLabel={concert.session_name}
                onClickAlert={() => handleClickAlert(concert.concert_title)}
                thumbnailUrl={
                  concert.thumbnail_url || getFallbackThumbnail(index)
                }
                timeLabel=""
                title={concert.concert_title}
              />
            ))}
          </div>
        )}
      </div>

      {isAlertOpen && (
        <Modal isOpen={isAlertOpen} onOpenChange={handleCloseAlert}>
          <ModalContent>
            {selectedConcertTitle
              ? `"${selectedConcertTitle}" 공연의 알림을 신청하시겠어요?`
              : '이 공연의 알림을 신청하시겠어요?'}

            <ModalFooter>
              <button
                className="rounded-md bg-gray-700 px-4 py-2 text-sm text-white"
                onClick={() => setIsAlertOpen(false)}
                type="button"
              >
                닫기
              </button>
              <button
                className="rounded-md bg-primary px-4 py-2 text-sm text-white"
                onClick={() => setIsAlertOpen(false)}
                type="button"
              >
                신청하기
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </section>
  );
}
