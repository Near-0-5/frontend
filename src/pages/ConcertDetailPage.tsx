import {
  CalendarIcon,
  CheckCircle2Icon,
  ClockIcon,
  MessageCircleIcon,
  PlayIcon,
  UserIcon,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

import { ConcertMockImage, ProfileMockIcon } from '@/assets';
import { Button } from '@/components';
import { useStreamSession } from '@/features/live/hooks';
import { useArtistNavigation } from '@/hooks';

export default function ConcertDetailPage() {
  const { id } = useParams<{ id: string }>();
  const sessionId = Number(id);
  const navigate = useNavigate();
  const { navigateToArtist } = useArtistNavigation();

  const { isError, isLoading, streamDetail } = useStreamSession(sessionId);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = ConcertMockImage;
  };

  const handleProfileImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = ProfileMockIcon;
  };

  // ✅ 안전 가드 (먼저 실행)
  if (isLoading || isError || !streamDetail) {
    return (
      <div className="p-8 text-white">
        {isLoading ? '로딩 중...' : '공연 정보를 불러올 수 없습니다.'}
      </div>
    );
  }

  // ✅ streamDetail 보장 이후 계산
  const isLive = streamDetail.status === 'LIVE';

  const buttonText =
    streamDetail.status === 'LIVE'
      ? '보러가기'
      : streamDetail.status === 'READY'
        ? '라이브 준비 상태입니다. 시간을 확인 해주세요!'
        : '종료된 라이브입니다.';

  const mainArtist =
    streamDetail.lineup?.find(a => a.isMain) || streamDetail.lineup?.[0];

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`,
      time: `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}`,
    };
  };

  const startTime = formatDateTime(streamDetail.startAt);
  const endTime = formatDateTime(streamDetail.endAt);

  const handleGoWatch = () => {
    navigate(`/live-stream/${sessionId}`);
  };

  const CONCERT_FEATURES = [
    { icon: CheckCircle2Icon, id: 1, text: 'HD 고화질 스트리밍' },
    { icon: MessageCircleIcon, id: 2, text: '실시간 채팅 참여' },
    { icon: UserIcon, id: 3, text: '이모지 소통 가능' },
  ];

  return (
    <main className="mx-auto min-h-screen w-full max-w-293 bg-[#1A1F2E] px-6 py-8 text-white">
      <div className="grid grid-cols-1 gap-10 xl:grid-cols-12">
        <div className="space-y-4 xl:col-span-8">
          <section className="w-full overflow-hidden rounded-2xl bg-[#10131C] shadow-2xl">
            <div className="relative aspect-video w-full">
              <img
                alt={streamDetail.concertTitle}
                className="h-full w-full rounded-2xl object-cover"
                onError={handleImgError}
                src={streamDetail.thumbnailUrl || ConcertMockImage}
              />
            </div>

            <div className="p-8">
              <div className="mb-8">
                <h1 className="text-2xl leading-tight font-bold">
                  {streamDetail.concertTitle}
                </h1>
                {streamDetail.sessionName && (
                  <p className="mt-2 text-lg font-medium text-[#94A3B8]">
                    {streamDetail.sessionName}
                  </p>
                )}
              </div>

              <Button
                className="flex items-center gap-0 space-x-5 px-0 text-left transition-opacity hover:opacity-80"
                onClick={() =>
                  mainArtist?.id && navigateToArtist(mainArtist.id)
                }
                variant="ghost"
              >
                <div className="h-12 w-12 overflow-hidden rounded-full border-none">
                  <img
                    alt={mainArtist?.name || 'Artist'}
                    className="h-full w-full object-cover"
                    onError={handleProfileImgError}
                    src={mainArtist?.profileImgUrl || ProfileMockIcon}
                  />
                </div>

                <div>
                  <p className="text-lg font-bold">
                    {mainArtist?.name || 'Unknown Artist'}
                  </p>
                  <p className="text-slate-400">{mainArtist?.agency}</p>
                </div>
              </Button>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-[#10131C] p-6">
              <div className="mb-2 flex items-center gap-3 text-slate-400">
                <CalendarIcon size={20} />
                <span className="text-sm font-medium">시작 예정 시간</span>
              </div>
              <p className="text-xl font-bold">{startTime.date}</p>
              <p className="font-bold text-pink-500">{startTime.time} 시작</p>
            </div>

            <div className="rounded-xl bg-[#10131C] p-6">
              <div className="mb-2 flex items-center gap-3 text-slate-400">
                <ClockIcon size={20} />
                <span className="text-sm font-medium">종료 예정 시간</span>
              </div>
              <p className="text-xl font-bold">{endTime.date}</p>
              <p className="font-bold text-slate-500">
                {endTime.time} 종료 예정
              </p>
            </div>
          </section>

          <section className="rounded-2xl bg-[#10131C] p-8 shadow-lg">
            <h3 className="mb-4 text-xl font-bold text-white">콘서트 설명</h3>
            <div className="leading-relaxed whitespace-pre-line text-[#CBD5E1]">
              {streamDetail.description}
            </div>
          </section>
        </div>

        <aside className="xl:col-span-4">
          <div className="sticky top-8 rounded-2xl bg-[#10131C] p-6 shadow-xl">
            <h3 className="mb-6 text-xl font-bold">
              {streamDetail.concertTitle}
            </h3>

            <ul className="mb-8 space-y-4">
              {CONCERT_FEATURES.map(({ icon: Icon, id, text }) => (
                <li className="flex items-center gap-3 text-slate-300" key={id}>
                  <Icon className="text-[#DC196D]" size={20} />
                  {text}
                </li>
              ))}
            </ul>

            <Button
              className="h-14 w-full py-4 text-lg font-bold shadow-lg shadow-pink-500/20"
              disabled={!isLive}
              onClick={handleGoWatch}
              variant="pink"
            >
              <PlayIcon />
              {buttonText}
            </Button>
          </div>
        </aside>
      </div>
    </main>
  );
}
