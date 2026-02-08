import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '@/components';
import Modal from '@/components/common/modal/Modal';
import ModalContent from '@/components/common/modal/ModalContent';
import ModalFooter from '@/components/common/modal/ModalFooter';
import { ROUTES_PATHS } from '@/constants';
import { useAuthStore } from '@/features/auth';

type HeroBannerProps = {
  concert?: {
    concertTitle: string;
    id: number;
    sessionName: string;
    startAt: string;
    thumbnailUrl: null | string;
  };
};

export default function HeroBanner({ concert }: HeroBannerProps) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  if (!concert) return null;

  const data = {
    backgroundImageUrl: concert.thumbnailUrl ?? '/images/hero-banner.png',
    primaryActionLabel: '알림 신청하기',
    statusLabel: 'Upcoming Concert',
    subtitle: concert.sessionName,
    title: concert.concertTitle,
  };

  const handleClickAlert = () => {
    if (!isLoggedIn) {
      navigate(ROUTES_PATHS.LOGIN);
      return;
    }
    setIsAlertOpen(true);
  };

  const handleCloseAlert = (isOpen: boolean) => {
    setIsAlertOpen(isOpen);
  };

  const handleSubmitAlert = () => {
    // TODO: 알림 신청 API 연동
    setIsAlertOpen(false);
  };

  return (
    <>
      <section className="relative h-[55vh] min-h-72 w-full overflow-hidden border-0 bg-background md:h-[60vh] md:min-h-80 lg:h-[70vh] lg:max-h-180">
        <div className="absolute inset-0">
          <img
            alt={data.title}
            className="h-full w-full object-cover object-center"
            src={data.backgroundImageUrl}
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#111322] via-[#111322]/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        <div className="relative flex h-full items-end px-6 pb-10 md:px-16 md:pb-16">
          <div className="max-w-xl space-y-5 text-left text-white">
            <span className="inline-flex items-center rounded-full bg-black/60 px-4 py-1.5 text-[10px] font-semibold tracking-wide uppercase md:text-xs">
              {data.statusLabel}
            </span>

            <div className="space-y-2 md:space-y-3">
              <h1 className="text-2xl leading-tight font-bold md:text-4xl lg:text-5xl">
                {data.title}
              </h1>
              <p className="text-xs text-white/80 md:text-sm">
                〈{data.subtitle}〉
              </p>
            </div>

            <div className="pt-1.5">
              <Button
                className="h-10 min-w-40 px-5 text-xs font-semibold md:h-12 md:min-w-45 md:px-6 md:text-sm"
                onClick={handleClickAlert}
                rounded="full"
                size="lg"
                variant="navy"
              >
                {data.primaryActionLabel}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {isAlertOpen && (
        <Modal isOpen={isAlertOpen} onOpenChange={handleCloseAlert}>
          <ModalContent>
            "{data.title}" 공연의 알림을 신청하시겠어요?
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
                onClick={handleSubmitAlert}
                type="button"
              >
                신청하기
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
