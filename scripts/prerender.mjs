/**
 * Prérendu statique des routes publiques.
 *
 * Le site est une SPA Vite : `dist/index.html` sort avec un <body> vide, donc
 * les scrapers qui n'exécutent pas de JS (WhatsApp, LinkedIn, Slack) lisent les
 * métadonnées de l'accueil quelle que soit la page partagée, et les crawlers
 * n'ont aucun HTML à indexer.
 *
 * Plutôt que de rendre l'app compatible SSR (i18n lit localStorage, Lenis et
 * ScrollTrigger touchent window, framer-motion mesure le DOM), on la fait
 * tourner telle quelle dans un Chromium headless et on fige le HTML produit.
 * Ce que voit le crawler est donc exactement ce que produit le vrai bundle.
 *
 * Le navigateur émule `prefers-reduced-motion: reduce` : l'app respecte déjà ce
 * réglage (MotionConfig reducedMotion="user" + media query CSS), les animations
 * d'apparition se résolvent donc à leur état final au lieu d'être capturées à
 * mi-course avec un opacity: 0 figé dans le HTML.
 *
 * Les articles de blog viennent d'une API externe et ne sont pas prérendus :
 * leurs URLs ne sont pas connues au build. Ils continuent de passer par le
 * fallback SPA d'Nginx.
 */
import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");

/**
 * Le index.html d'origine, gardé en mémoire avant toute écriture.
 * Sans ça, la home prérendue en premier devient le fallback SPA des routes
 * suivantes, qui empilent leurs balises par-dessus les siennes.
 */
const TEMPLATE = await readFile(join(DIST, "index.html"), "utf8");

/**
 * Identifiants des membres ayant un CV publié.
 *
 * Extraits de `src/config/cv-ids.ts` plutôt que recopiés : la liste bougera à
 * chaque CV ajouté, et un oubli ici ne se verrait pas (la page resterait
 * servie par le fallback SPA, donc invisible des crawlers).
 */
async function cvRoutes() {
  const source = await readFile(join(ROOT, "src/config/cv-ids.ts"), "utf8");
  const list = source.slice(source.indexOf("export const CV_IDS"));
  const ids = [...list.matchAll(/^ {2}"([a-z0-9-]+)",$/gm)].map((m) => m[1]);

  if (ids.length === 0) {
    throw new Error(
      "Aucun CV détecté dans src/config/cv-ids.ts : la forme du fichier a changé.",
    );
  }
  return ids.map((id) => `/equipe/${id}`);
}

/** Doit rester aligné sur public/sitemap.xml et src/routes/AppRoutes.tsx. */
const ROUTES = [
  "/",
  "/a-propos",
  "/services",
  "/actualites",
  "/contact",
  ...(await cvRoutes()),
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const FALLBACK_SEO = /<!--\s*seo-fallback:start[\s\S]*?seo-fallback:end\s*-->/i;

/**
 * Retire de la page prérendue le bloc de métadonnées de repli d'index.html.
 *
 * Sans ça chaque page porte deux <title> et deux canonical contradictoires
 * (ceux de l'accueil + les siens), ce qui peut faire ignorer les deux.
 *
 * On ne peut pas trancher par la position : React 19 remonte le <title> en
 * tête de <head> mais ajoute les <meta> et <link> à la fin. Un « garder la
 * dernière occurrence » donnerait le bon canonical et le mauvais titre. D'où
 * le marquage explicite du bloc statique, seul repère fiable.
 */
function stripFallbackSeo(html, title) {
  const headEnd = html.indexOf("</head>");
  if (headEnd === -1) return { html, stripped: false };

  const head = html.slice(0, headEnd);
  if (!FALLBACK_SEO.test(head)) return { html, stripped: false };

  // React 19 insère son <title> à l'emplacement du titre déjà présent, donc à
  // l'intérieur du bloc marqué : le retirer emporte aussi le bon titre. On le
  // réinjecte depuis le titre effectif de la page.
  const escaped = title
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const cleaned = head
    .replace(FALLBACK_SEO, `<title>${escaped}</title>`)
    .replace(/\n\s*\n+/g, "\n");

  return { html: cleaned + html.slice(headEnd), stripped: true };
}

/** Sert `dist/` avec le même fallback SPA que la prod, pour rendre à l'identique. */
function serveDist() {
  const server = createServer(async (req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const filePath = join(DIST, urlPath);

    // Toute route sans extension est servie depuis le template en mémoire :
    // on rend toujours l'app vierge, jamais une page déjà prérendue.
    if (!extname(filePath) || !existsSync(filePath)) {
      res.writeHead(200, { "Content-Type": MIME[".html"] });
      res.end(TEMPLATE);
      return;
    }

    try {
      const body = await readFile(filePath);
      res.writeHead(200, {
        "Content-Type": MIME[extname(filePath)] ?? "application/octet-stream",
      });
      res.end(body);
    } catch {
      res.writeHead(404).end("Not found");
    }
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () =>
      resolve({ server, port: server.address().port }),
    );
  });
}

const { server, port } = await serveDist();
const origin = `http://127.0.0.1:${port}`;

const browser = await chromium.launch();
const context = await browser.newContext({
  reducedMotion: "reduce",
  viewport: { width: 1280, height: 900 },
});

let failures = 0;

for (const route of ROUTES) {
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));

  try {
    await page.goto(`${origin}${route}`, {
      waitUntil: "networkidle",
      timeout: 30_000,
    });
    // React 19 remonte <title>/<meta> depuis le composant Seo une fois monté :
    // sans cette attente on figerait les balises statiques de index.html.
    await page.waitForFunction(() => document.querySelector("#root")?.children.length > 0, {
      timeout: 15_000,
    });

    const title = await page.title();
    const { html, stripped } = stripFallbackSeo(await page.content(), title);
    const target = route === "/" ? DIST : join(DIST, route);
    await mkdir(target, { recursive: true });
    await writeFile(join(target, "index.html"), html, "utf8");

    const text = await page.evaluate(
      () => document.getElementById("root")?.innerText?.trim().length ?? 0,
    );
    const status = errors.length ? `⚠ ${errors.length} erreur(s) JS` : "ok";
    console.log(
      `  ${route.padEnd(12)} ${String(text).padStart(6)} car. — ${title} — ${status}`,
    );
    if (!stripped) {
      failures++;
      console.log(
        `      bloc seo-fallback introuvable : les marqueurs de index.html ont dû être retirés`,
      );
    }
    if (errors.length) {
      failures++;
      errors.forEach((e) => console.log(`      ${e}`));
    }
    if (text === 0) {
      failures++;
      console.log(`      contenu vide, le prérendu n'apporte rien`);
    }
  } catch (err) {
    failures++;
    console.log(`  ${route.padEnd(12)} ÉCHEC — ${err.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
server.close();

if (failures) {
  console.error(`\nPrérendu : ${failures} route(s) en échec.`);
  process.exit(1);
}
console.log(`\nPrérendu : ${ROUTES.length} routes écrites dans dist/.`);
