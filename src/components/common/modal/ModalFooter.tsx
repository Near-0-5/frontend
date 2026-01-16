import { cn } from '@/utils';

type ModalFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div className={cn('mt-6 flex justify-end gap-2', className)}>
      {children}
    </div>
  );
}
