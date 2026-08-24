import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FadeIn } from "../components/ui/fade-in";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import Seo from "../components/Seo";
import { useActiveSection } from "../hooks/useActiveSection";
import { ParallaxHero, ParallaxImage } from "../components/services/Parallax";
import MethodSection from "../components/services/MethodSection";
import ServicesSidebar from "../components/services/ServicesSidebar";
import ServicesContact from "../components/services/ServicesContact";
import OfferingModal from "../components/services/OfferingModal";
import { useServiceData } from "../components/services/serviceData";
import type { OpenOffering } from "../components/services/serviceData";
import coris2 from "../assets/coris2.webp";

export default function ServicesPage() {
  const { t } = useTranslation();
  const sidebarLinks = t("servicesPage.links", { returnObjects: true }) as {
    id: string;
    label: string;
  }[];
  const { services: serviceData, steps } = useServiceData();
  const stats = t("servicesPage.stats", { returnObjects: true }) as {
    value: string;
    label: string;
  }[];

  const active = useActiveSection(sidebarLinks.map((l) => l.id));

  /*
    Prestation ouverte dans la modale. On mémorise aussi le bouton d'origine
    pour lui rendre le focus à la fermeture (WCAG 2.4.3), sans quoi le clavier
    repart du haut de la page.
  */
  const [openOffering, setOpenOffering] = useState<OpenOffering | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  function closeOffering() {
    setOpenOffering(null);
    triggerRef.current?.focus();
  }

  function scrollTo(id: string) {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <PageTransition>
      <Seo
        title={t("seo.services.title")}
        description={t("seo.services.description")}
        path="/services"
      />
      <div className="min-h-screen bg-[#ecede3]">
        <Navbar />

        <main id="main-content">
          <ParallaxHero />

          {/* ══ TITRE ══ */}
          <div
            className="maxwidth mx-auto px-6 lg:px-12 pt-16 pb-12 relative overflow-hidden"
            style={{ borderBottom: "1px solid #e5e7eb" }}
          >
            <FadeIn>
              <p className="text-xs uppercase tracking-[0.3em] text-black/60 mb-4">
                {t("servicesPage.eyebrow")}
              </p>
              <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-tight text-gray-900 max-w-3xl">
                {t("servicesPage.title1")}
                <br />
                <span style={{ color: "#538253" }}>
                  {t("servicesPage.title2")}
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-black/65 text-sm leading-relaxed max-w-xl mt-6">
                {t("servicesPage.subtitle")}
              </p>
            </FadeIn>
            {[
              { top: "10%", right: "2%", size: 130, rotate: 15, opacity: 0.04 },
              {
                top: "55%",
                right: "8%",
                size: 100,
                rotate: -30,
                opacity: 0.03,
              },
              {
                top: "25%",
                right: "13%",
                size: 80,
                rotate: 55,
                opacity: 0.035,
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
                          opacity: 0.04,
                          transform: `rotate(${c.rotate}deg)`,
                          objectFit: "contain",
                          pointerEvents: "none",
                        }}
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
                          className="text-black/65 text-sm leading-relaxed"
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
                      <img
                        src={coris2}
                        alt=""
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          width: 400,
                          height: 900,
                          opacity: 0.04,
                          transform: `rotate(20deg)`,
                          objectFit: "contain",
                          pointerEvents: "none",
                        }}
                      />

                      <img
                        src={coris2}
                        alt=""
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          top: -300,
                          right: 100,
                          width: 760,
                          height: 1200,
                          opacity: 0.04,
                          transform: `rotate(20deg)`,
                          objectFit: "contain",
                          pointerEvents: "none",
                        }}
                      />
                      {svc.offerings.map((item, i) => (
                        <motion.div
                          key={item.n}
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
                          {/*
                            Bouton et non `div` cliquable : la prestation ouvre
                            une modale, elle doit donc être atteignable au
                            clavier et annoncée comme telle.
                          */}
                          <button
                            type="button"
                            aria-haspopup="dialog"
                            onClick={(e) => {
                              triggerRef.current = e.currentTarget;
                              setOpenOffering({ svc, item });
                            }}
                            className="group grid w-full md:grid-cols-[1fr_auto] gap-8 items-start py-8 text-left cursor-pointer"
                          >
                            <div className="flex gap-6">
                              <span
                                className="text-xs tracking-widest shrink-0 pt-1"
                                style={{ color: svc.color, opacity: 0.6 }}
                              >
                                {item.n}
                              </span>
                              <div>
                                <h3 className="text-base font-medium text-gray-900 mb-2 underline-offset-4 decoration-1 group-hover:underline">
                                  {item.title}
                                </h3>
                                <p className="text-sm text-black/65 leading-relaxed max-w-lg">
                                  {item.desc}
                                </p>
                                <span
                                  className="mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]"
                                  style={{ color: svc.color }}
                                >
                                  {t("servicesPage.offeringMore")}
                                  <span
                                    aria-hidden="true"
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                  >
                                    →
                                  </span>
                                </span>
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
                          </button>
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
                          href="#contact"
                          onClick={(e) => {
                            e.preventDefault();
                            scrollTo("contact");
                          }}
                          className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] px-6 py-3 transition-all duration-300 text-white"
                          style={{ backgroundColor: svc.color }}
                        >
                          {t("servicesPage.ctaInline")}
                          <span className="opacity-60">→</span>
                        </a>
                        <div className="flex items-center gap-1.5 opacity-20">
                          {[0, 22, -14].map((rotate, i) => (
                            <img
                              key={i}
                              src={coris2}
                              alt=""
                              aria-hidden="true"
                              style={{
                                width: i === 0 ? 32 : 24,
                                height: i === 0 ? 32 : 24,
                                transform: `rotate(${rotate}deg)`,
                                objectFit: "contain",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </FadeIn>
                  </section>
                ))}

                <MethodSection steps={steps} />
              </div>

              <ServicesSidebar
                links={sidebarLinks}
                active={active}
                stats={stats}
                onNavigate={scrollTo}
              />
            </div>
          </div>

          {/* ══ CONTACT ══ */}
          <ServicesContact />
        </main>

        <OfferingModal
          offering={openOffering}
          onClose={closeOffering}
          onContact={() => {
            closeOffering();
            /*
              Le défilement attend le démontage : tant que la modale est là,
              le scroll du body est verrouillé et l'appel resterait sans effet.
            */
            requestAnimationFrame(() => scrollTo("contact"));
          }}
        />

        <Footer />
      </div>
    </PageTransition>
  );
}
