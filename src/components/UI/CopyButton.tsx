/**
 * Animated Copy Button Component
 * Provides visual feedback when copying to clipboard
 */

'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clipboard, Check } from 'lucide-react';

interface CopyButtonProps {
  value: string;
  label?: string;
}

export function CopyButton({ value, label = 'Copy' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  /**
   * Copy text to clipboard with fallback
   */
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      
      // Reset after 1.5 seconds
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error('Failed to copy:', error);
      
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = value;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        document.execCommand('copy');
        setCopied(true);
        
        setTimeout(() => {
          setCopied(false);
        }, 1500);
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError);
      }
      
      document.body.removeChild(textArea);
    }
  }, [value]);

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-surface transition-colors group"
      aria-label={`${label} ${value}`}
      type="button"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.div
            key="success"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Check className="w-4 h-4 text-success" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Clipboard className="w-4 h-4 text-text-muted group-hover:text-text-secondary transition-colors" />
          </motion.div>
        )}
      </AnimatePresence>
      
      <span className={`text-xs font-medium transition-colors ${
        copied 
          ? 'text-success' 
          : 'text-text-muted group-hover:text-text-secondary'
      }`}>
        {copied ? 'Copied!' : label}
      </span>
    </button>
  );
}
