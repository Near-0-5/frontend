// src/components/layout/SectionHeader.tsx
import { Button } from '@/components';
import { cn } from '@/utils';

type SectionHeaderProps = {
  onMoreClick?: () => void;
  showMoreButton?: boolean;
  title: string;
  titleClassName?: string;
};

export default function SectionHeader({
  onMoreClick,
  showMoreButton = true,
  title,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2
        className={cn(
          'text-lg font-semibold text-white md:text-xl',
          titleClassName,
        )}
      >
        {title}
      </h2>

      {showMoreButton && (
        <Button
          className="font-medium text-slate-400 transition-colors hover:bg-transparent hover:text-white"
          onClick={onMoreClick}
          size="sm"
          variant="ghost"
        >
          더보기
        </Button>
      )}
    </div>
  );
}
