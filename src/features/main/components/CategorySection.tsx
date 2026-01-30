import {
  Guitar as GuitarIcon,
  Mic as KpopIcon,
  ScanHeart as LocalConcertIcon,
  Sparkles as MusicalIcon,
  Mic2 as TrotIcon,
} from 'lucide-react';

import type { CategorySectionProps } from '@/types/domain';

import { Button, SectionHeader } from '@/components';
import { CATEGORIES } from '@/constants/mockData';

const categoryIconMap: Record<
  string,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  band: GuitarIcon,
  kpop: KpopIcon,
  musical: MusicalIcon,
  overseas: LocalConcertIcon,
  trot: TrotIcon,
};

export default function CategorySection({ title }: CategorySectionProps) {
  return (
    <section className="w-full px-6 pb-10 md:px-10">
      <div className="mx-auto max-w-293 space-y-3">
        <SectionHeader title={title} />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map(({ id, label }) => {
            const Icon = categoryIconMap[id] ?? KpopIcon;

            return (
              <Button
                className="group relative flex w-full flex-col items-center justify-center gap-3 rounded-[14px] border-[3px] border-[#4A5565] bg-[#1A1F2E] py-8 shadow-[0_12px_24px_rgba(0,0,0,0.45)] transition-all duration-150 hover:-translate-y-1 hover:scale-[1.02] hover:border-[#F3F4F6] hover:bg-[#BCBCBC] hover:shadow-[0_18px_32px_rgba(0,0,0,0.6)]"
                key={id}
                size="chip"
                type="button"
                variant="navy"
              >
                <div className="pointer-events-none absolute inset-px rounded-[1px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_60%)] opacity-55 transition-opacity group-hover:opacity-0" />
                1
                <div className="relative z-10 flex h-12 w-12 items-center justify-center text-white transition-colors group-hover:text-[#1A1F2E]">
                  <Icon className="h-full w-full" strokeWidth={1.8} />
                </div>
                <span className="relative z-10 text-sm font-bold tracking-wide text-white transition-colors group-hover:text-[#1A1F2E]">
                  {label}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
