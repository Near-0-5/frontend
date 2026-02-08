import { useState } from 'react';
import { useNavigate } from 'react-router';

import { ConcertCard, SectionHeader } from '@/components';
import Modal from '@/components/common/modal/Modal';
import ModalContent from '@/components/common/modal/ModalContent';
import ModalFooter from '@/components/common/modal/ModalFooter';
import { ROUTES_PATHS } from '@/constants';
import { useAuthStore } from '@/features/auth';
import { useStreamingListQuery } from '@/features/main/hooks/useStreamingQueries';

export type UpcomingStreamingSectionProps = {
  showMoreButton?: boolean;
  title: string;
};

export default function UpcomingStreamingSection({
  showMoreButton = true,
  title,
}: UpcomingStreamingSectionProps) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const { data, isError, isFetched } = useStreamingListQuery('READY');
  const list = data?.items ?? [];

  const showEmptyMessage = isError && isFetched && list.length === 0;

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
          onMoreClick={showMoreButton ? handleClickMore : undefined}
          showMoreButton={showMoreButton}
          title={title}
        />

        {showEmptyMessage ? (
          <div className="py-10 text-center text-gray-400">
            예정된 콘서트가 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map(concert => (
              <ConcertCard
                dateLabel={concert.startAt}
                id={concert.id}
                key={concert.id}
                locationLabel={concert.sessionName}
                onClickAlert={() => handleClickAlert(concert.concertTitle)}
                thumbnailUrl={concert.thumbnailUrl ?? null}
                timeLabel=""
                title={concert.concertTitle}
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
