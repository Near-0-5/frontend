import { useIVSPlayer } from '@/features/live/hooks';

type StreamPlayerProps = {
  playbackUrl: string;
};

export default function StreamPlayer({ playbackUrl }: StreamPlayerProps) {
  const { containerRef } = useIVSPlayer({ playbackUrl });

  return (
    <div className="w-full overflow-hidden rounded-xl shadow-lg">
      <div className="w-full" ref={containerRef} />
    </div>
  );
}
