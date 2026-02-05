import type {
  ChatMessage,
  MessageEvent,
  SystemEvent,
} from '@/features/live/types/chat';

type MappableEvent = MessageEvent | SystemEvent;

export function mapServerEventToChatMessage(event: MappableEvent): ChatMessage {
  if (event.type === 'system') {
    return {
      kind: 'system',
      messageId: null,
      roomId: event.room_id,
      text: event.text,
      ts: event.ts,
      userId: -1,
      userName: 'SYSTEM',
    };
  }

  return {
    kind: 'message',
    messageId: event.message_id,
    roomId: event.room_id,
    text: event.text,
    ts: event.ts,
    userId: event.user_id,
    userName: `USER_${event.user_id}`,
  };
}
