import { useIVSPlayer } from '@/features/live/hooks';

type StreamPlayerProps = {
  playbackUrl: string;
};

export default function StreamPlayer({ playbackUrl }: StreamPlayerProps) {
  const { containerRef } = useIVSPlayer({ playbackUrl });

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
      <div className="absolute inset-0 h-full w-full" ref={containerRef} />
    </div>
  );
}
