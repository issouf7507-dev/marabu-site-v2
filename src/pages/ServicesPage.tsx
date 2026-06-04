import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FadeIn } from "../components/ui/fade-in";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import coris2 from "../assets/coris2.png";
import bgLoader from "../assets/imgs/Cauris-bg.png";
import conseil1 from "../assets/imgs/conseils/conseil-1.jpg";
import conseil2 from "../assets/imgs/conseils/conseil-2.jpg";
import conseil3 from "../assets/imgs/conseils/conseil-3.jpg";
import conseil4 from "../assets/imgs/conseils/conseil-4.jpg";
import conseil7 from "../assets/imgs/conseils/conseil-7.jpg";
import conseil8 from "../assets/imgs/conseils/conseil-8.jpg";
import conseil9 from "../assets/imgs/conseils/conseil-9.jpg";
import services1 from "../assets/imgs/services/services-1.jpg";
import services2 from "../assets/imgs/services/services-2.jpg";
import services5 from "../assets/imgs/services/services-5.jpg";
import services6 from "../assets/imgs/services/services-6.jpg";
import services7 from "../assets/imgs/services/services-7.jpg";
import services8 from "../assets/imgs/services/services-8.jpg";
import inter1 from "../assets/imgs/intermediation/intermediation-1.jpg";
import inter2 from "../assets/imgs/intermediation/intermediation-2.jpg";
import inter4 from "../assets/imgs/intermediation/intermediation-4.jpg";
import inter5 from "../assets/imgs/intermediation/intermediation-5.jpg";
import inter6 from "../assets/imgs/intermediation/intermediation-6.jpg";
import inter7 from "../assets/imgs/intermediation/intermediation-7.jpg";
import ereputation from "../assets/imgs/formation-e-reputation.jpg";

// Images for serviceData (kept hardcoded as they can't be in JSON)
const serviceHeroImages = [conseil1, services1, inter1];
const serviceColors = ["#538253", "#1d454c", "#5a3728"];
const serviceOfferingImages = [
  [conseil4, conseil2, conseil8, conseil7],
  [ereputation, services2, services5, services6],
  [inter4, inter2, inter5, inter6],
];
const stepImages = [conseil9, services7, inter7, services8];

type OfferingItem = { n: string; title: string; desc: string };
type ServiceDataItem = { id: string; index: string; name: string; intro: string; offerings: OfferingItem[] };
type Step = { n: string; title: string; desc: string };

// Parallax hero image
function ParallaxHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: "60vh", minHeight: 400 }}
    >
      <motion.img
        src={bgLoader}
        alt=""
        style={{ y }}
        className="absolute inset-0 w-full h-full object-cover object-center scale-110"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      {[
        { top: "15%", left: "5%", size: 140, rotate: 20, opacity: 0.08 },
        { top: "60%", left: "2%", size: 110, rotate: -35, opacity: 0.06 },
        { top: "20%", left: "88%", size: 130, rotate: 50, opacity: 0.07 },
        { top: "65%", left: "92%", size: 100, rotate: -15, opacity: 0.05 },
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
    </section>
  );
}

// Section hero image with parallax
function ParallaxImage({
  src,
  alt,
  height = 260,
}: {
  src: string;
  alt: string;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ height }}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="absolute inset-0 w-full h-full object-cover scale-110"
      />
    </div>
  );
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setActive(id);
        },
        { rootMargin: "-20% 0px -70% 0px" },
      );
      o.observe(el);
      return o;
    });
    return () => obs.forEach((o) => o?.disconnect());
  }, [ids]);
  return active;
}

