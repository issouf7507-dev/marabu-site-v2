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
// import CaurisTransition from "./components/CaurisTransition";
import PageTransition from "./components/PageTransition";

// Évite que le loader rejoue quand on revient sur Home
let _homeLoaded = false;

export default function App() {
  const [loaded, setLoaded] = useState(_homeLoaded);

  useLenis(loaded);

  return (
    <PageTransition>
      {!_homeLoaded && (
        <Loader
          onComplete={() => {
            _homeLoaded = true;
            setLoaded(true);
          }}
        />
      )}

      <AnimatePresence>
        {loaded && (
          <motion.div
            className="min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Navbar />
            <main>
              <Hero />
              <LogoMarquee />
              {/* <CaurisTransition /> */}
              <Intro />
              {/* <CaurisTransition /> */}
              <Services />
              <CaseStudies />
              {/* <CaurisTransition /> */}
              <Manifesto />
              <BlogPreview />
              <Testimonials />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
