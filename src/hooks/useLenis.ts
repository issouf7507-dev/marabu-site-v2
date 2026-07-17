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

// Saut instantané vers un élément (ancre). Via Lenis quand il pilote le scroll
// (avec un offset pour ne pas passer sous la navbar fixe), sinon scrollIntoView
// qui respecte nativement le scroll-margin (scroll-mt-*) des sections.
export function scrollToElementInstant(target: HTMLElement) {
  if (_lenis) {
    _lenis.scrollTo(target, { immediate: true, offset: -100 });
  } else {
    target.scrollIntoView({ behavior: "auto", block: "start" });
  }
}

// Retour en haut animé (bouton « back to top »). Passe par Lenis quand il pilote
// le scroll, sinon repli sur le smooth natif. Respecte prefers-reduced-motion :
// on saute directement en haut plutôt que d'imposer un défilement animé.
export function scrollToTop() {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (_lenis) {
    _lenis.scrollTo(0, reduce ? { immediate: true } : { duration: 1 });
  } else {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }
}

export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    // Le scroll inertiel est du mouvement non sollicité : on laisse le scroll
    // natif à qui a activé prefers-reduced-motion (cf. audit M8).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
