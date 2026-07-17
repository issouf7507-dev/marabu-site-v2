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

type Partner = { src: string; name: string };

const row1: Partner[] = [
  { src: ministereCommerce, name: 'Ministère du Commerce' },
  { src: cie, name: 'CIE' },
  { src: gs2e, name: 'GS2E' },
  { src: ansut, name: 'ANSUT' },
  { src: poste, name: 'La Poste' },
  { src: nsia, name: 'NSIA Asset Management' },
  { src: visa, name: 'Visa' },
  { src: yango, name: 'Yango' },
  { src: amcham, name: 'AmCham' },
  { src: gudePme, name: 'Guichet Unique de Développement des PME' },
];

const row2: Partner[] = [
  { src: guci, name: 'Guichet Unique du Commerce Extérieur' },
  { src: gdcci, name: 'GDCCI' },
  { src: vitib, name: 'VITIB' },
  { src: cpcs, name: 'CPCS' },
  { src: caderac, name: 'CADERAC' },
  { src: amtTransit, name: 'AMT Transit' },
  { src: oceanTransport, name: 'Ocean Transport' },
  { src: meps, name: 'MEPS' },
  { src: manju, name: 'Manju' },
  { src: aoc, name: 'AOC' },
  { src: mouchoirBlanc, name: 'Mouchoir Blanc' },
];

function Track({ items, reverse = false }: { items: Partner[]; reverse?: boolean }) {
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden relative">
      <div
        className={reverse ? "marquee-track-reverse flex gap-10" : "marquee-track flex gap-10"}
        style={{ width: "max-content" }}
      >
        {track.map((partner, i) => (
          <div
            key={i}
            className="shrink-0 flex items-center justify-center px-8 py-3 border border-black/10 rounded-full select-none"
          >
            <img
              src={partner.src}
              alt={partner.name}
              className="h-10 w-auto object-contain"
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </div>
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

      {/*
        Liste accessible, énoncée UNE seule fois. Le marquee visuel duplique
        chaque logo (…items, …items) pour l'effet de boucle : lu tel quel, un
        lecteur d'écran annoncerait chaque partenaire deux fois. On l'expose
        donc ici en sr-only et on masque le défilement décoratif (aria-hidden).
      */}
      <ul className="sr-only">
        {[...row1, ...row2].map((partner) => (
          <li key={partner.name}>{partner.name}</li>
        ))}
      </ul>

      <div className="relative space-y-4" aria-hidden="true">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-40 z-1 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 z-10  pointer-events-none" />

        <Track items={row1} />
        <Track items={row2} reverse />
      </div>
    </section>
  );
}
