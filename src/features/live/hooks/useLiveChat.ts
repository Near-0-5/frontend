import { useEffect, useRef, useState } from 'react';

import type {
  ChatMessage,
  ClientMessageEvent,
  ServerEvent,
} from '@/features/live/types/chat';

import { mapServerEventToChatMessage } from '@/features/live/utils/mapServerEventToChatMessage';

type UseLiveChatParams = {
  streamingId: number;
};

export function useLiveChat({ streamingId }: UseLiveChatParams) {
  const socketRef = useRef<null | WebSocket>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const socket = new WebSocket(
      `wss://d15qsadcdtxaqn.cloudfront.net/api/v1/streaming/10/chat`,
    );

    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    socket.onerror = () => {
      setIsConnected(false);
    };

    socket.onmessage = event => {
      const serverEvent: ServerEvent = JSON.parse(event.data);

      if (serverEvent.type === 'recent') {
        const recentMessages = serverEvent.items.map(item =>
          mapServerEventToChatMessage(item),
        );

        setMessages(recentMessages);
        return;
      }

      const chatMessage = mapServerEventToChatMessage(serverEvent);
      setMessages(prev => [...prev, chatMessage]);
    };

    return () => {
      socket.close();
    };
  }, [streamingId]);

  const sendMessage = (text: string) => {
    if (!socketRef.current) {
      return;
    }

    if (socketRef.current.readyState !== WebSocket.OPEN) {
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
}
