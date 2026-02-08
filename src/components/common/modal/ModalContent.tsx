import { DialogContent } from '@/components';
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
    <DialogContent
      className={cn(
        [
          'max-w-lg p-6',

          'rounded-xl',

          'bg-[#1A1F2E] text-white',
          'border border-[#2A2F3E]',

          'shadow-xl shadow-black/40',
        ],
        className,
      )}
    >
      {children}
    </DialogContent>
  );
}
