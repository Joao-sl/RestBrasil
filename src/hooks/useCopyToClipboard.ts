import { useCallback, useEffect, useRef, useState } from 'react';

type useCopyToClipboardReturn = [(text: string) => Promise<void>, boolean];

export function useCopyToClipboard(
  resetDelay = 2000,
): useCopyToClipboardReturn {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // https://react.dev/reference/react/useCallback
  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);

        timeoutRef.current = window.setTimeout(() => {
          setIsCopied(false);
          timeoutRef.current = null;
        }, resetDelay);
      } catch {
        setIsCopied(false);
      }
    },
    [resetDelay],
  );

  return [copy, isCopied];
}
