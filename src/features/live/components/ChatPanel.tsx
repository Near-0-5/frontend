import { SendHorizonalIcon, SmileIcon } from 'lucide-react';
import { useState } from 'react';

import { Button, Input } from '@/components';
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
    if (!isAuthenticated || !input.trim()) {
      return;
    }

    sendMessage(input.trim());
    setInput('');
  };

  return (
    <section className="flex h-full max-h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-[#282828] bg-[#101828]">
      <header className="shrink-0 border-b border-[#282828] px-4 py-3">
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

      <div className="shrink-0 border-t border-[#282828] px-3 py-2">
        <div className="flex items-center gap-2 rounded-full bg-[#1A1F2E] px-2 py-2">
          <SmileIcon className="ml-1 text-[#BCBCBC]" size={18} />

          <Input
            className="h-9 flex-1 bg-transparent px-3 text-white placeholder:text-[#6B7280]"
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
