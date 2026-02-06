import { useState } from 'react';

import type { StreamDetail } from '@/features/live/types/stream';

import { Button } from '@/components';

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
    <div className="flex min-h-0 flex-1 flex-col bg-[#070913]">
      <div className="aspect-video w-full shrink-0 bg-[#0B0D1A]">
        {isStreamLive ? (
          <StreamPlayer playbackUrl={playbackUrl} />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[#BCBCBC]">
            방송 준비 중
          </div>
        )}
      </div>

      {streamDetail && (
        <Button
          onClick={() => setIsInfoOpen(true)}
          rounded="sm"
          size="sm"
          variant="navy"
        >
          방송 정보 보기
        </Button>
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
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute bottom-0 w-full rounded-t-2xl bg-[#101828] p-4">
            <StreamInfoSection streamDetail={streamDetail} />

            <Button
              className="mt-4 w-full"
              onClick={() => setIsInfoOpen(false)}
              size="default"
              variant="navy"
            >
              닫기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
