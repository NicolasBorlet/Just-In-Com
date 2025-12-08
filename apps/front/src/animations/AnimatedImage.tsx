'use client';

import { useRef } from 'react';
import Image, { ImageProps } from 'next/image';
import { ImageRevealOptions, useImageReveal, useParallax } from './gsapHooks';

interface AnimatedImageProps extends Omit<ImageProps, 'ref'> {
  containerClassName?: string;
  options?: ImageRevealOptions;
  parallax?: boolean;
  parallaxSpeed?: number;
}

export const AnimatedImage: React.FC<AnimatedImageProps> = ({
  containerClassName = '',
  options = {},
  parallax = false,
  parallaxSpeed = 0.5,
  className = '',
  ...imageProps
}) => {
  const imageRef = useRef<HTMLDivElement>(null);

  useImageReveal(imageRef, options);
  useParallax(imageRef, parallaxSpeed, parallax);

  return (
    <div ref={imageRef} className={`overflow-hidden ${containerClassName}`}>
      <Image
        {...imageProps}
        className={`w-full h-full object-cover object-center ${className}`}
      />
    </div>
  );
};

interface AnimatedBackgroundImageProps {
  src: string;
  alt?: string;
  children?: React.ReactNode;
  className?: string;
  options?: ImageRevealOptions;
  parallax?: boolean;
  parallaxSpeed?: number;
}

export const AnimatedBackgroundImage: React.FC<AnimatedBackgroundImageProps> = ({
  src,
  alt = '',
  children,
  className = '',
  options = {},
  parallax = false,
  parallaxSpeed = 0.5
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useImageReveal(containerRef, options);
  useParallax(containerRef, parallaxSpeed, parallax);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${src})` }}
        role="img"
        aria-label={alt}
      />
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
};