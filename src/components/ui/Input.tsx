import * as React from 'react';

import { cn } from '@/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isError?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, isError, ...props }, ref) => (
    <input
      className={cn(
        'h-9 w-full rounded-full bg-[#C7C9D9] px-4 text-sm text-[#070913]',
        'placeholder:text-[#070913]/50',
        'shadow-xs transition-[color,box-shadow] outline-none',
        'disabled:cursor-not-allowed disabled:opacity-60',
        'focus-visible:ring-2 focus-visible:ring-primary/40',
        isError && 'ring-2 ring-destructive/60',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

Input.displayName = 'Input';

export { Input };
