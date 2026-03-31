'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clipboard, Check } from 'lucide-react';

interface CopyButtonProps {
  value: string;
  className?: string;
}

export function CopyButton({ value, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      className={`p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer ${className}`}
      whileTap={{ scale: 0.95 }}
      title={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      <motion.div
        key={copied ? 'check' : 'clipboard'}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Clipboard className="w-4 h-4" />
        )}
      </motion.div>
    </motion.button>
  );
}
