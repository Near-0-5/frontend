import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { cn } from '@/utils';

type DropdownContentProps = {
  align?: 'center' | 'end' | 'start';
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;
};

export default function DropdownContent({
  align = 'end',
  children,
  className,
  sideOffset = 4,
}: DropdownContentProps) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        align={align}
        className={cn(
          [
            'z-50 min-w-40 p-1',
            'rounded-lg',

            'bg-[#1A1F2E] text-white',
            'border border-[#2A2F3E]',

            'shadow-xl shadow-black/40',
          ],
          className,
        )}
        sideOffset={sideOffset}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}
