'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useColourStore } from '@/store/useColourStore';

interface ImageCanvasProps {
  imageSource: string | File | Blob;
}

interface LoupePosition {
  x: number;
  y: number;
  pixelColor: string;
  visible: boolean;
}

export function ImageCanvas({ imageSource }: ImageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loupePosition, setLoupePosition] = useState<LoupePosition>({
    x: 0,
    y: 0,
    pixelColor: '#000000',
    visible: false,
  });
  const [isPulsing, setIsPulsing] = useState(false);
  const { setColour } = useColourStore();

  // Convert image source to object URL
  const getImageUrl = useCallback(() => {
    if (typeof imageSource === 'string') {
      return imageSource;
    }
    return URL.createObjectURL(imageSource);
  }, [imageSource]);

  // Draw image on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      // Set canvas to exact image dimensions for accurate pixel data
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      // Draw image at full resolution
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
    };

    img.src = getImageUrl();
  }, [imageSource, getImageUrl]);

  // Get pixel color at position
  const getPixelColor = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return '#000000';

    const ctx = canvas.getContext('2d');
    if (!ctx) return '#000000';

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = Math.floor((clientX - rect.left) * scaleX);
    const y = Math.floor((clientY - rect.top) * scaleY);

    try {
      const imageData = ctx.getImageData(x, y, 1, 1);
      const [r, g, b] = imageData.data;
      
      // Convert to HEX
      const toHex = (n: number) => {
        const hex = Math.round(n).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
    } catch {
      return '#000000';
    }
  }, []);

  // Universal coordinate handler for both mouse and touch events
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    let clientX: number, clientY: number;
    
    // 1. Desktop Mouse Events
    if ('clientX' in e && 'clientY' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } 
    // 2. Mobile Touch Start & Move (Finger is on the screen)
    else if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } 
    // 3. Mobile Touch End (Finger just lifted OFF the screen)
    else if ('changedTouches' in e && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } 
    // Safety net
    else {
      return { clientX: 0, clientY: 0 };
    }
    
    return { clientX, clientY };
  };

  // Universal color extraction handler
  const handleColorExtraction = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { clientX, clientY } = getCoordinates(e);
    
    // Safety check - if coordinates are (0, 0), it might be an invalid touch event
    if (clientX === 0 && clientY === 0) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Check if we're within canvas bounds
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      const pixelColor = getPixelColor(clientX, clientY);
      
      // Check if this is a touch event for mobile offset
      const isTouchEvent = 'touches' in e || 'changedTouches' in e;
      const mobileOffset = isTouchEvent ? 60 : 0; // Push up 60px on mobile
      
      setLoupePosition({
        x: clientX,
        y: clientY - mobileOffset, // Apply mobile offset
        pixelColor,
        visible: true,
      });
    } else {
      setLoupePosition(prev => ({ ...prev, visible: false }));
    }
  }, [getPixelColor]);

  // Universal color picker handler
  const handleColorPick = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { clientX, clientY } = getCoordinates(e);
    
    // Safety check - if coordinates are (0, 0), it might be an invalid touch event
    if (clientX === 0 && clientY === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = Math.floor((clientX - rect.left) * scaleX);
    const y = Math.floor((clientY - rect.top) * scaleY);

    try {
      const imageData = ctx.getImageData(x, y, 1, 1);
      const [r, g, b, a] = imageData.data;
      
      // Convert alpha from 0-255 to 0-1
      const alpha = a / 255;
      
      setColour(r, g, b, alpha);
      
      // Trigger pulse animation
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 100);
    } catch (error) {
      console.error('Failed to pick color:', error);
    }
  }, [setColour]);

  return (
    <div className="relative w-full flex justify-center">
      <motion.canvas
        ref={canvasRef}
        className="w-full h-auto max-h-[60vh] object-contain rounded-2xl shadow-sm border border-gray-200 cursor-crosshair touch-none"
        
        /* Desktop Events */
        onMouseMove={handleColorExtraction}
        onMouseLeave={() => setLoupePosition(prev => ({ ...prev, visible: false }))}
        onClick={handleColorPick}
        
        /* Mobile Touch Events */
        onTouchStart={handleColorExtraction}
        onTouchMove={handleColorExtraction}
        onTouchEnd={handleColorPick}
        
        animate={isPulsing ? { scale: 0.95 } : { scale: 1 }}
        transition={{ duration: 0.1 }}
      />
      
      {/* Magnifier Loupe */}
      {loupePosition.visible && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: loupePosition.x,
            top: loupePosition.y,
            transform: 'translate(-50%, -50%)', // Center the loupe perfectly on cursor
          }}
        >
          {/* Loupe circle */}
          <div className="relative w-[120px] h-[120px] rounded-full border-2 border-white shadow-lg overflow-hidden bg-white">
            {/* Magnified content (simplified - in production would render actual magnified canvas) */}
            <div 
              className="w-full h-full"
              style={{ backgroundColor: loupePosition.pixelColor }}
            />
            
            {/* Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute w-full h-px bg-black/30" />
              <div className="absolute h-full w-px bg-black/30" />
            </div>
          </div>
          
          {/* Color label */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded font-mono whitespace-nowrap">
            {loupePosition.pixelColor}
          </div>
        </div>
      )}
    </div>
  );
}
