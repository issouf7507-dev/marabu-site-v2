import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTopInstant, scrollToElementInstant } from "../hooks/useLenis";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Sans ancre : comportement habituel, on remonte en haut à chaque page.
    if (!hash) {
      scrollToTopInstant();
      return;
    }

    // Avec ancre (ex. /services#conseil) : la page cible est chargée à la
    // demande (lazy) et masquée par le rideau de transition — la section
    // n'existe donc pas immédiatement. On sonde à chaque frame jusqu'à la
    // trouver (borné à ~2 s), puis on la vise ; sinon on retombe en haut.
    const id = decodeURIComponent(hash.slice(1));
    let raf = 0;
    let tries = 0;
    const maxTries = 120;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        scrollToElementInstant(el);
      } else if (tries++ < maxTries) {
        raf = requestAnimationFrame(tryScroll);
      } else {
        scrollToTopInstant();
      }
    };
    raf = requestAnimationFrame(tryScroll);

    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
}
