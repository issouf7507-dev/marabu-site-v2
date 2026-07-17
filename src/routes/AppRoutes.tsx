import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import App from "../App";

/**
 * Seule la home est chargée dans le bundle initial : c'est la porte d'entrée
 * du site. Les autres routes arrivent à la demande (cf. audit C6).
 */
const About = lazy(() => import("../pages/About"));
const ServicesPage = lazy(() => import("../pages/ServicesPage"));
const BlogPage = lazy(() => import("../pages/BlogPage"));
const ArticlePage = lazy(() => import("../pages/ArticlePage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const NotFound = lazy(() => import("../pages/NotFound"));

/** Le rideau de PageTransition couvre déjà l'écran pendant le chargement du chunk. */
function RouteFallback() {
  return <div className="min-h-screen bg-[#ecede3]" />;
}

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/actualites" element={<BlogPage />} />
          <Route path="/actualites/:id" element={<ArticlePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}
