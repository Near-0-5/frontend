import { useNavigate } from 'react-router';

import type { StreamSession } from '@/features/main/types/streaming';

import { OngoingLiveCard, SectionHeader } from '@/components';
import { ROUTES_PATHS } from '@/constants';
import { useAuthStore } from '@/features/auth';
import { useStreamingListQuery } from '@/features/main/hooks/useStreamingQueries';

export type OngoingStreamingSectionProps = {
  showMoreButton?: boolean;
  title: string;
};

const MOCK_ONGOING_LIST = [
  {
    durationLabel: '1:20:45',
    id: 1001,
    isLive: true,
    thumbnailUrl: '/images/Ongoing-1.png',
    title: 'LE SSERAFIM 컴백 쇼케이스 LIVE',
  },
  {
    durationLabel: '45:20',
    id: 1002,
    isLive: true,
    thumbnailUrl: '/images/Ongoing-2.png',
    title: '팬미팅 생중계',
  },
  {
    durationLabel: '12:13:15',
    id: 1003,
    isLive: true,
    thumbnailUrl: '/images/Ongoing-3.png',
    title: '멤버들과 함께하는 Q&A 시간',
  },
] as const;

type OngoingViewItem = {
  durationLabel: string;
  id: number;
  isLive: boolean;
  thumbnailUrl: null | string;
  title: string;
};

export default function OngoingStreamingSection({
  showMoreButton = true,
  title,
}: OngoingStreamingSectionProps) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const { data, isError, isFetched } = useStreamingListQuery('LIVE');
  const rawList: StreamSession[] = data?.items ?? [];

  const liveItems: OngoingViewItem[] = rawList.map(concert => ({
    durationLabel: '',
    id: concert.id,
    isLive: concert.status === 'LIVE',
    thumbnailUrl: concert.thumbnailUrl,
    title: concert.concertTitle,
  }));

  const useMock = liveItems.length === 0 && (isError || isFetched);

  const list: OngoingViewItem[] = useMock ? [...MOCK_ONGOING_LIST] : liveItems;

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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((concert, index) => (
            <OngoingLiveCard
              durationLabel={concert.durationLabel}
              id={concert.id}
              isLive={concert.isLive}
              key={concert.title + index}
              thumbnailUrl={concert.thumbnailUrl}
              title={concert.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
