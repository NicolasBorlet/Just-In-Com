'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface ImagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
  title?: string;
  description?: string;
}

export default function ImagePopup({ isOpen, onClose, imageUrl, alt, title, description }: ImagePopupProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative max-w-6xl max-h-[90vh] w-full mx-4 bg-white rounded-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
          aria-label="Close popup"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative">
          <div className="aspect-square md:aspect-video w-full relative">
            <Image
              src={imageUrl}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority
            />
          </div>
          
          {(title || description) && (
            <div className="p-6 bg-white">
              {title && (
                <h3 className="text-xl font-medium mb-2 text-gray-900">{title}</h3>
              )}
              {description && (
                <p className="text-gray-600 leading-relaxed">{description}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}