"""Recadre les photos des clients cités en témoignage, en carrés 192x192 JPEG.

    python3 scripts/build-testimonials.py public/persons

Entrée  : src/assets/persons/*.jpeg — photos fournies par les clients (issues
          de reportages, tailles et cadrages hétérogènes : 417x440 à 875x734).
Sortie  : carrés 192x192 JPEG aux noms exacts attendus par `testimonials.items`
          (src/i18n/fr.json et en.json). Voir docs/photos-temoignages.md.

Même principe que scripts/build-portraits.py — dont c'est le pendant pour les
témoignages — avec deux différences dictées par la source :

- ce ne sont pas des portraits de studio mais des photos de conférence ou
  d'interview, où le sujet est **décentré** et entouré de micros, caméras ou
  pupitres. Un crop centré attrape le décor plutôt que le visage : d'où un
  `ax` souvent loin de 0.5 (0.37 pour Ayebi Modeste, assis à gauche du cadre) ;
- l'affichage est un cercle de 48 px, bien plus petit que la vignette d'équipe.
  Le `zoom` est donc plus serré (0.46 à 0.76 contre ~1.0) : à cette taille, un
  plan large ne laisse plus rien voir du visage.

`zoom` = côté du carré en fraction du petit côté de la source ; `ax`/`ay` =
position du carré dans la marge restante (0 = bord gauche/haut, 0.5 = centré).
Réglages faits à l'œil, à revoir photo par photo si les originaux changent.

La photo de Touré Abdoulaye (GUCE CI) n'a jamais été fournie : son témoignage
retombe sur l'initiale, cf. docs/photos-temoignages.md.
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src/assets/persons"
OUT = Path(sys.argv[1] if len(sys.argv) > 1 else ROOT / "public/persons")
SIZE = 192
QUALITY = 82

# fichier source (sans .jpeg, le nom de sortie est identique) -> (ax, ay, zoom)
MAP = {
    "Zanyiwe_Asare_yango_marabu":                (0.52, 0.18, 0.84),
    "Ismahill_Diaby_visa_marabu":                (0.44, 0.02, 0.67),
    "Ayebi_Modeste_ministere-emploi_marabu":     (0.37, 0.05, 0.58),
    "Raley_White_yango_marabu":                  (0.52, 0.02, 0.62),
    "M._Esmel_Meledje_ministere-commerce_marabu": (0.46, 0.02, 0.74),
    "Yohannes_Mekebebe_AmCham_marabu":           (0.52, 0.01, 0.52),
    "Djigbenou_Antoine_GS2E_marabu":             (0.63, 0.06, 0.48),
}

OUT.mkdir(parents=True, exist_ok=True)

for stem, (ax, ay, zoom) in MAP.items():
    img = ImageOps.exif_transpose(Image.open(SRC / f"{stem}.jpeg")).convert("RGB")
    w, h = img.size
    side = round(min(w, h) * zoom)

    left = round((w - side) * ax)
    top = round((h - side) * ay)

    square = img.crop((left, top, left + side, top + side))
    square = square.resize((SIZE, SIZE), Image.LANCZOS)

    dest = OUT / f"{stem}.jpeg"
    square.save(dest, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    print(f"{stem}.jpeg ({w}x{h}) -> {dest.name}  {dest.stat().st_size // 1024} Ko")
