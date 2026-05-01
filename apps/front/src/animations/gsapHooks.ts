'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject, useEffect, useRef } from 'react';
import { SplitText } from './splitText';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Check if we're in a testing environment
const isTestEnvironment = () => {
  if (typeof window === 'undefined') return false;
  return !!(window as unknown as { Cypress?: boolean }).Cypress || process.env.NODE_ENV === 'test';
};

export interface TextRevealOptions {
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  trigger?: string;
  start?: string;
  end?: string;
  splitType?: 'words' | 'chars' | 'lines';
  animationType?: 'slideUp' | 'fadeIn' | 'scaleIn';
}

export interface ImageRevealOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  trigger?: string;
  start?: string;
  end?: string;
  animationType?: 'slideUp' | 'fadeIn' | 'scaleIn' | 'clipPath';
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const useTextReveal = (
  elementRef: RefObject<HTMLElement | null>,
  options: TextRevealOptions = {}
) => {
  const {
    duration = 0.4,
    delay = 0,
    stagger = 0.01,
    ease = 'power2.out',
    trigger,
    start = 'top 90%',
    end = 'bottom 20%',
    splitType = 'words',
    animationType = 'slideUp'
  } = options;

  const splitTextRef = useRef<SplitText | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    // Skip animations in test environment
    if (isTestEnvironment()) {
      return;
    }

    // Create split text instance
    splitTextRef.current = new SplitText(element, {
      type: splitType,
      className: 'split-text-element'
    });

    const elements = splitType === 'words'
      ? splitTextRef.current.words
      : splitType === 'chars'
        ? splitTextRef.current.chars
        : splitTextRef.current.lines;

    if (!elements || elements.length === 0) return;

    // Set initial state based on animation type
    gsap.set(elements, getInitialState(animationType));

    // Create scroll trigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger || element,
        start,
        end,
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(elements, {
      ...getFinalState(animationType),
      duration,
      delay,
      stagger,
      ease
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      splitTextRef.current?.revert();
    };
  }, [elementRef, duration, delay, stagger, ease, trigger, start, end, splitType, animationType]);

  return splitTextRef.current;
};

export const useLineReveal = (
  elementRef: RefObject<HTMLElement | null>,
  options: TextRevealOptions = {}
) => {
  const {
    duration = 0.4,
    delay = 0,
    stagger = 0.01,
    ease = 'power2.out',
    trigger,
    start = 'top 90%',
    end = 'bottom 20%',
    animationType = 'slideUp'
  } = options;
    useEffect(() => {
    if (!elementRef.current) return;
    const element = elementRef.current;

    // Skip animations in test environment
    if (isTestEnvironment()) {
      return;
    }
    const splitText = new SplitText(element, {
      type: 'lines',
      className: 'split-text-element'
    });
    const lines = splitText.lines;
    if (!lines || lines.length === 0) return;
    // Set initial state based on animation type
    gsap.set(lines, getInitialState(animationType));
    // Create scroll trigger animation
    gsap.to(lines, {
      ...getFinalState(animationType),
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: {
        trigger: trigger || element,
        start,
        end,
        toggleActions: 'play none none reverse'
      }
    });
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      splitText.revert();
    };
  }, [elementRef, duration, delay, stagger, ease, trigger, start, end, animationType]);
};

export const useImageReveal = (
  elementRef: RefObject<HTMLElement | null>,
  options: ImageRevealOptions = {}
) => {
  const {
    duration = 0.5,
    delay = 0,
    ease = 'power2.out',
    trigger,
    start = 'top 90%',
    end = 'bottom 20%',
    animationType = 'slideUp',
    direction = 'up'
  } = options;

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    // Skip animations in test environment
    if (isTestEnvironment()) {
      return;
    }

    // Set initial state
    gsap.set(element, getImageInitialState(animationType, direction));

    // Create scroll trigger animation
    gsap.to(element, {
      ...getImageFinalState(animationType),
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: trigger || element,
        start,
        end,
        toggleActions: 'play none none reverse'
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [elementRef, duration, delay, ease, trigger, start, end, animationType, direction]);
};

export const useParallax = (
  elementRef: RefObject<HTMLElement | null>,
  speed: number = 0.5,
  enabled: boolean = true
) => {
  useEffect(() => {
    if (!elementRef.current || !enabled) return;

    const element = elementRef.current;

    // Skip animations in test environment
    if (isTestEnvironment()) {
      return;
    }

    gsap.to(element, {
      yPercent: -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [elementRef, speed, enabled]);
};

// Helper functions for animation states
const getInitialState = (animationType: string) => {
  switch (animationType) {
    case 'slideUp':
      return { y: 20, opacity: 0 };
    case 'fadeIn':
      return { opacity: 0 };
    case 'scaleIn':
      return { scale: 0.9, opacity: 0 };
    default:
      return { y: 20, opacity: 0 };
  }
};

const getFinalState = (animationType: string) => {
  switch (animationType) {
    case 'slideUp':
      return { y: 0, opacity: 1 };
    case 'fadeIn':
      return { opacity: 1 };
    case 'scaleIn':
      return { scale: 1, opacity: 1 };
    default:
      return { y: 0, opacity: 1 };
  }
};

const getImageInitialState = (animationType: string, direction: string) => {
  switch (animationType) {
    case 'slideUp':
      return { y: direction === 'up' ? 100 : -100, opacity: 0 };
    case 'slideLeft':
      return { x: direction === 'left' ? 100 : -100, opacity: 0 };
    case 'fadeIn':
      return { opacity: 0 };
    case 'scaleIn':
      return { scale: 0.8, opacity: 0 };
    case 'clipPath':
      return { clipPath: 'inset(100% 0 0 0)' };
    default:
      return { y: 100, opacity: 0 };
  }
};

const getImageFinalState = (animationType: string) => {
  switch (animationType) {
    case 'slideUp':
    case 'slideLeft':
      return { x: 0, y: 0, opacity: 1 };
    case 'fadeIn':
      return { opacity: 1 };
    case 'scaleIn':
      return { scale: 1, opacity: 1 };
    case 'clipPath':
      return { clipPath: 'inset(0% 0 0 0)' };
    default:
      return { y: 0, opacity: 1 };
  }
};
