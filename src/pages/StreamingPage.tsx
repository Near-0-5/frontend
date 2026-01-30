import { MessageCircleMoreIcon } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router';

import { Button } from '@/components';
import { StreamPlayer } from '@/features/live/components';
import ChatPanel from '@/features/live/components/ChatPanel';
import LoginRequiredModal from '@/features/live/components/LoginRequiredModal';

export default function StreamingPage() {
  //임시 로그인 상태 (나중에 Auth 붙으면 여기만 교체)
  const MOCK_PLAYBACK_URL =
    'https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8';
  const { id } = useParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);

  const handleRequireLogin = () => setIsLoginModalOpen(true);
  const handleCloseModal = () => setIsLoginModalOpen(false);

  // 임시 로그인 처리 (실제 로그인 연동 전까지는 버튼 or 테스트용)
  const handleMockLogin = () => {
    setIsAuthenticated(true);
    setIsLoginModalOpen(false);
  };

  //추후에 수정 예정입니다
  console.log(id);

  return (
    <main className="mx-auto max-w-main px-6 py-4 text-white">
      <section className="flex items-stretch gap-4">
        <div className="flex flex-1 flex-col gap-4">
          <div className="relative">
            <StreamPlayer playbackUrl={MOCK_PLAYBACK_URL} />
            {!isChatOpen && (
              <Button
                className="absolute top-2 right-2"
                onClick={() => setIsChatOpen(true)}
                size="icon"
                variant="ghost"
              >
                <MessageCircleMoreIcon />
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-6 rounded-xl bg-[#10131C] p-6">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded bg-red-600 px-1.5 py-0.5 text-xs font-bold">
                  LIVE
                </span>
                <span className="text-xs text-gray-400">
                  2024년 1월 6일 시작됨
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight italic">
                LE SSERAFIM 'CRAZY' Comeback Showcase
              </h1>
              <p className="mt-1 text-sm text-gray-400">
                4th Mini Album 'CRAZY' 발매 기념 컴백 쇼케이스 생중계
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-b border-gray-700 py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-linear-to-tr from-pink-500 to-violet-500" />
                <span className="text-lg font-semibold">LE SSERAFIM</span>
              </div>
              <Button className="px-6" rounded="full" size="sm" variant="pink">
                팔로우
              </Button>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-bold">방송 정보</h3>
              <p className="text-sm leading-relaxed whitespace-pre-line text-gray-300">
                LE SSERAFIM의 네 번째 미니앨범 'CRAZY' 발매를 기념하여 컴백
                쇼케이스를 진행합니다. 타이틀곡 'CRAZY'를 비롯한 수록곡 무대와
                멤버들의 앨범 소개, 그리고 팬 여러분과의 소통 시간이 준비되어
                있습니다. 많은 관심과 응원 부탁드립니다! ♥
              </p>
              <div className="flex gap-2 text-xs text-blue-400">
                <span>#LESSERAFIM</span>
                <span>#CRAZY</span>
                <span>#컴백쇼케이스</span>
                <span>#LIVE</span>
              </div>
            </div>
          </div>
        </div>

        {isChatOpen && (
          <div className="w-sm shrink-0">
            <ChatPanel
              isAuthenticated={isAuthenticated}
              onClose={() => setIsChatOpen(false)}
              onRequireLogin={handleRequireLogin}
              roomId="123"
              streamingId={1}
            />
          </div>
        )}
      </section>

      <LoginRequiredModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleMockLogin}
      />
    </main>
  );
}
