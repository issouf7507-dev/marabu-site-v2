// Replace placeholder strings with <img src={logoX} alt="Company" /> when real logos are available
import { FadeIn } from './ui/fade-in';

const row1 = [
  "Ministère de l'Économie",
  "Orange CI",
  "Ecobank",
  "BOAD",
  "MTN Group",
  "Total Energies",
];

const row2 = [
  "Société Ivoirienne de Banque",
  "CEDEAO",
  "Bolloré Africa",
  "African Development Bank",
  "Moov Africa",
  "Côte d'Ivoire Telecom",
];

function Track({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden relative">
      <div
        className={reverse ? "marquee-track-reverse flex gap-10" : "marquee-track flex gap-10"}
        style={{ width: "max-content" }}
      >
        {track.map((name, i) => (
          <div
            key={i}
            className="shrink-0 flex items-center gap-3 px-6 py-3 border border-black/10 rounded-full text-sm whitespace-nowrap select-none"
          >
            {/* Logo placeholder — swap this div for <img> */}
            <div className="w-5 h-5 rounded-full bg-black/10 shrink-0" />
            {name}
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
        <p className="text-xs uppercase tracking-[0.25em] text-black/35 mb-12" >
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

