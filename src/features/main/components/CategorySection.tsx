import type { CategorySectionProps } from '@/features/main/types';

import { Button, SectionHeader } from '@/components';
import { CATEGORIES } from '@/features/main/mocks/mainData';

export default function CategorySection({ title }: CategorySectionProps) {
  return (
    <section className="w-full px-6 pb-10 md:px-10">
      <div className="mx-auto max-w-293 space-y-3">
        <SectionHeader title={title} />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map(({ id, label }) => (
            <Button
              className="group w-full rounded-2xl border-2 border-[#4A5565] hover:border-[#F3F4F6] hover:bg-[#D4D4D4]"
              key={id}
              size="chip"
              type="button"
              variant="navy"
            >
              <div className="flex h-10 w-10 items-center justify-center">
                <span className="text-3xl">🎤</span>
              </div>
              <span className="text-sm font-semibold text-white group-hover:text-black">
                {label}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
