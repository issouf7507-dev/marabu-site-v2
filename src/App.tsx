import { useCallback, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLenis } from "./hooks/useLenis";
import Seo from "./components/Seo";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoMarquee from "./components/LogoMarquee";
import Manifesto from "./components/Manifesto";
import Intro from "./components/Intro";
import Services from "./components/Services";
import CaseStudies from "./components/CaseStudies";
import BlogPreview from "./components/BlogPreview";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import PageTransition from "./components/PageTransition";

// Évite que le loader rejoue quand on revient sur Home au cours de la session.
let _homeLoaded = false;

export default function App() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  // Un écran de chargement purement décoratif n'a pas à être imposé à qui a
  // demandé moins d'animations : on saute le loader sans jamais le monter.
  const showLoader = !_homeLoaded && !reduceMotion;
  const [loaded, setLoaded] = useState(_homeLoaded);

  // Lenis ne prend la main qu'une fois le loader parti : il n'a rien à piloter
  // tant que le scroll du body est verrouillé.
  useLenis(loaded || !showLoader);

  const handleLoaderComplete = useCallback(() => {
    _homeLoaded = true;
    setLoaded(true);
  }, []);

  return (
    <PageTransition>
      <Seo
        title={t("seo.home.title")}
        description={t("seo.home.description")}
        path="/"
      />

      {/*
        Le contenu est monté d'emblée, sous le loader qui le recouvre : le
        rendre conditionnel repoussait le LCP d'environ 4 s et privait les
        crawlers de toute la page (cf. audit M1).
      */}
      <div className="min-h-screen">
        <ScrollProgress />
        <Navbar />
        <main id="main-content">
          <Hero />
          <LogoMarquee />
          <Intro />
          <Services />
          <CaseStudies />
          <Manifesto />
          <BlogPreview />
          <Testimonials />
        </main>
        <Footer />
      </div>

      {showLoader && <Loader onComplete={handleLoaderComplete} />}
    </PageTransition>
  );
}
