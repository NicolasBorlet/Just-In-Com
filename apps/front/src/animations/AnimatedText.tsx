'use client';

import { ElementType, useRef } from 'react';
import { TextRevealOptions, useLineReveal, useTextReveal } from './gsapHooks';

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
  options?: TextRevealOptions;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  className = '',
  as: Component = 'div',
  options = {}
}) => {
  const textRef = useRef<HTMLElement>(null);

  useTextReveal(textRef, options);

  return (
    <Component ref={textRef} className={className}>
      {children}
    </Component>
  );
};

export const AnimatedLine: React.FC<AnimatedTextProps> = ({
    children,
    className = '',
    as: Component = 'div',
    options = {}
  }) => {
    const textRef = useRef<HTMLElement>(null);

    useLineReveal(textRef, options);

    return (
      <Component ref={textRef} className={className}>
        {children}
      </Component>
    );
};


export const AnimatedHeading: React.FC<Omit<AnimatedTextProps, 'as'> & { level?: 1 | 2 | 3 | 4 | 5 | 6 }> = ({
  children,
  className = '',
  level = 1,
  options = {}
}) => {
  const HeadingTag = `h${level}` as ElementType;

  return (
    <AnimatedText as={HeadingTag} className={className} options={options}>
      {children}
    </AnimatedText>
  );
};

export const AnimatedParagraph: React.FC<Omit<AnimatedTextProps, 'as'>> = ({
  children,
  className = '',
  options = {}
}) => {
  return (
    <AnimatedText as="p" className={className} options={options}>
      {children}
    </AnimatedText>
  );
};


export const AnimatedParagraphLine: React.FC<Omit<AnimatedTextProps, 'as'>> = ({
    children,
    className = '',
    options = {}
  }) => {
    return (
      <AnimatedLine as="p" className={className} options={options}>
        {children}
      </AnimatedLine>
    );
  };
