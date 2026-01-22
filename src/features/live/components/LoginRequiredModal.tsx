import { Button } from '@/components';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components';

type LoginRequiredModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
};

export default function LoginRequiredModal({
  isOpen,
  onClose,
  onConfirm,
}: LoginRequiredModalProps) {
  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>로그인이 필요합니다</DialogTitle>
          <DialogDescription>
            로그인 후 채팅에 참여할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={onClose} size="sm" variant="white">
            닫기
          </Button>

          {onConfirm && (
            <Button onClick={onConfirm} size="sm">
              로그인
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
