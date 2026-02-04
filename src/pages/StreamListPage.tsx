// src/pages/StreamListPage.tsx
import { useState } from 'react';

import { Tabs } from '@/components';
import HeroBanner from '@/features/main/components/HeroBanner';
import OngoingStreamingSection from '@/features/main/components/OngoingStreamingSection';
import UpcomingStreamingSection from '@/features/main/components/UpcomingStreamingSection';

type StreamingTabKey = 'all' | 'ongoing' | 'upcoming';

const STREAMING_TAB_OPTIONS: { key: StreamingTabKey; label: string }[] = [
  { key: 'all', label: '전체 (10)' },
  { key: 'ongoing', label: '진행중인 라이브 콘서트' },
  { key: 'upcoming', label: '예정된 콘서트' },
];

export default function StreamListPage() {
  const [tab, setTab] = useState<StreamingTabKey>('all');

  return (
    <div className="min-h-screen bg-[#1A1F2E] text-white">
      <HeroBanner />

      <main className="px-6 pt-6 pb-16 lg:px-20">
        <section className="mb-6">
          <Tabs<StreamingTabKey>
            className="stream-list__tabs"
            onChange={setTab}
            options={STREAMING_TAB_OPTIONS}
            value={tab}
          />
        </section>

        {(tab === 'all' || tab === 'upcoming') && (
          <UpcomingStreamingSection
            showMoreButton={false}
            title="예정된 콘서트"
          />
        )}

        {(tab === 'all' || tab === 'ongoing') && (
          <OngoingStreamingSection
            showMoreButton={false}
            title="진행중인 라이브 콘서트"
          />
        )}
      </main>
    </div>
  );
}
