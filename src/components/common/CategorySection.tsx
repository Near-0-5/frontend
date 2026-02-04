import type { LucideIcon } from 'lucide-react';

import {
  Guitar as GuitarIcon,
  Mic as KpopIcon,
  ScanHeart as LocalConcertIcon,
  Sparkles as MusicalIcon,
  Mic2 as TrotIcon,
} from 'lucide-react';
import { useState } from 'react';

import { Button, SectionHeader } from '@/components';
import { CATEGORIES } from '@/constants/mockData';
import { useCategoriesQuery } from '@/queries/category';
import {
  useAddPreferredCategoryMutation,
  useDeletePreferredCategoryMutation,
} from '@/queries/preferredCategory';

export type CategorySectionProps = {
  title: string;
};

const categoryIconMap: Record<string, LucideIcon> = {
  band: GuitarIcon,
  kpop: KpopIcon,
  musical: MusicalIcon,
  overseas: LocalConcertIcon,
  trot: TrotIcon,
};

type UiCategory = {
  categoryId: string;
  id: string;
  label: string;
};

export default function CategorySection({ title }: CategorySectionProps) {
  const { data, isError } = useCategoriesQuery();
  const { mutate: addPreferred } = useAddPreferredCategoryMutation();
  const { mutate: deletePreferred } = useDeletePreferredCategoryMutation();

  const apiCategories: UiCategory[] =
    data?.categories.map(category => {
      const normalized = category.name.toLowerCase();

      const iconKey =
        normalized.includes('k-pop') || normalized.includes('kpop')
          ? 'kpop'
          : normalized.includes('band')
            ? 'band'
            : normalized.includes('musical')
              ? 'musical'
              : normalized.includes('trot')
                ? 'trot'
                : 'kpop';

      return {
        categoryId: category.id,
        id: iconKey,
        label: category.name,
      };
    }) ?? [];

  const useMock = isError || apiCategories.length === 0;

  const categories: UiCategory[] = useMock
    ? CATEGORIES.map(({ id, label }) => ({
        categoryId: id,
        id,
        label,
      }))
    : apiCategories;

  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    setSelected(prev => {
      const next = new Set(prev);

      if (next.has(categoryId)) {
        next.delete(categoryId);
        deletePreferred({ categoryId });
      } else {
        next.add(categoryId);
        addPreferred({ category_id: categoryId });
      }

      return next;
    });
  };

  return (
    <section className="w-full px-6 pb-10 md:px-10">
      <div className="mx-auto max-w-293 space-y-3">
        <SectionHeader title={title} />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map(({ categoryId, id, label }) => {
            const Icon = categoryIconMap[id] ?? KpopIcon;
            const isSelected = selected.has(categoryId);

            return (
              <Button
                className={`group relative flex w-full flex-col items-center justify-center gap-3 rounded-[14px] border-[3px] py-8 shadow-[0_12px_24px_rgba(0,0,0,0.45)] transition-all duration-150 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_18px_32px_rgba(0,0,0,0.6)] ${
                  isSelected
                    ? 'border-[#F3F4F6] bg-[#BCBCBC]'
                    : 'border-[#4A5565] bg-[#1A1F2E]'
                } `}
                key={categoryId}
                onClick={() => toggleCategory(categoryId)}
                size="chip"
                type="button"
                variant="navy"
              >
                <div className="pointer-events-none absolute inset-px rounded-[11px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_60%)] opacity-55 transition-opacity group-hover:opacity-0" />

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
