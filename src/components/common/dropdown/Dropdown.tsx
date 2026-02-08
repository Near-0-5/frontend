import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

type DropdownProps = DropdownMenu.DropdownMenuProps & {
  children: React.ReactNode;
};

export default function Dropdown({ children, ...props }: DropdownProps) {
  return <DropdownMenu.Root {...props}>{children}</DropdownMenu.Root>;
}
