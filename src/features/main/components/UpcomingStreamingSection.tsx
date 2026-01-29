import type { UpcomingStreamingSectionProps } from '@/features/main/types';

import { SectionHeader } from '@/components';
import { DUMMY_CONCERTS } from '@/features/main/mocks/mainData';

import ConcertCard from './ConcertCard';

export default function UpcomingStreamingSection({
  title,
}: UpcomingStreamingSectionProps) {
  return (
    <section className="w-full px-6 py-10 md:px-10">
      <div className="mx-auto max-w-293 space-y-6">
        <SectionHeader title={title} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DUMMY_CONCERTS.map(concert => (
            <ConcertCard key={concert.title} {...concert} />
          ))}
        </div>
      </div>
    </section>
  );
}
