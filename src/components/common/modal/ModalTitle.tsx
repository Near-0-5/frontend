import { DialogTitle } from '@/components';
import { cn } from '@/utils';

type ModalTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ModalTitle({ children, className }: ModalTitleProps) {
  return (
    <DialogTitle className={cn('text-lg font-semibold text-white', className)}>
      {children}
    </DialogTitle>
  );
}
