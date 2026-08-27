# Analyse du document « Analyse du site V2 » — compréhension & plan d'action

> Ce fichier reformule ce que j'ai compris du PDF `Analyse_Site_Marabu_V2.pdf`, **mappé sur le code réel** du projet, avec pour chaque point : le fichier concerné, ce qui se passe aujourd'hui, et l'action prévue.
> Rien n'est encore modifié — c'est le plan à valider avant de coder.

---

## Légende

- ✅ **Localisé** : j'ai trouvé le code exact, l'action est prête.
- 🔎 **À localiser** : le point est clair mais je dois confirmer l'emplacement exact avant d'agir.
- 🎨 **Asset requis** : dépend d'un fichier que tu dois fournir (logo, photo, URL).
- 🧭 **Décision** : choix de direction à trancher avec toi.

---

## 1. Contenu — Page d'accueil

**Demande :** remplacer la phrase d'accueil par :

> « Du conseil stratégique à l'intermédiation internationale, Marabu accompagne les entreprises et les institutions dans leur transformation, leur rayonnement et le renforcement de leur influence. »

- ✅ **Fichiers :** `src/i18n/fr.json` + `src/i18n/en.json`, clés `hero.tagline1` / `hero.tagline2` / `hero.description` (affichées par `src/components/Hero.tsx`).
- **Action :** réécrire ces clés (FR + traduction EN cohérente). Vérifier que la longueur ne casse pas la mise en page du `h1`.

---

## 2. Problèmes techniques

### 2.1 Bug d'affichage des images sur l'accueil + footer tronqué/masqué

