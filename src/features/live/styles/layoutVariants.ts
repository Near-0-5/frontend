import { cva } from 'class-variance-authority';

export const streamLayoutVariants = cva('min-h-0', {
  variants: {
    layout: {
      desktop: 'hidden lg:grid gap-4',
      mobile: 'flex md:hidden flex-col',
      tablet: 'hidden md:flex lg:hidden flex-col gap-4',
    },
  },
});

export const chatWrapperVariants = cva('min-h-0 overflow-hidden', {
  variants: {
    size: {
      desktop: 'rounded-xl',
      mobile: '',
      tablet: '',
    },
  },
});
