import type { ChatMessage } from '@/features/live/types/chat';

type ChatMessageItemProps = {
  message: ChatMessage;
};

export default function ChatMessageItem({ message }: ChatMessageItemProps) {
  if (message.kind === 'system') {
    return (
      <li className="py-2 text-center text-xs text-gray-500">{message.text}</li>
    );
  }

  const userName = message.userName ?? '익명';
  const initial = userName.slice(0, 1).toUpperCase();

  return (
    <li className="flex items-start gap-3">
      {/* Avatar */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-pink-400 to-purple-500 text-xs font-bold">
        {initial}
      </div>

      <div className="flex flex-col gap-1">
        {/* User meta */}
        <span className="text-xs font-semibold text-gray-300">{userName}</span>

        {/* Message */}
        <p className="inline-block rounded-md bg-white/5 px-2 py-1 text-sm leading-snug text-gray-100">
          {message.text}
        </p>
      </div>
    </li>
  );
}
