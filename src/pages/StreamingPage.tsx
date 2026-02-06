import { MessageSquareIcon, MessageSquareOffIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { Button } from '@/components';
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

const CHAT_OPEN_STORAGE_KEY = 'streaming:chat-open';

export default function StreamingPage() {
  const { id } = useParams<{ id: string }>();
  const streamingId = Number(id);

  const { playbackUrl, streamDetail } = useStreamSession(streamingId);
  const [isInfoOpen, setIsInfoOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(true);

  const isAuthenticated = Boolean(streamDetail);
  const isStreamLive = streamDetail?.status === 'LIVE' && playbackUrl != null;

  useEffect(() => {
    const stored = localStorage.getItem(CHAT_OPEN_STORAGE_KEY);
    if (stored != null) {
      setIsChatOpen(stored === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CHAT_OPEN_STORAGE_KEY, String(isChatOpen));
  }, [isChatOpen]);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#070913]">
      {/* Desktop */}
      <div
        className={cn(streamLayoutVariants({ layout: 'desktop' }))}
        style={{
          flex: 1,
          gridTemplateColumns: isChatOpen
            ? 'minmax(0,1fr) minmax(420px, 30%)'
            : 'minmax(0,1fr) 0px',
          minHeight: 'clamp(600px, 80vh, 900px)',
        }}
      >
        <div
          className={cn(
            'flex min-h-0 flex-col gap-4',
            !isChatOpen && 'mx-auto w-full max-w-main',
          )}
        >
          <div className="relative w-full shrink-0 overflow-hidden rounded-xl bg-[#000000]">
            {isStreamLive ? (
              <StreamPlayer playbackUrl={playbackUrl} />
            ) : (
              <div className="flex aspect-video items-center justify-center text-[#9CA3AF]">
                방송 준비 중
              </div>
            )}

            <div className="absolute top-3 right-3 z-10">
              <Button
                className="bg-black/40 text-white backdrop-blur hover:bg-black/60"
                onClick={() => setIsChatOpen(prev => !prev)}
                size="icon"
                variant="ghost"
              >
                {isChatOpen ? (
                  <MessageSquareOffIcon size={18} />
                ) : (
                  <MessageSquareIcon size={18} />
                )}
              </Button>
            </div>
          </div>

          {streamDetail && <StreamInfoSection streamDetail={streamDetail} />}
        </div>

        <div
          className={cn(
            chatWrapperVariants({ size: 'desktop' }),
            'flex flex-col overflow-hidden transition-all duration-300',
            'h-[clamp(600px,80vh,900px)]',
            !isChatOpen && 'pointer-events-none opacity-0',
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
        <div className="w-full overflow-hidden rounded-xl bg-[#000000]">
          {isStreamLive ? (
            <StreamPlayer playbackUrl={playbackUrl} />
          ) : (
            <div className="flex aspect-video items-center justify-center text-[#9CA3AF]">
              방송 준비 중
            </div>
          )}
        </div>

        {streamDetail && (
          <Button
            onClick={() => setIsInfoOpen(prev => !prev)}
            size="sm"
            variant="navy"
          >
            {isInfoOpen ? '방송 정보 접기' : '방송 정보 펼치기'}
          </Button>
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
