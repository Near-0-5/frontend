import type { OngoingStreamingSectionProps } from '@/features/main/types';

import { SectionHeader } from '@/components';
import { DUMMY_ONGOING_LIVES } from '@/features/main/mocks/mainData';

import OngoingLiveCard from './OngoingLiveCard';

export default function OngoingStreamingSection({
  title,
}: OngoingStreamingSectionProps) {
  return (
    <section className="w-full px-6 py-10 md:px-10">
      <div className="mx-auto max-w-293 space-y-6">
        <SectionHeader title={title} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DUMMY_ONGOING_LIVES.map(live => (
            <OngoingLiveCard key={live.title} {...live} />
          ))}
        </div>
      </div>
    </section>
  );
}
