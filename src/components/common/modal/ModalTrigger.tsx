import { DialogTrigger } from '@/components/ui/dialog';

type ModalTriggerProps = {
  children: React.ReactNode;
};

export default function ModalTrigger({ children }: ModalTriggerProps) {
  return <DialogTrigger asChild>{children}</DialogTrigger>;
}
