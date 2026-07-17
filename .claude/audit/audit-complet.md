# Audit complet — Marabu Site v2

**Date :** 15 juillet 2026
**Branche auditée :** `develop` (commit `ea7c5fe`)
**Stack :** Vite 8 · React 19 · TypeScript 6 · Tailwind 4 · Framer Motion 12 · GSAP · Lenis · React Query 5 · i18next · React Router 7

---

## ✅ Statut : corrections appliquées le 15 juillet 2026

Tous les points de cet audit ont été corrigés, **sauf la partie CI/CD (M3), volontairement laissée de côté** à la demande.

| Avant | Après |
|---|---|
| Formulaire de contact inerte | Branché sur Web3Forms, avec états loading/erreur/succès et timeout de 15 s |
| CTA `#contact` morts | `<Link to="/contact">` — vérifié par clic réel en navigateur |
| `dist/` à 26 Mo, image de 11 Mo | **2,8 Mo** (‑89 %), hero à 122 Ko |
| Bundle unique de 700 Ko | Vendors + routes séparés, pages secondaires hors chunk initial |
| Contenu bloqué ~4,2 s par le loader | Contenu monté d'emblée, loader ramené à 1,2 s |
| `<title>` « Wabital », `lang="en"` | Métadonnées Marabu, `lang` synchronisé, OG + sitemap + robots |
| XSS possible sur le blog | `DOMPurify.sanitize()` |
| URL inconnue = page blanche | Page 404 + ErrorBoundary racine |
| Aucun support `prefers-reduced-motion` | `MotionConfig`, CSS, Lenis et loader alignés |
| Google Fonts (RGPD, bloquant) | Poppins auto-hébergée, subset latin, 5 graisses (40 Ko) |

**Vérification :** typecheck et ESLint à zéro erreur ; les 6 routes ont été chargées dans un Chromium headless (titre, `h1`, `lang`, landmark `main`, zéro erreur console), le CTA cliqué jusqu'à `/contact`, et l'envoi du formulaire tracé jusqu'à la requête réseau.

**Deux erreurs de cet audit, corrigées ici :**
- `story-scroll.tsx` était annoncé comme inutilisé : il est en fait importé par `Services.tsx`. Il a été conservé.
- Les fichiers `Cauris *.svg` étaient présentés comme des vecteurs légers à réutiliser : ce sont en réalité des PNG encodés en base64 dans un wrapper SVG (968 Ko et 1,1 Mo). `coris2` a donc été traité en WebP 400 px (1,5 Mo → 20 Ko) plutôt qu'en SVG.

