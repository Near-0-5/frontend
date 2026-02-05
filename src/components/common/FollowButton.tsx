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
    const next = !isFollowing;
    setIsFollowing(next);
    onToggle?.(next);
  };

  return (
    <Button
      className={cn(
        'inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-medium',
        isFollowing
          ? 'border-[#DC196D] bg-[#DC196D]/10 text-[#DC196D]'
          : 'border-[#9CA3AF] bg-transparent text-[#E5E7EB] hover:border-white',
        className,
      )}
      onClick={handleToggle}
      rounded="full"
      size="sm"
      type="button"
      variant="ghost"
    >
      {isFollowing ? (
        <>
          <CheckIcon size={14} strokeWidth={2.2} />
          <span>팔로잉</span>
        </>
      ) : (
        <>
          <PlusIcon size={14} strokeWidth={2.2} />
          <span>팔로우</span>
        </>
      )}
    </Button>
  );
}
