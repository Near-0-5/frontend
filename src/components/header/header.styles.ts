import { cva } from 'class-variance-authority';

export const headerRootVariants = cva(
  'fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b pr-6 pl-4',
  {
    defaultVariants: {
      height: 'default',
      tone: 'dark',
    },
    variants: {
      height: {
        default: 'h-15',
      },
      tone: {
        dark: 'bg-[#070913] border-[#E5E7EB]',
      },
    },
  },
);

export const headerGroupVariants = cva('flex items-center gap-3');

export const notificationWrapperVariants = cva('relative');
