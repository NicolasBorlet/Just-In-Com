'use client';

import { useEffect, useState } from 'react';

interface CustomCursorProps {
  isVisible: boolean;
  text?: string;
  variant?: 'default' | 'view' | 'explore';
  size?: 'small' | 'medium' | 'large';
}

export default function CustomCursor({ 
  isVisible, 
  text = "Show detail", 
  variant = 'default',
  size = 'medium'
}: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let lastUpdate = 0;
    
    const updateMousePosition = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastUpdate > 16) { // ~60fps throttle
        setPosition({ x: e.clientX, y: e.clientY });
        lastUpdate = now;
      }
    };

    if (isVisible) {
      document.addEventListener('mousemove', updateMousePosition, { passive: true });
    }
    
    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
    };
  }, [isVisible]);


  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-16 h-16 text-xs';
      case 'large':
        return 'w-32 h-32 text-sm';
      default:
        return 'w-24 h-24 text-xs';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'view':
        return 'bg-gradient-to-br from-blue-500 to-purple-600 text-white border-2 border-white/20';
      case 'explore':
        return 'bg-gradient-to-br from-amber-500 to-orange-600 text-white border-2 border-white/20';
      default:
        return 'bg-white/95 backdrop-blur-sm text-black border-2 border-black/10';
    }
  };

  return (
    <div
      className="fixed pointer-events-none z-50 will-change-transform"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate3d(-50%, -50%, 0) scale(${isVisible ? 1 : 0})`,
        transition: isVisible ? 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)' : 'transform 0.3s ease-in',
      }}
    >
      <div className={`${
        getSizeClasses()
      } ${getVariantClasses()} rounded-full flex items-center justify-center font-medium text-center leading-tight px-3 shadow-2xl`}>
        <span className="animate-pulse">{text}</span>
      </div>
      <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-current" />
    </div>
  );
}
