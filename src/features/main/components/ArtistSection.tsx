import { SectionHeader } from '@/components';
import { DUMMY_ARTISTS } from '@/constants/mockData';

export type ArtistSectionProps = {
  title: string;
};

export default function ArtistSection({ title }: ArtistSectionProps) {
  return (
    <section className="w-full px-6 py-10 md:px-10">
      <div className="mx-auto max-w-293">
        <SectionHeader title={title} />

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
