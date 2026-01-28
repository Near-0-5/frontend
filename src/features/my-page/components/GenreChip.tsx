import { Guitar, Mic, Music, Theater } from 'lucide-react';

type GenreChipProps = {
  icon: 'guitar' | 'mic' | 'music' | 'theater';
  label: string;
};

export default function GenreChip({ icon, label }: GenreChipProps) {
  const ICON_MAP = {
    guitar: Guitar,
    mic: Mic,
    music: Music,
    theater: Theater,
  } as const;

  const Icon = ICON_MAP[icon];

  return (
    <div className="flex items-center gap-2 rounded-full bg-[#1A1F2E] px-4 py-2">
      <Icon className="h-4 w-4 text-white" />
      <span className="text-sm text-white">{label}</span>
    </div>
  );
}
