export type OngoingLiveCardProps = {
  durationLabel?: string;
  isLive?: boolean;
  thumbnailUrl: string;
  title: string;
};

export default function OngoingLiveCard({
  durationLabel,
  isLive = true,
  thumbnailUrl,
  title,
}: OngoingLiveCardProps) {
  return (
    <article className="group flex h-66.5 w-full flex-col overflow-hidden rounded-3xl border border-[#4A5565] bg-[#101828] transition-colors duration-200 hover:border-[#DC196D]">
      <div className="relative h-52.5 w-full overflow-hidden">
        <img
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={thumbnailUrl}
        />
        {isLive && (
          <div className="absolute top-4 left-4 rounded-full bg-[#E7000B] px-4 py-1 text-xs font-bold text-white">
            LIVE
          </div>
        )}
        {durationLabel ? (
          <div className="absolute right-4 bottom-4 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white">
            {durationLabel}
          </div>
        ) : (
          <div className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-black/80">
            <span className="h-2 w-3 rounded-full border border-white" />
          </div>
        )}
      </div>
      <div className="flex flex-1 items-center bg-[#101828] px-4 py-3">
        <h3 className="line-clamp-1 text-base font-bold text-white">{title}</h3>
      </div>
    </article>
  );
}
