# Configuration Nginx — v2.marabu.services

## 1. Créer le fichier de config

```bash
sudo nano /etc/nginx/sites-available/v2.marabu.services
```

Contenu :

```nginx
server {
    listen 80;
    server_name v2.marabu.services;

    root /home/admin_marabu/apps/marabu_sitev2;
    index index.html;

    # SPA fallback — toutes les routes renvoient vers index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache long terme pour les assets Vite (hash dans le nom de fichier)
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Désactiver le cache sur index.html
    location = /index.html {
        add_header Cache-Control "no-cache";
    }

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1024;
}
```

## 2. Activer le site et recharger Nginx

```bash
sudo ln -s /etc/nginx/sites-available/v2.marabu.services /etc/nginx/sites-enabled/
sudo nginx -t
sudo nginx -s reload
```

## 3. HTTPS avec Let's Encrypt

> Prérequis : le DNS de `v2.marabu.services` doit pointer vers l'IP du VPS.

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d v2.marabu.services
```

Certbot modifie la config automatiquement pour ajouter le bloc `443` et la redirection HTTP → HTTPS.

## Secrets GitHub requis

| Secret | Valeur |
|---|---|
| `VPS_HOST` | IP ou hostname du VPS |
| `VPS_USER` | `admin_marabu` |
| `VPS_SSH_KEY` | Clé privée SSH (avec `-----BEGIN/END-----`) |
| `SSH_PASSPHRASE` | Passphrase de la clé |
| `VPS_PORT` | Port SSH (`22` par défaut) |
