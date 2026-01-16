import { DialogDescription } from '@/components/ui/dialog';

type ModalDescriptionProps = {
  children: React.ReactNode;
};

export default function ModalDescription({ children }: ModalDescriptionProps) {
  return (
    <DialogDescription className="text-sm text-gray-500">
      {children}
    </DialogDescription>
  );
}
