# Audit ergonomie & accessibilité — Marabu Site V2

> Audit réalisé sur le code source (branche `develop`). Chaque constat est localisé (`fichier:ligne`), rattaché à un critère **WCAG 2.1** quand pertinent, avec la correction proposée.
> Référentiel visé : **WCAG 2.1 niveau AA**.

---

## Résumé exécutif

Le site part sur une **base saine** : beaucoup de bonnes pratiques d'accessibilité sont déjà en place (voir §4). Les problèmes restants sont **concentrés et corrigeables rapidement**, principalement autour de **deux axes** :

1. **Contrastes de couleur** insuffisants (le point le plus systémique) — texte gris/opacités faibles sur fonds clairs et foncés.
2. **Formulaire de contact** — labels non associés aux champs.

Aucun blocage majeur type « navigation clavier impossible » ou « contenu inaccessible ». L'essentiel est de la **finition AA**.

| Sévérité | Nombre de constats |
|---|---|
| 🔴 Élevé | 2 |
| 🟠 Moyen | 3 |
| 🟢 Faible | 4 |
| ✅ Déjà conforme | 9 |

---

## 1. Accessibilité — constats

### 🔴 A11Y-1 — Formulaire : labels non associés aux champs — ✅ CORRIGÉ
> Résolu : `id`+`htmlFor`+`aria-required` sur les deux formulaires (ContactPage + section ServicesPage), astérisques passés en `aria-hidden`.

- **Fichier :** `src/pages/ContactPage.tsx:417-510`
- **Constat :** les 5 `<label>` n'ont pas de `htmlFor`, et les `<input>/<select>/<textarea>` n'ont pas d'`id`. Le libellé n'est donc **pas relié programmatiquement** au champ.
- **Impact :** un lecteur d'écran annonce « champ de saisie » sans son intitulé ; cliquer le label ne place pas le focus dans le champ.
- **WCAG :** 1.3.1 (Info et relations), 3.3.2 (Étiquettes ou instructions), 4.1.2 (Nom, rôle, valeur).
- **Correction :** ajouter `id` sur chaque champ et `htmlFor` correspondant sur le label (ex. `id="contact-name"` + `htmlFor="contact-name"`). Ajouter aussi `aria-required` sur les champs obligatoires.

### 🔴 A11Y-2 — Contrastes de couleur insuffisants (systémique) — ✅ CORRIGÉ
> Résolu : passe globale — textes gris (`gray-500→600/700`), labels/eyebrows noirs (`black/35·40→60`), placeholders (`/25→45`), textes sur fond foncé (`white·ecede3 /35-50→70-75`), liens de nav inactifs (`.55→.72`). Vert de marque : nuance foncée **`#3f6b3f`** introduite pour le **petit texte sur fond clair** (~5.2:1), `#538253` conservé pour gros titres, accents, bordures et texte sur fond foncé. ⚠️ Ratios calculés — à confirmer avec Lighthouse/WebAIM sur le rendu.

Plusieurs combinaisons passent sous le ratio **4.5:1** requis pour le texte normal (3:1 pour le grand texte). Cas confirmés :

