import { Check as CheckIcon, Plus as PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

export type FollowButtonProps = {
  className?: string;
  initialIsFollowing?: boolean;
  onToggle?: (isFollowing: boolean) => void;
};

export default function FollowButton({
  className,
  initialIsFollowing = false,
  onToggle,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const handleToggle = () => {
    const newState = !isFollowing;
    setIsFollowing(newState);
    onToggle?.(newState);
  };

  return (
    <Button
      className={cn('w-full font-bold tracking-[-0.015em]', className)}
      onClick={handleToggle}
      rounded="full"
      size="default"
      variant={isFollowing ? 'navy' : 'lightGrey'}
    >
      {isFollowing ? (
        <>
          <CheckIcon size={16} strokeWidth={2.5} />
          <span>팔로잉</span>
        </>
      ) : (
        <>
          <PlusIcon size={16} strokeWidth={2.5} />
          <span>팔로우</span>
        </>
      )}
    </Button>
  );
}
