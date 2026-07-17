import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import Seo from "../components/Seo";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <PageTransition>
      <Seo
        title={t("seo.notFound.title")}
        description={t("seo.notFound.description")}
        path="/404"
      />
      <div className="min-h-screen bg-[#ecede3] flex flex-col">
        <Navbar />

        <main id="main-content" className="flex-1 flex items-center justify-center px-6 py-40">
          <div className="text-center max-w-lg">
            <p
              className="font-light leading-none mb-6"
              style={{ fontSize: "clamp(5rem, 18vw, 10rem)", color: "#1d454c" }}
            >
              404
            </p>
            <h1 className="text-2xl font-light text-[#1d454c] mb-4">
              {t("notFound.title")}
            </h1>
            <p className="text-black/65 text-sm leading-relaxed mb-10">
              {t("notFound.desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="text-xs uppercase tracking-[0.2em] px-8 py-3.5 text-[#ecede3] transition-opacity duration-200 hover:opacity-85"
                style={{ backgroundColor: "#1d454c" }}
              >
                {t("notFound.home")}
              </Link>
              <Link
                to="/contact"
                className="text-xs uppercase tracking-[0.2em] px-8 py-3.5 text-[#1d454c] transition-colors duration-200 hover:bg-[#1d454c]/5"
                style={{ border: "1px solid #1d454c40" }}
              >
                {t("navbar.contact")}
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
