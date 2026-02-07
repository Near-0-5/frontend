import { AlertTriangleIcon, CalendarIcon, HeartIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Button, Modal, ModalContent, ModalTrigger } from '@/components';
import { ROUTES_PATHS } from '@/constants';
import { useAuthStore } from '@/features/auth';
import { deleteUserAccount } from '@/features/auth/api/authApi';

type WithdrawReason = '기타' | '사용 빈도 낮음' | '서비스 오류' | '콘텐츠 불만';

export default function WithdrawCard() {
  const navigate = useNavigate();
  const clearAccessToken = useAuthStore(state => state.clearAccessToken);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState<WithdrawReason>('사용 빈도 낮음');

  const handleConfirm = async () => {
    await deleteUserAccount(reason);
    clearAccessToken();
    navigate(ROUTES_PATHS.LOGIN);
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
              <p className="text-xs text-gray-400">
                삭제된 데이터는 복구할 수 없습니다.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-sm font-bold text-white">탈퇴 사유</h3>

              <div className="flex flex-col gap-2">
                {(
                  [
                    '사용 빈도 낮음',
                    '콘텐츠 불만',
                    '서비스 오류',
                    '기타',
                  ] as WithdrawReason[]
                ).map(item => (
                  <button
                    className={`rounded px-3 py-2 text-left text-sm ${
                      reason === item
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-300'
                    }`}
                    key={item}
                    onClick={() => setReason(item)}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-sm font-bold text-white">
                탈퇴 시 삭제되는 정보
              </h3>

              <div className="mb-3 flex items-start gap-3 rounded bg-gray-800 p-3">
                <HeartIcon size={24} />
                <div>
                  <p className="font-bold text-white">팔로우 아티스트 정보</p>
                  <p className="text-xs text-gray-400">
                    모든 아티스트 팔로우 데이터
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded bg-gray-800 p-3">
                <CalendarIcon size={24} />
                <div>
                  <p className="font-bold text-white">라이브 공연 내역</p>
                  <p className="text-xs text-gray-400">예약 및 시청 기록</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1"
                onClick={() => setIsModalOpen(false)}
                variant="ghost"
              >
                취소
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
