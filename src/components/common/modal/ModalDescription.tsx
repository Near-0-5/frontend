import { DialogDescription } from '@/components';
import { cn } from '@/utils';

type ModalDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ModalDescription({
  children,
  className,
}: ModalDescriptionProps) {
  return (
    <DialogDescription className={cn('text-sm text-[#9CA3AF]', className)}>
      {children}
    </DialogDescription>
  );
}
