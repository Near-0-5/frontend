import {
  BellIcon,
  ChevronDownIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { Button } from '@/components';
import { ROUTES_PATHS } from '@/constants';
import { useAuthStore } from '@/store/authStore';

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated); // 여기!
  const logout = useAuthStore(state => state.logout); // 여기!
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogin = () => {
    navigate(ROUTES_PATHS.LOGIN);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate(ROUTES_PATHS.MAIN);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex h-15 items-center justify-between border-b border-[#E5E7EB] bg-[#070913] px-6 py-3">
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
      {!isAuthenticated ? (
        <Button
          onClick={handleLogin}
          rounded="sm"
          size="sm"
          variant="lightGrey"
        >
          로그인
        </Button>
      ) : (
        <div className="flex items-center gap-3">
          <Button className="text-[#ffffff]" size="icon" variant="ghost">
            <SearchIcon size={22} />
          </Button>

          <div className="relative">
            <Button className="text-[#ffffff]" size="icon" variant="ghost">
              <BellIcon size={22} />
            </Button>
            <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              3
            </span>
          </div>

          <div className="relative ml-2" ref={dropdownRef}>
            <div className="flex items-center gap-1">
              <Button
                className="h-10 w-10 rounded-full bg-purple-500 p-0 hover:bg-purple-600"
                variant="ghost"
              >
                <UserIcon className="text-white" size={20} />
              </Button>
              <Button
                className="text-[#ffffff]"
                onClick={toggleDropdown}
                size="icon"
                variant="ghost"
              >
                <ChevronDownIcon size={20} />
              </Button>
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg">
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
