import { motion } from "framer-motion";
import logo from "../assets/Logo_Marabu_.png";
import { FadeIn } from "./ui/fade-in";

const nav = [
  { label: "Accueil", href: "#home" },
  { label: "Introduction", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "Conseil",
  "Services",
  "Intermédiation",
  "Stratégie",
  "Formation",
  "Diplomatie privée",
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Top — CTA statement */}
      <div className="maxwidth  mx-auto px-6 pt-24 pb-16 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <motion.h2
            className="text-[clamp(2.8rem,7vw,7.5rem)] font-light leading-none tracking-tight max-w-3xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0, 0, 1] }}
          >
            Construisons
            <br />
            ensemble.
          </motion.h2>

          <motion.div
            className="flex flex-col gap-4 md:items-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0, 0, 1], delay: 0.2 }}
          >
            <a
              href="mailto:contact@marabu.services"
              className="text-white/60 text-sm hover:text-white transition-colors duration-300"
            >
              contact@marabu.services
            </a>
            <a
              href="#contact"
              className="border border-white/30 text-white/80 text-xs uppercase tracking-[0.2em] px-8 py-3 hover:bg-white hover:text-[#1a1a1a] transition-all duration-300 w-fit"
            >
              Nous contacter
            </a>
          </motion.div>
        </div>
      </div>

      {/* Middle — columns */}
      <div className="maxwidth  mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 border-b border-white/10">
        {/* Brand */}
        <FadeIn className="col-span-2 md:col-span-1 flex flex-col gap-6">
          <img
            src={logo}
            alt="Marabu Services"
            className="h-10 w-auto object-contain brightness-0 invert"
          />
          <p className="text-sm text-white/45 leading-relaxed max-w-xs">
            Allier la sagesse africaine à l'action stratégique moderne, pour des
            solutions qui durent et des impacts qui comptent.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/30">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            Cocody Danga, Abidjan — Côte d'Ivoire
          </div>
        </FadeIn>

        {/* Navigation */}
        <FadeIn delay={0.1}>
          <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-5">
            Navigation
          </p>
          <ul className="space-y-3">
            {nav.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-white/55 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>

        {/* Services */}
        <FadeIn delay={0.15}>
          <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-5">
            Expertises
          </p>
          <ul className="space-y-3">
            {services.map((s) => (
              <li key={s} className="text-sm text-white/55">
                {s}
              </li>
            ))}
          </ul>
        </FadeIn>

        {/* Contact */}
        <FadeIn delay={0.2}>
          <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-5">
            Contact
          </p>
          <div className="space-y-3">
            <a
              href="mailto:contact@marabu.services"
              className="block text-sm text-white/55 hover:text-white transition-colors duration-200"
            >
              contact@marabu.services
            </a>
            <a
              href="tel:+22507207770000"
              className="block text-sm text-white/55 hover:text-white transition-colors duration-200"
            >
              +225 07 20 77 70 00
            </a>
          </div>

          {/* Socials */}
          <div className="flex gap-3 mt-8">
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-9 h-9 border border-white/15 flex items-center justify-center hover:border-white/50 hover:bg-white/10 transition-all duration-200"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3.5 h-3.5 text-white/60"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="X"
              className="w-9 h-9 border border-white/15 flex items-center justify-center hover:border-white/50 hover:bg-white/10 transition-all duration-200"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3.5 h-3.5 text-white/60"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="maxwidth mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/25">
          © 2026 Marabu Services. Tous droits réservés.
        </p>
        <p className="text-xs text-white/25">
          Fondée en 2023 — Abidjan, Côte d'Ivoire
        </p>
      </div>
    </footer>
  );
}
