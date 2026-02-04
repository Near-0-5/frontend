import { AlertTriangleIcon, CalendarIcon, HeartIcon } from 'lucide-react';
import { useState } from 'react';

import { Button, Modal, ModalContent, ModalTrigger } from '@/components';

type WithdrawCardProps = {
  onWithdraw: () => void;
};

export default function WithdrawCard({ onWithdraw }: WithdrawCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    onWithdraw();
    setIsModalOpen(false);
  };

  return (
    <section className="pt-6">
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalTrigger asChild>
          <Button className="w-full" size="lg" variant="red">
            회원 탈퇴
          </Button>
        </ModalTrigger>

        <ModalContent className="border-0 bg-transparent p-0">
          <div className="w-full max-w-md rounded-lg bg-gray-900 p-6">
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangleIcon className="text-red-500" size={20} />
              <h2 className="text-xl font-bold text-white">회원 탈퇴</h2>
            </div>
            <div className="mb-6 rounded bg-red-900/30 p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-bold text-red-400">
                <AlertTriangleIcon size={16} />
                탈퇴하시면 모든 정보가 즉시 삭제됩니다.
              </p>
              <p className="text-xs text-gray-400">그래도 탈퇴 하시겠습니까?</p>
              <p className="text-xs text-gray-400">
                삭제된 데이터는 복구할 수 없으며, 동일한 계정으로 재가입 시에도
                이전 정보를 불러올 수 없습니다.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-sm font-bold text-white">
                탈퇴 시 삭제 되는 혜택
              </h3>
              <div className="mb-3 flex items-start gap-3 rounded bg-gray-800 p-3">
                <HeartIcon className="text-2xl" size={24} />
                <div>
                  <p className="font-bold text-white">팔로우 아티스트 정보</p>
                  <p className="text-xs text-gray-400">
                    저장된 모든 아티스트 팔로우 목록과 찜을 추천 스토리를 영상
                  </p>
                </div>
              </div>
              <div className="mb-3 flex items-start gap-3 rounded bg-gray-800 p-3">
                <CalendarIcon className="text-2xl" size={24} />
                <div>
                  <p className="font-bold text-white">라이브 공연 내역</p>
                  <p className="text-xs text-gray-400">
                    예정된 모든 공연 예약 정보 및 스트리밍 시청 기록
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded bg-yellow-900/30 p-3">
                <AlertTriangleIcon className="text-2xl" size={20} />
                <div>
                  <p className="font-bold text-yellow-400">
                    탈퇴 전 확인하세요.
                  </p>
                  <p className="text-xs text-gray-400">
                    예약된 공연이 있다면 자동으로 취소됩니다.
                  </p>
                  <p className="text-xs text-gray-400">
                    탈퇴 후 30일 이내 재가입이 제한됩니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1"
                onClick={() => setIsModalOpen(false)}
                variant="ghost"
              >
                취소하고 돌아가기
              </Button>
              <Button className="flex-1" onClick={handleConfirm} variant="red">
                탈퇴하기
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </section>
  );
}
