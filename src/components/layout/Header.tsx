import { MenuIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

import { Button } from '@/components';
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

  return (
    <header className={cn(headerRootVariants())}>
      <div className={cn(headerGroupVariants())}>
        <Button onClick={onMenuClick} size="icon" variant="ghost">
          <MenuIcon />
        </Button>

        <Link className="text-xl font-bold text-white" to={ROUTES_PATHS.MAIN}>
          Near 0.5
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
