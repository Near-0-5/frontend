import {
  ArtistSection,
  CategorySection,
  HeroBanner,
  InterestArtistSection,
  OngoingStreamingSection,
  UpcomingStreamingSection,
} from '@/features/main/components';
import { useStreamingListQuery } from '@/features/main/hooks/useStreamingQueries';

const HERO_CONCERT_ID = 6;

export default function MainPage() {
  const { data } = useStreamingListQuery('READY');
  const list = data?.items ?? [];

  const heroConcert =
    list.find(concert => concert.id === HERO_CONCERT_ID) ?? undefined;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1A1F2E]">
      <HeroBanner concert={heroConcert} />
      <UpcomingStreamingSection title="예정된 콘서트" />
      <OngoingStreamingSection title="진행중인 라이브 콘서트" />
      <InterestArtistSection title="관심 아티스트" />
      <CategorySection title="추천 카테고리" />
      <ArtistSection title="추천 아티스트" />
    </div>
  );
}
