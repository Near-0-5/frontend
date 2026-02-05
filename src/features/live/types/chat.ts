export type ChatMessage = {
  kind: ChatMessageKind;
  messageId: string;
  roomId: string;
  text: string;
  ts: string;
  userId: number;
  userName: string;
};
// 채팅 메세지 타입
export type ChatMessageKind = 'message' | 'system';

// 클라이언트 -> 서버 : 메세지 전송 이벤트
export type ClientMessageEvent = {
  text: string;
  type: 'message';
};

// 서버 -> 클라이언트 : message 이벤트
export type MessageEvent = {
  message_id: string;
  room_id: string;
  text: string;
  ts: string;
  type: 'message';
  user_id: number;
};

//서버 -> 클라이언트 : recent 이벤트
export type RecentEvent = {
  items: Array<MessageEvent | SystemEvent>;
  room_id: string;
  type: 'recent';
};

// 서버 -> 클라이언트 전체 이벤트 유니온
export type ServerEvent = MessageEvent | RecentEvent | SystemEvent;

export type SystemChatMessage = {
  kind: 'system';
  messageId: null;
  roomId: string;
  text: string;
  ts: string;
};

// 서버 -> 클라이언트 : system 이벤트
export type SystemEvent = {
  message_id: null;
  room_id: string;
  text: string;
  ts: string;
  type: 'system';
  user_id: number;
};
