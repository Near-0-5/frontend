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

  const handleSave = () => {
    mutate(
      { bio: nextBio, nickname: nextNickname },
      { onSuccess: () => setIsOpen(false) },
    );
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <ModalTrigger asChild>
        <Button size="sm">프로필 편집</Button>
      </ModalTrigger>

      <ModalContent>
        <ModalHeader>
          <ModalTitle>프로필 편집</ModalTitle>
        </ModalHeader>

        <div className="flex flex-col gap-4">
          <Input
            disabled={isPending}
            onChange={e => setNextNickname(e.target.value)}
            value={nextNickname}
          />
          <Input
            disabled={isPending}
            onChange={e => setNextBio(e.target.value)}
            value={nextBio}
          />
        </div>

        <ModalFooter>
          <Button onClick={() => setIsOpen(false)} variant="ghost">
            취소
          </Button>
          <Button disabled={isPending} onClick={handleSave}>
            저장
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
