import { useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import { FadeIn } from "../components/ui/fade-in";
import coris2 from "../assets/coris2.png";

const ease = [0.25, 0, 0, 1] as const;

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
        style={{ border: "1px solid #eff3d430", backgroundColor: "#eff3d408" }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-white/35 mb-1">{label}</p>
        <p className="text-sm text-white/75 leading-relaxed whitespace-pre-line group-hover:text-white transition-colors duration-200">
          {value}
        </p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block">{inner}</a>
  ) : (
    <div>{inner}</div>
  );
}

export default function ContactPage() {
  const { t } = useTranslation();
  const services = t("contact.services", { returnObjects: true }) as string[];

  const [form, setForm] = useState({
    name: "", email: "", organisation: "", service: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputStyle = {
    border: "1px solid #1d454c33",
    backgroundColor: "#fff",
  };
  const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "#538253";
    e.target.style.outline = "none";
  };
  const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "#1d454c33";
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#eff3d4]">
        <Navbar />

        {/* ══ HERO ══ */}
        <section
          className="relative overflow-hidden pt-40 pb-24"
          style={{ backgroundColor: "#1d454c" }}
        >
          {[
            { top: "8%",  left: "3%",  size: 130, rotate: 20,  opacity: 0.12 },
            { top: "55%", left: "0%",  size: 90,  rotate: -35, opacity: 0.09 },
            { top: "15%", left: "85%", size: 160, rotate: 50,  opacity: 0.10 },
            { top: "65%", left: "90%", size: 110, rotate: -20, opacity: 0.08 },
            { top: "35%", left: "48%", size: 200, rotate: 70,  opacity: 0.05 },
          ].map((c, i) => (
            <img key={i} src={coris2} alt="" aria-hidden="true"
              style={{ position: "absolute", top: c.top, left: c.left, width: c.size,
                height: c.size, opacity: c.opacity, transform: `rotate(${c.rotate}deg)`,
                objectFit: "contain", pointerEvents: "none", filter: "brightness(2)" }}
            />
          ))}

          <div className="maxwidth mx-auto px-6 relative">
            <div className="grid lg:grid-cols-2 gap-16 items-end">
              <div>
                <FadeIn>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#eff3d4]/40 mb-5">
                    {t("contact.label")}
                  </p>
                </FadeIn>
                <FadeIn delay={0.08}>
                  <h1 className="text-[clamp(3rem,7vw,6.5rem)] font-light leading-none text-[#eff3d4]">
                    {t("contact.heroTitle1")}<br />
                    <span style={{ color: "#538253" }}>{t("contact.heroTitle2")}</span>
                  </h1>
                </FadeIn>
                <FadeIn delay={0.16}>
                  <p className="text-[#eff3d4]/50 text-sm leading-relaxed max-w-md mt-6">
                    {t("contact.heroDesc")}
                  </p>
                </FadeIn>
              </div>

              {/* Infos de contact dans le hero */}
              <FadeIn delay={0.2}>
                <div className="space-y-6 lg:pl-8 lg:border-l" style={{ borderColor: "#eff3d415" }}>
                  <InfoItem
                    label={t("contact.emailLabel")}
                    value="contact@marabu.services"
                    href="mailto:contact@marabu.services"
                    icon={
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#538253]">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    }
                  />
                  <InfoItem
                    label={t("contact.phoneLabel")}
                    value={t("contact.phoneValue")}
                    href="tel:+22507207770000"
                    icon={
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#538253]">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    }
                  />
                  <InfoItem
                    label={t("contact.addressLabel")}
                    value={t("contact.addressValue")}
                    icon={
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#538253]">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    }
                  />
                  <InfoItem
                    label={t("contact.hoursLabel")}
                    value={t("contact.hoursValue")}
                    icon={
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#538253]">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
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
            { top: "5%",  right: "2%", size: 120, rotate: 18,  opacity: 0.06 },
            { bottom: "8%", left: "1%", size: 100, rotate: -30, opacity: 0.05 },
          ].map((c, i) => (
            <img key={i} src={coris2} alt="" aria-hidden="true"
              style={{ position: "absolute", top: c.top, bottom: c.bottom, right: c.right,
                left: c.left, width: c.size, height: c.size, opacity: c.opacity,
                transform: `rotate(${c.rotate}deg)`, objectFit: "contain", pointerEvents: "none" }}
            />
          ))}

          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-20 items-start">

            {/* Côté gauche — context */}
            <div className="lg:sticky lg:top-32">
              <FadeIn>
                <p className="text-xs uppercase tracking-[0.3em] text-black/30 mb-5">
                  {t("contact.formTitle")}
                </p>
                <h2 className="text-3xl font-light leading-snug text-[#1d454c] mb-6">
                  {t("contact.heroTitle1")}<br />
                  <span style={{ color: "#538253" }}>{t("contact.heroTitle2")}</span>
                </h2>
                <p className="text-black/50 text-sm leading-relaxed max-w-sm mb-10">
                  {t("contact.heroDesc")}
                </p>
              </FadeIn>

              {/* Badge délai */}
              <FadeIn delay={0.1}>
                <div className="inline-flex items-center gap-3 px-5 py-3"
                  style={{ backgroundColor: "#1d454c0a", border: "1px solid #1d454c15" }}>
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
                    <img key={i} src={coris2} alt="" aria-hidden="true"
                      style={{ width: i % 2 === 0 ? 24 : 18, height: i % 2 === 0 ? 24 : 18,
                        transform: `rotate(${rotate}deg)`, objectFit: "contain" }}
                    />
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Formulaire */}
            <FadeIn delay={0.1}>
              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center text-center py-24"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <div className="flex items-center gap-3 mb-8 opacity-20">
                    {[0, 15, -10].map((r, i) => (
                      <img key={i} src={coris2} alt="" aria-hidden="true"
                        style={{ width: 30, height: 30, transform: `rotate(${r}deg)`, objectFit: "contain" }}
                      />
                    ))}
                  </div>
                  <div className="w-14 h-14 flex items-center justify-center mb-6"
                    style={{ backgroundColor: "#538253" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-6 h-6">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#538253] mb-3">
                    {t("contact.successLabel")}
                  </p>
                  <h3 className="text-2xl font-light text-[#1d454c] mb-2">
                    {t("contact.successTitle")}
                  </h3>
                  <p className="text-black/45 text-sm">{t("contact.successDesc")}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Nom + Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-black/40 mb-2">
                        {t("contact.fields.name")} <span style={{ color: "#538253" }}>*</span>
                      </label>
                      <input name="name" type="text" required value={form.name} onChange={handleChange}
                        placeholder={t("contact.fields.namePlaceholder")}
                        className="w-full px-4 py-3 text-sm text-[#1d454c] placeholder-black/25 transition-all duration-200"
                        style={inputStyle} onFocus={inputFocus} onBlur={inputBlur}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-black/40 mb-2">
                        {t("contact.fields.email")} <span style={{ color: "#538253" }}>*</span>
                      </label>
                      <input name="email" type="email" required value={form.email} onChange={handleChange}
                        placeholder={t("contact.fields.emailPlaceholder")}
                        className="w-full px-4 py-3 text-sm text-[#1d454c] placeholder-black/25 transition-all duration-200"
                        style={inputStyle} onFocus={inputFocus} onBlur={inputBlur}
                      />
                    </div>
                  </div>

                  {/* Organisation */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-black/40 mb-2">
                      {t("contact.fields.org")}
                    </label>
                    <input name="organisation" type="text" value={form.organisation} onChange={handleChange}
                      placeholder={t("contact.fields.orgPlaceholder")}
                      className="w-full px-4 py-3 text-sm text-[#1d454c] placeholder-black/25 transition-all duration-200"
                      style={inputStyle} onFocus={inputFocus} onBlur={inputBlur}
                    />
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-black/40 mb-2">
                      {t("contact.fields.service")}
                    </label>
                    <select name="service" value={form.service} onChange={handleChange}
                      className="w-full px-4 py-3 text-sm text-[#1d454c] transition-all duration-200 cursor-pointer"
                      style={inputStyle}
                    >
                      <option value="">{t("contact.fields.servicePlaceholder")}</option>
                      {services.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-black/40 mb-2">
                      {t("contact.fields.message")} <span style={{ color: "#538253" }}>*</span>
                    </label>
                    <textarea name="message" required rows={6} value={form.message} onChange={handleChange}
                      placeholder={t("contact.fields.messagePlaceholder")}
                      className="w-full px-4 py-3 text-sm text-[#1d454c] placeholder-black/25 transition-all duration-200 resize-none"
                      style={inputStyle} onFocus={inputFocus} onBlur={inputBlur}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full py-4 text-xs uppercase tracking-[0.25em] text-[#eff3d4] transition-opacity duration-200"
                    style={{ backgroundColor: "#1d454c" }}
                    whileHover={{ opacity: 0.85 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t("contact.submit")}
                  </motion.button>
                </form>
              )}
            </FadeIn>
          </div>
        </section>

        {/* ══ BANDE RÉSEAUX SOCIAUX ══ */}
        <section style={{ borderTop: "1px solid #1d454c18", backgroundColor: "#1d454c0a" }}>
          <div className="maxwidth mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <FadeIn>
              <p className="text-xs uppercase tracking-[0.3em] text-black/30">
                {t("footer.expertisesTitle")}
              </p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <div className="flex items-center gap-4">
                {[
                  { label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                  { label: "X / Twitter", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                ].map((s) => (
                  <a key={s.label} href="#" aria-label={s.label}
                    className="w-10 h-10 flex items-center justify-center transition-all duration-200 hover:opacity-100"
                    style={{ border: "1px solid #1d454c25", opacity: 0.5 }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" style={{ color: "#1d454c" }}>
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
                <a href="mailto:contact@marabu.services"
                  className="text-xs uppercase tracking-[0.2em] px-6 py-2.5 text-[#eff3d4] transition-opacity duration-200 hover:opacity-80"
                  style={{ backgroundColor: "#538253" }}>
                  contact@marabu.services
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
