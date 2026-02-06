import type { ChatMessage } from '@/features/live/types/chat';

type ChatMessageItemProps = {
  message: ChatMessage;
};

export default function ChatMessageItem({ message }: ChatMessageItemProps) {
  if (message.kind === 'system') {
    return (
      <li className="py-2 text-center text-xs text-[#BCBCBC]">
        {message.text}
      </li>
    );
  }

  const userName = message.userName ?? '익명';
  const initial = userName.slice(0, 1).toUpperCase();

  return (
    <li className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#DC196D] to-[#6F4BFF] text-xs font-bold text-white">
        {initial}
      </div>

      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-xs font-semibold text-[#FB64B6]">{userName}</span>

        <p className="inline-block max-w-full rounded-2xl bg-[#1A1F2E] px-4 py-2 text-sm leading-snug wrap-break-word whitespace-normal text-white">
          {message.text}
        </p>
      </div>
    </li>
  );
}
