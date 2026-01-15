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
          'z-50 min-w-40 rounded-md border bg-white p-1 shadow-md',
          className,
        )}
        sideOffset={sideOffset}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}
