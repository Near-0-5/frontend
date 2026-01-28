import type { FavoriteGenre } from '@/features/my-page/types/genre';

import { Button } from '@/components';

type FavoriteGenresSectionProps = {
  genres: FavoriteGenre[];
};

export default function FavoriteGenresSection({
  genres,
}: FavoriteGenresSectionProps) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-white">선호 장르</h2>

      {/* TODO:
          - 장르 수정 버튼 클릭 시 관심사 설정 모달 연결
          - 기존 선택된 장르 상태 전달
      */}
      <div className="mb-6 flex items-center justify-between rounded-2xl bg-[#0E1625] p-6">
        <div className="flex items-center gap-3">
          <span className="text-xl">⚙️</span>
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
            className="flex flex-col items-center justify-center gap-2 rounded-xl bg-[#E5E7EB] p-6 text-black"
            key={id}
          >
            <Icon className="h-6 w-6" />
            <span className="text-sm font-medium">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
