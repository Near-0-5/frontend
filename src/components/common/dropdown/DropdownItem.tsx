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
      className={cn([
        'flex items-center rounded px-3 py-2 text-sm outline-none select-none',
        'cursor-pointer text-white',

        'focus:bg-[#2A2F3E] data-highlighted:bg-[#2A2F3E]',

        'data-disabled:cursor-not-allowed data-disabled:opacity-50',

        isDanger && [
          'text-red-400',
          'focus:bg-red-900/30 data-highlighted:bg-red-900/30',
        ],
      ])}
      disabled={isDisabled}
      onSelect={onSelect}
    >
      {children}
    </DropdownMenu.Item>
  );
}
