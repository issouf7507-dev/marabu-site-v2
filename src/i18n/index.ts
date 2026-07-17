import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "./fr.json";
import en from "./en.json";

const savedLang = localStorage.getItem("lang") ?? "fr";

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
  },
  lng: savedLang,
  fallbackLng: "fr",
  interpolation: { escapeValue: false },
});

// Garde <html lang> aligné sur la langue courante : sans ça, les lecteurs
// d'écran et les crawlers lisent tout le site avec la mauvaise prononciation
// et le mauvais ciblage linguistique.
function syncHtmlLang(lng: string) {
  document.documentElement.lang = lng;
}

syncHtmlLang(i18n.language);
i18n.on("languageChanged", syncHtmlLang);

export default i18n;
