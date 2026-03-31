'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pipette, Link2 } from 'lucide-react';
import { Tabs } from '@/components/UI/Tabs';
import { UploadZone } from './UploadZone';
import { ImageCanvas } from '@/components/Canvas/ImageCanvas';
import { useEyeDropper } from '@/hooks/useEyeDropper';
import { useClipboardPaste } from '@/hooks/useClipboardPaste';
import { useColourStore } from '@/store/useColourStore';

export function InputArea() {
  const [activeTab, setActiveTab] = useState('Eyedropper');
  const [imageUrl, setImageUrl] = useState('');
  const [loadedImage, setLoadedImage] = useState<File | string | null>(null);
  const { openScanner, isSupported } = useEyeDropper();
  const { setColour } = useColourStore();

  const tabs = ['Eyedropper', 'Upload / Paste', 'Image URL'];

  // Handle clipboard paste
  useClipboardPaste({
    onImagePaste: (file) => {
      setLoadedImage(file);
      setActiveTab('Upload / Paste');
    },
  });

  // Handle eyedropper
  const handleEyedropper = async () => {
    const color = await openScanner();
    if (color) {
      // Convert hex to RGB and set in store
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      
      // Set the picked color in store
      setColour(r, g, b, 1);
    }
  };

  // Handle image upload
  const handleImageLoad = (file: File) => {
    setLoadedImage(file);
  };

  // Handle URL load
  const handleUrlLoad = async () => {
    if (!imageUrl.trim()) return;
    
    try {
      // Use our proxy API to avoid CORS issues
      const proxyUrl = `/api/proxy?url=${encodeURIComponent(imageUrl)}`;
      setLoadedImage(proxyUrl);
    } catch (error) {
      console.error('Failed to load image from URL:', error);
      alert('Failed to load image from URL');
    }
  };

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Eyedropper':
        return (
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Pipette className="w-10 h-10 text-primary" />
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
                <motion.button
                  onClick={openScanner}
                  className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2 mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Pipette className="w-4 h-4" />
                  <span>Open Color Picker</span>
                </motion.button>
              ) : (
                <div className="px-4 py-2 bg-warning/10 text-warning rounded-lg text-sm">
                  Browser not supported
                </div>
              )}
            </motion.div>
          </div>
        );

      case 'Upload / Paste':
        return (
          <div className="h-full">
            {loadedImage ? (
              <ImageCanvas imageSource={loadedImage} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <UploadZone onImageLoad={handleImageLoad} />
              </div>
            )}
          </div>
        );

      case 'Image URL':
        return (
          <div className="h-full">
            {loadedImage ? (
              <ImageCanvas imageSource={loadedImage} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full space-y-6">
                <motion.div
                  className="w-full max-w-md space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Link2 className="w-8 h-8 text-gray-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Load Image from URL
                    </h3>
                    <p className="text-sm text-gray-600">
                      Paste an image URL to load it for color picking
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && handleUrlLoad()}
                    />
                    <motion.button
                      onClick={handleUrlLoad}
                      className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Load
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-full min-h-[500px]">
      <div className="space-y-6 h-full">
        {/* Tabs */}
        <Tabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          tabs={tabs} 
        />

        {/* Tab Content */}
        <div className="flex-1 min-h-0">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
