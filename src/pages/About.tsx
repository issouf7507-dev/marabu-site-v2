import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FadeIn } from "../components/ui/fade-in";
import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";
import Footer from "../components/Footer";
import coris2 from "../assets/coris2.png";

import imgConseil from "../assets/imgs/houssene-ben-souda.jpg";
import imgServices from "../assets/imgs/marabu_services_accueil.png";
import bgLoader from "../assets/imgs/Cauris-bg.png";

/* ─── hook section active ─── */
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

export default function About() {
  const { t } = useTranslation();
  const sidebarLinks = t("about.links", { returnObjects: true }) as {
    id: string;
    label: string;
  }[];
  const mvp = t("about.values.mvp", { returnObjects: true }) as {
    label: string;
    text: string;
  }[];
  const valueItems = t("about.values.items", { returnObjects: true }) as {
    n: string;
    title: string;
    desc: string;
  }[];
  const stats = t("about.impact.stats", { returnObjects: true }) as {
    value: string;
    label: string;
  }[];
  const infoItems = t("about.info.items", { returnObjects: true }) as {
    label: string;
    value: string;
  }[];
  const serviceItems = t("about.servicesSection.items", {
    returnObjects: true,
  }) as { label: string }[];
  const serviceImages = [imgConseil, imgServices, imgConseil];

  const active = useActiveSection(sidebarLinks.map((l) => l.id));

  function scrollTo(id: string) {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#ecede3]">
        <Navbar />

        {/* ══ HERO IMAGE ══ */}
        <section
          className="relative w-full"
          style={{ height: "60vh", minHeight: 400 }}
        >
          <img
            src={bgLoader}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.6) 100%)",
            }}
          />
          {/* coris */}
        </section>

        {/* ══ TITRE PRINCIPAL (sous le hero, fond blanc) ══ */}
        <div
          className="maxwidth  mx-auto px-6 lg:px-12 pt-16 pb-12 relative overflow-hidden"
          style={{ borderBottom: "1px solid #e5e7eb" }}
        >
          <FadeIn>
            <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-tight text-gray-900 max-w-4xl">
              {t("about.hero.title1")}
              <br />
              <span style={{ color: "#538253" }}>{t("about.hero.title2")}</span>
            </h1>
          </FadeIn>
          {[
            { top: "10%", right: "2%", size: 64, rotate: 15, opacity: 0.12 },
            { top: "55%", right: "8%", size: 44, rotate: -30, opacity: 0.09 },
            { top: "25%", right: "12%", size: 36, rotate: 55, opacity: 0.1 },
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

        {/* ══ CORPS : contenu + sidebar ══ */}
        <div className="maxwidth  mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 items-start">
            {/* ── SECTIONS ── */}
            <div>
              {/* QUI SOMMES-NOUS */}
              <section
                id="who"
                className="scroll-mt-28 pb-20"
                style={{ borderBottom: "1px solid #f0f0f0" }}
              >
                <FadeIn>
                  <p className="text-xs uppercase tracking-[0.3em] text-black/35 mb-6">
                    {t("about.who.label")}
                  </p>
                </FadeIn>
                <div className="grid md:grid-cols-2 gap-12 items-start">
                  <FadeIn delay={0.05}>
                    <img
                      src={imgServices}
                      alt="Marabu Services"
                      className="w-full  object-cover"
                      style={{ height: 280 }}
                    />
                  </FadeIn>
                  <div className="space-y-5">
                    <FadeIn delay={0.1}>
                      <h2 className="text-2xl font-light leading-snug text-gray-900">
                        {t("about.who.heading")}
                      </h2>
                    </FadeIn>
                    <FadeIn delay={0.15}>
                      <p className="text-black/55 leading-relaxed text-sm">
                        {t("about.who.p1")}
                      </p>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                      <p className="text-black/55 leading-relaxed text-sm">
                        {t("about.who.p2")}
                      </p>
                    </FadeIn>
                  </div>
                </div>
              </section>

              {/* LE MOT DU FONDATEUR */}
              <section
                id="founder"
                className="scroll-mt-28 py-20 relative overflow-hidden"
                style={{ borderBottom: "1px solid #f0f0f0" }}
              >
                <FadeIn>
                  <p className="text-xs uppercase tracking-[0.3em] text-black/35 mb-6">
                    {t("about.founder.label")}
                  </p>
                </FadeIn>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-5">
                    <FadeIn delay={0.05}>
                      <h2 className="text-2xl font-light leading-snug text-gray-900">
                        {t("about.founder.heading")}
                      </h2>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                      <p className="text-black/55 leading-relaxed text-sm">
                        {t("about.founder.quote1")}
                      </p>
                    </FadeIn>
                    <FadeIn delay={0.15}>
                      <p className="text-black/55 leading-relaxed text-sm">
                        {t("about.founder.quote2")}
                      </p>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                      <p className="text-sm font-medium text-gray-900">
                        {t("about.founder.signature")}
                      </p>
                    </FadeIn>
                  </div>

                  <FadeIn delay={0.1}>
                    <img
                      src={imgConseil}
                      alt="Le fondateur"
                      className="w-full object-cover object-center"
                      style={{ height: 880 }}
                    />
                  </FadeIn>
                </div>
              </section>

              {/* LE SENS DU NOM */}
              <section
                id="name"
                className="scroll-mt-28 py-20"
                style={{ borderBottom: "1px solid #f0f0f0" }}
              >
                <FadeIn>
                  <p className="text-xs uppercase tracking-[0.3em] text-black/35 mb-6">
                    {t("about.name.label")}
                  </p>
                </FadeIn>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-5">
                    <FadeIn delay={0.05}>
                      <h2 className="text-2xl font-light leading-snug text-gray-900">
                        {t("about.name.heading")}
                      </h2>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                      <p className="text-black/55 leading-relaxed text-sm">
                        {t("about.name.p1")}
                      </p>
                    </FadeIn>
                    <FadeIn delay={0.15}>
                      <p className="text-black/55 leading-relaxed text-sm">
                        {t("about.name.p2")}
                      </p>
                    </FadeIn>
                  </div>
                  <FadeIn delay={0.1}>
                    <img
                      src={coris2}
                      alt="Cauris"
                      className="w-full object-contain"
                    />
                  </FadeIn>
                </div>
              </section>

              {/* MISSION VISION VALEURS */}
              <section
                id="values"
                className="scroll-mt-28 py-20"
                style={{ borderBottom: "1px solid #f0f0f0" }}
              >
                <FadeIn>
                  <p className="text-xs uppercase tracking-[0.3em] text-black/35 mb-6">
                    {t("about.values.label")}
                  </p>
                </FadeIn>
                <div className="grid md:grid-cols-3 gap-10 mb-12">
                  {mvp.map((item, i) => (
                    <FadeIn key={i} delay={i * 0.08}>
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-[#538253] mb-3">
                          {item.label}
                        </p>
                        <p className="text-black/60 text-sm leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </FadeIn>
                  ))}
                </div>

                <div className="flex items-center gap-4 my-10 opacity-20"></div>

                <div className="space-y-4">
                  {valueItems.map((v, i) => (
                    <FadeIn key={i} delay={i * 0.07}>
                      <div
                        className="flex gap-6 py-5"
                        style={{ borderTop: "1px solid #f0f0f0" }}
                      >
                        <span className="text-xs text-[#538253] tracking-widest shrink-0 pt-0.5">
                          {v.n}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900 mb-1">
                            {v.title}
                          </p>
                          <p className="text-black/50 text-sm leading-relaxed">
                            {v.desc}
                          </p>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </section>

              {/* IMPACT SOCIAL */}
              <section
                id="impact"
                className="scroll-mt-28 py-20"
                style={{ borderBottom: "1px solid #f0f0f0" }}
              >
                <FadeIn>
                  <p className="text-xs uppercase tracking-[0.3em] text-black/35 mb-6">
                    {t("about.impact.label")}
                  </p>
                </FadeIn>
                <div className="grid md:grid-cols-2 gap-12 items-center mb-10">
                  <div className="space-y-5">
                    <FadeIn delay={0.05}>
                      <h2 className="text-2xl font-light leading-snug text-gray-900">
                        {t("about.impact.heading1")}
                        <br />
                        {t("about.impact.heading2")}
                      </h2>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                      <p className="text-black/55 leading-relaxed text-sm">
                        {t("about.impact.desc")}
                      </p>
                    </FadeIn>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((s, i) => (
                      <FadeIn key={i} delay={i * 0.08}>
                        <div
                          className="rounded-xl p-6 text-center relative overflow-hidden"
                          style={{ backgroundColor: "#ecede3" }}
                        >
                          <img
                            src={coris2}
                            alt=""
                            aria-hidden="true"
                            style={{
                              position: "absolute",
                              bottom: "-8px",
                              right: "-8px",
                              width: 48,
                              height: 48,
                              opacity: 0.12,
                              transform: `rotate(${i * 25}deg)`,
                              objectFit: "contain",
                              pointerEvents: "none",
                            }}
                          />
                          <p className="text-3xl font-light text-[#538253] mb-1">
                            {s.value}
                          </p>
                          <p className="text-xs uppercase tracking-widest text-black/40">
                            {s.label}
                          </p>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              </section>

              {/* INFOS ENTREPRISE */}
              <section id="info" className="scroll-mt-28 py-20">
                <FadeIn>
                  <div className="flex items-center gap-3 mb-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-black/35">
                      {t("about.info.label")}
                    </p>
                    <div className="flex items-center gap-1.5 opacity-25"></div>
                  </div>
                </FadeIn>
                <div className="grid md:grid-cols-3 gap-8">
                  {infoItems.map((item, i) => (
                    <FadeIn key={i} delay={i * 0.06}>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-black/30 mb-1">
                          {item.label}
                        </p>
                        <p className="text-gray-800 text-sm">{item.value}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </section>
            </div>

            {/* ── SIDEBAR STICKY ── */}
            <aside className="hidden lg:block self-stretch">
              <div className="sticky top-28">
                <p className="text-xs uppercase tracking-[0.25em] text-black/30 mb-5">
                  {t("about.sidebarTitle")}
                </p>
                <nav className="space-y-0.5">
                  {sidebarLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => scrollTo(link.id)}
                      className="block w-full text-left text-sm py-2.5 px-3 rounded-lg transition-all duration-200"
                      style={{
                        color: active === link.id ? "#538253" : "#9ca3af",
                        paddingLeft: "12px",
                        fontWeight: active === link.id ? 500 : 400,
                      }}
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>
                <div className="mt-10">
                  <a
                    href="/#contact"
                    className="block text-center text-xs uppercase tracking-[0.2em] px-6 py-3 transition-all duration-300 text-white"
                    style={{ backgroundColor: "#1d454c" }}
                  >
                    {t("about.sidebarCta")}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* ══ NOS SERVICES — grid photos pleine largeur ══ */}
        <section style={{ borderTop: "1px solid #f0f0f0" }}>
          <div className="maxwidth  mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-black/35">
              {t("about.servicesSection.label")}
            </p>
            <a
              href="/#services"
              className="text-xs uppercase tracking-[0.2em] text-[#538253] hover:underline"
            >
              {t("common.seeAll")}
            </a>
          </div>
          <div className="grid grid-cols-3">
            {serviceItems.map((s, i) => (
              <div
                key={i}
                className="relative overflow-hidden group"
                style={{ height: 300 }}
              >
                <img
                  src={serviceImages[i]}
                  alt={s.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors duration-300" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white text-sm font-light uppercase tracking-widest">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ SCROLL TILTED GRID ══ */}

        {/* ══ CTA FINAL ══ */}
        <section
          className="relative py-28 overflow-hidden"
          style={{ backgroundColor: "#1d454c" }}
        >
          {/* coris */}
          {[
            { top: "10%", left: "3%", size: 80, rotate: 25, opacity: 0.2 },
            { top: "60%", left: "1%", size: 55, rotate: -40, opacity: 0.16 },
            { top: "15%", left: "90%", size: 70, rotate: 50, opacity: 0.18 },
            { top: "65%", left: "93%", size: 50, rotate: -20, opacity: 0.14 },
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
          <div className="relative maxwidth  mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-tight text-white">
                  Commençons par
                  <br />
                  une simple conversation.
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="space-y-6">
                  <p className="text-white/55 leading-relaxed">
                    Que vous ayez un projet précis ou simplement une question
                    stratégique, nous sommes là pour écouter avant de parler.
                  </p>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>→ Réponse sous 24h</li>
                    <li>→ Premier échange sans engagement</li>
                    <li>→ Totale confidentialité</li>
                  </ul>
                  <a
                    href="/#contact"
                    className="inline-block text-xs uppercase tracking-[0.2em] px-10 py-4 transition-all duration-300 text-[#1d454c] font-medium"
                    style={{ backgroundColor: "#ecede3" }}
                  >
                    Nous écrire
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
