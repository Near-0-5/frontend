import { DialogContent } from '@/components/ui/dialog';
import { cn } from '@/utils';

type ModalContentProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ModalContent({
  children,
  className,
}: ModalContentProps) {
  return (
    <DialogContent className={cn('max-w-lg rounded-lg p-6', className)}>
      {children}
    </DialogContent>
  );
}
