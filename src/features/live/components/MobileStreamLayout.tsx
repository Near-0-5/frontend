import { useState } from 'react';

import type { StreamDetail } from '@/features/live/types/stream';

import ChatPanel from './ChatPanel';
import StreamInfoSection from './StreamInfoSection';
import StreamPlayer from './StreamPlayer';

type Props = {
  isAuthenticated: boolean;
  playbackUrl?: string;
  streamDetail: null | StreamDetail;
  streamingId: number;
};

export default function MobileStreamLayout({
  isAuthenticated,
  playbackUrl,
  streamDetail,
  streamingId,
}: Props) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const isStreamLive = streamDetail?.status === 'LIVE' && playbackUrl != null;

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#060913]">
      <div className="aspect-video w-full shrink-0 bg-[#000000]">
        {isStreamLive ? (
          <StreamPlayer playbackUrl={playbackUrl} />
        ) : (
          <div className="flex h-full items-center justify-center text-[#9CA3AF]">
            방송 준비 중
          </div>
        )}
      </div>

      {streamDetail && (
        <button
          className="bg-[#0B0F1E] py-2 text-sm text-[#D1D5DB]"
          onClick={() => setIsInfoOpen(true)}
          type="button"
        >
          방송 정보 보기
        </button>
      )}

      <div
        className="min-h-0 overflow-hidden"
        style={{ height: 'clamp(360px, 45vh, 560px)' }}
      >
        <ChatPanel
          isAuthenticated={isAuthenticated}
          streamingId={streamingId}
        />
      </div>

      {isInfoOpen && streamDetail && (
        <div className="fixed inset-0 bg-black/40">
          <div className="absolute bottom-0 w-full rounded-t-2xl bg-[#0B0F1E] p-4">
            <StreamInfoSection streamDetail={streamDetail} />
            <button
              className="mt-4 w-full rounded-md bg-[#1A1D2E] py-2 text-sm text-white"
              onClick={() => setIsInfoOpen(false)}
              type="button"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
