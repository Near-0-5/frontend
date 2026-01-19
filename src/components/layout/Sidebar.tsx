import {
  HeartIcon,
  HomeIcon,
  Mic2Icon,
  RadioIcon,
  UserIcon,
} from 'lucide-react';
import { Link, useLocation } from 'react-router';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    { icon: HomeIcon, label: '홈', path: '/' },
    { icon: UserIcon, label: 'My Page', path: '/mypage' },
    { icon: Mic2Icon, label: 'Artist', path: '/artist' },
    { icon: RadioIcon, label: 'Streaming', path: '/streaming' },
    { icon: HeartIcon, label: 'Favorite', path: '/favorite' },
  ];

  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-50 flex h-screen w-60 flex-col bg-[#070913] transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="border-border-default h-15 border-b px-4"></div>

        <nav className="flex-1 px-4 py-4">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                className={`mb-1 flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? 'text-text-primary bg-[#dc196d] shadow-md'
                    : 'hover:bg-bg-section-dark hover:text-text-primary text-[#c7c9d9]'
                }`}
                key={item.path}
                to={item.path}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* 하단 정보 */}
        <div className="border-border-default border-t p-4">
          <p className="text-xs text-[#c7c9d9]">이용약관 | 문의</p>
          <p className="mt-1 text-xs text-[#c7c9d9]">© 2026 Near0.5</p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
