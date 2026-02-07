import type { StreamDetail } from '@/features/live/types';

import { Button } from '@/components';
import { useArtistNavigation } from '@/hooks';

type StreamInfoSectionProps = {
  streamDetail: StreamDetail;
};

export default function StreamInfoSection({
  streamDetail,
}: StreamInfoSectionProps) {
  const { navigateToArtist } = useArtistNavigation();

  const streamStartDate = `${new Date(streamDetail.startAt).toLocaleString()} 시작됨`;

  const artistId = streamDetail.lineup[0]?.id;
  const profileImg = streamDetail.lineup[0]?.profileImgUrl;
  const artistName = streamDetail.lineup[0]?.name || 'Unknown';

  const tags = [
    streamDetail.category,
    streamDetail.lineup[0]?.agency || 'agency',
    streamDetail.lineup[0]?.type || 'GroupType',
    streamDetail.status,
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl bg-[#10131C] p-6">
        <div className="flex items-center gap-2">
          <span className="rounded bg-[#E7000B] px-2 py-0.5 text-xs font-bold text-white">
            {streamDetail.status}
          </span>
          <span className="text-xs text-[#C9C9C9]">{streamStartDate}</span>
        </div>

        <h1 className="py-2 text-xl font-bold tracking-tight text-white">
          {streamDetail.concertTitle}
        </h1>

        <p className="pb-4 text-sm text-white/80">{streamDetail.sessionName}</p>

        <hr className="border-[#4A5565]" />

        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Button
              className="flex items-center gap-3 px-0 transition-opacity hover:opacity-80"
              onClick={() => artistId && navigateToArtist(artistId)}
              type="button"
              variant="ghost"
            >
              {profileImg ? (
                <img
                  alt="Profile"
                  className="h-10 w-10 rounded-full object-cover"
                  src={profileImg}
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-linear-to-tr from-pink-500 to-violet-500" />
              )}
              <span className="text-sm font-semibold text-white">
                {artistName}
              </span>
            </Button>
          </div>

          <Button rounded="full" size="sm" variant="pink">
            팔로우
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border-2 border-[#4A5565] bg-[#10131C] p-6">
        <h3 className="text-lg font-bold text-white">방송 정보</h3>

        <p className="text-sm leading-relaxed whitespace-pre-line text-[#C7C9D9]">
          {streamDetail.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              className="rounded-full bg-[#C7C9D9] px-3 py-1.5 text-xs text-[#070913]"
              key={index}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
