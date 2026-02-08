import { AxiosError } from 'axios';
import { useState } from 'react';

import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '@/components';
import { useUpdateMyProfileMutation } from '@/features/my-page/hooks/useUpdateMyProfileMutation';

type ProfileEditDialogProps = {
  bio?: string;
  nickname: string;
};

export default function ProfileEditDialog({
  bio,
  nickname,
}: ProfileEditDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDuplicateOpen, setIsDuplicateOpen] = useState(false);

  const [nextNickname, setNextNickname] = useState(nickname);
  const [nextBio, setNextBio] = useState(bio ?? '');

  const { isPending, mutate } = useUpdateMyProfileMutation();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setNextNickname(nickname);
      setNextBio(bio ?? '');
    }
  };

  const handleSave = () => {
    mutate(
      { bio: nextBio, nickname: nextNickname },
      {
        onError: error => {
          if (error instanceof AxiosError && error.response?.status === 409) {
            setIsDuplicateOpen(true);
          }
        },
        onSuccess: () => setIsOpen(false),
      },
    );
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
        <ModalTrigger asChild>
          <Button size="sm" variant="ghost">
            프로필 편집
          </Button>
        </ModalTrigger>

        <ModalContent className="rounded-2xl border border-[#4A5565] bg-[#1A1F2E]">
          <div className="w-full max-w-md rounded-2xl bg-[#0B0F1A] p-6 text-white shadow-xl">
            <ModalHeader>
              <ModalTitle className="text-xl text-white">
                프로필 편집
              </ModalTitle>
            </ModalHeader>

            <div className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-white/70">닉네임</span>
                <Input
                  disabled={isPending}
                  onChange={e => setNextNickname(e.target.value)}
                  value={nextNickname}
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm text-white/70">자기소개</span>
                <textarea
                  className="min-h-24 resize-none rounded-xl bg-[#080A0E] p-3 text-sm text-white outline-none focus:ring-2 focus:ring-primary/40"
                  disabled={isPending}
                  onChange={e => setNextBio(e.target.value)}
                  value={nextBio}
                />
              </div>
            </div>

            <ModalFooter className="mt-6 flex gap-3">
              <Button
                className="flex-1"
                disabled={isPending}
                onClick={() => setIsOpen(false)}
                variant="ghost"
              >
                취소
              </Button>
              <Button
                className="flex-1"
                disabled={isPending}
                onClick={handleSave}
              >
                저장
              </Button>
            </ModalFooter>
          </div>
        </ModalContent>
      </Modal>

      <Modal isOpen={isDuplicateOpen} onOpenChange={setIsDuplicateOpen}>
        <ModalContent className="rounded-2xl border border-[#4A5565] bg-[#1A1F2E]">
          <ModalHeader>
            <ModalTitle className="text-white">닉네임 중복</ModalTitle>
          </ModalHeader>

          <p className="mt-2 text-sm text-white/70">
            이미 사용 중인 닉네임입니다.
          </p>

          <ModalFooter className="mt-6">
            <Button onClick={() => setIsDuplicateOpen(false)}>확인</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
