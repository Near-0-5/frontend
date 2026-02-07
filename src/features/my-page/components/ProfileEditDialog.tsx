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
      { onSuccess: () => setIsOpen(false) },
    );
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
      <ModalTrigger asChild>
        <Button size="sm" variant="ghost">
          프로필 편집
        </Button>
      </ModalTrigger>

      <ModalContent className="border-0 bg-transparent p-0">
        <div className="w-full max-w-md rounded-2xl bg-[#0B0F1A] p-6 text-white shadow-xl">
          <ModalHeader>
            <div className="text-xl text-white">
              <ModalTitle>회원 탈퇴</ModalTitle>
            </div>
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
  );
}
