import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { frame, cancelFrame } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let _lenis: Lenis | null = null;

export function scrollToTopInstant() {
  if (_lenis) {
    _lenis.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo(0, 0);
  }
}

export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    _lenis = lenis;

    // Keep GSAP ScrollTrigger in sync with Lenis scroll position
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);

    // Run Lenis inside Framer Motion's RAF so useScroll stays in sync
    const update = ({ timestamp }: { timestamp: number }) => {
      lenis.raf(timestamp);
    };

    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenis.destroy();
      _lenis = null;
    };
  }, [enabled]);
}
