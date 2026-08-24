import { useEffect, useState } from "react";

/**
 * Renvoie l'id de la section actuellement « active » dans le champ de vision,
 * pour un sommaire latéral qui souligne l'entrée courante.
 *
 * Le `rootMargin` réduit la zone de détection à une bande située dans le tiers
 * supérieur de l'écran : sans ça, deux sections visibles en même temps se
 * disputent l'état actif à chaque pixel de scroll.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const obs = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setActive(id);
        },
        { rootMargin: "-20% 0px -70% 0px" },
      );
      o.observe(el);
      return o;
    });
    return () => obs.forEach((o) => o?.disconnect());
  }, [ids]);

  return active;
}
