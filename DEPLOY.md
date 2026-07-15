# Déploiement sur VPS Hostinger (KVM 2)

Ce guide explique comment faire tourner **Strapi (CMS)** + **le site Next.js** sur
un seul VPS Hostinger KVM 2, avec HTTPS automatique via **Caddy**.

Architecture retenue :

```
                    Internet (443/80)
                          │
                    ┌─────▼─────┐
                    │   Caddy   │  (reverse proxy + Let's Encrypt)
                    └─────┬─────┘
             ┌────────────┴────────────┐
     justincom.fr                 api.justincom.fr
             │                         │
      ┌──────▼──────┐           ┌──────▼──────┐
      │  frontend   │           │   backend   │
      │  Next.js    │──────────▶│   Strapi    │
      │  :3000      │  API      │   :1337     │
      └─────────────┘           └─────────────┘
```

- `justincom.fr` (+ `www`) → le site Next.js
- `api.justincom.fr` → l'API + l'admin Strapi (`/admin`)
- Seul Caddy est exposé sur Internet ; le front et Strapi ne sont accessibles
  qu'à l'intérieur du réseau Docker.
- Base **SQLite** + médias uploadés persistés dans des volumes Docker.

---

## 1. Configuration DNS

Chez ton registrar (là où le domaine `justincom.fr` est géré — Hostinger hPanel
« Domaines → Zone DNS », ou OVH/Gandi/etc.), crée ces enregistrements. Remplace
`XX.XX.XX.XX` par **l'IP publique IPv4 de ton VPS** (visible dans hPanel → VPS).

| Type  | Nom / Hôte | Valeur          | TTL  |
|-------|------------|-----------------|------|
| A     | `@`        | `XX.XX.XX.XX`   | 3600 |
| A     | `www`      | `XX.XX.XX.XX`   | 3600 |
| A     | `api`      | `XX.XX.XX.XX`   | 3600 |

> Si ton VPS a une IPv6, ajoute les mêmes en type **AAAA** avec l'adresse IPv6.

Vérifie la propagation (peut prendre de quelques minutes à quelques heures) :

```bash
dig +short justincom.fr
dig +short api.justincom.fr
```

Les deux doivent renvoyer l'IP du VPS **avant** de lancer Caddy (sinon
Let's Encrypt ne pourra pas émettre les certificats).

---

## 2. Préparation du VPS

Connecte-toi en SSH : `ssh root@XX.XX.XX.XX`

### Installer Docker + Docker Compose

```bash
curl -fsSL https://get.docker.com | sh
docker compose version   # doit afficher une version
```

### Ouvrir le pare-feu (si UFW est actif)

```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

> ⚠️ On n'ouvre **pas** les ports 1337 et 3000 : ils restent internes au réseau Docker.

---

## 3. Récupérer le code et configurer les variables

Le monorepo est déjà cloné. Place-toi à sa racine :

```bash
cd /chemin/vers/Just-In-Com
git pull        # récupère les fichiers de déploiement ajoutés
```

Crée le fichier `.env` à partir de l'exemple, puis remplis-le :

```bash
cp .env.prod.example .env
nano .env
```

Génère chaque secret Strapi avec :

```bash
openssl rand -base64 32
```

(`APP_KEYS` doit contenir 4 valeurs séparées par des virgules ; les autres, une
seule valeur chacune.)

Le fichier `.env` est ignoré par git : il ne sera jamais poussé.

---

## 4. Premier démarrage

> **Ordre important** : le site Next.js interroge Strapi *pendant sa
> construction* (pages en `getStaticProps`). Il faut donc démarrer Strapi
> **d'abord**, saisir un minimum de contenu, puis builder le front.

### 4.1 — Démarrer Strapi + Caddy

```bash
docker compose -f docker-compose.prod.yml --env-file .env up -d --build backend caddy
```

Caddy obtient automatiquement les certificats HTTPS pour les 3 domaines.
Ouvre l'admin Strapi et crée ton compte admin :

```
https://api.justincom.fr/admin
```

Saisis / vérifie le contenu (accueil, mariage, blog, global…), puis **publie**
les entrées et donne les droits **public** en lecture aux content-types utilisés
(Settings → Users & Permissions → Roles → Public → coche `find`/`findOne`).

### 4.2 — Builder et démarrer le site

Une fois Strapi joignable en `https://api.justincom.fr` avec du contenu publié :

```bash
docker compose -f docker-compose.prod.yml --env-file .env up -d --build frontend
```

Le site est alors en ligne sur `https://justincom.fr`.

### En une commande (les fois suivantes)

Quand Strapi est déjà en place, tu peux tout (re)lancer d'un coup :

```bash
docker compose -f docker-compose.prod.yml --env-file .env up -d --build
```

---

## 5. Exploitation

```bash
# Voir l'état
docker compose -f docker-compose.prod.yml ps

# Logs
docker compose -f docker-compose.prod.yml logs -f backend
docker compose -f docker-compose.prod.yml logs -f frontend
docker compose -f docker-compose.prod.yml logs -f caddy

# Redémarrer un service
docker compose -f docker-compose.prod.yml restart backend

# Tout arrêter
docker compose -f docker-compose.prod.yml down
```

### Mettre à jour après un changement de code

```bash
git pull
docker compose -f docker-compose.prod.yml --env-file .env up -d --build
```

> Rappel : si tu modifies uniquement du **contenu Strapi**, il n'est pas
> nécessaire de rebuilder — les pages se régénèrent toutes seules (ISR,
> `revalidate: 3600`, soit toutes les heures). Pour forcer un rafraîchissement
> immédiat de tout le site : `docker compose ... up -d --build frontend`.

---

## 6. Sauvegardes

Les données vivent dans deux volumes Docker :

- `strapi-data` → la base SQLite (`.tmp/data.db`)
- `strapi-uploads` → les médias uploadés (`public/uploads`)

Sauvegarde rapide (à planifier dans un cron) :

```bash
docker run --rm \
  -v just-in-com_strapi-data:/data \
  -v just-in-com_strapi-uploads:/uploads \
  -v $(pwd)/backups:/backup \
  alpine tar czf /backup/strapi-$(date +%F).tar.gz /data /uploads
```

> Le préfixe des volumes (`just-in-com_`) dépend du nom du dossier ; vérifie
> avec `docker volume ls`.

---

## 7. Notes / évolutions

- **Erreur `db.config.connection` undefined** : sur un projet Strapi TypeScript,
  l'image Docker doit embarquer `tsconfig.json` **et** `src/` (en plus de
  `dist/` et `config/`). Sinon Strapi ne détecte pas le projet comme TS, ignore
  `config/database.ts`, et plante au boot. C'est déjà géré dans
  `apps/back/Dockerfile`.
- **SQLite** convient à un site vitrine à faible trafic. Si le volume de
  contenu/rédacteurs grandit, on pourra passer à **PostgreSQL** (la config
  `apps/back/config/database.ts` le supporte déjà : il suffira d'ajouter un
  service `postgres` au compose et de définir `DATABASE_CLIENT=postgres` + les
  variables `DATABASE_*`).
- **RAM** : le KVM 2 (8 Go) est largement suffisant. Le build Next.js est
  l'étape la plus gourmande, mais reste confortable.
- Le fichier `docker-compose.yml` (sans `.prod`) reste dédié au développement
  local ; en production on utilise **toujours** `docker-compose.prod.yml`.
