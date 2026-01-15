import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2",
  {
    defaultVariants: {
      rounded: 'md',
      size: 'default',
      variant: 'white',
    },
    variants: {
      rounded: {
        full: 'rounded-full',
        md: 'rounded-md',
        sm: 'rounded-sm',
      },
      size: {
        chip: 'h-32 w-full flex-col gap-3 p-5 text-lg',
        default: 'h-10 px-4 py-2',
        icon: 'size-10',
        lg: 'h-12 px-8 text-base',
        sm: 'h-8 px-3 text-xs',
      },
      variant: {
        black: 'bg-[#000000] text-white hover:bg-zinc-800',
        ghost: 'bg-transparent text-inherit text-[#C7C9D9]',
        glass:
          'bg-current/10 border border-current/20 backdrop-blur-md hover:bg-current/20 hover:border-current/40',
        lightGrey: 'bg-[#C7C9D9] text-black hover:bg-[#B0B2C4]',
        navy: 'bg-[#0F0F23] text-white hover:bg-[#1A1A35]',
        pink: 'bg-[#DC196D] text-white hover:bg-[#B5155A]',
        red: 'bg-[#E7000B] text-white hover:bg-[#C20009]',
        semiWhite: 'bg-white/50 text-black backdrop-blur-md hover:bg-white/60',
        transparent: 'bg-transparent text-black hover:bg-black/5',
        white:
          'bg-[#ffffff] text-black border border-zinc-200 hover:bg-zinc-50',
      },
    },
  },
);

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  asChild = false,
  className,
  rounded,
  size,
  variant,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ className, rounded, size, variant }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
