import * as React from 'react';

import { cn } from '@/utils';

export type LoadingProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: 'lg' | 'md' | 'sm';
};

const sizeMap: Record<NonNullable<LoadingProps['size']>, string> = {
  lg: 'h-8 w-8',
  md: 'h-6 w-6',
  sm: 'h-4 w-4',
};

function Loading({ className, size = 'md', ...props }: LoadingProps) {
  return (
    <div
      className={cn(
        'inline-block animate-spin rounded-full border-2',
        'border-[#C7C9D9]/40 border-t-[#C7C9D9]',
        sizeMap[size],
        className,
      )}
      {...props}
    />
  );
}

export { Loading };
