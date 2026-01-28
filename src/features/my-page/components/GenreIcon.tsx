import { Drama, Guitar, Mic, Music } from 'lucide-react';

const ICON_MAP = {
  DramaIcon: Drama,
  GuitarIcon: Guitar,
  MicIcon: Mic,
  MusicIcon: Music,
} as const;

type GenreIconName = keyof typeof ICON_MAP;

type GenreIconProps = {
  name: GenreIconName;
};

export default function GenreIcon({ name }: GenreIconProps) {
  const Icon = ICON_MAP[name];

  return <Icon className="h-4 w-4 text-white" />;
}