| Élément | Fichier | Couleur / fond | Ratio estimé |
|---|---|---|---|
| Description + CTA du hero | `Hero.tsx:86,91` | `text-gray-500` (#6b7280) sur #ecede3 | ~4.0:1 ❌ |
| Libellés du formulaire | `ContactPage.tsx:417…` | `text-black/40` sur #fff | ~2.9:1 ❌ |
| Placeholders | `ContactPage.tsx` | `placeholder-black/25` sur #fff | ~1.9:1 ❌ |
| Paragraphe intro footer | `Footer.tsx:69` | `text-white/45` sur #1d454c | ~3.2:1 ❌ |
| Eyebrows verts (petit texte) | multiples | `#538253` sur #ecede3 | ~3.5:1 ❌ (OK si ≥ grand texte) |
| Liens de nav inactifs | `Navbar.tsx:125` | `#1d454c` à `opacity: .55` | ~3.3:1 ❌ |

- **WCAG :** 1.4.3 (Contraste minimum, AA).
- **Correction :** remonter les opacités (`/40`→`/60`, `/45`→`/70`), remplacer `text-gray-500` par une teinte plus soutenue (`#4b5563`/`text-[#1d454c]`), et réserver le vert `#538253` au **grand texte** ou l'assombrir légèrement pour le petit texte. À vérifier ensuite avec un contrôleur de contraste.

### 🟠 A11Y-3 — Deux landmarks `<main>` sur la page d'accueil — ✅ CORRIGÉ
> Résolu : `story-scroll.tsx` rend maintenant `<div role="region">` au lieu de `<main>`. Un seul landmark `main` par page.

- **Fichiers :** `src/App.tsx:54` (`<main id="main-content">`) contient `<Services>`, qui rend `src/components/ui/story-scroll.tsx:124` — lequel utilise **aussi** `<main>`.
- **Constat :** deux `<main>` **imbriqués** sur la même page. Une page ne doit avoir qu'un seul landmark `main`.
- **Impact :** navigation par landmarks des lecteurs d'écran ambiguë.
- **WCAG :** 1.3.1 ; ARIA (landmark unique).
- **Correction :** dans `story-scroll.tsx`, remplacer le `<main>` par une `<div>` (garder `aria-label` si utile, ou passer en `role="region"`).

### 🟠 A11Y-4 — Pas d'indicateur de focus clavier cohérent — ✅ CORRIGÉ
> Résolu : règle globale `:focus-visible` (contour vert `#3f6b3f`, offset 2px) ajoutée dans `index.css`.

- **Fichier :** `src/index.css` (aucun style `:focus-visible` global, hors skip link).
- **Constat :** les nombreux boutons/liens stylés en inline reposent sur l'outline par défaut du navigateur, sans style unifié ni garanti. Les champs de formulaire, eux, ont un focus JS correct (`ContactPage.tsx:120-135`).
- **Impact :** utilisateur clavier peut perdre le repère de focus selon les composants.
- **WCAG :** 2.4.7 (Focus visible, AA).
- **Correction :** ajouter un style global `:focus-visible { outline: 2px solid #538253; outline-offset: 2px; }` dans `index.css`.

### 🟠 A11Y-5 — Marquee logos : contenu lu en double — ✅ CORRIGÉ
> Résolu : le défilement visuel est `aria-hidden`, et la liste des partenaires est exposée une seule fois en `sr-only` dans `LogoMarquee.tsx`.

- **Fichier :** `src/components/LogoMarquee.tsx:23` (`const track = [...items, ...items]`).
- **Constat :** la liste des partenaires est dupliquée (pour l'effet de défilement infini). Un lecteur d'écran énonce donc **chaque nom deux fois**.
- **WCAG :** 1.3.1.
- **Correction :** rendre le second jeu `aria-hidden="true"`, ou envelopper tout le marquee dans un conteneur `aria-hidden` avec une liste alternative accessible.

### 🟢 A11Y-6 — Confirmation d'envoi du formulaire non annoncée — ✅ CORRIGÉ
> Résolu : bloc succès en `role="status"` + `aria-live="polite"`, focus déplacé dessus après envoi (`tabIndex={-1}` + `useEffect`). Appliqué aux deux formulaires (ContactPage + ServicesPage).

- **Fichier :** `src/pages/ContactPage.tsx:365-411` (état `submitted`).
- **Constat :** le message d'erreur a bien `role="alert"` (bien), mais l'**état de succès** n'est ni annoncé (`aria-live`) ni suivi d'un déplacement de focus.
- **WCAG :** 4.1.3 (Messages d'état, AA).
- **Correction :** ajouter `role="status"` / `aria-live="polite"` sur le bloc de succès, ou déplacer le focus dessus après envoi.

### 🟢 A11Y-7 — Cibles tactiles un peu petites — ✅ CORRIGÉ
> Résolu : icônes sociales portées à 44×44px (`w-11 h-11`) dans Footer et ContactPage.

- **Fichiers :** `Footer.tsx:136` (`w-9 h-9` = 36px), icônes sociales `ContactPage.tsx`.
- **Constat :** ~36px, sous la cible recommandée de 44×44px.
- **WCAG :** 2.5.5 (AAA — recommandation, non bloquant AA).
- **Correction :** porter à `w-11 h-11` (44px) ou augmenter le padding cliquable.

### 🟢 A11Y-8 — Champs qui ne s'appuient que sur le placeholder pour l'exemple
- **Fichier :** `ContactPage.tsx` (placeholders `text-black/25`).
- **Constat :** les labels existent (bien), mais le placeholder très clair reste peu lisible. Ne pas en faire porter d'information essentielle.
- **Correction :** assombrir le placeholder (lié à A11Y-2).

---

## 2. Ergonomie / UX — constats

### UX-1 — Accueil : scroll narratif très long, sans repère — ✅ CORRIGÉ
> Résolu (option « garder + repère ») : composant `ScrollProgress` — barre de progression en haut + bouton « retour en haut » (44px, `aria-label`, smooth via Lenis, respecte reduced-motion). Le scroll narratif n'est pas touché.

- **Fichiers :** `Hero.tsx:99` (`h-[350vh]`), `Services.tsx` via `story-scroll` (sections **épinglées**).
- **Constat :** l'accueil enchaîne un hero de 3,5 écrans puis des sections pinnées : la page est très longue et donne une sensation de *scroll hijacking*, sans indicateur de progression ni navigation par section. **Déjà signalé** dans l'analyse client V2 (§2.1, footer difficile à atteindre).
- **Recommandation :** ajouter un repère de progression / une navigation d'ancrage, ou raccourcir la hauteur des séquences. (Décision de direction déjà ouverte dans `ANALYSE-CORRECTIONS-V2.md`.)

### UX-2 — Le sélecteur de langue se déplace au scroll (desktop) — ✅ CORRIGÉ
> Résolu : le sélecteur est désormais toujours intégré dans la barre de nav (position stable), le bloc supérieur qui se repliait au scroll a été supprimé.

- **Fichier :** `Navbar.tsx:88-113` (`maxHeight: scrolled ? 0 : 40`), puis réinjecté dans la barre `:136-154`.
- **Constat :** au scroll, le sélecteur de langue disparaît d'en haut pour réapparaître dans la rangée de nav. Ce changement de position peut désorienter.
- **Recommandation :** garder le sélecteur à un emplacement stable.

### UX-3 — Affordance trompeuse : des « pastilles » ressemblent à des boutons — ✅ CORRIGÉ
> Résolu : les tags de service sont maintenant de vrais `<Link>` vers `/services` (avec état hover). Ils tiennent leur promesse visuelle de cliquabilité.

- **Fichiers :** tags de service `Services.tsx:238-247`, pastilles Stratégie/Transformation/Gouvernance.
- **Constat :** rendues comme des pilules bordées, elles évoquent des boutons cliquables mais sont inertes (déjà relevé dans l'analyse V2 §6.2).
- **Recommandation :** soit les rendre cliquables vers une cible, soit atténuer leur style « bouton » pour qu'elles se lisent comme des étiquettes.

### UX-4 — Feedback de validation du formulaire minimal — ✅ CORRIGÉ
> Résolu : validation par champ (requis + format email) avec messages contextuels, `aria-invalid` + `aria-describedby` + `role="alert"`, effacement à la correction et focus sur le premier champ invalide. Appliqué aux deux formulaires (ContactPage + ServicesPage).

- **Fichier :** `ContactPage.tsx:77-114`.
- **Constat :** validation `required` native + un seul message d'erreur global en cas d'échec réseau ; pas de retour par champ (email invalide, etc.).
- **Recommandation :** ajouter une validation par champ et des messages contextuels.

### UX-5 — Liens internes en `<a>` plutôt que `<Link>` (rechargement complet) — ✅ CORRIGÉ
> Résolu : les CTA `/contact` de `About.tsx` utilisent maintenant `<Link>` (navigation SPA, sans rechargement). Le lien vers l'ancre `/#services` reste un `<a>` (comportement d'ancrage volontaire).

- **Fichier :** `About.tsx` (CTA `href="/contact"`, `href="/#services"`).
- **Constat :** ces `<a>` provoquent un **rechargement complet** de la SPA au lieu d'une navigation client instantanée.
- **Recommandation :** utiliser `<Link to="/contact">` de react-router pour rester en navigation SPA.

### UX-6 — Révélation d'image au survol : desktop uniquement
- **Fichier :** `CaseStudies.tsx:136-184` (image affichée `onMouseEnter`).
- **Constat :** l'aperçu visuel n'existe qu'au survol souris ; pas d'équivalent tactile/clavier. Non bloquant (l'info reste présente ailleurs), mais l'interaction est perdue sur mobile.
- **Recommandation :** acceptable en l'état ; si l'image est jugée utile, l'exposer aussi sur mobile.

---

## 3. Tableau de priorisation

| Priorité | ID | Sujet | Effort |
|---|---|---|---|
| 🔴 Haute | A11Y-1 | Associer labels/champs (formulaire) | Faible |
| 🔴 Haute | A11Y-2 | Corriger les contrastes | Moyen |
| 🟠 Moyenne | A11Y-3 | Un seul `<main>` sur l'accueil | Faible |
| 🟠 Moyenne | A11Y-4 | Focus clavier visible global | Faible |
| 🟠 Moyenne | A11Y-5 | Marquee lu en double | Faible |
| 🟠 Moyenne | UX-1 | Repère de navigation sur l'accueil | Moyen/Élevé |
| 🟢 Basse | A11Y-6 | Annoncer le succès du formulaire | Faible |
| 🟢 Basse | A11Y-7 | Cibles tactiles 44px | Faible |
| 🟢 Basse | UX-2/3/4/5 | Finitions ergonomiques | Faible→Moyen |

---

## 4. Déjà conforme / bonnes pratiques en place ✅

Ces points sont **corrects** et méritent d'être préservés :

1. **Lien d'évitement** (« Aller au contenu principal ») — `Navbar.tsx:55-60`.
2. **`prefers-reduced-motion`** géré à deux niveaux : CSS (`index.css:70-85`) **et** JS via `MotionConfig reducedMotion="user"` (`main.tsx:32`) + garde dans `story-scroll.tsx:71`.
3. **Attribut `lang` synchronisé** au changement de langue — `i18n/index.ts:21-26`.
4. **`aria-current="page"`** sur la nav active — `Navbar.tsx:121`.
5. **`aria-expanded` / `aria-controls`** sur le menu mobile — `Navbar.tsx:180-181`.
6. **Images décoratives** correctement neutralisées (`alt=""` + `aria-hidden`) partout (cauris/coris).
7. **Message d'erreur formulaire** avec `role="alert"` — `ContactPage.tsx:515`.
8. **Structure sémantique** : `header`, `main`, `footer`, `nav`, `section[aria-label]`.
9. **Polices auto-hébergées** (pas de fuite d'IP vers Google, rendu non bloquant) — `index.css:1-10`.

---

## 5. Quick wins implémentables immédiatement

Les correctifs suivants sont **déterministes** (sans asset ni décision produit) et peuvent être appliqués tout de suite :

- **A11Y-1** : `id`/`htmlFor` + `aria-required` sur le formulaire.
- **A11Y-2** : passe sur les opacités/teintes de texte (hero, footer, labels, eyebrows).
- **A11Y-3** : `<main>` → `<div>` dans `story-scroll.tsx`.
- **A11Y-4** : règle globale `:focus-visible` dans `index.css`.
- **A11Y-5** : `aria-hidden` sur le second jeu du marquee.
- **A11Y-6** : `role="status"` + focus sur le succès du formulaire.
- **A11Y-7** : cibles sociales `w-11 h-11`.
- **UX-5** : `<a>` → `<Link>` dans `About.tsx`.

> Reste en dépendance/décision (hors quick wins) : **UX-1** (repère de navigation sur l'accueil / choix scroll vs pages, déjà ouvert dans `ANALYSE-CORRECTIONS-V2.md`).
</content>
