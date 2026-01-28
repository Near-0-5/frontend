import { Guitar, Mic, Music, Theater } from 'lucide-react';

import type { FavoriteGenre } from '../types/genre';

export const favoriteGenresData: FavoriteGenre[] = [
  { icon: Guitar, id: 1, name: '밴드' },
  { icon: Mic, id: 2, name: '보컬' },
  { icon: Music, id: 3, name: '클래식' },
  { icon: Theater, id: 4, name: '뮤지컬' },
];
