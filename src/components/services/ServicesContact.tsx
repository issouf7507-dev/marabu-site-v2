import { useTranslation } from "react-i18next";
import { FadeIn } from "../ui/fade-in";
import ContactForm from "../ContactForm";
import coris2 from "../../assets/coris2.webp";

/**
 * Section de contact de la page Services : décor, coordonnées, et le
 * formulaire commun au site (`ContactForm`). Porte l'ancre `#contact` visée
 * par les CTA de la page.
 */
export default function ServicesContact() {
  const { t } = useTranslation();
  return (
    /*
      `id` + `scroll-mt` : cible des CTA de la page (« Nous contacter »,
      « Discutons de votre projet »). La marge dégage la hauteur de la navbar
      fixe, sinon l'entête de la section passe dessous.
    */
    <section
      id="contact"
      className="scroll-mt-24"
      style={{ borderTop: "1px solid #1d454c33", backgroundColor: "#ecede3" }}
    >
      <div className="maxwidth mx-auto px-6 lg:px-12 py-24 relative overflow-hidden">
        {/* Cauris décoratifs */}
        {[
          { top: "8%", right: "3%", size: 140, rotate: 20, opacity: 0.04 },
          { bottom: "10%", left: "2%", size: 110, rotate: -30, opacity: 0.03 },
          { top: "50%", right: "12%", size: 90, rotate: 55, opacity: 0.03 },
        ].map((c, i) => (
          <img
            key={i}
            src={coris2}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              top: c.top,
              bottom: c.bottom,
              left: c.left,
              right: c.right,
              width: c.size,
              height: c.size,
              opacity: c.opacity,
              transform: `rotate(${c.rotate}deg)`,
              objectFit: "contain",
              pointerEvents: "none",
            }}
          />
        ))}

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-20 items-start">
          {/* ── Côté gauche ── */}
          <div>
            <FadeIn>
              <p className="text-xs uppercase tracking-[0.35em] text-black/60 mb-5">
                {t("servicesPage.contact.eyebrow")}
              </p>
              <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-light leading-tight text-gray-900 mb-6">
                {t("servicesPage.contact.heading1")}
                <br />
                <span style={{ color: "#538253" }}>
                  {t("servicesPage.contact.heading2")}
                </span>
              </h2>
              <p className="text-black/65 text-sm leading-relaxed max-w-sm mb-10">
                {t("servicesPage.contact.desc")}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="space-y-4">
                <a
                  href="mailto:contact@marabu.services"
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#3f6b3f] transition-colors duration-200"
                >
                  <span
                    className="w-8 h-8 flex items-center justify-center"
                    style={{ border: "1px solid #e5e7eb" }}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </span>
                  contact@marabu.services
                </a>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <span
                    className="w-8 h-8 flex items-center justify-center"
                    style={{ border: "1px solid #e5e7eb" }}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  {t("servicesPage.contact.address")}
                </div>
              </div>
            </FadeIn>

            {/* Cauris décoratif */}
            <FadeIn delay={0.2}>
              <div className="flex items-center gap-2 mt-12 opacity-10">
                {[-5, 18, -12, 30].map((rotate, i) => (
                  <img
                    key={i}
                    src={coris2}
                    alt=""
                    aria-hidden="true"
                    style={{
                      width: i % 2 === 0 ? 22 : 17,
                      height: i % 2 === 0 ? 22 : 17,
                      transform: `rotate(${rotate}deg)`,
                      objectFit: "contain",
                    }}
                  />
                ))}
              </div>
            </FadeIn>
          </div>

          {/* ── Formulaire ── */}
          <FadeIn delay={0.1}>
            <ContactForm idPrefix="services-contact" source="Services" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
