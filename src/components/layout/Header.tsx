import { MenuIcon } from 'lucide-react';
import { Link } from 'react-router';

import { ROUTES_PATHS } from '@/constants';

import { Button } from '../ui/button';

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-60 flex items-center justify-between border-b border-[#E5E7EB] bg-[#070913] px-6 py-3">
      <div className="flex items-center justify-start gap-3">
        <Button
          className="text-[#ffffff]"
          onClick={onMenuClick}
          size="icon"
          variant="ghost"
        >
          <MenuIcon size={24} />
        </Button>
        <Link
          className="text-xl font-bold text-[#FFFFFF]"
          to={ROUTES_PATHS.MAIN}
        >
          Near 0.5
        </Link>
      </div>
      <Button rounded="sm" size="sm" variant="lightGrey">
        로그인
      </Button>
    </header>
  );
}

export default Header;
