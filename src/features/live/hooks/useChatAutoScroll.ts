import { useEffect, useRef, useState } from 'react';

export function useChatAutoScroll<T>(deps: T[]) {
  const containerRef = useRef<HTMLUListElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);

  // 새 메시지 올 때
  useEffect(() => {
    if (!isAutoScrollEnabled) {
      return;
    }

    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [deps, isAutoScrollEnabled]);

  // 유저 스크롤 감지
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const { clientHeight, scrollHeight, scrollTop } = container;

    // 바닥에서 20px 이내면 자동 스크롤 다시 활성화
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 20;

    setIsAutoScrollEnabled(isAtBottom);
  };

  return {
    bottomRef,
    containerRef,
    handleScroll,
  };
}
