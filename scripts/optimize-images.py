"""Réduit le poids des images réellement servies par le site, en place.

    python3 scripts/optimize-images.py --dry-run   # simulation
    python3 scripts/optimize-images.py             # écrit

Les fichiers sont réécrits **à leur emplacement d'origine, sans changer de nom
ni d'extension** : aucun import à modifier dans les composants. Les originaux
restent récupérables via git (`git checkout -- <fichier>`).

Le budget de chaque image vient de sa taille d'affichage réelle, mesurée dans
le navigateur, multipliée par ~2 pour rester net sur les écrans haute densité.
Le cas le plus criant : les logos partenaires du marquee sont affichés à 40 px
de haut alors que certains font 3500 px de large.

Trois garde-fous, chacun pour une erreur commise pendant la mise au point :

1. **Seuls les fichiers importés par le code sont touchés.** `src/assets/imgs/`
   contient aussi les originaux du shooting (jusqu'à 12 Mo). Vite ne les met
   pas dans le bundle puisque personne ne les importe : les compresser
   n'accélérerait rien et détruirait les sources.
2. **La règle la plus spécifique gagne.** `services-marabu.webp` est un
   panneau plein écran du Hero *et* vit dans `imgs/services/`, dont les
   vignettes sont plafonnées à 800 px. Sans priorité au chemin exact, le Hero
   se retrouvait en 800 px de large.
3. **Pas de perte sans gain.** Une image déjà sous son budget n'est jamais
   agrandie, et si le réencodage gagne moins de 5 %, l'original est conservé.
   Le script est donc réexécutable sans dégrader un peu plus à chaque passage.
"""
import re
import sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "src/assets"
IMGS = ASSETS / "imgs"
DRY = "--dry-run" in sys.argv

# (chemin fichier ou dossier, largeur max, hauteur max, qualité)
# Les entrées « fichier » doivent précéder le dossier qui les contient.
RULES = [
    # Panneaux plein écran du Hero (backgrounds CSS en cover).
    (IMGS / "conseils/conseil-marabu.webp", 1920, None, 80),
    (IMGS / "services/services-marabu.webp", 1920, None, 80),
    (IMGS / "intermediation/intermediation-marabu.webp", 1920, None, 80),

    # Fond du loader : chargé en priorité, c'est lui qui retarde le premier
    # rendu. Pas de redimensionnement malgré tout — il s'affiche en cover
    # plein écran et ses 1688 px de large sont déjà justes sur un grand
    # moniteur. On se contente de recompresser.
    (IMGS / "Cauris-bg.webp", None, None, 78),

    # Illustrations de section. Mesurées sur « À propos » : elles s'affichent
    # dans une colonne de ~356 px, y compris sur mobile. 800 px couvre donc
    # le retina avec de la marge, là où les originaux montaient à 2560.
    (IMGS / "marabu-services.webp", 800, None, 80),
    (IMGS / "houssene-ben-souda.webp", 800, None, 80),
    (IMGS / "formation-e-reputation.webp", 900, None, 80),

    # Logos du marquee : affichés en h-10, soit 40 px de haut.
    (IMGS / "partners", None, 120, 85),

    # Vignettes des galeries : déjà en 800x533 pour ~430 px d'affichage, donc
    # pas de redimensionnement — seulement une recompression, certaines
    # pesant 125 Ko à cette taille.
    (IMGS / "conseils", 800, None, 78),
    (IMGS / "services", 800, None, 78),
    (IMGS / "intermediation", 800, None, 78),
]

EXTS = {".png", ".jpg", ".jpeg", ".webp"}


def referenced():
    """Fichiers de src/assets effectivement cités par le code source."""
    pattern = re.compile(r"assets/([A-Za-z0-9 _./%-]+\.(?:png|jpe?g|webp|gif))", re.I)
    found = set()
    for src in ROOT.joinpath("src").rglob("*"):
        if src.suffix not in {".ts", ".tsx", ".css", ".json", ".html"}:
            continue
        for rel in pattern.findall(src.read_text(encoding="utf-8", errors="ignore")):
            p = ASSETS / rel.replace("%20", " ")
            if p.exists():
                found.add(p.resolve())
    return found


def rule_for(path, used):
    """Première règle qui couvre ce fichier — chemin exact avant dossier."""
    for target, max_w, max_h, quality in RULES:
        if target == path or (target.is_dir() and target in path.parents):
            return max_w, max_h, quality
    return None


def optimize(path, max_w, max_h, quality):
    before = path.stat().st_size
    img = Image.open(path)
    fmt = img.format
    w, h = img.size

    scale = 1.0
    if max_w and w > max_w:
        scale = min(scale, max_w / w)
    if max_h and h > max_h:
        scale = min(scale, max_h / h)
    if scale < 1.0:
        img = img.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)

    params = {"optimize": True}
    if fmt == "WEBP":
        params.update(quality=quality, method=6)
    elif fmt == "JPEG":
        img = img.convert("RGB")
        params.update(quality=quality, progressive=True)
    elif fmt == "PNG":
        # La palette divise le poids par ~3 sur un logo à plat. Les logos ont
        # de la transparence : on reste en RGBA quantifié, jamais en RGB, sinon
        # le fond blanc réapparaît derrière le logo.
        img = img.convert("RGBA").quantize(colors=256, method=Image.FASTOCTREE)

    tmp = path.with_suffix(path.suffix + ".tmp")
    img.save(tmp, fmt, **params)
    after = tmp.stat().st_size

    if after >= before * 0.95:      # gain insuffisant : on garde l'original
        tmp.unlink()
        return before, before, (w, h), False

    tmp.unlink() if DRY else tmp.replace(path)
    return before, after, img.size, True


used = referenced()
total_before = total_after = 0
changed = 0
skipped = []

for path in sorted(used):
    if path.suffix.lower() not in EXTS:
        continue
    rule = rule_for(path, used)
    if rule is None:
        continue
    try:
        w0, h0 = Image.open(path).size
        before, after, size, did = optimize(path, *rule)
    except Exception as e:
        print(f"  !! {path.relative_to(ROOT)} : {e}")
        continue
    total_before += before
    total_after += after
    if did:
        changed += 1
        print(f"{before/1024:7.0f} -> {after/1024:6.0f} Ko  "
              f"{w0}x{h0} -> {size[0]}x{size[1]}  {path.relative_to(ROOT)}")
    else:
        skipped.append(path.name)

if skipped:
    print(f"\nDéjà optimales, inchangées : {', '.join(sorted(skipped))}")

print(f"\n{'[simulation] ' if DRY else ''}{changed} images réécrites : "
      f"{total_before/1024:.0f} Ko -> {total_after/1024:.0f} Ko "
      f"(-{100 * (1 - total_after / max(total_before, 1)):.0f} %)")
