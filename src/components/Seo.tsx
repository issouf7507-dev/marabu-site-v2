import { useTranslation } from "react-i18next";
import { SITE_NAME, SITE_URL } from "../config/site";

interface SeoProps {
  /** Titre de la page, sans le nom du site (ajouté automatiquement). */
  title: string;
  description: string;
  /** Chemin absolu depuis la racine, ex. "/services". */
  path: string;
  image?: string;
  /** Passe le type Open Graph à "article" pour les pages de blog. */
  type?: "website" | "article";
}

/**
 * React 19 remonte automatiquement <title>, <meta> et <link> dans le <head>,
 * ce qui évite une dépendance type react-helmet.
 *
 * Attention : ces balises sont posées côté client. Elles servent aux crawlers
 * qui exécutent le JS (Google) et aux aperçus qui suivent les redirections,
 * mais pas aux scrapers statiques (WhatsApp, LinkedIn), qui liront le
 * index.html d'origine tant que le site n'est pas prérendu.
 */
export default function Seo({
  title,
  description,
  path,
  image = `${SITE_URL}/og-image.jpg`,
  type = "website",
}: SeoProps) {
  const { i18n } = useTranslation();
  const fullTitle = `${title} — ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta
        property="og:locale"
        content={i18n.language === "en" ? "en_US" : "fr_FR"}
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
