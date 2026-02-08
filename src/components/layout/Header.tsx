import {
  HeartIcon,
  HomeIcon,
  MenuIcon,
  Mic2Icon,
  RadioIcon,
  UserIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import { Button, Logo } from '@/components';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '@/components';
import {
  headerGroupVariants,
  headerRootVariants,
} from '@/components/header/header.styles';
import NotificationDropdown from '@/components/header/NotificationDropdown';
import UserMenuDropdown from '@/components/header/UserMenuDropdown';
import { ROUTES_PATHS } from '@/constants';
import { useAuthStore } from '@/features/auth';
import { cn } from '@/utils';

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  const isLoggedIn = useAuthStore(state => Boolean(state.accessToken));
  const navigate = useNavigate();
  const location = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
      icon: HomeIcon,
      label: '홈',
      path: ROUTES_PATHS.MAIN,
    },
    {
      icon: UserIcon,
      label: 'My Page',
      path: `${ROUTES_PATHS.MYPAGE}?tab=account`,
    },
    { icon: Mic2Icon, label: 'Artist', path: ROUTES_PATHS.ARTIST_LIST },
    { icon: RadioIcon, label: 'Streaming', path: ROUTES_PATHS.STREAMING_LIST },
    {
      icon: HeartIcon,
      label: 'Favorite',
      path: `${ROUTES_PATHS.MYPAGE}?tab=interest`,
    },
  ];

  return (
    <header className={cn(headerRootVariants())}>
      <div className={cn(headerGroupVariants())}>
        <div className="md:hidden">
          <Dropdown onOpenChange={setIsDropdownOpen} open={isDropdownOpen}>
            <DropdownTrigger>
              <Button size="icon" variant="ghost">
                <MenuIcon />
              </Button>
            </DropdownTrigger>

            <DropdownContent
              align="start"
              className="mt-1 -ml-4 w-44 rounded-none border border-[#1f2937] bg-[#070913] p-2 shadow-xl sm:w-52"
            >
              {menuItems.map(item => {
                const currentFullUrl = `${location.pathname}${location.search}`;
                const isActive = item.path.includes('?')
                  ? currentFullUrl === item.path
                  : location.pathname === item.path;

                return (
                  <DropdownItem
                    className="focus:bg-transparent data-highlighted:bg-transparent"
                    key={item.label}
                    onSelect={() => {
                      navigate(item.path);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <div
                      className={cn(
                        'flex w-full items-center gap-3 rounded-xl px-3 py-3 transition-all sm:px-4',
                        isActive && 'bg-[#dc196d] text-white shadow-md',
                      )}
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </DropdownItem>
                );
              })}
            </DropdownContent>
          </Dropdown>
        </div>

        <div className="hidden md:block">
          <Button onClick={onMenuClick} size="icon" variant="ghost">
            <MenuIcon />
          </Button>
        </div>

        <Link className="flex items-center" to={ROUTES_PATHS.MAIN}>
          <Logo className="h-6" theme="light" />
        </Link>
      </div>

      {!isLoggedIn ? (
        <Button
          onClick={() => navigate(ROUTES_PATHS.LOGIN)}
          rounded="sm"
          size="sm"
          variant="lightGrey"
        >
          로그인
        </Button>
      ) : (
        <div className={cn(headerGroupVariants())}>
          <NotificationDropdown />
          <UserMenuDropdown />
        </div>
      )}
    </header>
  );
}

export default Header;
