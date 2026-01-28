import { Drama, Guitar, Mic, Music } from 'lucide-react';

type Props = {
  name: string;
};

export default function GenreIcon({ name }: Props) {
  const ICON_MAP = {
    DramaIcon: Drama,
    GuitarIcon: Guitar,
    MicIcon: Mic,
    MusicIcon: Music,
  } as const;

  const Icon = ICON_MAP[name as keyof typeof ICON_MAP];

  if (!Icon) {
    return null;
  }

  return <Icon className="h-4 w-4 text-white" />;
}
