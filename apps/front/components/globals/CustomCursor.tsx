'use client';

import { useEffect, useState } from 'react';

interface CustomCursorProps {
  isVisible: boolean;
  text?: string;
}

export default function CustomCursor({ isVisible, text = "Show detail" }: CustomCursorProps) {
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


  return (
    <div
      className="fixed pointer-events-none z-50 will-change-transform"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate3d(-50%, -50%, 0) scale(${isVisible ? 1 : 0})`,
        transition: isVisible ? 'transform 0.3s ease-out' : 'transform 0.2s ease-in',
      }}
    >
      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-black text-xs font-medium text-center leading-tight px-2 shadow-lg opacity-85">
        {text}
      </div>
    </div>
  );
}
