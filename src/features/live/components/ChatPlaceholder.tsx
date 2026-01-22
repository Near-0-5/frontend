import { Button } from '@/components';

export default function ChatPlaceholder() {
  return (
    <div className="flex h-full flex-col rounded border">
      <div className="flex-1 p-4 text-sm text-gray-400">채팅 영역</div>

      <div className="border-t p-3" />
      <Button className="w-full" size="default" variant="lightGrey">
        로그인 후 채팅 가능
      </Button>
    </div>
  );
}
