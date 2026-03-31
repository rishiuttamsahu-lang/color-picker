/**
 * Color History Strip Component
 * Horizontal scrollable list of recently picked colors
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useColourStore } from '@/store/useColourStore';
import { X } from 'lucide-react';

export function HistoryStrip() {
  const history = useColourStore((state) => state.history);
  const setColour = useColourStore((state) => state.setColour);
  const clearHistory = useColourStore((state) => state.clearHistory);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (history.length === 0) {
    return null;
  }

  /**
   * Handle clicking a history item
   */
  const handleHistoryClick = (hex: string) => {
    // Remove # and parse RGB
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);
    
    setColour(r, g, b);
  };

  /**
   * Handle clearing all history
   */
  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearHistory();
  };

  return (
    <div className="w-full bg-white rounded-xl border border-border p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-text-primary">
          Recent Colors
        </h3>
        <button
          onClick={handleClearAll}
          className="text-xs text-text-muted hover:text-text-secondary transition-colors flex items-center gap-1"
          aria-label="Clear color history"
        >
          <X className="w-3 h-3" />
          Clear All
        </button>
      </div>
      
      {/* Horizontal Scrollable Strip */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {history.map((hex, index) => (
          <motion.button
            key={`${hex}-${index}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.15, delay: index * 0.02 }}
            onClick={() => handleHistoryClick(hex)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative flex-shrink-0 w-10 h-10 rounded-full border-2 border-border shadow-button transition-transform hover:scale-115 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            style={{ backgroundColor: hex }}
            aria-label={`Pick color ${hex}`}
            type="button"
          >
            {/* Hover overlay with hex value */}
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-text-primary text-white text-xs font-mono px-2 py-1 rounded whitespace-nowrap z-10"
              >
                {hex}
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
      
      {/* Count indicator */}
      <p className="text-xs text-text-muted mt-2">
        {history.length} color{history.length !== 1 ? 's' : ''} in history
      </p>
    </div>
  );
}
