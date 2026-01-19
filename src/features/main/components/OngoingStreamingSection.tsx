import type { OngoingStreamingSectionProps } from '@/features/main/types';

import { Button } from '@/components';
import { DUMMY_ONGOING_LIVES } from '@/features/main/mocks/mainData';

import OngoingLiveCard from './OngoingLiveCard';

export default function OngoingStreamingSection({
  title,
}: OngoingStreamingSectionProps) {
  return (
    <section className="w-full px-6 py-10 md:px-10">
      <div className="mx-auto max-w-293 space-y-6">
        <header className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white md:text-xl">
            {title}
          </h2>
          <Button
            className="h-auto px-0 text-xs font-semibold text-[#C7C9D9] hover:text-white"
            size="sm"
            variant="ghost"
          >
            더보기
          </Button>
        </header>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DUMMY_ONGOING_LIVES.map(live => (
            <OngoingLiveCard key={live.title} {...live} />
          ))}
        </div>
      </div>
    </section>
  );
}
