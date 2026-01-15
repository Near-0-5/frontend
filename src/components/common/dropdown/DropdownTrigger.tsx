import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

type DropdownTriggerProps = {
  children: React.ReactNode;
};

export default function DropdownTrigger({ children }: DropdownTriggerProps) {
  return <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>;
}
