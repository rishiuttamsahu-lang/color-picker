'use client';

import { useEffect, useCallback } from 'react';

interface UseClipboardPasteProps {
  onImagePaste: (file: File) => void;
}

export function useClipboardPaste({ onImagePaste }: UseClipboardPasteProps) {
  const handlePaste = useCallback((event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          onImagePaste(file);
          event.preventDefault();
          break;
        }
      }
    }
  }, [onImagePaste]);

  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [handlePaste]);
}
