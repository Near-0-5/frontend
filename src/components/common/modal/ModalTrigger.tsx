import * as DialogPrimitive from '@radix-ui/react-dialog';

type ModalTriggerProps = {
  asChild?: boolean;
  children: React.ReactNode;
};

export default function ModalTrigger({
  asChild = false,
  children,
}: ModalTriggerProps) {
  return (
    <DialogPrimitive.Trigger asChild={asChild}>
      {children}
    </DialogPrimitive.Trigger>
  );
}
