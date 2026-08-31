import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import logo from "../assets/Logo_Marabu_.webp";
import { FadeIn } from "./ui/fade-in";
import {
  ACTIVE_SOCIAL_LINKS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
} from "../config/site";

type NavLink = { label: string; href: string };

export default function Footer() {
  const { t } = useTranslation();
  const nav = t("footer.nav", { returnObjects: true }) as NavLink[];
  /*
    Chaque expertise mène à sa section de la page Solutions : les trois pôles
    à la leur, les trois expertises transverses au pôle qui les porte. La
    destination vit dans les fichiers i18n, à côté du libellé, comme pour
    `footer.nav` — sinon un ajout éditorial arriverait sans lien.
  */
  const expertises = t("footer.expertises", {
    returnObjects: true,
  }) as NavLink[];
  const ctaLines = t("footer.cta").split("\n");

  return (
    <footer className="bg-[#1d454c] text-white">
      <div className="maxwidth mx-auto px-6 pt-24 pb-16 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <motion.h2
            className="text-[clamp(2.8rem,7vw,7.5rem)] font-light leading-none tracking-tight max-w-3xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0, 0, 1] }}
          >
            {ctaLines[0]}
            <br />
            {ctaLines[1]}
          </motion.h2>

          <motion.div
            className="flex flex-col gap-4 md:items-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0, 0, 1], delay: 0.2 }}
          >
            <Link
              to="/contact"
              className="border border-white/30 text-white/80 text-xs uppercase tracking-[0.2em] px-8 py-3 hover:bg-[#ecede3] hover:text-[#1d454c] transition-all duration-300 w-fit whitespace-nowrap"
            >
              {t("footer.contactBtn")}
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="maxwidth mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 border-b border-white/10">
        <FadeIn className="col-span-2 md:col-span-1 flex flex-col gap-6">
          <img
            src={logo}
            alt="Marabu"
            className="h-10 w-auto object-contain brightness-0 invert"
          />
          <p className="text-sm text-white/70 leading-relaxed max-w-xs">
            {t("intro.p1").slice(0, 120)}…
          </p>
          <div className="flex items-center gap-2 text-xs text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            {t("footer.address")}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-5">
            {t("footer.navTitle")}
          </p>
          <ul className="space-y-3">
            {nav.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-5">
            {t("footer.expertisesTitle")}
          </p>
          <ul className="space-y-3">
            {expertises.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-5">
            {t("footer.contactTitle")}
          </p>
          <div className="space-y-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="block text-sm text-white/70 hover:text-white transition-colors duration-200"
            >
              {CONTACT_EMAIL}
            </a>
            <a
              href={CONTACT_PHONE_HREF}
              className="block text-sm text-white/70 hover:text-white transition-colors duration-200"
            >
              {CONTACT_PHONE}
            </a>
          </div>
          {ACTIVE_SOCIAL_LINKS.length > 0 && (
            <div className="flex gap-3 mt-8">
              {ACTIVE_SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 border border-white/15 flex items-center justify-center hover:border-white/50 hover:bg-white/10 transition-all duration-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-3.5 h-3.5 text-white/60"
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </FadeIn>
      </div>

      {/*
        pb-24 : le CTA flottant de <FloatingContact /> se pose sur ce bandeau,
        qui est le dernier élément de la page — sans réserve, il recouvrait la
        ligne de droite.
      */}
      <div className="maxwidth mx-auto px-6 pt-6 pb-24 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/70">{t("footer.copyright")}</p>
        <p className="text-xs text-white/70">{t("footer.founded")}</p>
      </div>
    </footer>
  );
}
