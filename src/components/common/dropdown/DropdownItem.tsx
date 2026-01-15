import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { cn } from '@/utils';

type DropdownItemProps = {
  children: React.ReactNode;
  isDanger?: boolean;
  isDisabled?: boolean;
  onSelect?: () => void;
};

export default function DropdownItem({
  children,
  isDanger = false,
  isDisabled = false,
  onSelect,
}: DropdownItemProps) {
  return (
    <DropdownMenu.Item
      className={cn(
        'flex cursor-pointer items-center rounded px-3 py-2 text-sm outline-none select-none',
        'focus:bg-gray-100',
        isDisabled && 'cursor-not-allowed opacity-50',
        isDanger && 'text-red-600 focus:bg-red-50',
      )}
      disabled={isDisabled}
      onSelect={onSelect}
    >
      {children}
    </DropdownMenu.Item>
  );
}
