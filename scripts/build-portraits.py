"""Recadre les portraits bruts de l'équipe en carrés 600x600 WebP.

    python3 scripts/build-portraits.py public/persons

Entrée  : src/assets/persons/*.jpg — photos d'origine (6000x4000, ~6 Mo).
Sortie  : carrés 600x600 WebP < 40 Ko, aux noms attendus par `TEAM`
          (src/config/team.ts). Voir docs/photos-equipe.md.

Deux pièges que ce script règle et qu'un simple `sips` ne règle pas :

1. **Orientation EXIF.** Les originaux sont physiquement en paysage
   6000x4000 avec un tag Orientation=8 (rotation 270°). Les navigateurs
   l'appliquent, `sips -g orientation` ne le rapporte même pas. Sans
   `exif_transpose`, le recadrage porte sur l'image couchée et coupe à côté.

2. **Ancrage du carré.** Un crop centré coupe les visages, qui sont dans le
   tiers supérieur. `ANCHOR` place le carré dans la marge disponible :
   0 = collé au haut (portrait) ou à gauche (paysage), 1 = à l'opposé,
   0.5 = centré. Les valeurs ci-dessous ont été réglées à l'œil, photo par
   photo — à revoir si les originaux changent.
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src/assets/persons"
OUT = Path(sys.argv[1] if len(sys.argv) > 1 else ROOT / "public/persons")
SIZE = 600
QUALITY = 82

# fichier source (sans .jpg) -> (nom de sortie, ancrage)
MAP = {
    "Houssene-Ben-Souda":          ("Houssene_Ben_Souda_marabu",   0.05),
    "Thomas-Dabadie":              ("Thomas_Dabadie_marabu",       0.05),
    "Ouattara-Aida":               ("Aida_Ouattara_marabu",        0.55),
    "Brice-Brou":                  ("Brice_Brou_marabu",           0.22),
    "Bossoh-Aka":                  ("Bossoh_Aka_marabu",           0.05),
    "Gilles-Dogbo":                ("Gilles_Dogbo_marabu",         0.05),
    "Ouattara-Bitcheresse-Issouf": ("Issouf_Ouattara_marabu",      0.05),
    "Toure-herve":                 ("Herve_Toure_marabu",          0.05),
    "Coulibaly-Nourgo-Souleymane": ("Souleymane_Coulibaly_marabu", 0.05),
    "Khalil-Diop":                 ("Khalil_Diop_marabu",          0.05),
}

OUT.mkdir(parents=True, exist_ok=True)

for stem, (out_name, anchor) in MAP.items():
    img = ImageOps.exif_transpose(Image.open(SRC / f"{stem}.jpg")).convert("RGB")
    w, h = img.size
    side = min(w, h)

    if h >= w:  # portrait : l'ancrage choisit la bande verticale
        left, top = (w - side) // 2, round((h - side) * anchor)
    else:       # paysage : l'ancrage choisit la bande horizontale
        left, top = round((w - side) * anchor), (h - side) // 2

    square = img.crop((left, top, left + side, top + side))
    square = square.resize((SIZE, SIZE), Image.LANCZOS)

    dest = OUT / f"{out_name}.webp"
    square.save(dest, "WEBP", quality=QUALITY, method=6)
    print(f"{stem}.jpg ({w}x{h}) -> {dest.name}  {dest.stat().st_size // 1024} Ko")
