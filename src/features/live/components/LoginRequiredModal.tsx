import { Modal, ModalContent, ModalTrigger } from '@/components';

type LoginRequiredModalProps = {
  children: React.ReactNode;
};

export default function LoginRequiredModal({
  children,
}: LoginRequiredModalProps) {
  return (
    <Modal>
      <ModalTrigger asChild>{children}</ModalTrigger>

      <ModalContent>
        <p className="text-sm text-gray-600">
          로그인 후 채팅을 이용할 수 있습니다.
        </p>
      </ModalContent>
    </Modal>
  );
}
