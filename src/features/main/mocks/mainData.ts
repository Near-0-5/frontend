import type {
  CategoryItem,
  ConcertCardProps,
  InterestArtistItem,
  OngoingLiveCardProps,
  Artist as RecommendedArtistItem,
} from '@/features/main/types';

// 추천 카테고리
export const CATEGORIES: CategoryItem[] = [
  { id: 'kpop', label: 'K-POP' },
  { id: 'band', label: '밴드' },
  { id: 'musical', label: '뮤지컬' },
  { id: 'overseas', label: '내한 공연' },
  { id: 'trot', label: '트로트' },
];

// 추천 아티스트
export const DUMMY_ARTISTS: RecommendedArtistItem[] = [
  { id: 1, imageUrl: '/images/artist-1.jpg', name: 'FIFTYFIFTY' },
  { id: 2, imageUrl: '/images/artist-2.jpg', name: 'ILLIT' },
  { id: 3, imageUrl: '/images/artist-3.jpg', name: 'PANG SO DAM' },
  { id: 4, imageUrl: '/images/artist-4.jpg', name: 'Heart2Hearts' },
];

// 관심 아티스트
export const INTEREST_ARTISTS: InterestArtistItem[] = [
  { id: 1, name: 'VANK' },
  { id: 2, name: 'Astro' },
  { id: 3, name: 'YOUNG POSSE' },
  { id: 4, name: 'HVNE' },
  { id: 5, name: 'ENHYPEN' },
  { id: 6, name: 'TNX' },
  { id: 7, name: 'ILLIT' },
  { id: 8, name: 'BTS' },
  { id: 9, name: 'RIIZE REPUBLIC' },
  { id: 10, name: 'StayC' },
  { id: 11, name: '한강가' },
];

// 진행 중 콘서트 라이브
export const DUMMY_ONGOING_LIVES: OngoingLiveCardProps[] = [
  {
    durationLabel: '1:20:45',
    isLive: true,
    thumbnailUrl: '/images/ongoing-live-1.jpg',
    title: 'LE SSERAFIM 컴백 쇼케이스 LIVE',
  },
  {
    durationLabel: '45:20',
    isLive: true,
    thumbnailUrl: '/images/ongoing-live-2.jpg',
    title: '팬미팅 생중계',
  },
  {
    durationLabel: '1:23:15',
    isLive: true,
    thumbnailUrl: '/images/ongoing-live-3.jpg',
    title: '멤버들과 함께하는 Q&A 시간',
  },
];

// 예정된 라이브
export const DUMMY_CONCERTS: ConcertCardProps[] = [
  {
    dateLabel: '2026.09.15',
    locationLabel: '올림픽공원 KSPO DOME',
    thumbnailUrl: '/images/dummy-concert-1.jpg',
    timeLabel: '오후 7:00 (KST)',
    title: 'LE SSERAFIM 2024 WORLD TOUR',
  },
  {
    dateLabel: '2026.09.08',
    locationLabel: '온라인 생중계',
    thumbnailUrl: '/images/dummy-concert-2.jpg',
    timeLabel: '오후 8:00 (KST)',
    title: 'CRAZY 앨범 쇼케이스 라이브',
  },
  {
    dateLabel: '2026.09.10',
    locationLabel: '강변 팬사인회장',
    thumbnailUrl: '/images/dummy-concert-3.jpg',
    timeLabel: '오후 3:00 (KST)',
    title: '팬사인회 생중계',
  },
];
