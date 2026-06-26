import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import logo from "../assets/Logo_Marabu_.png";

const languages = [
  { code: "fr", label: "FRANCAIS" },
  { code: "en", label: "ENGLISH" },
];

// Pages dont le hero est sombre → texte clair en haut
const darkHeroRoutes = ["/about", "/services", "/blog", "/contact"];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  function changeLang(code: string) {
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const isDarkHero = darkHeroRoutes.includes(location.pathname);
  const isLight = !scrolled && isDarkHero;

  const textColor = isLight ? "#ecede3" : "#1d454c";
  const borderColor = isLight ? "#ecede330" : "#1d454c25";
  const langActiveBg = isLight ? "#ecede320" : "#1d454c";
  const langActiveText = isLight ? "#ecede3" : "#ecede3";
  const langBorder = isLight ? "#ecede340" : "#1d454c";

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "#ecede3" : "transparent",
        borderBottom: scrolled ? `1px solid ${borderColor}` : "none",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
    >
      <div
        className="flex items-center justify-between maxwidth mx-auto w-full"
        style={{ padding: scrolled ? "12px 0" : "16px 0" }}
      >
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            className="w-36 transition-all duration-300"
            style={{ filter: isLight ? "brightness(0) invert(1)" : "none" }}
          />
        </Link>

        {/* Droite : en haut langue + dessous nav ; en mode scrollé : tout aligné sur une ligne */}
        <div className="flex flex-col items-end gap-2 transition-all duration-300">
          {/* Sélecteur de langue — au-dessus quand pas scrollé, inline quand scrollé */}
          <div
            className="flex transition-all duration-300 overflow-hidden"
            style={{
              maxHeight: scrolled ? 0 : 40,
              opacity: scrolled ? 0 : 1,
              marginBottom: scrolled ? 0 : undefined,
            }}
          >
            {languages.map((l) => (
              <button
                key={l.code}
                className="w-28 p-1 text-xs cursor-pointer transition-all duration-200"
                style={{
                  background:
                    i18n.language === l.code ? langActiveBg : "transparent",
                  color: i18n.language === l.code ? langActiveText : textColor,
                  border: `1px solid ${langBorder}`,
                  opacity: i18n.language === l.code ? 1 : 0.55,
                }}
                onClick={() => changeLang(l.code)}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Navigation + langue inline quand scrollé */}
          <nav>
            <ul className="flex items-center gap-5">
              {[
                { label: t("navbar.home"), to: "/" },
                { label: t("navbar.about"), to: "/about" },
                { label: t("navbar.services"), to: "/services" },
                { label: t("navbar.blog"), to: "/blog" },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm transition-opacity duration-200 hover:opacity-100"
                    style={{
                      color: textColor,
                      opacity: location.pathname === to ? 1 : 0.55,
                      fontWeight: location.pathname === to ? 600 : 400,
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}

              {/* Langue inline — visible seulement quand scrollé */}
              {scrolled &&
                languages.map((l) => (
                  <li key={l.code}>
                    <button
                      className="text-xs cursor-pointer transition-all duration-200 px-2 py-0.5"
                      style={{
                        background:
                          i18n.language === l.code
                            ? langActiveBg
                            : "transparent",
                        color:
                          i18n.language === l.code ? langActiveText : textColor,
                        border: `1px solid ${langBorder}`,
                        opacity: i18n.language === l.code ? 1 : 0.45,
                      }}
                      onClick={() => changeLang(l.code)}
                    >
                      {l.label}
                    </button>
                  </li>
                ))}

              <li>
                <Link
                  to="/contact"
                  className="text-sm transition-all duration-200"
                  style={{
                    color: isLight ? "#1d454c" : "#ecede3",
                    backgroundColor: isLight ? "#ecede3" : "#1d454c",
                    padding: "6px 18px",
                    opacity: 0.9,
                    textDecoration: "none",
                  }}
                >
                  {t("navbar.contact")}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
