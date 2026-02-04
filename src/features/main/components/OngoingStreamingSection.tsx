import { useState } from 'react';
import { useNavigate } from 'react-router';

import { OngoingLiveCard, SectionHeader } from '@/components';
import Modal from '@/components/common/modal/Modal';
import ModalContent from '@/components/common/modal/ModalContent';
import ModalFooter from '@/components/common/modal/ModalFooter';
import { ROUTES_PATHS } from '@/constants';
import { useAuthStore } from '@/features/auth';
import { useStreamingListQuery } from '@/queries/streaming';

export type OngoingStreamingSectionProps = {
  showMoreButton?: boolean;
  title: string;
};

const FALLBACK_THUMBNAILS = [
  '/images/Ongoing-1.png',
  '/images/Ongoing-2.png',
  '/images/Ongoing-3.png',
  '/images/Ongoing-4.png',
];

const getFallbackThumbnail = (index: number) =>
  FALLBACK_THUMBNAILS[index % FALLBACK_THUMBNAILS.length];

const MOCK_ONGOING_LIST = [
  {
    durationLabel: '1:20:45',
    isLive: true,
    thumbnailUrl: '/images/Ongoing-1.png',
    title: 'LE SSERAFIM 컴백 쇼케이스 LIVE',
  },
  {
    durationLabel: '45:20',
    isLive: true,
    thumbnailUrl: '/images/Ongoing-2.png',
    title: '팬미팅 생중계',
  },
  {
    durationLabel: '12:13:15',
    isLive: true,
    thumbnailUrl: '/images/Ongoing-3.png',
    title: '멤버들과 함께하는 Q&A 시간',
  },
] as const;

// ONGOING 스트림 API 응답에서 실제로 쓰는 필드만 타입으로 정의
type OngoingApiItem = {
  concert_title: string;
  duration_label?: null | string;
  id: number;
  thumbnail_url?: null | string;
};

export default function OngoingStreamingSection({
  showMoreButton = true,
  title,
}: OngoingStreamingSectionProps) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const { data, isError, isSuccess } = useStreamingListQuery('ONGOING');

  // 실제 API 리스트
  const rawList = (data?.items ?? []) as OngoingApiItem[];

  // API가 실패했거나 리스트가 비어 있으면 더미 데이터로 대체
  const useMock = isError || !isSuccess || rawList.length === 0;

  const list = useMock
    ? MOCK_ONGOING_LIST
    : rawList.map((concert, index) => ({
        durationLabel: concert.duration_label ?? '',
        isLive: true,
        thumbnailUrl: concert.thumbnail_url || getFallbackThumbnail(index),
        title: concert.concert_title,
      }));

  // 디버깅 로그
  console.log('[OngoingStreamingSection] data =', data);
  console.log('[OngoingStreamingSection] rawList.length =', rawList.length);
  console.log('[OngoingStreamingSection] useMock =', useMock);
  console.log('[OngoingStreamingSection] isSuccess =', isSuccess);
  console.log('[OngoingStreamingSection] isError =', isError);

  const showEmptyMessage = !useMock && list.length === 0;

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedConcertTitle, setSelectedConcertTitle] = useState<
    null | string
  >(null);

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

  let content = null;

  if (showEmptyMessage) {
    content = (
      <div className="py-10 text-center text-gray-400">
        진행중인 라이브 콘서트가 없습니다.
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.slice(0, 3).map((concert, index) => (
          <OngoingLiveCard
            durationLabel={concert.durationLabel}
            isLive={concert.isLive}
            key={concert.title + index}
            thumbnailUrl={concert.thumbnailUrl}
            title={concert.title}
          />
        ))}
      </div>
    );
  }

  return (
    <section className="w-full px-6 py-10 md:px-10">
      <div className="mx-auto max-w-293 space-y-6">
        <SectionHeader
          onMoreClick={showMoreButton ? handleClickMore : undefined}
          showMoreButton={showMoreButton}
          title={title}
        />
        {content}
      </div>

      {isAlertOpen && (
        <Modal isOpen={isAlertOpen} onOpenChange={handleCloseAlert}>
          <ModalContent>
            {selectedConcertTitle
              ? `"${selectedConcertTitle}" 라이브의 알림을 신청하시겠어요?`
              : '이 라이브의 알림을 신청하시겠어요?'}

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
