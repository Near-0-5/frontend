import { useState } from 'react';
import { useParams } from 'react-router';

import {
  ChatPanel,
  MobileStreamLayout,
  StreamInfoSection,
  StreamPlayer,
} from '@/features/live/components';
import { useStreamSession } from '@/features/live/hooks/useStreamSession';
import {
  chatWrapperVariants,
  streamLayoutVariants,
} from '@/features/live/styles/layoutVariants';
import { cn } from '@/utils';

export default function StreamingPage() {
  const { id } = useParams<{ id: string }>();
  const streamingId = Number(id);

  const { playbackUrl, streamDetail } = useStreamSession(streamingId);
  const [isInfoOpen, setIsInfoOpen] = useState(true);

  const isAuthenticated = Boolean(streamDetail);
  const isStreamLive = streamDetail?.status === 'LIVE' && playbackUrl != null;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Desktop */}
      <div
        className={cn(streamLayoutVariants({ layout: 'desktop' }))}
        style={{
          gridTemplateColumns: 'minmax(0,1fr) 360px',
          height: 'clamp(600px, 80vh, 900px)',
        }}
      >
        <div className="flex min-h-0 flex-col gap-4">
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-[#000000]">
            {isStreamLive ? (
              <StreamPlayer playbackUrl={playbackUrl} />
            ) : (
              <div className="flex h-full items-center justify-center text-[#9CA3AF]">
                방송 준비 중
              </div>
            )}
          </div>

          {streamDetail && <StreamInfoSection streamDetail={streamDetail} />}
        </div>

        <div
          className={cn(
            chatWrapperVariants({ size: 'desktop' }),
            'h-full flex-none overflow-hidden',
          )}
        >
          <ChatPanel
            isAuthenticated={isAuthenticated}
            streamingId={streamingId}
          />
        </div>
      </div>

      {/* Tablet */}
      <div className={cn(streamLayoutVariants({ layout: 'tablet' }))}>
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-[#000000]">
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
            className="rounded-md bg-[#0B0F1E] py-2 text-sm text-[#D1D5DB]"
            onClick={() => setIsInfoOpen(prev => !prev)}
            type="button"
          >
            {isInfoOpen ? '방송 정보 접기' : '방송 정보 펼치기'}
          </button>
        )}

        {isInfoOpen && streamDetail && (
          <StreamInfoSection streamDetail={streamDetail} />
        )}

        <div
          className={cn(
            chatWrapperVariants({ size: 'tablet' }),
            'h-[clamp(420px,60vh,680px)] overflow-hidden',
          )}
        >
          <ChatPanel
            isAuthenticated={isAuthenticated}
            streamingId={streamingId}
          />
        </div>
      </div>

      {/* Mobile */}
      <div className={cn(streamLayoutVariants({ layout: 'mobile' }))}>
        <MobileStreamLayout
          isAuthenticated={isAuthenticated}
          playbackUrl={playbackUrl}
          streamDetail={streamDetail}
          streamingId={streamingId}
        />
      </div>
    </div>
  );
}
