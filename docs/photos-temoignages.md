# Photos des témoignages clients

La section « Témoignages » (`src/components/Testimonials.tsx`) affiche la photo de
chaque client. Les fichiers sont servis statiquement depuis `public/persons/` et
référencés par la clé `image` de `testimonials.items` dans `src/i18n/fr.json` et
`src/i18n/en.json`.

## Fichiers attendus

Les noms doivent correspondre **exactement** (casse comprise) :

| Fichier | Personne | Fonction |
|---|---|---|
| `Zanyiwe_Asare_yango_marabu.jpeg` | Zanyiwe Asare | Vice-Présidente Affaires Publiques, Yango |
| `TOURE_Abdoulaye_guce-ci_marabu.jpeg` ⚠️ manquante | Touré Abdoulaye | Directeur des Études et du Développement, GUCE CI |
| `Ismahill_Diaby_visa_marabu.jpeg` | Ismahill Diaby | Vice-Président, Visa Afrique Centrale et Ouest |
| `Ayebi_Modeste_ministere-emploi_marabu.jpeg` | Ayebi Modeste | Directeur de la Sécurité Sociale et de la Mutualité |
| `Raley_White_yango_marabu.jpeg` | Raley White | Vice President of Operations, Yango |
| `M._Esmel_Meledje_ministere-commerce_marabu.jpeg` | Esmel Meledje | Directeur du Commerce Électronique |
| `Yohannes_Mekebebe_AmCham_marabu.jpeg` | Yohannes Mekebebe | Président, AmCham Côte d'Ivoire |
| `Djigbenou_Antoine_GS2E_marabu.jpeg` | Djigbenou Antoine | Directeur Général Adjoint, GS2E |

## Format

- **Cadrage** : portrait serré, visage centré — l'affichage est un cercle de 48 px
  en `object-fit: cover`.
- **Dimensions** : 192×192 px suffisent (48 px × 4 pour les écrans haute densité).
- **Poids** : viser < 40 Ko par photo. Les images sont chargées en `loading="lazy"`.

## Générer les fichiers depuis les originaux

Les photos fournies par les clients sont déposées dans `src/assets/persons/`
(dossier hors dépôt, `.gitignore`) ; seules les vignettes générées sont
committées.

```sh
python3 scripts/build-testimonials.py public/persons   # nécessite Pillow
```

Le script redresse l'orientation EXIF, recadre en carré 192×192 et réencode en
JPEG (~6 à 8 Ko pièce). Contrairement aux portraits d'équipe, ce sont des photos
de conférence ou d'interview : le sujet est décentré, entouré de micros, caméras
ou pupitres. Le dictionnaire `MAP` porte donc pour chaque photo un cadrage réglé
à l'œil — `ax`/`ay` (position du carré dans la marge, 0 = bord haut/gauche,
0.5 = centré) et `zoom` (côté du carré en fraction du petit côté). Un crop centré
attrape le décor plutôt que le visage, et l'affichage n'étant qu'un cercle de
48 px, le cadrage doit être nettement plus serré que celui de l'équipe.

Même logique et mêmes paramètres que `scripts/build-portraits.py` pour la
section « Notre équipe » (cf. `docs/photos-equipe.md`).

## Comportement si une photo manque

Aucune casse : `Avatar` intercepte l'erreur de chargement et affiche l'initiale du
nom sur fond vert clair. Une photo absente dégrade donc l'affichage sans le rompre.

## Accessibilité

Les photos sont rendues avec `alt=""` et le conteneur est `aria-hidden` : le nom,
la fonction et l'entreprise figurent déjà en texte juste à côté, un alt descriptif
provoquerait une double énonciation par les lecteurs d'écran (même principe que le
marquee de logos, cf. `AUDIT-ERGONOMIE-ACCESSIBILITE.md` §A11Y-5).

Le champ `alt` conservé dans les fichiers i18n reste une métadonnée éditoriale
(identification de la photo), il n'est pas rendu dans le DOM.
