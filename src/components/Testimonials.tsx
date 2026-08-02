import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FadeIn } from "./ui/fade-in";
import coris2 from "../assets/coris2.webp";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  image?: string;
  alt?: string;
};

/**
 * Photo du client, avec repli sur l'initiale : les visuels vivent dans
 * `public/persons/` et peuvent manquer selon le déploiement.
 *
 * L'image est décorative (`alt=""`) : nom, fonction et entreprise sont déjà
 * dans le texte juste à côté. Un alt descriptif les ferait énoncer deux fois
 * par les lecteurs d'écran — même écueil que le marquee (cf. audit A11Y-5).
 * Le champ `alt` reste dans les fichiers i18n comme métadonnée éditoriale.
 */
function Avatar({ item }: { item: Testimonial }) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(item.image) && !failed;

  return (
    <div
      className="w-12 h-12 rounded-full bg-[#538253]/10 flex items-center justify-center shrink-0 overflow-hidden"
      aria-hidden="true"
    >
      {showImage ? (
        <img
          src={item.image}
          alt=""
          width={48}
          height={48}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-[#3f6b3f] font-semibold text-sm">
          {item.name.charAt(0)}
        </span>
      )}
    </div>
  );
}

export default function Testimonials() {
  const { t } = useTranslation();
  const items = t("testimonials.items", {
    returnObjects: true,
  }) as Testimonial[];
  const headingLines = t("testimonials.heading").split("\n");

  return (
    <section
      id="testimonials"
      className="py-24 bg-[#ecede3]"
      style={{ position: "relative", overflow: "hidden" }}
    >
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
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-16">
          <FadeIn>
            <p className="text-[clamp(2rem,5vw,4rem)] uppercase tracking-[0.25em] text-[#538253]">
              {t("testimonials.label")}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl font-light max-w-xs text-right leading-snug text-gray-600">
              {headingLines[0]}
              <br />
              {headingLines[1]}
            </h2>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((t_, i) => (
            <FadeIn key={t_.name} delay={i * 0.08}>
              <figure className="bg-white rounded-2xl p-8 flex flex-col gap-6 h-full">
                <span
                  aria-hidden="true"
                  className="text-6xl font-serif leading-none text-[#538253] select-none"
                >
                  "
                </span>
                <blockquote className="text-gray-600 leading-relaxed text-base flex-1">
                  {t_.quote}
                </blockquote>
                <figcaption className="flex items-center gap-4 pt-2 border-t border-gray-100">
                  <Avatar item={t_} />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {t_.name}
                    </p>
                    <p className="text-gray-600 text-xs">
                      {t_.role} · {t_.company}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
