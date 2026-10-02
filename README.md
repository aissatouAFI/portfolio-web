# Portfolio Web — Frontend React

Frontend du portfolio, construit avec React + Vite + Tailwind CSS v4, connecté
à l'API Laravel (`portfolio-api`).

## Ce qui est fait pour l'instant

- Structure du projet (routing avec React Router, layout header/footer)
- Page **Accueil** complète : hero + section "Ce que je fais" connectée en
  direct à `GET /api/services`
- Pages **Réalisations**, **CV**, **Contact** : présentes dans la navigation
  mais encore des pages "à venir" — c'est la suite prévue

## Identité visuelle

- Palette : fond papier chaud (`#f7f4ec`), encre profonde (`#12172b`), accent
  ambre (`#e2872b`) et vert pin (`#2f6f62`)
- Typographies : **Fraunces** (titres, serif avec du caractère) + **Space
  Grotesk** (texte courant, technique)
- Motif visuel : trois nœuds reliés par des traits fins dans le hero — un
  clin d'œil discret au fil rouge de tes projets (RED Product, JEF CONNECT) :
  des systèmes qui mettent des gens en relation

## Installation

```bash
npm install
```

Copie `.env.example` en `.env` (déjà fait par défaut) et vérifie l'URL de
l'API :

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

## Lancer en développement

**Assure-toi que le backend Laravel tourne** (`php artisan serve` dans
`portfolio-api`), puis :

```bash
npm run dev
```

Le site est disponible sur `http://localhost:5173`.

## Vérifier avant de livrer

```bash
npm run lint    # vérifie le code
npm run build   # vérifie que la version de production compile
```

## Prochaine étape

Construire les pages Réalisations (liste des projets depuis l'API),
CV (expériences/formations/compétences + PDF téléchargeable), et Contact
(formulaire connecté à `POST /api/contact`), puis le dashboard admin.
