import { useEffect, useState } from "react";
import { FadeIn } from "../components/ui/fade-in";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import coris2 from "../assets/coris2.png";
import logoMarabu from "../assets/Logo_Marabu_.png";
import imgConseil from "../assets/imgs/houssene-ben-souda.jpg";
import imgServices from "../assets/imgs/marabu_services_accueil.png";
import bgLoader from "../assets/imgs/Cauris-bg.png";

/* ─── sidebar links ─── */
const sidebarLinks = [
  { id: "who", label: "Qui sommes-nous" },
  { id: "founder", label: "Le mot du fondateur" },
  { id: "name", label: "Le sens du nom" },
  { id: "values", label: "Mission, Vision, Valeurs" },
  { id: "impact", label: "Impact Social" },
  { id: "info", label: "Infos entreprise" },
];

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
  const active = useActiveSection(sidebarLinks.map((l) => l.id));

  function scrollTo(id: string) {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen bg-white">
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
        {[
          { top: "15%", left: "5%", size: 70, rotate: 20, opacity: 0.22 },
          { top: "60%", left: "2%", size: 50, rotate: -35, opacity: 0.18 },
          { top: "20%", left: "88%", size: 65, rotate: 50, opacity: 0.2 },
          { top: "65%", left: "92%", size: 45, rotate: -15, opacity: 0.16 },
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

      {/* ══ TITRE PRINCIPAL (sous le hero, fond blanc) ══ */}
      <div
        className="maxwidth  mx-auto px-6 lg:px-12 pt-16 pb-12 relative overflow-hidden"
        style={{ borderBottom: "1px solid #e5e7eb" }}
      >
        <FadeIn>
          <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-tight text-gray-900 max-w-4xl">
            Les traducteurs contemporains
            <br />
            <span style={{ color: "#009689" }}>de la sagesse africaine.</span>
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
                  Qui sommes-nous
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
                      Un héritage séculaire réinventé en action stratégique
                      moderne.
                    </h2>
                  </FadeIn>
                  <FadeIn delay={0.15}>
                    <p className="text-black/55 leading-relaxed text-sm">
                      Depuis des siècles, les marabouts africains ont guidé les
                      communautés avec sagesse et clairvoyance. Conseillers,
                      médiateurs et gardiens de la connaissance, ils incarnaient
                      une autorité éclairée, capable de transformer les défis en
                      opportunités.
                    </p>
                  </FadeIn>
                  <FadeIn delay={0.2}>
                    <p className="text-black/55 leading-relaxed text-sm">
                      Fondé en 2023, Marabu réinvente cet héritage. Acteur
                      stratégique en conseils, services et intermédiations, nous
                      allions tradition et technologie pour accompagner nos
                      partenaires dans un monde en perpétuelle évolution.
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
                  Le mot du fondateur
                </p>
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-5">
                  <FadeIn delay={0.05}>
                    <h2 className="text-2xl font-light leading-snug text-gray-900">
                      Pourquoi Marabu ?
                    </h2>
                  </FadeIn>
                  <FadeIn delay={0.1}>
                    <p className="text-black/55 leading-relaxed text-sm">
                      "J'ai grandi avec cette idée que les marabouts de nos
                      villages étaient les premiers stratèges — ceux à qui l'on
                      confiait les décisions difficiles, les médiations
                      délicates, les projets d'avenir. Ils agissaient avec
                      discernement, réseau et confiance."
                    </p>
                  </FadeIn>
                  <FadeIn delay={0.15}>
                    <p className="text-black/55 leading-relaxed text-sm">
                      "Marabu est la traduction contemporaine de cette posture.
                      Nous apportons aux entreprises et aux institutions ce que
                      ces sages apportaient aux communautés : clarté, connexions
                      et cap."
                    </p>
                  </FadeIn>
                  <FadeIn delay={0.2}>
                    <p className="text-sm font-medium text-gray-900">
                      — Houssene Ben Souda, Fondateur
                    </p>
                  </FadeIn>
                </div>
                {[
                  {
                    top: "-5%",
                    left: "-4%",
                    size: 48,
                    rotate: -20,
                    opacity: 0.1,
                  },
                  {
                    top: "80%",
                    left: "-6%",
                    size: 32,
                    rotate: 40,
                    opacity: 0.08,
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
                  Le sens du nom
                </p>
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-5">
                  <FadeIn delay={0.05}>
                    <h2 className="text-2xl font-light leading-snug text-gray-900">
                      Un sage. Un guide. Un pont entre deux mondes.
                    </h2>
                  </FadeIn>
                  <FadeIn delay={0.1}>
                    <p className="text-black/55 leading-relaxed text-sm">
                      Dans les traditions africaines, le marabout est bien plus
                      qu'un conseiller. Il est le gardien de la connaissance, le
                      médiateur des conflits, le guide des communautés face aux
                      décisions qui engagent l'avenir. Son autorité ne vient pas
                      du titre — elle vient de la confiance qu'il a su mériter.
                    </p>
                  </FadeIn>
                  <FadeIn delay={0.15}>
                    <p className="text-black/55 leading-relaxed text-sm">
                      Nous sommes les héritiers de cette posture. Marabu traduit
                      cette sagesse ancestrale en action stratégique
                      contemporaine : accompagner, orienter, connecter — avec la
                      même exigence d'intégrité et de clairvoyance.
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
                  Mission, Vision, Valeurs
                </p>
              </FadeIn>
              <div className="grid md:grid-cols-3 gap-10 mb-12">
                {[
                  {
                    label: "Mission",
                    text: "Incarner l'excellence et l'innovation à travers des solutions concrètes et stratégiques. Accompagner entreprises et institutions dans leurs ambitions de croissance, de digitalisation et de performance durable.",
                  },
                  {
                    label: "Vision",
                    text: "Construire des ponts entre les besoins locaux et les opportunités globales. Être le catalyseur de transformation qui place l'humain, l'innovation et la vision à long terme au cœur de chaque mission.",
                  },
                  {
                    label: "Notre promesse",
                    text: "Des réponses sur mesure, à forte valeur ajoutée. Avec agilité, audace et impact — nous façonnons ensemble les trajectoires de réussite.",
                  },
                ].map((item, i) => (
                  <FadeIn key={i} delay={i * 0.08}>
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-[#009689] mb-3">
                        {item.label}
                      </p>
                      <p className="text-black/60 text-sm leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>

              <div className="flex items-center gap-4 my-10 opacity-20">
                {[0, 15, -10, 25, -5].map((rotate, i) => (
                  <img
                    key={i}
                    src={coris2}
                    alt=""
                    aria-hidden="true"
                    style={{
                      width: i % 2 === 0 ? 28 : 22,
                      height: i % 2 === 0 ? 28 : 22,
                      transform: `rotate(${rotate}deg)`,
                      objectFit: "contain",
                    }}
                  />
                ))}
              </div>

              <div className="space-y-4">
                {[
                  {
                    n: "01",
                    title: "Innovation Inspirée",
                    desc: "Unir les traditions aux technologies modernes. Nous puisons dans la sagesse africaine pour concevoir des solutions ancrées dans le présent et tournées vers l'avenir.",
                  },
                  {
                    n: "02",
                    title: "Impact Positif",
                    desc: "Contribuer à un développement durable et inclusif. Chaque mission est évaluée à l'aune de sa valeur réelle pour les organisations et les communautés qu'elles servent.",
                  },
                  {
                    n: "03",
                    title: "Engagement Client",
                    desc: "Offrir des solutions personnalisées à vos besoins. Nous ne vendons pas de formules génériques — nous construisons des réponses sur mesure, avec vous.",
                  },
                ].map((v, i) => (
                  <FadeIn key={i} delay={i * 0.07}>
                    <div
                      className="flex gap-6 py-5"
                      style={{ borderTop: "1px solid #f0f0f0" }}
                    >
                      <span className="text-xs text-[#009689] tracking-widest shrink-0 pt-0.5">
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
                  Impact Social
                </p>
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-12 items-center mb-10">
                <div className="space-y-5">
                  <FadeIn delay={0.05}>
                    <h2 className="text-2xl font-light leading-snug text-gray-900">
                      Des résultats concrets,
                      <br />
                      pas des promesses.
                    </h2>
                  </FadeIn>
                  <FadeIn delay={0.1}>
                    <p className="text-black/55 leading-relaxed text-sm">
                      Chaque mandat que nous acceptons est une responsabilité.
                      Nous mesurons notre succès à l'aune de l'impact réel
                      généré pour nos clients et les communautés qu'ils servent.
                    </p>
                  </FadeIn>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "2023", label: "Année de fondation" },
                    { value: "+15", label: "Clients accompagnés" },
                    { value: "8", label: "Pays d'intervention" },
                    { value: "3", label: "Expertises clés" },
                  ].map((s, i) => (
                    <FadeIn key={i} delay={i * 0.08}>
                      <div
                        className="rounded-xl p-6 text-center relative overflow-hidden"
                        style={{ backgroundColor: "#f0f7f6" }}
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
                        <p className="text-3xl font-light text-[#009689] mb-1">
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
                    Infos entreprise
                  </p>
                  <div className="flex items-center gap-1.5 opacity-25">
                    {[-10, 20, -5].map((rotate, i) => (
                      <img
                        key={i}
                        src={coris2}
                        alt=""
                        aria-hidden="true"
                        style={{
                          width: 14,
                          height: 14,
                          transform: `rotate(${rotate}deg)`,
                          objectFit: "contain",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </FadeIn>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { label: "Siège social", value: "Abidjan, Côte d'Ivoire" },
                  { label: "Fondée en", value: "2023" },
                  {
                    label: "Secteurs",
                    value: "Conseil · Formation · Intermédiation",
                  },
                  {
                    label: "Zone d'intervention",
                    value: "Afrique de l'Ouest & Centrale",
                  },
                  { label: "Langues de travail", value: "Français · Anglais" },
                  { label: "Contact", value: "hello@marabu-services.com" },
                ].map((item, i) => (
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
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs uppercase tracking-[0.25em] text-black/30 mb-5">
                Sur cette page
              </p>
              <nav className="space-y-0.5">
                {sidebarLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="block w-full text-left text-sm py-2.5 px-3 rounded-lg transition-all duration-200"
                    style={{
                      color: active === link.id ? "#009689" : "#9ca3af",

                      paddingLeft: active === link.id ? "12px" : "12px",
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
                  style={{ backgroundColor: "#224851" }}
                >
                  Nous contacter
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
            Nos services
          </p>
          <a
            href="/#services"
            className="text-xs uppercase tracking-[0.2em] text-[#009689] hover:underline"
          >
            Voir tout →
          </a>
        </div>
        <div className="grid grid-cols-3">
          {[
            { img: imgConseil, label: "Conseil" },
            { img: imgServices, label: "Services" },
            { img: imgConseil, label: "Intermédiation" },
          ].map((s, i) => (
            <div
              key={i}
              className="relative overflow-hidden group"
              style={{ height: 300 }}
            >
              <img
                src={s.img}
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

      {/* ══ CTA FINAL ══ */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ backgroundColor: "#224851" }}
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
                  className="inline-block text-xs uppercase tracking-[0.2em] px-10 py-4 transition-all duration-300 text-[#224851] font-medium"
                  style={{ backgroundColor: "#edf2d0" }}
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
  );
}
