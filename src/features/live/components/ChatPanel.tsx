import { SendHorizonalIcon, SmileIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components';
import { useChatAutoScroll } from '@/features/live/hooks/useChatAutoScroll';
import { useLiveChat } from '@/features/live/hooks/useLiveChat';

import ChatMessageItem from './ChatMessageItem';

type ChatPanelProps = {
  isAuthenticated: boolean;
  streamingId: number;
};

export default function ChatPanel({
  isAuthenticated,
  streamingId,
}: ChatPanelProps) {
  const { messages, sendMessage } = useLiveChat({ streamingId });
  const { bottomRef, containerRef, handleScroll } = useChatAutoScroll(messages);

  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!isAuthenticated || !input.trim()) return;
    sendMessage(input.trim());
    setInput('');
  };

  return (
    <section className="flex h-full min-h-0 flex-col rounded-2xl bg-linear-to-b from-[#0B0F1E] to-[#060913]">
      <header className="shrink-0 border-b border-white/10 px-4 py-3">
        <span className="text-sm font-semibold text-white">실시간 채팅</span>
      </header>

      <ul
        className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3"
        onScroll={handleScroll}
        ref={containerRef}
      >
        {messages.map(message => (
          <ChatMessageItem
            key={`${message.ts}-${message.userId}`}
            message={message}
          />
        ))}
        <div ref={bottomRef} />
      </ul>

      <div className="shrink-0 border-t border-white/10 px-3 py-2">
        <div className="flex items-center gap-2 rounded-full bg-[#1A1D2E] px-3 py-2">
          <SmileIcon className="text-[#9CA3AF]" size={18} />

          <input
            className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder-[#6B7280] outline-none"
            disabled={!isAuthenticated}
            onChange={e => setInput(e.target.value)}
            placeholder={
              isAuthenticated
                ? '메시지를 입력하세요'
                : '로그인 후 채팅에 참여할 수 있어요'
            }
            value={input}
          />

          <Button
            disabled={!isAuthenticated || !input.trim()}
            onClick={handleSend}
            rounded="full"
            size="icon"
            variant="pink"
          >
            <SendHorizonalIcon size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}