export default function ServicesPage() {
  const { t } = useTranslation();
  const sidebarLinks = t("servicesPage.links", { returnObjects: true }) as { id: string; label: string }[];
  const rawServiceData = t("servicesPage.services", { returnObjects: true }) as ServiceDataItem[];
  const serviceData = rawServiceData.map((svc, si) => ({
    ...svc,
    color: serviceColors[si],
    bg: "#eff3d4",
    heroImage: serviceHeroImages[si],
    offerings: svc.offerings.map((o, oi) => ({
      ...o,
      img: serviceOfferingImages[si][oi],
    })),
  }));
  const rawSteps = t("servicesPage.methode.steps", { returnObjects: true }) as Step[];
  const steps = rawSteps.map((step, i) => ({ ...step, img: stepImages[i] }));
  const stats = t("servicesPage.stats", { returnObjects: true }) as { value: string; label: string }[];

  const active = useActiveSection(sidebarLinks.map((l) => l.id));

  function scrollTo(id: string) {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#eff3d4]">
        <Navbar />

        <ParallaxHero />

        {/* ══ TITRE ══ */}
        <div
          className="maxwidth mx-auto px-6 lg:px-12 pt-16 pb-12 relative overflow-hidden"
          style={{ borderBottom: "1px solid #e5e7eb" }}
        >
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.3em] text-black/35 mb-4">
              {t("servicesPage.eyebrow")}
            </p>
            <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-tight text-gray-900 max-w-3xl">
              {t("servicesPage.title1")}
              <br />
              <span style={{ color: "#538253" }}>{t("servicesPage.title2")}</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-black/50 text-sm leading-relaxed max-w-xl mt-6">
              {t("servicesPage.subtitle")}
            </p>
          </FadeIn>
          {[
            { top: "10%", right: "2%", size: 130, rotate: 15, opacity: 0.04 },
            { top: "55%", right: "8%", size: 100, rotate: -30, opacity: 0.03 },
            { top: "25%", right: "13%", size: 80, rotate: 55, opacity: 0.035 },
          ].map((c, i) => (
            <img
              key={i}
              src={coris2}
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                top: c.top,
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
        </div>

        {/* ══ CORPS ══ */}
        <div className="maxwidth mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 items-start">
            {/* ── CONTENU ── */}
            <div>
              {serviceData.map((svc) => (
                <section
                  key={svc.id}
                  id={svc.id}
                  className="scroll-mt-28 pb-24 relative overflow-hidden"
                  style={{ borderBottom: "1px solid #f0f0f0" }}
                >
                  {/* Cauris décoratifs de section */}
                  {[
                    { top: "4%", right: "-2%", size: 120, rotate: 18 },
                    { top: "35%", left: "-3%", size: 90, rotate: -35 },
                    { bottom: "8%", right: "3%", size: 100, rotate: 50 },
                  ].map((c, i) => (
                    <img key={i} src={coris2} alt="" aria-hidden="true"
                      style={{ position: "absolute", top: c.top, bottom: c.bottom, left: c.left, right: c.right, width: c.size, height: c.size, opacity: 0.04, transform: `rotate(${c.rotate}deg)`, objectFit: "contain", pointerEvents: "none" }}
                    />
                  ))}
                  {/* Section header */}
                  <div className="grid md:grid-cols-2 gap-12 items-center pt-20 mb-16">
                    <div>
                      <motion.p
                        className="text-xs uppercase tracking-[0.3em] mb-3"
                        style={{ color: svc.color, opacity: 0.7 }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 0.7, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
                      >
                        {svc.index} — {svc.name}
                      </motion.p>
                      <motion.h2
                        className="text-3xl font-light leading-snug text-gray-900 mb-5"
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{
                          duration: 0.6,
                          ease: [0.25, 0, 0, 1],
                          delay: 0.05,
                        }}
                      >
                        {svc.name}
                      </motion.h2>
                      <motion.p
                        className="text-black/55 text-sm leading-relaxed"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 0.55, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{
                          duration: 0.6,
                          ease: [0.25, 0, 0, 1],
                          delay: 0.1,
                        }}
                      >
                        {svc.intro}
                      </motion.p>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, x: 32, scale: 0.97 }}
                      whileInView={{ opacity: 1, x: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        duration: 0.7,
                        ease: [0.25, 0, 0, 1],
                        delay: 0.08,
                      }}
                    >
                      <ParallaxImage
                        src={svc.heroImage}
                        alt={svc.name}
                        height={460}
                      />
                      <div
                        className="h-1 mt-2"
                        style={{ backgroundColor: svc.color, opacity: 0.3 }}
                      />
                    </motion.div>
                  </div>

                  {/* Offerings list */}
                  <div className="space-y-0 relative">

                    <img src={coris2} alt="" aria-hidden="true"
                      style={{ position: "absolute", top: 0, right: 0, width: 400, height: 900, opacity: 0.04, transform: `rotate(20deg)`, objectFit: "contain", pointerEvents: "none" }}
                    />

                    <img src={coris2} alt="" aria-hidden="true"
                      style={{ position: "absolute", top: -300, right: 100, width: 760, height: 1200, opacity: 0.04, transform: `rotate(20deg)`, objectFit: "contain", pointerEvents: "none" }}
                    />
                    {svc.offerings.map((item, i) => (
                      <motion.div
                        key={item.n}
                        className="grid md:grid-cols-[1fr_auto] gap-8 items-start py-8"
                        style={{ borderTop: "1px solid #f0f0f0" }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{
                          duration: 0.55,
                          ease: [0.25, 0, 0, 1],
                          delay: i * 0.07,
                        }}
                      >
                        <div className="flex gap-6">
                          <span
                            className="text-xs tracking-widest shrink-0 pt-1"
                            style={{ color: svc.color, opacity: 0.6 }}
                          >
                            {item.n}
                          </span>
                          <div>
                            <h3 className="text-base font-medium text-gray-900 mb-2">
                              {item.title}
                            </h3>
                            <p className="text-sm text-black/50 leading-relaxed max-w-lg">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        {/* Image — toujours affichée */}
                        <motion.div
                          className="shrink-0 overflow-hidden"
                          style={{ width: 140, height: 95 }}
                          initial={{ opacity: 0, scale: 0.92 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{
                            duration: 0.5,
                            ease: [0.25, 0, 0, 1],
                            delay: i * 0.07 + 0.1,
                          }}
                          whileHover={{ scale: 1.04 }}
                        >
                          <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Extra images strip — 3 images supplémentaires */}
                  <motion.div
                    className="grid grid-cols-3 gap-3 mt-8"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.65,
                      ease: [0.25, 0, 0, 1],
                      delay: 0.15,
                    }}
                  >
                    {svc.offerings.slice(0, 3).map((item, i) => (
                      <div
                        key={i}
                        className="overflow-hidden"
                        style={{ height: 270 }}
                      >
                        <motion.img
                          src={item.img}
                          alt=""
                          className="w-full h-full object-cover"
                          initial={{ scale: 1.08 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.9,
                            ease: [0.25, 0, 0, 1],
                            delay: i * 0.06,
                          }}
                        />
                      </div>
                    ))}
                  </motion.div>

                  {/* CTA inline */}
                  <FadeIn delay={0.2}>
                    <div className="mt-10 flex items-center gap-5">
                      <a
                        href="/#contact"
                        className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] px-6 py-3 transition-all duration-300 text-white"
                        style={{ backgroundColor: svc.color }}
                      >
                        {t("servicesPage.ctaInline")}
                        <span className="opacity-60">→</span>
                      </a>
                      <div className="flex items-center gap-1.5 opacity-20">
                        {[0, 22, -14].map((rotate, i) => (
                          <img key={i} src={coris2} alt="" aria-hidden="true"
                            style={{ width: i === 0 ? 32 : 24, height: i === 0 ? 32 : 24, transform: `rotate(${rotate}deg)`, objectFit: "contain" }}
                          />
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                </section>
              ))}

              {/* ── NOTRE MÉTHODE ── */}
              <section id="methode" className="scroll-mt-28 pt-20 relative overflow-hidden">
                {[
                  { top: "0%", right: "-2%", size: 130, rotate: 25 },
                  { bottom: "5%", left: "-2%", size: 110, rotate: -40 },
                  { top: "45%", right: "8%", size: 80, rotate: 60 },
                ].map((c, i) => (
                  <img key={i} src={coris2} alt="" aria-hidden="true"
                    style={{ position: "absolute", top: c.top, bottom: c.bottom, left: c.left, right: c.right, width: c.size, height: c.size, opacity: 0.04, transform: `rotate(${c.rotate}deg)`, objectFit: "contain", pointerEvents: "none" }}
                  />
                ))}
                <FadeIn>
                  <p className="text-xs uppercase tracking-[0.3em] text-black/35 mb-2">
                    {t("servicesPage.methode.eyebrow")}
                  </p>
                </FadeIn>
                <FadeIn delay={0.05}>
                  <h2 className="text-3xl font-light text-gray-900 mb-2">
                    {t("servicesPage.methode.title")}
                  </h2>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <p className="text-black/50 text-sm leading-relaxed max-w-lg mb-14">
                    {t("servicesPage.methode.desc")}
                  </p>
                </FadeIn>

                <div className="flex items-center gap-4 mb-12 opacity-15">
                  {[-10, 20, -5, 30, -15, 45, -25].map((rotate, i) => (
                    <img key={i} src={coris2} alt="" aria-hidden="true"
                      style={{ width: i % 2 === 0 ? 40 : 30, height: i % 2 === 0 ? 40 : 30, transform: `rotate(${rotate}deg)`, objectFit: "contain" }}
                    />
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">
                  {steps.map((step, i) => (
                    <motion.div
                      key={step.n}
                      className="py-7"
                      style={{ borderTop: "1px solid #f0f0f0" }}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.55,
                        ease: [0.25, 0, 0, 1],
                        delay: i * 0.08,
                      }}
                    >
                      {/* Step image */}
                      <div
                        className="overflow-hidden mb-5"
                        style={{ height: 360 }}
                      >
                        <motion.img
                          src={step.img}
                          alt={step.title}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1.1 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.9,
                            ease: [0.25, 0, 0, 1],
                            delay: i * 0.08,
                          }}
                        />
                      </div>
                      <div className="flex gap-6">
                        <span className="text-xs text-[#538253] tracking-widest shrink-0 pt-0.5">
                          {step.n}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900 mb-1.5">
                            {step.title}
                          </p>
                          <p className="text-black/50 text-sm leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>

            {/* ── SIDEBAR ── */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="text-xs uppercase tracking-[0.25em] text-black/30 mb-5">
                  {t("servicesPage.sidebarTitle")}
                </p>
                <nav className="space-y-0.5">
                  {sidebarLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => scrollTo(link.id)}
                      className="block w-full text-left text-sm py-2.5 px-3 rounded-lg transition-all duration-200"
                      style={{
                        color: active === link.id ? "#538253" : "#9ca3af",
                        fontWeight: active === link.id ? 500 : 400,
                      }}
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>

                {/* Cauris sidebar */}
                <div className="flex items-center gap-2 mt-6 mb-2 opacity-15">
                  {[12, -20, 35, -8].map((rotate, i) => (
                    <img key={i} src={coris2} alt="" aria-hidden="true"
                      style={{ width: i % 2 === 0 ? 28 : 22, height: i % 2 === 0 ? 28 : 22, transform: `rotate(${rotate}deg)`, objectFit: "contain" }}
                    />
                  ))}
                </div>

                {/* Sidebar image with parallax */}
                <div className="mt-2 overflow-hidden" style={{ height: 180 }}>
                  <ParallaxImage src={conseil3} alt="" height={180} />
                </div>

                {/* Stats */}
                <div
                  className="mt-4 p-5 space-y-5 relative overflow-hidden"
                  style={{ backgroundColor: "#eff3d4" }}
                >
                  <img
                    src={coris2}
                    alt=""
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      bottom: -10,
                      right: -10,
                      width: 100,
                      height: 100,
                      opacity: 0.06,
                      transform: "rotate(20deg)",
                      objectFit: "contain",
                      pointerEvents: "none",
                    }}
                  />
                  {stats.map((s) => (
                    <div key={s.label}>
                      <p className="text-2xl font-light text-[#538253]">
                        {s.value}
                      </p>
                      <p className="text-xs uppercase tracking-widest text-black/40 mt-0.5">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <a
                    href="/#contact"
                    className="block text-center text-xs uppercase tracking-[0.2em] px-6 py-3 transition-all duration-300 text-white"
                    style={{ backgroundColor: "#1d454c" }}
                  >
                    {t("servicesPage.sidebarCta")}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* ══ CONTACT ══ */}
        <ContactSection />

        <Footer />
      </div>
    </PageTransition>
  );
}

function ContactSection() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", organisation: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const contactServices = t("contact.services", { returnObjects: true }) as string[];

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section style={{ borderTop: "1px solid #1d454c33", backgroundColor: "#eff3d4" }}>
      <div className="maxwidth mx-auto px-6 lg:px-12 py-24 relative overflow-hidden">
        {/* Cauris décoratifs */}
        {[
          { top: "8%", right: "3%", size: 140, rotate: 20, opacity: 0.04 },
          { bottom: "10%", left: "2%", size: 110, rotate: -30, opacity: 0.03 },
          { top: "50%", right: "12%", size: 90, rotate: 55, opacity: 0.03 },
        ].map((c, i) => (
          <img key={i} src={coris2} alt="" aria-hidden="true"
            style={{ position: "absolute", top: c.top, bottom: c.bottom, left: c.left, right: c.right, width: c.size, height: c.size, opacity: c.opacity, transform: `rotate(${c.rotate}deg)`, objectFit: "contain", pointerEvents: "none" }}
          />
        ))}

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-20 items-start">

          {/* ── Côté gauche ── */}
          <div>
            <FadeIn>
              <p className="text-xs uppercase tracking-[0.35em] text-black/35 mb-5">{t("servicesPage.contact.eyebrow")}</p>
              <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-light leading-tight text-gray-900 mb-6">
                {t("servicesPage.contact.heading1")}
                <br />
                <span style={{ color: "#538253" }}>{t("servicesPage.contact.heading2")}</span>
              </h2>
              <p className="text-black/50 text-sm leading-relaxed max-w-sm mb-10">
                {t("servicesPage.contact.desc")}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="space-y-4">
                <a href="mailto:contact@marabu.services"
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#538253] transition-colors duration-200"
                >
                  <span className="w-8 h-8 flex items-center justify-center" style={{ border: "1px solid #e5e7eb" }}>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </span>
                  contact@marabu.services
                </a>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-8 h-8 flex items-center justify-center" style={{ border: "1px solid #e5e7eb" }}>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
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
                  <img key={i} src={coris2} alt="" aria-hidden="true"
                    style={{ width: i % 2 === 0 ? 22 : 17, height: i % 2 === 0 ? 22 : 17, transform: `rotate(${rotate}deg)`, objectFit: "contain" }}
                  />
                ))}
              </div>
            </FadeIn>
          </div>

          {/* ── Formulaire ── */}
          <FadeIn delay={0.1}>
            {submitted ? (
              <motion.div
                className="flex flex-col items-center justify-center text-center py-20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
              >
                <div className="flex items-center gap-2 mb-6 opacity-15">
                  {[0, 15, -10].map((r, i) => (
                    <img key={i} src={coris2} alt="" aria-hidden="true" style={{ width: 28, height: 28, transform: `rotate(${r}deg)`, objectFit: "contain" }} />
                  ))}
                </div>
                <p className="text-xs uppercase tracking-[0.35em] text-[#538253] mb-3">{t("contact.successLabel")}</p>
                <h3 className="text-2xl font-light text-gray-900 mb-2">{t("contact.successTitle")}</h3>
                <p className="text-black/45 text-sm">{t("contact.successDesc")}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="c-name" className="block text-xs uppercase tracking-[0.2em] text-black/40 mb-2">
                      {t("contact.fields.name")} <span style={{ color: "#538253" }}>{t("common.required")}</span>
                    </label>
                    <input id="c-name" name="name" type="text" required value={form.name} onChange={handleChange}
                      placeholder={t("contact.fields.namePlaceholder")}
                      className="w-full px-4 py-3 text-sm text-gray-900 placeholder-black/25 focus:outline-none transition-colors duration-200 bg-white"
                      style={{ border: "1px solid #e5e7eb" }}
                      onFocus={e => (e.target.style.borderColor = "#538253")}
                      onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
                    />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="block text-xs uppercase tracking-[0.2em] text-black/40 mb-2">
                      {t("contact.fields.email")} <span style={{ color: "#538253" }}>{t("common.required")}</span>
                    </label>
                    <input id="c-email" name="email" type="email" required value={form.email} onChange={handleChange}
                      placeholder={t("contact.fields.emailPlaceholder")}
                      className="w-full px-4 py-3 text-sm text-gray-900 placeholder-black/25 focus:outline-none transition-colors duration-200 bg-white"
                      style={{ border: "1px solid #e5e7eb" }}
                      onFocus={e => (e.target.style.borderColor = "#538253")}
                      onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="c-org" className="block text-xs uppercase tracking-[0.2em] text-black/40 mb-2">
                    {t("contact.fields.org")}
                  </label>
                  <input id="c-org" name="organisation" type="text" value={form.organisation} onChange={handleChange}
                    placeholder={t("contact.fields.orgPlaceholder")}
                    className="w-full px-4 py-3 text-sm text-gray-900 placeholder-black/25 focus:outline-none transition-colors duration-200 bg-white"
                    style={{ border: "1px solid #e5e7eb" }}
                    onFocus={e => (e.target.style.borderColor = "#538253")}
                    onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>

                <div>
                  <label htmlFor="c-service" className="block text-xs uppercase tracking-[0.2em] text-black/40 mb-2">
                    {t("contact.fields.service")}
                  </label>
                  <select id="c-service" name="service" value={form.service} onChange={handleChange}
                    className="w-full px-4 py-3 text-sm text-gray-900 focus:outline-none transition-colors duration-200 bg-white cursor-pointer"
                    style={{ border: "1px solid #e5e7eb" }}
                  >
                    <option value="">{t("contact.fields.servicePlaceholder")}</option>
                    {contactServices.map((svc) => (
                      <option key={svc}>{svc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="c-message" className="block text-xs uppercase tracking-[0.2em] text-black/40 mb-2">
                    {t("contact.fields.message")} <span style={{ color: "#538253" }}>{t("common.required")}</span>
                  </label>
                  <textarea id="c-message" name="message" required rows={5} value={form.message} onChange={handleChange}
                    placeholder={t("contact.fields.messagePlaceholder")}
                    className="w-full px-4 py-3 text-sm text-gray-900 placeholder-black/25 focus:outline-none transition-colors duration-200 bg-white resize-none"
                    style={{ border: "1px solid #e5e7eb" }}
                    onFocus={e => (e.target.style.borderColor = "#538253")}
                    onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-4 text-xs uppercase tracking-[0.25em] text-white transition-opacity duration-200"
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
      </div>
    </section>
  );
}
