import type { LucideIcon } from 'lucide-react';

import { Button } from '@/components';

type CategoryChipProps = {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  selected?: boolean;
};

export default function CategoryChip({
  icon: Icon,
  label,
  onClick,
  selected = false,
}: CategoryChipProps) {
  return (
    <Button
      className={`group relative flex flex-col items-center justify-center gap-3 rounded-[14px] border-[3px] py-8 transition-all ${
        selected
          ? 'border-[#F3F4F6] bg-[#BCBCBC]'
          : 'border-[#4A5565] bg-[#1A1F2E]'
      }`}
      onClick={onClick}
      size="chip"
      type="button"
      variant="navy"
    >
      <div className="relative z-10 h-12 w-12 text-white group-hover:text-[#1A1F2E]">
        <Icon className="h-full w-full" strokeWidth={1.8} />
      </div>
      <span className="text-sm font-bold">{label}</span>
    </Button>
  );
}
