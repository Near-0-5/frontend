import {
  ArtistSection,
  CategorySection,
  HeroBanner,
  InterestArtistSection,
  OngoingStreamingSection,
  UpcomingStreamingSection,
} from '@/features/main/components';

export default function MainPage() {
  return (
    <div className="min-h-screen bg-[#1A1F2E]">
      <HeroBanner />
      <UpcomingStreamingSection title="예정된 콘서트" />
      <OngoingStreamingSection title="진행중인 라이브 콘서트" />
      <InterestArtistSection title="관심 아티스트" />
      <CategorySection title="추천 카테고리" />
      <ArtistSection title="추천 아티스트" />
    </div>
  );
}
