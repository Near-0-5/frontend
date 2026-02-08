import { UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '@/components';
import { ROUTES_PATHS } from '@/constants';
import { useAuthStore } from '@/features/auth';

export default function UserMenuDropdown() {
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES_PATHS.MAIN);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-r from-[#2B7FFF] via-[#AD46FF] to-[#F6339A]">
          <UserIcon className="h-4 w-4 text-white" />
        </button>
      </DropdownTrigger>

      <DropdownContent align="end">
        <DropdownItem isDanger onSelect={handleLogout}>
          로그아웃
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}
