import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import Seo from "../components/Seo";
import ContactForm from "../components/ContactForm";
import { FadeIn } from "../components/ui/fade-in";
import coris2 from "../assets/coris2.webp";
import {
  ACTIVE_SOCIAL_LINKS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
} from "../config/site";

function InfoItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4 group">
      <div
        className="w-10 h-10 shrink-0 flex items-center justify-center transition-colors duration-200"
        style={{ border: "1px solid #ecede330", backgroundColor: "#ecede308" }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-1">
          {label}
        </p>
        <p className="text-sm text-white/75 leading-relaxed whitespace-pre-line group-hover:text-white transition-colors duration-200">
          {value}
        </p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block">
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
}

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <PageTransition>
      <Seo
        title={t("seo.contact.title")}
        description={t("seo.contact.description")}
        path="/contact"
      />
      <div className="min-h-screen bg-[#ecede3]">
        <Navbar />

        <main id="main-content">
          {/* ══ HERO ══ */}
          <section
            className="relative overflow-hidden pt-40 pb-24"
            style={{ backgroundColor: "#1d454c" }}
          >
            {[
              { top: "8%", left: "3%", size: 130, rotate: 20, opacity: 0.12 },
              { top: "55%", left: "0%", size: 90, rotate: -35, opacity: 0.09 },
              { top: "15%", left: "85%", size: 160, rotate: 50, opacity: 0.1 },
              {
                top: "65%",
                left: "90%",
                size: 110,
                rotate: -20,
                opacity: 0.08,
              },
              { top: "35%", left: "48%", size: 200, rotate: 70, opacity: 0.05 },
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
                  filter: "brightness(2)",
                }}
              />
            ))}

            <div className="maxwidth mx-auto px-6 relative">
              <div className="grid lg:grid-cols-2 gap-16 items-end">
                <div>
                  <FadeIn>
                    <p className="text-xs uppercase tracking-[0.35em] text-[#ecede3]/70 mb-5">
                      {t("contact.label")}
                    </p>
                  </FadeIn>
                  <FadeIn delay={0.08}>
                    <h1 className="text-[clamp(3rem,7vw,6.5rem)] font-light leading-none text-[#ecede3]">
                      {t("contact.heroTitle1")}
                      <br />
                      <span style={{ color: "#538253" }}>
                        {t("contact.heroTitle2")}
                      </span>
                    </h1>
                  </FadeIn>
                  <FadeIn delay={0.16}>
                    <p className="text-[#ecede3]/75 text-sm leading-relaxed max-w-md mt-6">
                      {t("contact.heroDesc")}
                    </p>
                  </FadeIn>
                </div>

                {/* Infos de contact dans le hero */}
                <FadeIn delay={0.2}>
                  <div
                    className="space-y-6 lg:pl-8 lg:border-l"
                    style={{ borderColor: "#ecede315" }}
                  >
                    <InfoItem
                      label={t("contact.emailLabel")}
                      value="contact@marabu.services"
                      href="mailto:contact@marabu.services"
                      icon={
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4 text-[#538253]"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      }
                    />
                    <InfoItem
                      label={t("contact.phoneLabel")}
                      value={CONTACT_PHONE}
                      href={CONTACT_PHONE_HREF}
                      icon={
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4 text-[#538253]"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      }
                    />
                    <InfoItem
                      label={t("contact.addressLabel")}
                      value={t("contact.addressValue")}
                      icon={
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4 text-[#538253]"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      }
                    />
                    <InfoItem
                      label={t("contact.hoursLabel")}
                      value={t("contact.hoursValue")}
                      icon={
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4 text-[#538253]"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      }
                    />
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* ══ FORMULAIRE ══ */}
          <section className="maxwidth mx-auto px-6 py-24 relative overflow-hidden">
            {[
              { top: "5%", right: "2%", size: 120, rotate: 18, opacity: 0.06 },
              {
                bottom: "8%",
                left: "1%",
                size: 100,
                rotate: -30,
                opacity: 0.05,
              },
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
                  right: c.right,
                  left: c.left,
                  width: c.size,
                  height: c.size,
                  opacity: c.opacity,
                  transform: `rotate(${c.rotate}deg)`,
                  objectFit: "contain",
                  pointerEvents: "none",
                }}
              />
            ))}

            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-20 items-start">
              {/* Côté gauche — context */}
              <div className="lg:sticky lg:top-32">
                <FadeIn>
                  <p className="text-xs uppercase tracking-[0.3em] text-black/65 mb-5">
                    {t("contact.formTitle")}
                  </p>
                  <h2 className="text-3xl font-light leading-snug text-[#1d454c] mb-6">
                    {t("contact.heroTitle1")}
                    <br />
                    <span style={{ color: "#538253" }}>
                      {t("contact.heroTitle2")}
                    </span>
                  </h2>
                  <p className="text-black/65 text-sm leading-relaxed max-w-sm mb-10">
                    {t("contact.heroDesc")}
                  </p>
                </FadeIn>

                {/* Badge délai */}
                <FadeIn delay={0.1}>
                  <div
                    className="inline-flex items-center gap-3 px-5 py-3"
                    style={{
                      backgroundColor: "#1d454c0a",
                      border: "1px solid #1d454c15",
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#538253]" />
                    <span className="text-xs uppercase tracking-[0.2em] text-[#1d454c]/60">
                      {t("contact.responseTime")}
                    </span>
                  </div>
                </FadeIn>

                {/* Coris décoratif */}
                <FadeIn delay={0.15}>
                  <div className="flex items-center gap-2 mt-12 opacity-15">
                    {[-5, 18, -12, 30, -8].map((rotate, i) => (
                      <img
                        key={i}
                        src={coris2}
                        alt=""
                        aria-hidden="true"
                        style={{
                          width: i % 2 === 0 ? 24 : 18,
                          height: i % 2 === 0 ? 24 : 18,
                          transform: `rotate(${rotate}deg)`,
                          objectFit: "contain",
                        }}
                      />
                    ))}
                  </div>
                </FadeIn>
              </div>

              {/* Formulaire */}
              <FadeIn delay={0.1}>
                <ContactForm />
              </FadeIn>
            </div>
          </section>

          {/* ══ BANDE RÉSEAUX SOCIAUX ══ */}
          <section
            style={{
              borderTop: "1px solid #1d454c18",
              backgroundColor: "#1d454c0a",
            }}
          >
            <div className="maxwidth mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <FadeIn>
                <p className="text-xs uppercase tracking-[0.3em] text-black/65">
                  {t("footer.expertisesTitle")}
                </p>
              </FadeIn>
              <FadeIn delay={0.05}>
                <div className="flex items-center gap-4">
                  {ACTIVE_SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-11 h-11 flex items-center justify-center transition-all duration-200 hover:opacity-100"
                      style={{ border: "1px solid #1d454c25", opacity: 0.5 }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-4 h-4"
                        style={{ color: "#1d454c" }}
                      >
                        <path d={s.path} />
                      </svg>
                    </a>
                  ))}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-xs uppercase tracking-[0.2em] px-6 py-2.5 text-[#ecede3] transition-opacity duration-200 hover:opacity-80"
                    style={{ backgroundColor: "#538253" }}
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </FadeIn>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
