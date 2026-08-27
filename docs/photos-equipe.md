# Photos de l'équipe

La section « Notre équipe » (`src/components/TeamSection.tsx`, ancre `#team` de la
page « À propos ») affiche le portrait de chaque membre. Comme pour les
témoignages, les fichiers sont servis statiquement depuis `public/persons/` et
référencés par la clé `photo` de `TEAM` dans `src/config/team.ts`.

## Ajouter un membre

Trois modifications, aucune touche au composant :

1. **`src/config/team.ts`** — une entrée dans `TEAM` :
   ```ts
   {
     id: "prenom-nom",
     name: "Prénom Nom",
     photo: "/persons/Prenom_Nom_marabu.webp",
     linkedin: "https://www.linkedin.com/in/…",
   }
   ```
2. **`src/i18n/fr.json` et `src/i18n/en.json`** — le poste traduit, sous
   `about.team.roles`, avec l'`id` comme clé :
   ```json
   "roles": { "prenom-nom": "Directrice des opérations" }
   ```
3. **`public/persons/`** — déposer le fichier photo (voir format ci-dessous).

L'ordre d'affichage est celui du tableau `TEAM`.

## Format des photos

- **Cadrage** : portrait, visage centré dans le tiers supérieur — l'affichage est
  un carré en `object-fit: cover`.
- **Dimensions** : 600×600 px (la vignette fait jusqu'à ~300 px de côté sur
  grand écran, doublé pour les écrans haute densité).
- **Format** : WebP de préférence, JPEG accepté.
- **Poids** : viser < 60 Ko. Les images sont chargées en `loading="lazy"`.

## Générer les fichiers depuis les originaux

Les photos brutes sont déposées dans `src/assets/persons/` (le shooting fait du
6000×4000, ~6 Mo pièce ; `.jpg`, `.jpeg` et `.png` sont acceptés). Ce dossier est hors dépôt (`.gitignore`) et n'est
**pas** servi tel quel : seuls les WebP générés sont committés.

```sh
python3 scripts/build-portraits.py public/persons   # nécessite Pillow
```

Le script redresse l'orientation EXIF, recadre en carré et réencode en WebP
600×600. Deux points à connaître avant de le modifier :

- Les originaux sont physiquement **en paysage** avec un tag EXIF
  `Orientation=8`. Les navigateurs le respectent, `sips -g orientation` ne le
  rapporte même pas — d'où le passage obligé par `ImageOps.exif_transpose`.
- Un crop centré couperait les visages : le dictionnaire `MAP` du script porte,
  pour chaque photo, un **cadrage** réglé à l'œil — `ax`/`ay` (position du carré
  dans la marge, 0 = bord haut/gauche, 0.5 = centré) et `zoom` (côté du carré en
  fraction du petit côté ; 1 = le plus grand carré possible, en dessous on
  resserre). Une photo en pied **exige** un `zoom` < 1 : le plus grand carré
  s'arrête au torse et le visage sort du cadre. Ajouter une photo = une entrée
  dans `MAP`, puis vérifier le rendu.

## Comportement si une donnée manque

Rien ne casse, par construction :

| Donnée absente          | Rendu                                                                                  |
| ----------------------- | -------------------------------------------------------------------------------------- |
| Photo introuvable (404) | Initiales du membre sur fond vert clair                                                |
| `photo` non renseigné   | Idem                                                                                   |
| `linkedin` vide         | Icône affichée, pointant vers le compte **Marabu** (mesure d'attente, voir ci-dessous) |
| `TEAM` vide             | La section entière disparaît                                                           |

C'est ce qui permet de mettre le code en ligne avant d'avoir réuni toutes les
photos et toutes les URL LinkedIn.

## ⚠️ Repli LinkedIn temporaire (à retirer)

Décidé le 6 août 2026 : tant qu'un membre n'a pas d'URL personnelle, son icône
pointe vers le compte LinkedIn de Marabu plutôt que de disparaître. Son libellé
accessible devient alors « LinkedIn de Marabu » — annoncer « Profil
LinkedIn de X » pour un lien qui ouvre le compte de l'entreprise ferait dire au
lecteur d'écran autre chose que ce qui s'ouvre réellement.

**À supprimer une fois toutes les URLs personnelles renseignées** : dans
`src/components/TeamSection.tsx`, remplacer `member.linkedin || LINKEDIN.url`
par `member.linkedin`, et retirer la clé `about.team.linkedinCompanyAria` des
deux fichiers i18n.

État au 11 août 2026 : 8 profils personnels sur 11 sont renseignés. Il manque
**Brice Brou, Hervé Touré et Khalil Diop** — leurs trois icônes pointent encore
vers le compte de l'entreprise. C'est acceptable en attente, mais ça n'apporte
aucune preuve sociale individuelle, qui est tout l'objet du §2.3 des specs.

## Accessibilité

Les portraits sont rendus avec `alt=""` dans un conteneur `aria-hidden` : le nom
et la fonction figurent en texte juste en dessous, un alt descriptif provoquerait
une double énonciation par les lecteurs d'écran (même principe que les
témoignages et le marquee de logos, cf. `AUDIT-ERGONOMIE-ACCESSIBILITE.md`
§A11Y-5).

L'icône LinkedIn porte un `aria-label` complet (« Profil LinkedIn de Prénom Nom
(nouvel onglet) ») : une icône seule, sans texte, est muette autrement.

## RGPD

Photo, fonction et lien vers un profil personnel sont des données personnelles.
L'accord de chaque membre est à recueillir avant mise en ligne, et son retrait
doit rester possible — d'où le choix de tout piloter par `TEAM` : retirer une
entrée suffit.
