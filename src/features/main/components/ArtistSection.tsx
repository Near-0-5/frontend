import type { ArtistSectionProps } from '@/features/main/types';

import { Button } from '@/components';
import { DUMMY_ARTISTS } from '@/features/main/mocks/mainData';

export default function ArtistSection({ title }: ArtistSectionProps) {
  return (
    <section className="w-full px-6 py-10 md:px-10">
      <div className="mx-auto max-w-293">
        <header className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <Button
            className="h-auto px-0 text-xs font-semibold text-[#C7C9D9] hover:text-white"
            size="sm"
            type="button"
            variant="ghost"
          >
            더보기
          </Button>
        </header>

        <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
          {DUMMY_ARTISTS.map(({ id, imageUrl, name }) => (
            <article
              className="flex w-34.5 shrink-0 flex-col items-center justify-center"
              key={id}
            >
              <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-transparent transition-colors hover:border-[#DC196D]">
                <img
                  alt={name}
                  className="h-full w-full object-cover"
                  src={imageUrl}
                />
              </div>

              <p className="mt-2 text-xs font-medium text-white">{name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
