import { DialogTitle } from '@/components/ui/dialog';

type ModalTitleProps = {
  children: React.ReactNode;
};

export default function ModalTitle({ children }: ModalTitleProps) {
  return (
    <DialogTitle className="text-lg font-semibold">{children}</DialogTitle>
  );
}
