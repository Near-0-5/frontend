import type { InterestArtistSectionProps } from '@/features/main/types';

import { Button } from '@/components';
import { INTEREST_ARTISTS } from '@/features/main/mocks/mainData';

export default function InterestArtistSection({
  title,
}: InterestArtistSectionProps) {
  return (
    <section className="w-full px-6 py-10 md:px-10">
      <div className="mx-auto max-w-293 space-y-4">
        <header className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">{title}</h2>

          <Button
            className="h-auto px-0 text-xs font-semibold text-[#C7C9D9] hover:text-white"
            size="sm"
            type="button"
            variant="ghost"
          >
            더보기
          </Button>
        </header>

        <div className="flex flex-wrap items-center gap-3">
          {INTEREST_ARTISTS.map(({ id, name }) => (
            <Button
              className="shrink-0 rounded-full border border-[#E5E7EB] px-4 text-xs font-medium text-[#E5E7EB] hover:border-white hover:bg-white hover:text-black"
              key={id}
              size="sm"
              type="button"
              variant="navy"
            >
              {name}
            </Button>
          ))}

          <Button
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] bg-[#F3F4F6] text-xs font-semibold text-black"
            size="icon"
            type="button"
            variant="navy"
          >
            →
          </Button>
        </div>
      </div>
    </section>
  );
}
