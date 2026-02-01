import { MessageCircleMoreIcon } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router';

import type { StreamDetail } from '@/features/live/types/stream';

import { Button } from '@/components';
import {
  getStreamCredentials,
  getStreamDetail,
  loginTest,
  refreshStreamCredentials,
} from '@/features/live/api/live';
import { StreamPlayer } from '@/features/live/components';
import ChatPanel from '@/features/live/components/ChatPanel';
import LoginRequiredModal from '@/features/live/components/LoginRequiredModal';

export default function StreamingPage() {
  // const MOCK_PLAYBACK_URL =
  //   'https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8';
  const { id } = useParams<{ id: string }>();
  const sessionId = Number(id);

  const [streamDetail, setStreamDetail] = useState<null | StreamDetail>(null);
  const [playbackUrl, setPlaybackUrl] = useState<null | string>(null);

  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequireLogin = () => setIsLoginModalOpen(true);
  const handleCloseModal = () => setIsLoginModalOpen(false);

  const handleDevLogin = async () => {
    try {
      setIsLoading(true);

      const loginData = await loginTest(2);
      localStorage.setItem('accessToken', loginData.accessToken);

      const detail = await getStreamDetail(sessionId);
      setStreamDetail(detail);

      if (detail.status === 'LIVE') {
        const credentials = await getStreamCredentials(sessionId);
        setPlaybackUrl(credentials.playbackUrl);
      }
      //mock데이터 코드 + 로직입니다
      // const detail = await getStreamDetail(sessionId);
      // setStreamDetail(detail);

      // setStreamDetail({ ...detail, status: 'LIVE' });
      // setPlaybackUrl(MOCK_PLAYBACK_URL);
    } catch (error) {
      console.error('에러 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!sessionId) return;
    try {
      console.log('토큰 재발급 시도');

      const oldUrl = playbackUrl;

      const data = await refreshStreamCredentials(sessionId);

      setPlaybackUrl(data.playbackUrl);

      console.log('재발급 성공!');
      console.log('Old URL:', oldUrl);
      console.log('New URL:', data.playbackUrl);
    } catch (error) {
      console.error('재발급 실패:', error);
    }
  };

  return (
    <main className="mx-auto max-w-main px-6 py-4 text-white">
      {!streamDetail && (
        <Button disabled={isLoading} onClick={handleDevLogin}>
          {isLoading ? '로딩 중...' : '임시 로그인'}
        </Button>
      )}

      <Button onClick={handleRefresh}>토큰 재발급</Button>
      <section className="flex items-stretch gap-4">
        <div className="flex flex-1 flex-col gap-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
            {streamDetail?.status === 'LIVE' && playbackUrl ? (
              <StreamPlayer playbackUrl={playbackUrl} />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gray-900 text-gray-400">
                <p>
                  {!streamDetail
                    ? '상단 버튼을 눌러 로그인을 진행해주세요.'
                    : streamDetail.status === 'READY'
                      ? '방송 시작 전입니다.'
                      : '방송이 종료되었습니다.'}
                </p>
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

          {streamDetail && (
            <div className="flex flex-col gap-6 rounded-xl bg-[#10131C] p-6">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded bg-red-600 px-1.5 py-0.5 text-xs font-bold">
                    {streamDetail.status}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(streamDetail.startAt).toLocaleString()} 시작
                  </span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight italic">
                  {streamDetail.concertTitle}
                </h1>
                <p className="mt-1 text-sm text-gray-400">
                  {streamDetail.sessionName}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-b border-gray-700 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-linear-to-tr from-pink-500 to-violet-500" />
                  <span className="text-lg font-semibold">
                    {streamDetail.lineup[0]?.name || 'Unknown'}
                  </span>
                </div>
                <Button
                  className="px-6"
                  rounded="full"
                  size="sm"
                  variant="pink"
                >
                  팔로우
                </Button>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="font-bold">방송 정보</h3>
                <p className="text-sm leading-relaxed whitespace-pre-line text-gray-300">
                  {streamDetail.description}
                </p>
                <div className="flex gap-2 text-xs text-blue-400">
                  <span>#{streamDetail.category}</span>
                </div>
              </div>
            </div>
          )}
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
