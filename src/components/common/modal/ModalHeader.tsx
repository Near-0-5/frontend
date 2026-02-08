import { cn } from '@/utils';

type ModalHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ModalHeader({ children, className }: ModalHeaderProps) {
  return (
    <div className={cn(['mb-4 space-y-1', 'text-white'], className)}>
      {children}
    </div>
  );
}
