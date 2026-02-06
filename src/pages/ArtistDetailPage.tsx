import { MoreVertical, Share2Icon, UserIcon } from 'lucide-react';
import { useParams } from 'react-router';

import { Button, ConcertCard, OngoingLiveCard } from '@/components';
import { useArtistConcertsQuery } from '@/features/live/hooks';
import { useArtistDetailQuery } from '@/hooks/useArtistDetailQuery';

export default function ArtistDetailPage() {
  const { id } = useParams<{ id: string }>();
  const artistId = Number(id);

  const {
    data: artist,
    isError,
    isLoading: isArtistLoading,
  } = useArtistDetailQuery(artistId);

  const { data: concertData, isLoading: isConcertLoading } =
    useArtistConcertsQuery(artist?.name);

  const ongoingList = concertData?.ongoing || [];
  const upcomingList = concertData?.upcoming || [];

  if (isArtistLoading || isError || !artist) {
    return (
      <div className="text-wthite p-8">
        {isArtistLoading ? '로딩 중...' : '아티스트 정보를 불러올 수 없습니다.'}
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-main px-6 pb-6 text-white">
      <section className="relative mb-8 overflow-hidden bg-[#0B0E15]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: artist.profileImage
              ? `url('${artist.profileImage}')`
              : "url('https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=1600')",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#0B0E15] via-[#0B0E15]/80 to-transparent" />

        <div className="relative flex flex-col gap-6 p-8 md:flex-row md:items-center">
          <img
            alt={artist.name}
            className="h-36 w-36 rounded-2xl object-cover shadow-xl md:h-44 md:w-44"
            src={artist.profileImage || 'https://via.placeholder.com/150'}
          />

          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              {artist.name}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
              <span className="flex items-center gap-1">
                <UserIcon className="mr-0.5" size={16} />
                {(artist.followerCount || 0).toLocaleString()} 팔로워
              </span>
              <span className="mx-1.5">{artist.memberCount}인조</span>
              <span>{artist.agency}</span>
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-full bg-pink-600 px-6 py-2.5 text-sm font-bold transition-colors hover:bg-pink-700">
                팔로우
              </button>
              <Button className="h-10 w-10 rounded-full border-none bg-white/50 hover:bg-white/40">
                <Share2Icon className="text-white" size={20} />
              </Button>
              <Button className="h-10 w-10 rounded-full border-none bg-white/50 hover:bg-white/40">
                <MoreVertical className="text-white" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <h2 className="mb-4 text-lg font-bold">Introduction.</h2>
      <section className="mb-8 rounded-xl border-3 border-[#2A2F3A] bg-[#10131C] p-6">
        <p className="mb-6 text-sm leading-relaxed text-[#C7C9D9]">
          {artist.description}
        </p>

        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
          <Info label="데뷔일" value={artist.debutDate} />
          <Info label="소속사" value={artist.agency} />
          <Info label="멤버 수" value={`${artist.memberCount}명`} />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-lg font-bold">예정된 공연 & 라이브</h2>
        {isConcertLoading ? (
          <div className="py-10 text-center text-gray-500">목록 로딩 중...</div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {upcomingList.length > 0 ? (
              upcomingList.map(concert => (
                <ConcertCard
                  dateLabel={new Date(
                    concert.startAt || concert.startAt,
                  ).toLocaleDateString()}
                  id={concert.id}
                  key={concert.id}
                  locationLabel="Online"
                  onClickAlert={() => alert('알림 신청 완료')}
                  thumbnailUrl={concert.thumbnailUrl || concert.thumbnailUrl}
                  timeLabel={new Date(
                    concert.startAt || concert.startAt,
                  ).toLocaleTimeString()}
                  title={concert.concertTitle}
                />
              ))
            ) : (
              <div className="col-span-3 py-10 text-center text-gray-500">
                예정된 공연이 없습니다.
              </div>
            )}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold">진행중인 콘서트 라이브</h2>
        {isConcertLoading ? (
          <div className="py-10 text-center text-gray-500">목록 로딩 중...</div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {ongoingList.length > 0 ? (
              ongoingList.map(live => (
                <OngoingLiveCard
                  id={live.id}
                  isLive={true}
                  key={live.id}
                  thumbnailUrl={live.thumbnailUrl || live.thumbnailUrl}
                  title={live.concertTitle || live.concertTitle}
                />
              ))
            ) : (
              <div className="col-span-3 py-10 text-center text-gray-500">
                현재 진행 중인 라이브가 없습니다.
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-4">
      <div className="text-xs text-gray-400">{label}</div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  );
}
