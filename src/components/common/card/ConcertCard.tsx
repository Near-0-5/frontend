import { Button } from '@/components';

export type ConcertCardProps = {
  dateLabel: string;
  locationLabel: string;
  onClickAlert?: () => void;
  thumbnailUrl?: null | string;
  timeLabel: string;
  title: string;
};

export default function ConcertCard({
  dateLabel,
  locationLabel,
  onClickAlert,
  thumbnailUrl,
  timeLabel,
  title,
}: ConcertCardProps) {
  console.log('ConcertCard : ', title);

  const hasThumbnail =
    typeof thumbnailUrl === 'string' && thumbnailUrl.length > 0;

  return (
    <article className="group flex h-90.75 flex-col overflow-hidden rounded-3xl border border-[#4A5565] bg-[#101828] transition-colors duration-200 hover:border-[#DC196D]">
      <div className="relative flex h-52.5 w-full items-center justify-center overflow-hidden bg-[#111827]">
        {hasThumbnail ? (
          <img
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            src={thumbnailUrl as string}
          />
        ) : (
          <span className="text-sm font-semibold text-gray-400">NO IMAGE</span>
        )}

        <div className="absolute top-4 left-4 rounded-full bg-[#E11DFF] px-5 py-1.5 text-xs leading-none font-semibold text-white">
          {dateLabel}
        </div>
        <div className="absolute top-4 right-4 rounded-full bg-black/70 px-4 py-1 text-xs font-semibold text-white">
          공개 예정
        </div>
        <div className="absolute right-4 bottom-3 left-4 flex items-center justify-between text-xs text-white">
          <p>{timeLabel}</p>
          <p className="truncate text-right">{locationLabel}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between px-4 py-3">
        <h3 className="line-clamp-2 text-lg leading-tight font-bold text-white">
          {title}
        </h3>
        <Button
          className="mt-1 w-full justify-center gap-1 text-sm font-semibold"
          onClick={onClickAlert}
          rounded="full"
          size="lg"
          variant="lightGrey"
        >
          알림 받기
        </Button>
      </div>
    </article>
  );
}
