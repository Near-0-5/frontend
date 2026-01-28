import { useState } from 'react';

import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '@/components';

type ProfileEditDialogProps = {
  description?: string;
  onSave?: (next: { description?: string; userName: string }) => void;
  userName: string;
};

export default function ProfileEditDialog({
  description,
  onSave,
  userName,
}: ProfileEditDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [nextUserName, setNextUserName] = useState(userName);
  const [nextDescription, setNextDescription] = useState(description ?? '');

  /**
   * TODO:
   * - 프로필 수정 API 연동 시 사용
   * - 저장 중 로딩 상태
   */
  // const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * TODO:
   * - 닉네임 중복 시 서버 에러 메시지 처리
   * - 예: "이미 사용 중인 닉네임입니다."
   */
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function resetForm() {
    setNextUserName(userName);
    setNextDescription(description ?? '');
    // setErrorMessage(null);
  }

  function handleOpenChange(open: boolean) {
    setIsOpen(open);

    if (open) {
      resetForm();
    }
  }

  function handleSave() {
    /**
     * TODO:
     * - 닉네임 중복 검사 포함한 API 호출
     * - 실패 시 errorMessage 세팅
     * - 성공 시 onSave 호출
     */
    onSave?.({
      description: nextDescription,
      userName: nextUserName,
    });

    setIsOpen(false);
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
      <ModalTrigger asChild>
        <Button size="sm">프로필 편집</Button>
      </ModalTrigger>

      <ModalContent className="bg-[#101828] text-white">
        <ModalHeader>
          <ModalTitle>프로필 편집</ModalTitle>
        </ModalHeader>

        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-white/70">닉네임</span>
            <input
              className="h-10 bg-[#080A0E] px-3 text-sm text-white outline-none"
              onChange={e => setNextUserName(e.target.value)}
              value={nextUserName}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-white/70">자기소개</span>
            <textarea
              className="min-h-24 resize-none bg-[#080A0E] p-3 text-sm text-white outline-none"
              onChange={e => setNextDescription(e.target.value)}
              value={nextDescription}
            />
          </label>

          {/* TODO:
              - 닉네임 중복 등 서버 에러 메시지 노출
          */}
          {/* {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )} */}
        </div>

        <ModalFooter>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            // disabled={isSubmitting}
          >
            취소
          </Button>
          <Button
            onClick={handleSave}
            // disabled={isSubmitting}
          >
            저장
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
