import { MessageCircleMoreIcon } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router';

import { Button } from '@/components';
import {
  ChatPanel,
  LoginRequiredModal,
  StreamInfoSection,
  StreamPlayer,
} from '@/features/live/components';
import { useStreamSession } from '@/features/live/hooks/useStreamSession';

export default function StreamingPage() {
  const { id } = useParams<{ id: string }>();
  const sessionId = Number(id);

  const { playbackUrl, streamDetail } = useStreamSession(sessionId);

  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const STREAM_MESSAGE = {
    ENDED: '방송이 종료되었습니다.',
    NONE: '상단 버튼을 눌러 로그인을 진행해주세요.',
    READY: '방송 시작 전입니다.',
  } as const;

  const handleRequireLogin = () => setIsLoginModalOpen(true);
  const handleCloseModal = () => setIsLoginModalOpen(false);

  const getStreamMessage = () => {
    if (!streamDetail) return STREAM_MESSAGE.NONE;
    return STREAM_MESSAGE[streamDetail.status] ?? STREAM_MESSAGE.ENDED;
  };

  const isStreamLive = streamDetail?.status === 'LIVE' && playbackUrl;

  return (
    <main className="mx-auto max-w-main px-6 py-4 text-white">
      <section className="flex items-stretch gap-4">
        <div className="flex flex-1 flex-col gap-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
            {isStreamLive ? (
              <StreamPlayer playbackUrl={playbackUrl} />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gray-900 text-gray-400">
                <p>{getStreamMessage()}</p>
              </div>
            )}

            {!isChatOpen && (
              <Button
                className="absolute top-2 right-2 z-10"
                onClick={() => setIsChatOpen(true)}
                size="icon"
                variant="ghost"
              >
                <MessageCircleMoreIcon />
              </Button>
            )}
          </div>

          {streamDetail && <StreamInfoSection streamDetail={streamDetail} />}
        </div>

        {isChatOpen && (
          <div className="w-sm shrink-0">
            <ChatPanel
              isAuthenticated={!!streamDetail}
              onClose={() => setIsChatOpen(false)}
              onRequireLogin={handleRequireLogin}
              roomId={String(sessionId)}
              streamingId={sessionId}
            />
          </div>
        )}
      </section>

      <LoginRequiredModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseModal}
        onConfirm={() => setIsLoginModalOpen(false)}
      />
    </main>
  );
}