- ✅ **Fichier :** `src/components/Hero.tsx`. L'accueil utilise un bloc `h-[350vh]` en `position: sticky` avec 3 images qui se fondent au scroll (`useScroll` / `useTransform`), plus `src/components/Services.tsx` qui utilise `FlowArt`/`FlowSection` (`ui/story-scroll`), un autre mécanisme de scroll long.
- **Diagnostic prévu :** le footer coupé vient très probablement d'un conflit de hauteur/`overflow` entre ces sections à scroll long et le smooth-scroll Lenis (`src/hooks/useLenis.ts`). À reproduire et corriger (hauteurs, `overflow`, recalcul Lenis).
- 🧭 **Décision :** le PDF recommande **« privilégier une navigation par pages plutôt qu'un scroll continu »**. C'est un changement d'architecture lourd (le Hero et les Services reposent entièrement sur le scroll narratif). Deux options :
  - **(a)** garder le concept scroll et corriger le bug de rendu/footer (moins risqué, préserve le design actuel) ;
  - **(b)** refondre en navigation par sections/pages (gros chantier, revoit toute l'animation).
  - → **Ma recommandation : (a)** d'abord fiabiliser le rendu ; n'envisager (b) que si le problème est structurel.

---

## 3. Traduction (FR)

### 3.1 Menu de navigation mal traduit

- 🔎 **Fichiers :** `src/i18n/fr.json` clés `navbar.*` (rendu par `src/components/Navbar.tsx`). Audit ligne à ligne des libellés FR à prévoir.

### 3.2 Terme « Insight » non traduit (section Insights & Analyses)

- ✅ **Fichiers :** `src/i18n/fr.json` — `blog.label` = `"Insights"` (l.203) et `blog.title1` = `"Insights &"` (l.637). Rendus par `src/components/BlogPreview.tsx` et `src/pages/BlogPage.tsx`.
- **Action :** traduire côté FR (ex. « Perspectives & Analyses » / « Analyses & Éclairages »), en gardant « Insights » côté EN. À valider : le libellé FR retenu.

---

## 4. Design / Charte graphique

### 4.1 Titres en noir → couleurs de marque (vert/bleu foncé)

- ✅ **Fichiers :** occurrences de `text-gray-900` / `text-black` sur les titres : `Hero.tsx` (`h1`), `CaseStudies.tsx`, `Services.tsx`, entre autres.
- **Action :** remplacer par les teintes de marque `#1d454c` (bleu foncé) et `#538253` (vert). Passe globale sur les titres.

### 4.2 Logo Marabu + barre de recherche (positionnement / lisibilité)

- 🔎 **À localiser :** le header logo est dans `Navbar.tsx`. La « barre de recherche » n'est pas encore repérée (probablement sur `BlogPage.tsx`). À confirmer avant ajustement.

### 4.3 Ajouter les logos des partenaires

- 🎨 **Asset requis + ✅ fichier :** `src/components/LogoMarquee.tsx` — actuellement des **placeholders** (ronds gris + texte). Le code prévoit déjà le remplacement par `<img>`.
- **Action :** intégrer les vrais logos → **il me faut les fichiers logos** (Orange CI, Ecobank, BOAD, CEDEAO, Bolloré Africa, etc.).

### 4.4 Harmoniser les tirets dans les paragraphes

- ✅ **Fichiers :** `src/i18n/fr.json` / `en.json` (nombreux `—` dans les textes). Passe de normalisation typographique.

### 4.5 Bouton « Contactez-nous / Nous contacter » sur une seule ligne

- ✅ **Fichiers :** boutons CTA dans `Footer.tsx` (`footer.contactBtn`), `Hero.tsx`, `Manifesto.tsx`, et la page contact.
- **Action :** ajouter `white-space: nowrap` (ou ajuster la largeur) sur les boutons concernés.

### 4.6 Bloc « Infos entreprise » — « Secteurs » mal aligné

- ✅ **Fichiers :** données dans `src/i18n/fr.json` `about.info.items` (l.430+, dont `Secteurs`), rendu dans `src/pages/About.tsx`.
- **Action :** corriger la grille pour aligner « Secteurs » sur la même colonne/ligne que « Siège social », « Fondée en », etc.

### 4.7 « Nos services » — même photo utilisée deux fois (Conseil & Intermédiation)

- 🔎 **À localiser :** identifier le composant du bloc « Nos services » à 3 colonnes (CONSEIL / SERVICES / INTERMÉDIATION) qui réutilise la même image.
- 🎨 **Asset possible :** remplacer un des visuels par un autre déjà présent dans `src/assets/imgs/…` ou une nouvelle photo.

### 4.8 Case Studies — format de date + date redondante

- ✅ **Fichier :** `src/i18n/fr.json` `caseStudies.cases` (l.130+). Constat confirmé :
  - **Redondance** : carte 01 → `year` = « 2025 » (en haut) **et** `metricLabel` = « 2025 » (en bas, sous « 24 Août »).
  - **Format hétérogène** : le champ `metric` sert de date pour certaines cartes (« 24 Août », « Mai 2024 ») mais de vraie métrique pour d'autres (« 5 » modules). D'où l'incohérence visuelle.
- **Action :** séparer proprement « date » et « métrique », uniformiser le format de date (ex. `jour mois année`) et supprimer l'affichage en double. Peut nécessiter un petit ajustement dans `src/components/CaseStudies.tsx`.

### 4.9 Diversifier les visuels (images redondantes sur le site)

- 🎨 **Asset requis :** ex. `marabu_conseil_accueil.webp` est réutilisée à la fois dans `Hero.tsx` et en fond de `Manifesto.tsx`. Nécessite de nouveaux visuels ou une meilleure répartition de l'existant.

---

## 5. Contenu manquant / à réorganiser

### 5.1 Section « Mission, Vision, Valeurs » — « Valeurs » manquante

- ✅ **Fichier :** `src/i18n/fr.json` `about.values.mvp` (l.372+). Actuellement le tableau contient **Mission / Vision / « Notre promesse »** — le 3ᵉ bloc n'est pas « Valeurs ».
- **Constat :** les vraies valeurs existent déjà plus bas dans `about.values.items` (Innovation Inspirée / Impact Positif / Engagement Client).
- **Action :** remplacer le bloc « Notre promesse » par « Valeurs » (relier aux `items` existants), et **déplacer « Notre promesse »** ailleurs (à définir). Rendu à ajuster dans `src/pages/About.tsx`.

---

## 6. Fonctionnalités à ajouter / corriger

### 6.1 Bouton de partage du site

- **Action :** ajouter un bouton de partage (Web Share API + fallback réseaux). Emplacement à définir (footer / articles de blog).

### 6.2 CTA non fonctionnels (figés, ne renvoient nulle part)

- **Pastilles** STRATÉGIE / TRANSFORMATION / GOUVERNANCE / GESTION DU CHANGEMENT → 🔎 à localiser, puis lier à leur page/section cible.
- **Icônes sociales** LinkedIn / X → ✅ `src/config/site.ts` : `SOCIAL_LINKS` ont `url: ""`, donc filtrées et inactives. 🎨 **Il me faut les vraies URL** LinkedIn/X de Marabu.
- **Bouton « Nous contacter »** → relier à `/contact` partout où il est figé.

---

## 7. Points complémentaires (finalisation avant prod)

- **Mobile :** vérifier l'affichage/navigation des blocs signalés mal alignés sur desktop.
- **SEO :** `src/components/Seo.tsx` existe déjà (title, meta, Open Graph) + `public/sitemap.xml`, `robots.txt`, `og-image.jpg` présents. → vérifier que titre/description/OG correspondent bien à Marabu.
- **Cohérence des liens internes** (menu, footer, cartes Case Studies) → audit des cibles.
- **Poids des images** : contrôler une fois les visuels finaux intégrés (déjà en `.webp`, bon point).
- **Accessibilité :** contraste texte/fond après application de la charte (lié au point 4.1).
- **Cohérence rédactionnelle** : uniformiser ton et longueur entre Services / Expertises / Case Studies.

---

## 8. Synthèse des priorités (reprise du PDF)

| Priorité   | Sujet                                        | Action                            | Réf. section |
| ---------- | -------------------------------------------- | --------------------------------- | ------------ |
| 🔴 Haute   | Boutons CTA non fonctionnels                 | Relier chaque bouton à sa cible   | 6.2          |
| 🔴 Haute   | Bug images / footer coupé                    | Diagnostic du rendu de page       | 2.1          |
| 🔴 Haute   | Section « Valeurs » manquante                | Réintégrer Mission/Vision/Valeurs | 5.1          |
| 🟠 Moyenne | Traduction FR incomplète (menu, « Insight ») | Revue linguistique                | 3.1 / 3.2    |
| 🟠 Moyenne | Incohérences de dates (Case Studies)         | Format unique + retrait doublon   | 4.8          |
| 🟠 Moyenne | Alignement blocs « Infos entreprise »        | Ajustement CSS                    | 4.6          |
| 🟢 Basse   | Diversité visuelle (photos redondantes)      | Nouveaux visuels                  | 4.7 / 4.9    |
| 🟢 Basse   | Bouton de partage                            | Ajout fonctionnalité              | 6.1          |

---

## 9. Ce dont j'ai besoin de ta part (bloquants)

1. 🎨 **Logos partenaires** (fichiers) — pour le point 4.3.
2. 🎨 **URL LinkedIn et X** de Marabu — pour activer les icônes sociales (6.2).
3. 🎨 **Nouveaux visuels** (ou accord pour réutiliser l'existant autrement) — points 4.7 / 4.9.
4. 🧭 **Direction scroll vs pages** (point 2.1) — je recommande de corriger le scroll existant plutôt que de refondre.
5. ✍️ **Validation des libellés FR** pour « Insights & Analyses » et l'emplacement de « Notre promesse ».

---

## 10. Ordre d'attaque proposé

1. **Corrections sans dépendance externe** (je peux démarrer tout de suite) :
   - 1 (phrase d'accueil), 3.2 (traduction Insight), 4.1 (titres en charte), 4.5 (boutons 1 ligne), 4.6 (alignement Secteurs), 4.8 (dates Case Studies), 5.1 (Valeurs), 6.2 partie « Nous contacter ».
2. **Diagnostic technique** : 2.1 (bug images/footer).
3. **Dès réception des assets/URL** : 4.3 (logos), 6.2 (sociaux), 4.7/4.9 (visuels).
4. **Finalisation** : section 7 (mobile, SEO, accessibilité, rédactionnel) + 6.1 (partage).
   </content>
   </invoke>
