import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import logo from "../assets/Logo_Marabu_.png";

const languages = [
  { code: "fr", label: "FRANCAIS" },
  { code: "en", label: "ENGLISH" },
];

const darkHeroPrefixes = ["/about", "/services", "/actualites", "/contact"];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isDarkHero = darkHeroPrefixes.some((p) => location.pathname.startsWith(p));
  const isLight = !scrolled && isDarkHero;

  const textColor = isLight ? "#ecede3" : "#1d454c";
  const borderColor = isLight ? "#ecede330" : "#1d454c25";
  const langActiveBg = isLight ? "#ecede320" : "#1d454c";
  const langActiveText = isLight ? "#ecede3" : "#ecede3";
  const langBorder = isLight ? "#ecede340" : "#1d454c";

  const navItems = [
    { label: t("navbar.home"), to: "/" },
    { label: t("navbar.about"), to: "/about" },
    { label: t("navbar.services"), to: "/services" },
    { label: t("navbar.blog"), to: "/actualites" },
  ];

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300"
        style={{
          backgroundColor: mobileOpen ? "#ecede3" : scrolled ? "#ecede3" : "transparent",
          borderBottom: scrolled ? `1px solid ${borderColor}` : "none",
          backdropFilter: scrolled ? "blur(8px)" : "none",
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
      >
        <div
          className="flex items-center justify-between maxwidth mx-auto w-full"
          style={{ padding: scrolled ? "12px 24px" : "16px 24px" }}
        >
          {/* Logo */}
          <Link to="/">
            <img
              src={logo}
              className="w-32 md:w-36 transition-all duration-300"
              style={{ filter: isLight && !mobileOpen ? "brightness(0) invert(1)" : "none" }}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex flex-col items-end gap-2 transition-all duration-300">
            <div
              className="flex transition-all duration-300 overflow-hidden"
              style={{
                maxHeight: scrolled ? 0 : 40,
                opacity: scrolled ? 0 : 1,
              }}
            >
              {languages.map((l) => (
                <button
                  key={l.code}
                  className="w-28 p-1 text-xs cursor-pointer transition-all duration-200"
                  style={{
                    background: i18n.language === l.code ? langActiveBg : "transparent",
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

            <nav>
              <ul className="flex items-center gap-5">
                {navItems.map(({ label, to }) => (
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

                {scrolled &&
                  languages.map((l) => (
                    <li key={l.code}>
                      <button
                        className="text-xs cursor-pointer transition-all duration-200 px-2 py-0.5"
                        style={{
                          background: i18n.language === l.code ? langActiveBg : "transparent",
                          color: i18n.language === l.code ? langActiveText : textColor,
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

          {/* Hamburger mobile */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 w-10 h-10 cursor-pointer"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
          >
            <motion.span
              className="block w-6 h-px bg-[#1d454c]"
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block w-6 h-px bg-[#1d454c]"
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-px bg-[#1d454c]"
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden bg-[#ecede3]"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex flex-col h-full px-6 pt-24 pb-10">
              {/* Nav items */}
              <nav className="flex-1 pt-4">
                <ul className="flex flex-col">
                  {navItems.map(({ label, to }, i) => (
                    <li key={to} className="overflow-hidden border-b border-[#1d454c]/10">
                      <motion.div
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "110%" }}
                        transition={{
                          delay: 0.12 + i * 0.08,
                          duration: 0.6,
                          ease: [0.33, 1, 0.68, 1],
                        }}
                      >
                        <Link
                          to={to}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-between py-5"
                          style={{ textDecoration: "none" }}
                        >
                          <span
                            className="text-[2.5rem] font-light leading-none"
                            style={{
                              color: "#1d454c",
                              opacity: location.pathname === to ? 1 : 0.38,
                            }}
                          >
                            {label}
                          </span>
                          <span
                            className="text-xs tracking-[0.2em] font-light"
                            style={{ color: "#1d454c", opacity: 0.22 }}
                          >
                            0{i + 1}
                          </span>
                        </Link>
                      </motion.div>
                    </li>
                  ))}

                  {/* Contact CTA */}
                  <li className="overflow-hidden pt-8">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%" }}
                      transition={{
                        delay: 0.12 + navItems.length * 0.08,
                        duration: 0.6,
                        ease: [0.33, 1, 0.68, 1],
                      }}
                    >
                      <Link
                        to="/contact"
                        onClick={() => setMobileOpen(false)}
                        className="inline-block text-sm tracking-[0.15em] uppercase"
                        style={{
                          color: "#ecede3",
                          backgroundColor: "#1d454c",
                          padding: "12px 32px",
                          textDecoration: "none",
                        }}
                      >
                        {t("navbar.contact")}
                      </Link>
                    </motion.div>
                  </li>
                </ul>
              </nav>

              {/* Language toggle */}
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: 0.6, duration: 0.4, ease: [0.25, 0, 0, 1] }}
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    className="flex-1 py-2.5 text-xs cursor-pointer transition-all duration-200"
                    style={{
                      background: i18n.language === l.code ? "#1d454c" : "transparent",
                      color: i18n.language === l.code ? "#ecede3" : "#1d454c",
                      border: "1px solid #1d454c",
                      opacity: i18n.language === l.code ? 1 : 0.5,
                    }}
                    onClick={() => changeLang(l.code)}
                  >
                    {l.label}
                  </button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
