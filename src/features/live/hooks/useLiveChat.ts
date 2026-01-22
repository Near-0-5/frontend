import { useEffect, useRef, useState } from 'react';

import type {
  ChatMessage,
  ClientMessageEvent,
  MessageEvent,
  RecentEvent,
  ServerEvent,
  SystemEvent,
} from '@/features/live/types/chat';

type UseLiveChatParams = {
  roomId: string;
  streamingId: number;
};

export const useLiveChat = ({ roomId, streamingId }: UseLiveChatParams) => {
  const socketRef = useRef<null | WebSocket>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const socket = new WebSocket(
      `wss://api.near05.com/v1/streamings/${streamingId}/chat`,
    );

    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
    };

    socket.onmessage = event => {
      const parsed: ServerEvent = JSON.parse(event.data);

      if (parsed.type === 'recent') {
        handleRecentEvent(parsed);
        return;
      }

      if (parsed.type === 'message') {
        handleMessageEvent(parsed);
        return;
      }

      if (parsed.type === 'system') {
        handleSystemEvent(parsed);
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    socket.onerror = () => {
      setIsConnected(false);
    };

    return () => {
      socket.close();
    };
  }, [roomId, streamingId]);

  const handleRecentEvent = (event: RecentEvent) => {
    const mappedMessages = event.items.map(mapServerEventToChatMessage);

    setMessages(mappedMessages);
  };

  const handleMessageEvent = (event: MessageEvent) => {
    setMessages(prev => [...prev, mapServerEventToChatMessage(event)]);
  };

  const handleSystemEvent = (event: SystemEvent) => {
    setMessages(prev => [...prev, mapServerEventToChatMessage(event)]);
  };

  const sendMessage = (text: string) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      return;
    }

    const payload: ClientMessageEvent = {
      text,
      type: 'message',
    };

    socketRef.current.send(JSON.stringify(payload));
  };

  return {
    isConnected,
    messages,
    sendMessage,
  };
};

const mapServerEventToChatMessage = (
  event: MessageEvent | SystemEvent,
): ChatMessage => ({
  kind: event.type,
  messageId: event.message_id,
  roomId: event.room_id,
  text: event.text,
  ts: event.ts,
  userId: event.user_id,
});
