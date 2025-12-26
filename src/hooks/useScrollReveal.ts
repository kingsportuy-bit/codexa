import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useScrollReveal = (
  options: {
    duration?: number;
    delay?: number;
    y?: number;
    x?: number;
    opacity?: number;
    stagger?: number;
    ease?: string;
    once?: boolean;
  } = {}
) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    duration = 0.8,
    delay = 0,
    y = 30,
    x = 0,
    opacity = 0,
    stagger = 0,
    ease = 'power3.out',
    once = true
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll('.scroll-reveal');
    
    if (elements.length > 0) {
      gsap.fromTo(
        elements,
        { opacity, y, x },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          delay,
          stagger,
          ease,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: once ? 'play none none none' : 'play none none reverse'
          }
        }
      );
    }

    // Limpiar ScrollTrigger al desmontar
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [duration, delay, y, x, opacity, stagger, ease, once]);

  return { ref };
};