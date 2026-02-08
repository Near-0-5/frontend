import {
  HeartIcon,
  HomeIcon,
  Mic2Icon,
  RadioIcon,
  UserIcon,
} from 'lucide-react';
import { Link, useLocation } from 'react-router';

import { ROUTES_PATHS } from '@/constants';
import { cn } from '@/utils/cn';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    {
      icon: HomeIcon,
      isActive: location.pathname === ROUTES_PATHS.MAIN,
      label: '홈',
      path: ROUTES_PATHS.MAIN,
    },
    {
      icon: UserIcon,
      isActive:
        location.pathname === ROUTES_PATHS.MYPAGE &&
        location.search === '?tab=account',
      label: 'My Page',
      path: `${ROUTES_PATHS.MYPAGE}?tab=account`,
    },
    {
      icon: Mic2Icon,
      isActive: location.pathname === ROUTES_PATHS.ARTIST_LIST,
      label: 'Artist',
      path: ROUTES_PATHS.ARTIST_LIST,
    },
    {
      icon: RadioIcon,
      isActive: location.pathname === ROUTES_PATHS.STREAMING_LIST,
      label: 'Streaming',
      path: ROUTES_PATHS.STREAMING_LIST,
    },
    {
      icon: HeartIcon,
      isActive:
        location.pathname === ROUTES_PATHS.MYPAGE &&
        location.search === '?tab=interest',
      label: 'Favorite',
      path: `${ROUTES_PATHS.MYPAGE}?tab=interest`,
    },
  ];

  return (
    <aside
      className={cn(
        'fixed top-15 left-0 z-40 hidden h-[calc(100vh-60px)] flex-col overflow-y-auto bg-[#070913] transition-all duration-300 md:flex',
        isOpen ? 'w-sidebar' : 'w-0',
      )}
    >
      <nav className="flex-1 px-4 py-10">
        {menuItems.map(item => {
          const Icon = item.icon;

          return (
            <Link
              className={cn(
                'mb-1 flex items-center gap-3 rounded-xl px-4 py-3 transition-all',
                item.isActive
                  ? 'bg-[#dc196d] text-white shadow-md'
                  : 'hover:bg-bg-section-dark text-[#c7c9d9] hover:text-white',
              )}
              key={item.label}
              to={item.path}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <footer className="shrink-0 border-t border-[#e5e7eb] p-4">
        <p className="text-xs whitespace-nowrap text-[#c7c9d9]">
          이용약관 | 문의
        </p>
        <p className="mt-1 text-xs whitespace-nowrap text-[#c7c9d9]">
          © 2026 Near0.5
        </p>
      </footer>
    </aside>
  );
}
