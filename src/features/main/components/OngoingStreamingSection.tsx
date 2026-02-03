import { useState } from 'react';
import { useNavigate } from 'react-router';

import { ConcertCard, SectionHeader } from '@/components';
import Modal from '@/components/common/modal/Modal';
import ModalContent from '@/components/common/modal/ModalContent';
import ModalFooter from '@/components/common/modal/ModalFooter';
import { ROUTES_PATHS } from '@/constants';
import { useAuthStore } from '@/features/auth';
import { useStreamingListQuery } from '@/queries/streaming';

export type OngoingStreamingSectionProps = {
  title: string;
};

const FALLBACK_THUMBNAILS = [
  '/images/Ongoing-1.png',
  '/images/Ongoing-2.png',
  '/images/Ongoing-3.png',
  '/images/Ongoing-4.png',
];

const getFallbackThumbnail = (index: number) => {
  const i = index % FALLBACK_THUMBNAILS.length;
  return FALLBACK_THUMBNAILS[i];
};

export default function OngoingStreamingSection({
  title,
}: OngoingStreamingSectionProps) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const { data, isError, isSuccess } = useStreamingListQuery('ONGOING');
  const list = data?.items ?? [];

  console.log('[OngoingStreamingSection] data =', data);
  console.log('[OngoingStreamingSection] list.length =', list.length);
  console.log('[OngoingStreamingSection] isSuccess =', isSuccess);
  console.log('[OngoingStreamingSection] isError =', isError);

  // 빈 리스트거나, 응답이 아예 실패했을 때도 문구 노출
  const showEmptyMessage =
    (isSuccess && list.length === 0) || (!isSuccess && !data);

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
        <SectionHeader onMoreClick={handleClickMore} title={title} />

        {showEmptyMessage ? (
          <div className="py-10 text-center text-gray-400">
            진행중인 라이브 콘서트가 없습니다.
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
