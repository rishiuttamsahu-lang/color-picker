'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Tabs } from './Tabs';
import { UploadZone } from '../Picker/UploadZone';
import { useEyeDropper } from '@/hooks/useEyeDropper';
import { useClipboardPaste } from '@/hooks/useClipboardPaste';
import { Pipette, Link2 } from 'lucide-react';

interface ImageSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageLoad: (image: File | string) => void;
}

export function ImageSelectModal({ isOpen, onClose, onImageLoad }: ImageSelectModalProps) {
  const [activeTab, setActiveTab] = useState('Upload');
  const [imageUrl, setImageUrl] = useState('');
  const { openScanner, isSupported } = useEyeDropper();

  const tabs = ['Upload', 'Image URL', 'Paste', 'Eyedropper'];

  // Handle clipboard paste
  useClipboardPaste({
    onImagePaste: (file) => {
      onImageLoad(file);
      onClose();
    },
  });

  // Handle image upload
  const handleImageLoad = (file: File) => {
    onImageLoad(file);
    onClose();
  };

  // Handle URL load
  const handleUrlLoad = async () => {
    if (!imageUrl.trim()) return;
    
    try {
      const proxyUrl = `/api/proxy?url=${encodeURIComponent(imageUrl)}`;
      onImageLoad(proxyUrl);
      onClose();
    } catch (error) {
      console.error('Failed to load image from URL:', error);
      alert('Failed to load image from URL');
    }
  };

  // Handle eyedropper
  const handleEyedropper = async () => {
    const color = await openScanner();
    if (color) {
      // For eyedropper, we don't load an image but could set a color
      // For now, just close modal
      onClose();
    }
  };

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Upload':
        return <UploadZone onImageLoad={handleImageLoad} />;
      
      case 'Image URL':
        return (
          <div className="text-center space-y-6 py-8">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <Link2 className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Load Image from URL
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Paste an image URL to load it for color picking
              </p>
            </div>
            <div className="max-w-md mx-auto space-y-4">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-400"
                onKeyPress={(e) => e.key === 'Enter' && handleUrlLoad()}
              />
              <button
                onClick={handleUrlLoad}
                className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Load Image
              </button>
            </div>
          </div>
        );
      
      case 'Paste':
        return (
          <div className="text-center space-y-6 py-8">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Paste Image
              </h3>
              <p className="text-sm text-gray-600">
                Press Ctrl+V (or Cmd+V) to paste an image from your clipboard
              </p>
            </div>
          </div>
        );
      
      case 'Eyedropper':
        return (
          <div className="text-center space-y-6 py-8">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Pipette className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Screen Color Picker
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {isSupported 
                  ? 'Click the button below to pick any color from your screen'
                  : 'Use Chrome or Edge for screen picking functionality'
                }
              </p>
            </div>

            {isSupported ? (
              <button
                onClick={handleEyedropper}
                className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2 mx-auto border border-gray-700"
                style={{
                  border: '1px solid #494949',
                  color: 'black',
                  cursor: 'pointer'
                }}
              >
                <Pipette className="w-4 h-4" />
                <span>Open Color Picker</span>
              </button>
            ) : (
              <div className="px-4 py-2 bg-warning/10 text-warning rounded-lg text-sm">
                Browser not supported
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white rounded-2xl w-full max-w-4xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold uppercase text-gray-900">
                SELECT IMAGE
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <Tabs 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
              tabs={tabs} 
            />

            {/* Tab Content */}
            <div className="min-h-[300px]">
              {renderTabContent()}
            </div>

            {/* Footer with privacy text */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                We think data protection is important! No data is sent. The magic happens in your browser.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
