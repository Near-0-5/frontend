import { type KeyboardEvent, useCallback } from 'react';

//div나 span 같은 요소를 버튼처럼 사용하고 싶을때 사용하는 훅입니다
export const useActionKey = (callback: () => void) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        callback();
      }
    },
    [callback],
  );

  return handleKeyDown;
};