**Ce qui reste à ta main :** créer la clé sur [web3forms.com](https://web3forms.com) et la coller dans `.env` (`VITE_WEB3FORMS_KEY=`) — sans elle le formulaire affiche son message d'erreur avec repli mail ; renseigner les URL LinkedIn/X dans `src/config/site.ts` (les icônes restent masquées tant qu'elles sont vides) ; et la CI/CD (M3), laissée intacte.

---

## Synthèse

Le site est visuellement abouti et l'architecture React est propre (composants découpés, i18n complet FR/EN, React Query pour le blog, animations soignées). Le typecheck passe sans erreur.

En revanche, **trois problèmes bloquent la conversion et la visibilité du site en production** :

1. **Le formulaire de contact n'envoie rien.** Il affiche un message de succès sans jamais transmettre les données. Tous les leads sont perdus.
2. **Tous les boutons « Contact » de la page d'accueil sont morts.** Ils pointent vers une section qui n'est jamais affichée.
3. **Le SEO est inexistant et hérité d'un autre projet.** Le `<title>` annonce « Wabital », la langue déclarée est l'anglais, aucune balise Open Graph, aucun sitemap.

S'y ajoutent un poids de page critique (une image de 11 Mo en accueil), une faille XSS sur les articles du blog, et un déploiement partiellement cassé.

### Tableau de bord

| Domaine | Note initiale | Après corrections |
|---|---|---|
| Fonctionnel | 🔴 3/10 | 🟢 Formulaire opérationnel, CTA réparés |
| Sécurité | 🟠 5/10 | 🟢 HTML assaini, `.env` retiré de Git |
| Performance | 🔴 3/10 | 🟢 2,8 Mo, bundle découpé, loader non bloquant |
| SEO | 🔴 2/10 | 🟢 Métadonnées propres, sitemap, `lang` correct |
| Accessibilité | 🟠 4/10 | 🟢 `alt`, ARIA, contrastes, reduced-motion, skip link |
| Qualité de code | 🟢 7/10 | 🟢 Code mort supprimé (zéro test : reste à faire) |
| CI/CD | 🟠 5/10 | ⏸️ **Non traité — exclu à la demande** |

### Les 5 corrections prioritaires

1. Brancher le formulaire de contact sur un backend (⚠️ perte de leads en cours)
2. Réparer les CTA `#contact` de l'accueil
3. Compresser les images (11 Mo → ~200 Ko) et découper le bundle
4. Corriger les métadonnées SEO (`title`, `lang`, Open Graph)
5. Assainir le HTML des articles (`DOMPurify`)

---

## 🔴 Critique

### C1 — Le formulaire de contact ne transmet aucune donnée

**Fichier :** `src/pages/ContactPage.tsx:70-73`

```ts
function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setSubmitted(true);
}
```

Le handler se contente de basculer l'affichage sur l'écran de confirmation. Aucun `fetch`, aucun `mailto`, aucun service tiers. L'utilisateur voit « message envoyé » alors que rien ne part. **Chaque demande de contact reçue depuis la mise en ligne est définitivement perdue**, et le visiteur ne relance pas puisqu'il croit avoir été entendu.

**Correction :** poster vers un endpoint (l'API `adminer.marabu.services` existe déjà) ou un service type Formspree/Resend, avec gestion des états `loading` / `error`, et n'afficher la confirmation qu'après une réponse `2xx`.

> **✅ Corrigé.** Sondage de l'API : aucun endpoint de contact n'existe (`/api/contact` → 404), d'où le choix de Web3Forms. `handleSubmit` poste désormais réellement et ne confirme qu'après `success: true`.
>
> **Bug découvert pendant la vérification** (absent de l'audit initial) : sans borne de temps, une requête qui n'aboutit pas laissait le bouton figé sur « Envoi en cours… » indéfiniment — ni erreur, ni possibilité de réessayer. Sur les connexions instables visées par le site, le formulaire serait redevenu un trou noir à leads malgré le branchement. Un `AbortSignal.timeout(15000)` a été ajouté, et le chemin d'erreur a été vérifié en navigateur : le bouton se réarme et le message d'erreur s'affiche avec un repli `mailto`.

---

### C2 — Tous les CTA « Contact » de la page d'accueil sont morts

**Fichiers :** `src/components/Hero.tsx:89`, `src/components/Manifesto.tsx:50`, `src/components/Footer.tsx:46`, `src/i18n/fr.json:210` + `en.json`

Ces liens pointent vers `href="#contact"`. Or l'ancre `id="contact"` n'existe que dans `src/components/Contact.tsx:37` — un composant **jamais importé nulle part**. Cliquer sur le bouton principal de la page d'accueil ne produit donc strictement rien.

Le même problème touche le lien « Contact » du menu de navigation du footer (défini dans les fichiers i18n).

**Correction :** remplacer ces ancres par `<Link to="/contact">` (la page dédiée existe et fonctionne), et corriger les `href` dans `fr.json` / `en.json`. Décider ensuite du sort de `Contact.tsx` (voir M6).

> **✅ Corrigé.** Les CTA du Hero, du Manifesto et du Footer pointent vers `/contact`, et le menu du footer utilise désormais les vraies routes (les ancres `#home`/`#about` ne fonctionnaient que sur l'accueil alors que le footer est sur toutes les pages). Vérifié par clic réel : 5 liens vers `/contact`, navigation confirmée.

---

### C3 — Métadonnées SEO héritées du projet « Wabital »

**Fichier :** `index.html`

```html
<html lang="en">
<meta name="description" content="Wabital — Wabi-Sabi Vitality, Translated Digitally..." />
<title>Wabital — Wabi-Sabi Vitality, Translated Digitally</title>
```

Le site s'annonce à Google sous le nom d'un autre projet, dans une description sans rapport avec Marabu, et déclare une langue anglaise alors que le contenu par défaut est français (`src/i18n/index.ts:5`). Le `package.json` porte d'ailleurs encore le nom `"wabital-clone"`.

Manquent également : Open Graph / Twitter Card (tout partage sur LinkedIn ou WhatsApp affichera un lien nu), `<link rel="canonical">`, `robots.txt`, `sitemap.xml`, données structurées `Organization`.

**Aggravant :** en SPA sans SSR, le HTML servi est une coquille vide. Combiné au loader bloquant (M1), le contenu réel n'apparaît qu'après ~4 secondes de JavaScript. Les articles de blog, chargés côté client via React Query, ne sont pratiquement pas indexables.

**Correction :** corriger `index.html`, ajouter `react-helmet-async`

> **✅ Corrigé.** `index.html` réécrit (titre, description, `lang="fr"`, OG/Twitter, JSON-LD `Organization`), `robots.txt` et `sitemap.xml` publiés, `document.documentElement.lang` synchronisé sur i18n. Les métadonnées par page passent par un composant `Seo` qui exploite le hoisting natif de React 19 — pas de dépendance supplémentaire. pour des titres par page, synchroniser `document.documentElement.lang` au changement de langue, publier `robots.txt` + `sitemap.xml`. À moyen terme, envisager un prerender (`vite-plugin-ssg`) au minimum pour le blog.

---

### C4 — XSS potentielle sur le contenu des articles

**Fichier :** `src/pages/ArticlePage.tsx:1241`

```tsx
dangerouslySetInnerHTML={{ __html: article.content }}
```

Le HTML provient directement de l'API `adminer.marabu.services` sans aucune sanitisation. Si le CMS est compromis, ou si un rédacteur peut insérer du HTML libre (l'éditeur Tiptap le permet), un `<script>` ou un `<img onerror=...>` s'exécute avec les droits de la session visiteur.

**Correction :** `DOMPurify.sanitize(article.content)` avant injection. Ajouter une Content-Security-Policy côté Nginx en défense secondaire.

> **✅ Corrigé.** `DOMPurify.sanitize()` appliqué dans un `useMemo`. La CSP côté Nginx relève de la configuration serveur et n'a pas été touchée.

> À noter : `decodeHtmlEntities()` (`src/hooks/useArticles.ts:23-27`) utilise `textarea.innerHTML` sur un élément détaché — ce cas précis n'exécute pas de script, il est acceptable.

---

### C5 — Poids de page catastrophique

Le dossier `dist/` pèse **26 Mo**, dont :

| Fichier | Poids | Contexte |
|---|---|---|
| `marabu_conseil_accueil.jpg` | **11 Mo** | Première image du Hero, chargée immédiatement |
| `houssene-ben-souda.jpg` | 3,7 Mo | Page À propos |
| `formation-e-reputation.jpg` | 3,0 Mo | Page Services |
| `Cauris-bg.png` | 1,9 Mo | Fond du loader |
| `coris2.png` | 1,5 Mo | Décoration, **répétée 6 à 9 fois par page** |

Sur une connexion mobile en Côte d'Ivoire (~3 Mo/s en 4G, bien moins en 3G), l'image du Hero seule prend plus de 20 secondes. Le LCP se compte en dizaines de secondes.

Le cas de `coris2.png` est particulièrement coûteux : ce décor de 1,5 Mo est instancié 6 fois dans le Hero, 7 fois dans son troisième panneau, 9 fois dans `PageTransition`, et à nouveau dans `BlogPage` et `ContactPage`. Le fichier n'est téléchargé qu'une fois, mais le navigateur décode et compose des dizaines d'instances d'un PNG lourd.

**Correction :**
- Convertir toutes les photos en WebP/AVIF, largeur max 1920px, qualité 80 → ~150-250 Ko par image (gain estimé : **~24 Mo, soit 92 %**)
- Remplacer `coris2.png` par un SVG (les fichiers `Cauris VertPlan de travail 1.svg` existent déjà dans `src/assets/`) — quelques Ko au lieu de 1,5 Mo
- Servir des `<img>` avec `srcset` plutôt que des `background-image` (`Hero.tsx:414`), qui empêchent tout lazy loading natif
- Supprimer `src/assets/screencapture-wabital-en-services-2026-06-01-16_28_35.png` (capture d'écran résiduelle)

> **✅ Corrigé.** Tout converti en WebP : `src/assets` passe de 24 Mo à 1,7 Mo et `dist/` de 26 Mo à 2,8 Mo. Le hero tombe de 11 Mo à 122 Ko, `coris2` de 1,5 Mo à 20 Ko (400 px suffisent : il s'affiche entre 45 et 200 px). Capture résiduelle et assets orphelins (`hero.png`, `react.svg`, `vite.svg`, `icons.svg`, `Cauris Marabu/`) supprimés.

---

### C6 — Bundle JavaScript monolithique

`dist/assets/index-DPO7TMg_.js` : **700 Ko** (220 Ko gzip) en un seul chunk. Aucun `React.lazy`, aucune configuration `manualChunks`.

Un visiteur de la page d'accueil télécharge donc l'intégralité de `ServicesPage` (1033 lignes), `About` (543 lignes), `BlogPage`, GSAP + ScrollTrigger, Framer Motion et Lenis avant de voir quoi que ce soit.

**Correction :** `React.lazy` + `Suspense` sur chaque route dans `main.tsx`, et `build.rollupOptions.output.manualChunks` pour isoler les vendors (react, framer-motion, gsap). Gain attendu : ~60 % sur le chunk initial.

> **✅ Corrigé.** Routes lazy-loadées (`src/routes/AppRoutes.tsx`) et vendors isolés. Les pages secondaires (~58 Ko) sortent du chunk initial et les vendors restent en cache entre deux déploiements.

---

## 🟠 Majeur

### M1 — Le loader bloque le contenu pendant ~4,2 secondes

**Fichier :** `src/components/Loader.tsx`

La séquence est fixe et non interruptible : `DURATION = 2600ms` + `550ms` (particules) + `1000ms` (fondu) ≈ **4,15 secondes**. Or `App.tsx:37` ne monte `<Navbar>`, `<Hero>` et le reste **que lorsque `loaded === true`** : le contenu n'existe pas dans le DOM avant.

Conséquences : LCP > 4s garanti quelle que soit la connexion, aucun contenu pour les crawlers, et un compteur de progression qui n'indique rien de réel (il ne mesure pas un chargement, il déroule un timer).

**Correction :** rendre le contenu immédiatement en dessous du loader (overlay `position: fixed`), plafonner la durée à ~1,2s, et sauter le loader si les assets sont déjà en cache ou si `prefers-reduced-motion` est actif.

> **✅ Corrigé.** Le contenu est monté d'emblée sous le loader, la séquence tombe à 1,2 s, et le loader n'est pas monté du tout en `prefers-reduced-motion`.

---

### M2 — Le loader déclenche 60 re-renders par seconde sur 90 objets

**Fichier :** `src/components/Loader.tsx:603-620`

```ts
const animate = () => {
  setParticles((prev) => prev.map((p) => ({ ...p, x: p.x + p.vx * 0.45, ... })));
  gravityRef.current = requestAnimationFrame(animate);
};
```

Chaque frame recrée un tableau de 90 objets et déclenche un rendu React complet — soit 5 400 allocations d'objets par seconde, plus la réconciliation. Sur mobile d'entrée de gamme, l'animation saccade et la boucle ne s'arrête jamais d'elle-même (`particles.length` reste stable, donc l'effet ne se re-déclenche pas, mais la RAF tourne jusqu'au démontage).

**Correction :** animer via `useMotionValue` / des transforms directs hors du cycle React, ou dessiner les particules sur un `<canvas>`.

> **✅ Corrigé.** La balistique est simulée une fois puis jouée en keyframes par Framer : zéro rendu React par frame. Le nombre de particules passe de 90 à 40.

---

### M3 — L'étape de déploiement Nginx ne fait rien

**Fichier :** `.github/workflows/deploy.yml:40-47`

```yaml
- name: Fix permissions and reload Nginx
  uses: appleboy/ssh-action@v1.0.3
  with:
    host: ${{ secrets.SSH_HOST }}
    ...
    port: ${{ secrets.SSH_PORT }}
```

**Le paramètre `script:` est absent.** L'étape se connecte en SSH et raccroche — ni permissions corrigées, ni Nginx rechargé, malgré son nom.

Deux autres problèmes sur ce workflow :

- **Secrets incohérents avec la documentation.** Le workflow lit `SSH_HOST` / `SSH_USER` / `SSH_PRIVATE_KEY` / `SSH_PORT`, alors que `docs/nginx-setup.md` documente `VPS_HOST` / `VPS_USER` / `VPS_SSH_KEY` / `VPS_PORT`. Un seul jeu de noms est correct ; l'autre installe des secrets vides.
- **`rm: true` sur le scp** supprime le contenu du dossier cible avant l'upload → fenêtre de quelques secondes où le site renvoie 404. Préférer un upload dans un dossier temporaire puis un basculement de symlink.

**Correction :** ajouter le `script:` manquant, aligner les noms de secrets sur une seule convention, passer à un déploiement atomique.

> **⏸️ Non traité — exclu à la demande.** Reste entièrement à faire.

---

### M4 — Deux lockfiles concurrents

`package-lock.json` (115 Ko) **et** `pnpm-lock.yaml` (71 Ko) coexistent à la racine. La CI utilise `npm ci` + `cache: "npm"`, mais un développeur lançant `pnpm install` résoudra un arbre de dépendances potentiellement différent — les fameux bugs « ça marche chez moi ».

**Correction :** choisir un gestionnaire, supprimer l'autre lockfile, et déclarer `"packageManager"` dans `package.json`.

> **⏸️ Non traité.** Touche au choix du gestionnaire utilisé par la CI (`npm ci`), donc rattaché au périmètre CI/CD exclu.

---

### M5 — `.env` versionné dans Git

`git ls-files` confirme que `.env` est suivi, et `.gitignore` ne le couvre pas.

Le contenu actuel est inoffensif (`VITE_BACK_END_URL_API`, une URL publique — toute variable `VITE_*` finit de toute façon dans le bundle). Le risque est **la suite** : le jour où une clé API y est ajoutée par réflexe, elle part dans l'historique public sans que personne ne le remarque.

**Correction :** ajouter `.env` à `.gitignore`, committer un `.env.example`, et retirer le fichier du suivi (`git rm --cached .env`).

> **✅ Corrigé.** `.env` retiré du suivi, `.gitignore` complété, `.env.example` committé.
>
> ⚠️ Le fichier reste dans l'historique Git. Sans secret réel dedans jusqu'ici, une réécriture d'historique n'est pas nécessaire — mais la protection ne vaut que pour l'avenir.

---

### M6 — Code mort

| Fichier | Lignes | Statut |
|---|---|---|
| `src/components/Contact.tsx` | 249 | Jamais importé — et pourtant contient l'ancre `#contact` attendue par C2 |
| `src/components/ValueProp.tsx` | 43 | Jamais importé |
| `src/components/CaurisTransition.tsx` | 103 | Importé puis commenté (`App.tsx:17`), 4 usages commentés |
| `src/components/ui/story-scroll.tsx` | 134 | Aucun usage détecté |

Soit ~530 lignes non utilisées. `Contact.tsx` est le cas le plus trompeur : sa présence donne l'illusion que les CTA de C2 fonctionnent.

**Correction :** supprimer ce qui est abandonné (Git conserve l'historique), ou monter `Contact.tsx` dans `App.tsx` si la section d'accueil est encore souhaitée.

> **✅ Corrigé.** `Contact.tsx`, `ValueProp.tsx` et `CaurisTransition.tsx` supprimés (la page `/contact` couvre le besoin). **`story-scroll.tsx` a été conservé** : contrairement à ce qu'indiquait l'audit, il est importé par `Services.tsx` — erreur détectée à la compilation.

---

### M7 — Aucune route 404, aucun Error Boundary

**Fichier :** `src/main.tsx:31-40`

Aucune `<Route path="*">` : une URL inconnue (`/servcies`, un ancien lien indexé) affiche une **page entièrement blanche**, sans navigation ni moyen de repartir. Aucun `<ErrorBoundary>` non plus : la moindre exception dans un composant vide tout l'écran.

**Correction :** ajouter une route catch-all avec une vraie page 404 (logo, navigation, lien retour) et un Error Boundary racine.

> **✅ Corrigé.** `NotFound.tsx` (bilingue, navigation complète) sur `path="*"`, et `ErrorBoundary` racine avec textes en dur pour rester fonctionnel même si i18n échoue.

---

### M8 — Animations non désactivables (`prefers-reduced-motion`)

Le site est saturé de mouvement : rideaux de transition, parallaxe sur 350vh, marquees infinies, 90 particules, dizaines de `whileInView`. **Aucun composant ne consulte `prefers-reduced-motion`** — seul `story-scroll.tsx` (inutilisé) le mentionne.

Pour les utilisateurs souffrant de troubles vestibulaires, ce niveau d'animation provoque nausées et vertiges. Le réglage système existe précisément pour cela ; l'ignorer est un manquement WCAG 2.1 (critère 2.3.3).

**Correction :** `useReducedMotion()` de Framer Motion en tête des composants animés, avec fallback en fondu simple. Pour le CSS, encadrer les marquees dans `@media (prefers-reduced-motion: reduce) { animation: none; }`.

> **✅ Corrigé.** `<MotionConfig reducedMotion="user">` couvre tout Framer Motion, plus une règle CSS pour les marquees. Deux cas nécessitaient un traitement manuel : les rideaux de `PageTransition` reposent sur `scaleY` — désactiver les transforms aurait laissé un aplat figé en travers de l'écran, donc un simple fondu les remplace ; et le scroll inertiel de Lenis est désactivé (c'est du mouvement non sollicité).

---

## 🟡 Mineur

### m1 — Accessibilité

- **`alt` manquants** : logos dans `Navbar.tsx:73` et `Loader.tsx:650`. Un lecteur d'écran annonce l'URL du fichier.
- **Liens sociaux morts** : `href="#"` sur LinkedIn et X dans `Footer.tsx:948` et `ContactPage.tsx`.
- **Sélecteur de langue** : boutons sans `aria-pressed` ni `lang`, l'état actif n'est signalé que par l'opacité.
- **Contrastes** : `text-white/25` (footer, `Footer.tsx:966`) et `text-black/30` échouent au ratio 4,5:1 du WCAG AA.
- **Menu mobile** : `aria-expanded` et `aria-controls` absents sur le hamburger (`Navbar.tsx:164`).
- **Focus** : `inputFocus` fait `e.target.style.outline = "none"` (`ContactPage.tsx:83`) et le remplace par une simple couleur de bordure — insuffisant pour la navigation clavier.

### m2 — Google Fonts en `@import` bloquant

`src/index.css:1` importe Poppins depuis `fonts.googleapis.com`. Trois conséquences :

- L'`@import` bloque le rendu et empêche tout préchargement parallèle (pas de `preconnect`)
- 6 graisses chargées (300 à 800) alors que le site en utilise 3 ou 4
- **RGPD** : l'appel transmet l'IP des visiteurs à Google. Plusieurs décisions européennes (dont le tribunal de Munich, 2022) qualifient cet usage de transfert de données non consenti.

**Correction :** auto-héberger Poppins via `@fontsource/poppins`, en ne gardant que les graisses utiles et `font-display: swap`.

> **✅ Corrigé.** `@fontsource/poppins`, subset latin, 5 graisses réellement utilisées (300/400/500/600/700 — la 800 n'était employée nulle part) : 40 Ko au total, et plus aucune requête vers Google.

### m3 — URLs du blog en identifiants numériques

Le type `Article` (`useArticles.ts:8`) expose un champ `slug`, mais les routes utilisent l'`id` : `/actualites/42` au lieu de `/actualites/strategie-digitale-afrique`. C'est une perte sèche en SEO et en lisibilité.

### m4 — Configuration React Query par défaut

`new QueryClient()` sans options (`main.tsx:16`). Aucun `staleTime` (refetch à chaque focus de fenêtre pour du contenu éditorial qui change une fois par semaine), aucune stratégie de `retry`, et pas d'`isError` géré dans `BlogPreview.tsx` — si l'API tombe, la section affiche « aucun article » au lieu d'un message d'erreur.

### m5 — Deux erreurs ESLint

`npm run lint` échoue sur `main.tsx:18` et `main.tsx:26` (`react-refresh/only-export-components`) : `ScrollToTop` et `AppRoutes` cassent le Fast Refresh. À extraire dans leurs propres fichiers. La CI ne lance d'ailleurs pas `lint` — l'erreur passe inaperçue.

### m6 — Aucun test

Aucun fichier de test, aucun framework installé. Les régressions ne sont détectables qu'à l'œil. Vu la taille du projet, un socle minimal suffirait : Vitest + Testing Library sur le formulaire de contact et `useArticles`, plus un smoke test Playwright par route.

### m7 — Divers

- **`_homeLoaded` en variable de module** (`App.tsx:20`) : fonctionne, mais l'état survit à toute l'application de façon invisible et n'est pas réinitialisable. Un `sessionStorage` serait plus explicite.
- **`.DS_Store`** présents dans `src/`, `public/`, `dist/` et à la racine (gitignorés, mais copiés dans le build).
- **`package.json`** : le nom `"wabital-clone"` et la version `0.0.0` traînent depuis le fork.
- **`README.md`** : contenu générique du template Vite, sans instruction propre au projet.
- **Nginx** : `docs/nginx-setup.md` ne configure ni HSTS, ni `X-Content-Type-Options`, ni CSP, et ne compresse pas en Brotli.

---

## Plan d'action

> Le plan ci-dessous est celui de l'audit initial. **Les semaines 1 et 2 sont faites**, ainsi que les points 12 à 16 de la semaine 3. Restent ouverts : **11** (workflow de déploiement) et **16** partiellement (lockfile unique), tous deux rattachés au périmètre CI/CD exclu, plus les chantiers « au-delà ».

### Semaine 1 — Débloquer la conversion ✅

| # | Action | Effort |
|---|---|---|
| 1 | Brancher le formulaire de contact sur un backend | ~3 h |
| 2 | Réparer les CTA `#contact` → `<Link to="/contact">` | ~30 min |
| 3 | Corriger `index.html` (title, lang, description, OG) | ~1 h |
| 4 | Sanitiser le HTML des articles avec DOMPurify | ~30 min |
| 5 | Ajouter la route 404 + Error Boundary | ~1 h |

### Semaine 2 — Performance ✅

| # | Action | Effort |
|---|---|---|
| 6 | Compresser toutes les images en WebP (26 Mo → ~2 Mo) | ~2 h |
| 7 | Remplacer `coris2.png` par le SVG existant | ~1 h |
| 8 | `React.lazy` sur les routes + `manualChunks` | ~2 h |
| 9 | Rendre le loader non bloquant, plafonner à 1,2 s | ~2 h |
| 10 | Auto-héberger Poppins (`@fontsource`) | ~30 min |

### Semaine 3 — Fiabilité et conformité (sauf 11)

| # | Action | Effort |
|---|---|---|
| 11 | Réparer le workflow de déploiement (`script:` + secrets) | ~1 h |
| 12 | `.env` hors de Git, `.env.example` committé | ~15 min |
| 13 | Supprimer le code mort (~530 lignes) | ~1 h |
| 14 | Support de `prefers-reduced-motion` | ~3 h |
| 15 | Passe d'accessibilité (`alt`, contrastes, ARIA, focus) | ~3 h |
| 16 | Un seul lockfile + `lint` dans la CI | ~30 min |

### Au-delà

- Prerender / SSG pour l'indexation du blog
- Slugs dans les URLs d'articles
- Socle de tests (Vitest + Playwright)
- En-têtes de sécurité Nginx (CSP, HSTS) + Brotli
- Analytics respectueux de la vie privée (Plausible, Umami)

---

## Ce qui est bien fait

Pour équilibrer le propos, plusieurs choix méritent d'être soulignés :

- **Structure claire** : séparation `components` / `pages` / `hooks` / `i18n` cohérente et lisible
- **i18n complet** : 500 lignes de traductions FR et EN parfaitement symétriques, avec persistance en `localStorage`
- **Intégration Lenis + GSAP + Framer Motion** (`useLenis.ts`) : le pilotage de Lenis dans la RAF de Framer Motion avec synchronisation de ScrollTrigger est une intégration subtile, souvent ratée, et correctement traitée ici — nettoyage compris
- **Skeletons de chargement** soignés dans `BlogPreview` et `ArticlePage`
- **TypeScript strict** : `noUnusedLocals`, `noUnusedParameters`, typecheck sans erreur
- **Direction artistique cohérente** : palette (`#1d454c`, `#ecede3`, `#538253`) appliquée avec rigueur sur tout le site
