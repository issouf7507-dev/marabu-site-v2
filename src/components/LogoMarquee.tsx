import { FadeIn } from './ui/fade-in';

import ministereCommerce from '../assets/imgs/partners/logo ministere du commerce.png';
import cie from '../assets/imgs/partners/CIE.png';
import gs2e from '../assets/imgs/partners/GS2E.jpeg';
import ansut from '../assets/imgs/partners/logo-ansut.png';
import poste from '../assets/imgs/partners/logo-poste.png';
import nsia from '../assets/imgs/partners/logos-nsia-am.webp';
import visa from '../assets/imgs/partners/logo visa.png';
import yango from '../assets/imgs/partners/yango.png';
import amcham from '../assets/imgs/partners/Amcham-Logo-new-ok.png';
import gudePme from '../assets/imgs/partners/Logo-GUDE-PME.png';
import guci from '../assets/imgs/partners/GUCI-CI-Logo.png';
import gdcci from '../assets/imgs/partners/logo_GDCCI.png';
import vitib from '../assets/imgs/partners/logo-vitib.png';
import cpcs from '../assets/imgs/partners/cpcs.png';
import caderac from '../assets/imgs/partners/caderac.png';
import amtTransit from '../assets/imgs/partners/logo-amt transit.png';
import oceanTransport from '../assets/imgs/partners/ocean transport.jpeg';
import meps from '../assets/imgs/partners/meps.png';
import manju from '../assets/imgs/partners/manju logo.png';
import aoc from '../assets/imgs/partners/AOC.webp';
import mouchoirBlanc from '../assets/imgs/partners/Mouchoir Blqnc.png';

/*
  `url` est optionnel : les partenaires sans site connu restent affichés, mais
  sous forme de simple vignette non cliquable (pas de lien mort).
*/
type Partner = { src: string; name: string; url?: string };

const row1: Partner[] = [
  { src: ministereCommerce, name: 'Ministère du Commerce', url: 'https://www.commerce.gouv.ci/' },
  { src: cie, name: 'CIE', url: 'https://www.cie.ci/' },
  { src: gs2e, name: 'GS2E', url: 'https://www.gs2e.ci/' },
  { src: ansut, name: 'ANSUT', url: 'https://ansut.ci/' },
  { src: poste, name: 'La Poste', url: 'https://laposte.ci.post/' },
  { src: nsia, name: 'NSIA Asset Management', url: 'https://nsia-asset.com/' },
  { src: visa, name: 'Visa', url: 'https://www.visa.com/' },
  { src: yango, name: 'Yango', url: 'https://yango.com/' },
  { src: amcham, name: 'AmCham', url: 'https://amcham-ci.org/' },
  { src: gudePme, name: 'Guichet Unique de Développement des PME' },
];

const row2: Partner[] = [
  { src: guci, name: 'Guichet Unique du Commerce Extérieur', url: 'https://guce.gouv.ci/' },
  { src: gdcci, name: 'GDCCI' },
  { src: vitib, name: 'VITIB', url: 'https://www.vitib.ci/' },
  { src: cpcs, name: 'CPCS' },
  { src: caderac, name: 'CADERAC' },
  { src: amtTransit, name: 'AMT Transit' },
  { src: oceanTransport, name: 'Ocean Transport' },
  { src: meps, name: 'MEPS' },
  { src: manju, name: 'Manju' },
  { src: aoc, name: 'AOC' },
  { src: mouchoirBlanc, name: 'Mouchoir Blanc' },
];

const FRAME =
  'flex items-center justify-center px-8 py-3 border border-black/10 rounded-full select-none';

function LogoItem({ partner, clone = false }: { partner: Partner; clone?: boolean }) {
  const logo = (
    <img
      src={partner.src}
      alt={clone ? '' : partner.name}
      className="h-10 w-auto object-contain"
      loading="lazy"
      draggable={false}
    />
  );

  return (
    // Les clones ne servent qu'à boucler visuellement : masqués aux lecteurs
    // d'écran, et sortis du parcours de tabulation via tabIndex={-1} plus bas.
    <li className="shrink-0" aria-hidden={clone || undefined}>
      {partner.url ? (
        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={clone ? -1 : undefined}
          className={`${FRAME} transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50 focus-visible:ring-offset-2`}
        >
          {logo}
          {!clone && <span className="sr-only"> (nouvel onglet)</span>}
        </a>
      ) : (
        <div className={FRAME}>{logo}</div>
      )}
    </li>
  );
}

function Track({ items, reverse = false }: { items: Partner[]; reverse?: boolean }) {
  return (
    <div className="overflow-hidden relative">
      <ul
        className={reverse ? 'marquee-track-reverse flex gap-10' : 'marquee-track flex gap-10'}
        style={{ width: 'max-content' }}
      >
        {items.map((partner) => (
          <LogoItem key={partner.name} partner={partner} />
        ))}
        {items.map((partner) => (
          <LogoItem key={`clone-${partner.name}`} partner={partner} clone />
        ))}
      </ul>
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <section className=" pb-10">
      <FadeIn className="text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-black/60 mb-12" >
          Ils nous font confiance
        </p>
      </FadeIn>

      <div className="relative space-y-4">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-40 z-1 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 z-10  pointer-events-none" />

        <Track items={row1} />
        <Track items={row2} reverse />
      </div>
    </section>
  );
}
