'use client';

import { useRef } from 'react';
import Button, { ButtonAlignment, ButtonWidth } from '@/components/atoms/Button';
import { ImageRevealOptions, useImageReveal } from './gsapHooks';

interface AnimatedButtonProps {
  children: React.ReactNode;
  href: string;
  isExternal: boolean;
  width?: ButtonWidth;
  alignment?: ButtonAlignment;
  ariaLabel: string;
  options?: ImageRevealOptions;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  options = {},
  children,
  href,
  isExternal,
  width,
  alignment,
  ariaLabel,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  useImageReveal(buttonRef, options);

  return (
    <div ref={buttonRef} className={`${alignment === ButtonAlignment.LEFT ? "self-start" : alignment === ButtonAlignment.CENTER ? "self-center" : "self-end"}`}>
      <Button
        href={href}
        isExternal={isExternal}
        width={width}
        ariaLabel={ariaLabel}
      >
        {children}
      </Button>
    </div>
  );
};
