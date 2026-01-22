import { useState } from 'react';

import { Button } from '@/components';
import { useLiveChat } from '@/features/live/hooks/useLiveChat';

type ChatPanelProps = {
  isAuthenticated: boolean;
  onRequireLogin: () => void;
  roomId: string;
  streamingId: number;
};

export default function ChatPanel({
  isAuthenticated,
  onRequireLogin,
  roomId,
  streamingId,
}: ChatPanelProps) {
  const { isConnected, messages, sendMessage } = useLiveChat({
    roomId,
    streamingId,
  });

  const [input, setInput] = useState('');

  const handleSendClick = () => {
    if (!isAuthenticated) {
      onRequireLogin();
      return;
    }

    if (!input.trim()) {
      return;
    }

    sendMessage(input);
    setInput('');
  };

  return (
    <section className="flex h-full flex-col rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <header className="flex items-center justify-between border-b px-4 py-3">
        <span className="text-sm font-semibold text-gray-900">실시간 채팅</span>

        <span
          className={`text-xs ${
            isConnected ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {isConnected ? '연결됨' : '연결 끊김'}
        </span>
      </header>

      {/* Messages */}
      <ul className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {messages.map(message => {
          const isSystem = message.kind === 'system';

          return (
            <li
              className="flex flex-col gap-1"
              key={`${message.ts}-${message.userId}`}
            >
              <span className="text-xs text-gray-400">
                {isSystem ? 'SYSTEM' : `USER ${message.userId}`}
              </span>

              <div
                className={`max-w-[90%] rounded-lg px-3 py-2 text-sm ${
                  isSystem
                    ? 'bg-gray-100 text-gray-600'
                    : 'bg-violet-50 text-gray-900'
                }`}
              >
                {message.text}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Input */}
      <div className="shrink-0 border-t px-3 py-2">
        <div className="flex items-center gap-2">
          <input
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
            disabled={!isAuthenticated}
            onChange={event => setInput(event.target.value)}
            onClick={() => {
              if (!isAuthenticated) {
                onRequireLogin();
              }
            }}
            placeholder={
              isAuthenticated
                ? '메시지를 입력하세요'
                : '로그인 후 채팅에 참여할 수 있어요'
            }
            value={input}
          />

          <Button
            disabled={!isAuthenticated}
            onClick={handleSendClick}
            size="sm"
            variant="white"
          >
            전송
          </Button>
        </div>
      </div>
    </section>
  );
}
