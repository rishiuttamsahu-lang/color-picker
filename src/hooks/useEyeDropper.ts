import { useState, useCallback, useEffect, useRef } from 'react';

interface EyeDropperResult {
  sRGBHex: string;
}

interface EyeDropper {
  open(): Promise<EyeDropperResult>;
}

declare global {
  interface Window {
    EyeDropper?: new () => EyeDropper;
  }
}

export function useEyeDropper() {
  const [isSupported, setIsSupported] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsClient(true);
    setIsSupported(typeof window !== 'undefined' && 'EyeDropper' in window);
  }, []);

  const openScanner = useCallback(async (): Promise<string | null> => {
    if (!isClient) return null;

    if (isSupported) {
      // Use native EyeDropper API for Chrome/Edge
      try {
        const eyeDropper = new (window as any).EyeDropper();
        const result = await eyeDropper.open();
        return result.sRGBHex;
      } catch (error) {
        console.error('EyeDropper failed:', error);
        return null;
      }
    } else {
      // Fallback: trigger native color input for Firefox/Safari/Mobile
      if (colorInputRef.current) {
        colorInputRef.current.click();
      }
      return null;
    }
  }, [isClient, isSupported]);

  const handleColorInputChange = useCallback((callback: (color: string) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const color = e.target.value;
      callback(color);
    };
  }, []);

  return {
    openScanner,
    isSupported: isClient ? isSupported : false,
    colorInputRef,
    handleColorInputChange,
  };
}
