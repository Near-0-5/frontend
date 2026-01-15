import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

type DropdownProps = {
  children: React.ReactNode;
};

export default function Dropdown({ children }: DropdownProps) {
  return <DropdownMenu.Root>{children}</DropdownMenu.Root>;
}
