import { Button } from '@/components';

export default function ChatPlaceholder() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#282828] bg-[#101828]">
      <div className="flex flex-1 items-center justify-center px-4 text-sm text-[#BCBCBC]">
        로그인 후 채팅에 참여할 수 있어요
      </div>

      <div className="h-px w-full bg-[#282828]" />

      <div className="p-3">
        <Button className="w-full" size="default" variant="pink">
          로그인 후 채팅 가능
        </Button>
      </div>
    </div>
  );
}
