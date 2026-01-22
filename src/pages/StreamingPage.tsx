import { useState } from 'react';

import {
  StreamHeader,
  StreamPlayerPlaceholder,
} from '@/features/live/components';
import ChatPanel from '@/features/live/components/ChatPanel';
import LoginRequiredModal from '@/features/live/components/LoginRequiredModal';

export default function StreamingPage() {
  //임시 로그인 상태 (나중에 Auth 붙으면 여기만 교체)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleRequireLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  // 임시 로그인 처리 (실제 로그인 연동 전까지는 버튼 or 테스트용)
  const handleMockLogin = () => {
    setIsAuthenticated(true);
    setIsLoginModalOpen(false);
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-4">
      <StreamHeader />

      <section className="mt-4 grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <StreamPlayerPlaceholder />
        </div>

        <div className="col-span-4">
          <ChatPanel
            isAuthenticated={isAuthenticated}
            onRequireLogin={handleRequireLogin}
            roomId="123"
            streamingId={1}
          />
        </div>
      </section>

      <LoginRequiredModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleMockLogin} // 임시 로그인 액션
      />
    </main>
  );
}
