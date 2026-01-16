import { Dialog } from '@/components/ui/dialog';

type ModalProps = {
  children: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

export default function Modal({ children, isOpen, onOpenChange }: ModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      {children}
    </Dialog>
  );
}
