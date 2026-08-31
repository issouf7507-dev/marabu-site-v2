"""Recadre les portraits bruts de l'équipe en carrés 600x600 WebP.

    python3 scripts/build-portraits.py public/persons

Entrée  : src/assets/persons/<stem>.<jpg|jpeg|png> — photos d'origine (le
          shooting fait du 6000x4000, ~6 Mo, mais toute taille passe).
Sortie  : carrés 600x600 WebP < 40 Ko, aux noms attendus par `TEAM`
          (src/config/team.ts). Voir docs/photos-equipe.md.

Deux pièges que ce script règle et qu'un simple `sips` ne règle pas :

1. **Orientation EXIF.** Les originaux du shooting sont physiquement en paysage
   6000x4000 avec un tag Orientation=8 (rotation 270°). Les navigateurs
   l'appliquent, `sips -g orientation` ne le rapporte même pas. Sans
   `exif_transpose`, le recadrage porte sur l'image couchée et coupe à côté.

2. **Cadrage du carré.** Un crop centré coupe les visages, qui sont dans le
   tiers supérieur. Chaque photo porte donc son propre cadrage, réglé à l'œil :

   - `zoom` : côté du carré, en fraction du petit côté de la source. 1 = le plus
     grand carré possible. Une valeur < 1 resserre — indispensable sur les
     photos en pied, où le plus grand carré ne montre que le buste.
   - `ax` / `ay` : position du carré dans la marge restante, 0 = collé au
     bord gauche / haut, 1 = à l'opposé, 0.5 = centré. Sans marge sur un axe
     (zoom = 1 sur le petit côté), la valeur n'a aucun effet.

   À revoir photo par photo si les originaux changent.
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src/assets/persons"
OUT = Path(sys.argv[1] if len(sys.argv) > 1 else ROOT / "public/persons")
SIZE = 600
QUALITY = 82

SOURCE_EXTS = (".jpg", ".jpeg", ".png")


def source_path(stem: str) -> Path:
    """Les originaux n'ont pas tous la même extension selon leur provenance."""
    for ext in SOURCE_EXTS:
        candidate = SRC / f"{stem}{ext}"
        if candidate.exists():
            return candidate
    raise SystemExit(f"{stem}: aucun original {'/'.join(SOURCE_EXTS)} dans {SRC}")


# fichier source (sans extension) -> (nom de sortie, ax, ay, zoom)
MAP = {
    # Photo en pied (853x1280, hors shooting) : sans zoom, le carré s'arrête au
    # torse et le visage sort du cadre.
    "Houssene-Ben-Souda":          ("Houssene_Ben_Souda_marabu",   0.64, 0.02, 0.73),
    "Thomas-Dabadie":              ("Thomas_Dabadie_marabu",       0.50, 0.05, 1.0),
    "Ouattara-Aida":               ("Aida_Ouattara_marabu",        0.55, 0.50, 1.0),
    "Brice-Brou":                  ("Brice_Brou_marabu",           0.50, 0.22, 1.0),
    # Portrait studio déjà serré (810x1080) : le plus grand carré part du haut
    # du cadre, sans quoi le crâne est coupé.
    "Yapo-Marius-Bessekon":        ("Yapo_Marius_Bessekon_marabu", 0.50, 0.00, 1.0),
    "Bossoh-Aka":                  ("Bossoh_Aka_marabu",           0.50, 0.05, 1.0),
    "Gilles-Dogbo":                ("Gilles_Dogbo_marabu",         0.50, 0.05, 1.0),
    "Ouattara-Bitcheresse-Issouf": ("Issouf_Ouattara_marabu",      0.50, 0.05, 1.0),
    "Toure-herve":                 ("Herve_Toure_marabu",          0.50, 0.05, 1.0),
    "Coulibaly-Nourgo-Souleymane": ("Souleymane_Coulibaly_marabu", 0.50, 0.05, 1.0),
    "Khalil-Diop":                 ("Khalil_Diop_marabu",          0.50, 0.05, 1.0),
    # Source quasi carrée (1280x1249, hors shooting) : le plus grand carré
    # laisse le visage trop petit face aux autres portraits, d'où le zoom.
    "kimana-misago":               ("Kimana_Misago_marabu",        0.42, 0.33, 0.72),
}

OUT.mkdir(parents=True, exist_ok=True)

for stem, (out_name, ax, ay, zoom) in MAP.items():
    img = ImageOps.exif_transpose(Image.open(source_path(stem))).convert("RGB")
    w, h = img.size
    side = round(min(w, h) * zoom)

    left = round((w - side) * ax)
    top = round((h - side) * ay)

    square = img.crop((left, top, left + side, top + side))
    square = square.resize((SIZE, SIZE), Image.LANCZOS)

    dest = OUT / f"{out_name}.webp"
    square.save(dest, "WEBP", quality=QUALITY, method=6)
    print(f"{stem} ({w}x{h}) -> {dest.name}  {dest.stat().st_size // 1024} Ko")
