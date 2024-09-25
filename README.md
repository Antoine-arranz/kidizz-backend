# Kidizz - Gestion de Crèches

## Description du Projet

Kidizz est une application de gestion d'enfants et de crèches, développée dans le cadre d'un test technique.

## Technologies Utilisées

- Frontend : Vue 3
- Backend : Nest.js
- Base de données : TypeORM avec Postgres
- Langage : TypeScript

## Fonctionnalités Principales

1. Gestion des utilisateurs (inscription/connexion)
2. Gestion des crèches (création, listing, suppression)
3. Gestion des enfants (affectation aux crèches, listing par crèche)
4. Export des données enfants en CSV
5. Système d'alerte par email lors de la suppression d'une crèche

## Installation et Configuration

### Prérequis

- Node.js (version recommandée)
- NPM ou Yarn
- [Votre choix de BDD SQL]

### Installation

`npm install`

## Configuration des Variables d'Environnement

Créez un fichier .env

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=votre_username
DB_PASSWORD=votre_password
DB_DATABASE=kidizz_db
```

## Lancement de l'Application

Démarrez le serveur backend :
`npm run start:dev`
