import { SettingsIcon } from 'lucide-react';

import type { FavoriteGenre } from '@/features/my-page/types/genre';

import { Button, SectionHeader } from '@/components';

type FavoriteGenresSectionProps = {
  genres: FavoriteGenre[];
};

export default function FavoriteGenresSection({
  genres,
}: FavoriteGenresSectionProps) {
  return (
    <section className="w-full px-6 pb-12 md:px-10">
      <div className="mx-auto max-w-293 space-y-6">
        <SectionHeader title="선호 장르" />

        <div className="flex items-center justify-between rounded-2xl bg-[#0E1625] px-6 py-5">
          <div className="flex items-center gap-3">
            <SettingsIcon className="h-5 w-5 text-white" />
            <div>
              <p className="text-sm font-medium text-white">장르 수정</p>
              <p className="text-xs text-white/60">
                선호하는 카테고리를 다시 선택해 맞춤 콘텐츠를 받아보세요.
              </p>
            </div>
          </div>

          <Button size="sm" type="button" variant="pink">
            관심사 수정
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {genres.map(({ icon: Icon, id, name }) => (
            <div
              className="flex h-26 flex-col items-center justify-center gap-2 rounded-2xl bg-[#E5E7EB] text-black"
              key={id}
            >
              <Icon className="h-6 w-6" strokeWidth={1.8} />
              <span className="text-sm font-medium">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
