import { FadeIn } from "./ui/fade-in";
import coris2 from "../assets/coris2.png";

const testimonials = [
  {
    quote:
      "Marabu nous a aidés à structurer notre stratégie de croissance en Afrique de l'Ouest avec une clarté et une méthode que nous n'avions jamais eu auparavant.",
    name: "Aminata Koné",
    role: "Directrice Générale",
    company: "Groupe Soleil Invest",
  },
  {
    quote:
      "Leur réseau et leur discrétion dans les négociations institutionnelles ont été déterminants pour l'aboutissement de notre partenariat avec les autorités locales.",
    name: "Jean-Pierre Assoumou",
    role: "Directeur des Affaires Publiques",
    company: "TechBridge Africa",
  },
  {
    quote:
      "Une équipe qui comprend véritablement les réalités du terrain africain. Les formations délivrées ont transformé la posture de nos équipes dirigeantes.",
    name: "Dr. Fatoumata Bah",
    role: "Responsable RH & Formation",
    company: "UEMOA Partners",
  },
  {
    quote:
      "Marabu a su nous ouvrir des portes que nous pensions fermées. Leur approche mêlant stratégie et culture est un vrai différenciateur.",
    name: "Koffi Mensah",
    role: "CEO",
    company: "Meridian Capital CI",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 bg-[#f0f7f6]"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Coris décoratifs */}
      {[
        { top: "8%", left: "1%", size: 75, rotate: 25, opacity: 0.14 },
        { top: "55%", left: "0%", size: 55, rotate: -40, opacity: 0.11 },
        { top: "80%", left: "5%", size: 65, rotate: 60, opacity: 0.13 },
        { top: "15%", left: "91%", size: 80, rotate: -20, opacity: 0.14 },
        { top: "60%", left: "94%", size: 50, rotate: 50, opacity: 0.1 },
        { top: "88%", left: "85%", size: 70, rotate: -65, opacity: 0.12 },
      ].map((c, i) => (
        <img
          key={i}
          src={coris2}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: c.top,
            left: c.left,
            width: c.size,
            height: c.size,
            opacity: c.opacity,
            transform: `rotate(${c.rotate}deg)`,
            objectFit: "contain",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      ))}

      <div className="maxwidth mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <FadeIn>
            <p className="text-[clamp(2rem,5vw,4rem)] uppercase tracking-[0.25em] text-[#009689]">
              Témoignages
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl font-light max-w-xs text-right leading-snug text-gray-500">
              Ce que disent
              <br />
              nos clients.
            </h2>
          </FadeIn>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="bg-white rounded-2xl p-8 flex flex-col gap-6 h-full">
                {/* Guillemet décoratif */}
                <span className="text-6xl font-serif leading-none text-[#009689] select-none">
                  "
                </span>
                <p className="text-gray-500 leading-relaxed text-base flex-1">
                  {t.quote}
                </p>
                <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#009689]/10 flex items-center justify-center shrink-0">
                    <span className="text-[#009689] font-semibold text-sm">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {t.name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
