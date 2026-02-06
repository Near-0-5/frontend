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
      <DialogContent className="rounded-2xl border border-[#282828] bg-[#1A1F2E] p-6">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-white">
            로그인이 필요합니다
          </DialogTitle>
          <DialogDescription className="mt-1 text-sm text-[#BCBCBC]">
            로그인 후 채팅에 참여할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex justify-end gap-2">
          <Button onClick={onClose} size="sm" variant="white">
            닫기
          </Button>

          {onConfirm && (
            <Button onClick={onConfirm} size="sm" variant="pink">
              로그인
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
