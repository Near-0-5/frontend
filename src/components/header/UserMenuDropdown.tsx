import { UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

import {
  Button,
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
        <Button
          className="flex gap-1"
          rounded="full"
          size="default"
          variant="pink"
        >
          <UserIcon />
        </Button>
      </DropdownTrigger>

      <DropdownContent align="end">
        <DropdownItem isDanger onSelect={handleLogout}>
          로그아웃
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}
