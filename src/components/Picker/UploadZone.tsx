'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface UploadZoneProps {
  onImageLoad: (file: File) => void;
}

export function UploadZone({ onImageLoad }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => 
      file.type.startsWith('image/') && 
      ['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.type)
    );

    if (imageFile) {
      // Check file size (10MB limit)
      if (imageFile.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      onImageLoad(imageFile);
    }
  }, [onImageLoad]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      onImageLoad(file);
    }
  }, [onImageLoad]);

  return (
    <motion.div
      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
        isDragging 
          ? 'border-primary bg-primary/5' 
          : 'border-gray-300 hover:border-gray-400'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={handleFileSelect}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      
      <div className="flex flex-col items-center space-y-3 pointer-events-none">
        <motion.div
          animate={isDragging ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDragging ? (
            <Upload className="w-12 h-12 text-primary" />
          ) : (
            <ImageIcon className="w-12 h-12 text-gray-400" />
          )}
        </motion.div>
        
        <div>
          <p className="text-lg font-medium text-gray-900">
            {isDragging ? 'Drop image here' : 'Drop image or click to upload'}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            PNG, JPG, WEBP, GIF up to 10MB
          </p>
        </div>
      </div>
    </motion.div>
  );
}
