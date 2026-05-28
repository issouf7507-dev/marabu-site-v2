import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "./hooks/useLenis";
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
import CaurisTransition from "./components/CaurisTransition";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  // Lenis activé seulement après la fin du loader
  useLenis(loaded);

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />

      <AnimatePresence>
        {loaded && (
          <motion.div
            className="min-h-screen bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Navbar />
            <main>
              <Hero />
              <LogoMarquee />
              <CaurisTransition />
              <Intro />
              <CaurisTransition />
              <Services />
              <CaseStudies />
              <CaurisTransition />
              <Manifesto />
              <BlogPreview />
              <Testimonials />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
