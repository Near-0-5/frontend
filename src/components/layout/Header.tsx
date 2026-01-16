import { Menu } from 'lucide-react';
import { Link } from 'react-router';

import { ROUTES_PATHS } from '@/constants';

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="relative z-[60] flex items-center justify-between border-b border-[#E5E7EB] bg-[#070913] px-6 py-3">
      <div className="flex items-center justify-start gap-3">
        <button className="cursor-pointer text-[#ffffff]" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <Link
          className="text-xl font-bold text-[#FFFFFF]"
          to={ROUTES_PATHS.MAIN}
        >
          Near 0.5
        </Link>
      </div>
      <button className="mr-[82px] cursor-pointer rounded-lg bg-[#c7c9d9] px-4 py-2 transition-colors hover:bg-[#b01558]">
        로그인
      </button>
    </header>
  );
}

export default Header;
