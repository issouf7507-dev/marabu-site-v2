# Favicons et icônes PWA

## Fichier source

`src/assets/logotypo.PNG` — master 1024×1024 (le « U » de Marabu avec les deux
cauris, fond transparent). Ce fichier **n'est importé nulle part dans le code** :
c'est uniquement la source de génération des icônes. Ne pas le supprimer.

## Fichiers générés (dans `public/`)

| Fichier | Taille | Usage |
|---|---|---|
| `favicon.ico` | multi | Onglet navigateur (fallback historique) |
| `favicon-16x16.png` | 16×16 | Onglet |
| `favicon-32x32.png` | 32×32 | Onglet haute densité |
| `favicon-48x48.png` | 48×48 | Raccourci bureau |
| `apple-touch-icon.png` | 180×180 | Écran d'accueil iOS |
| `icon-96x96.png` | 96×96 | Manifeste PWA |
| `icon-192x192.png` | 192×192 | Manifeste PWA |
| `icon-512x512.png` | 512×512 | Manifeste PWA, splash Android |

Déclarés dans `index.html` (`<link rel="icon">`, `apple-touch-icon`, `manifest`)
et dans `public/site.webmanifest`.

## Regénérer

Depuis la racine, avec ImageMagick :

```sh
SRC=src/assets/logotypo.PNG
for s in 16 32 48 96 192 512; do
  magick "$SRC" -resize ${s}x${s} public/icon-${s}x${s}.png
done
mv public/icon-16x16.png public/favicon-16x16.png
mv public/icon-32x32.png public/favicon-32x32.png
mv public/icon-48x48.png public/favicon-48x48.png
magick "$SRC" -resize 180x180 public/apple-touch-icon.png
magick "$SRC" -define icon:auto-resize=16,32,48 public/favicon.ico
```

Les icônes du manifeste (96/192/512) doivent rester nommées `icon-<taille>.png`,
les tailles d'onglet `favicon-<taille>.png` — c'est ce que référencent
`site.webmanifest` et `index.html`.
