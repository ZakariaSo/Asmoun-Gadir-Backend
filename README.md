# Cahier des Charges - Asmoun Gadir

## 📋 Informations Générales

### Présentation du Projet
**Asmoun Gadir** est une plateforme numérique de coordination d'activités touristiques pour la région d'Agadir. Elle facilite la collaboration entre hébergements touristiques et permet aux visiteurs de participer à des activités collectives, indépendamment de leur lieu de résidence.

### Contexte
Les touristes séjournant dans différents hébergements ont souvent des difficultés à organiser des activités en groupe. Les petits hébergements ne peuvent pas toujours proposer une gamme complète d'activités faute de participants. Cette plateforme résout ces problématiques en mutualisant les ressources et en créant une communauté dynamique.

### Objectifs
- Faciliter l'organisation d'activités touristiques collectives
- Optimiser le taux de remplissage des sorties organisées
- Créer du lien social entre touristes de différents hébergements
- Offrir aux hébergements un outil de gestion d'activités simplifié
- Améliorer l'expérience touristique à Agadir

---

## 👥 Acteurs du Système

### Hébergements (Hôtels, Maisons d'hôtes, Auberges)
- Publier et gérer des activités
- Gérer les réservations et participants
- Communiquer avec les touristes
- Visualiser les statistiques

### Touristes
- Consulter les activités disponibles
- Réserver des places
- Communiquer avec les organisateurs
- Gérer leur profil et historique

### Administrateurs
- Modérer le contenu
- Gérer les utilisateurs
- Superviser les activités
- Analyser les données de la plateforme

---

## 🎯 Fonctionnalités Principales

### Module Hébergement

#### Gestion des Activités
- Création d'annonces d'activités avec :
  - Titre et description détaillée
  - Date, heure et durée
  - Lieu de rendez-vous
  - Nombre de places disponibles
  - Prix par personne
  - Photos et médias
  - Conditions de participation
- Modification et suppression d'activités
- Duplication d'activités récurrentes
- Gestion du statut (brouillon, publié, complet, annulé)

#### Gestion des Réservations
- Visualisation des demandes de réservation
- Acceptation/refus des participants
- Liste des participants confirmés
- Envoi de notifications automatiques
- Gestion des listes d'attente

#### Communication
- Messagerie avec les participants
- Envoi d'informations pratiques
- Notifications de modification d'activité
- Rappels automatiques avant l'activité

#### Tableau de Bord
- Statistiques d'activités
- Taux de remplissage
- Revenus générés
- Évaluations reçues

### Module Touriste

#### Recherche et Découverte
- Navigation par catégories (sport, culture, nature, gastronomie, etc.)
- Filtres avancés :
  - Par date
  - Par prix
  - Par lieu
  - Par type d'activité
  - Par nombre de places disponibles
- Carte interactive des activités
- Système de recommandations

#### Réservation
- Processus de réservation simplifié
- Sélection du nombre de participants
- Paiement en ligne sécurisé (ou paiement sur place)
- Confirmation par email
- Génération de QR code de participation

#### Gestion du Profil
- Informations personnelles
- Historique des activités
- Activités favorites
- Évaluations données
- Centre de notifications

#### Communauté
- Évaluations et avis sur les activités
- Messagerie avec les organisateurs
- Partage d'expériences (optionnel)

### Module Administration

#### Gestion des Utilisateurs
- Validation des comptes hébergements
- Modération des profils
- Gestion des signalements
- Suspension/bannissement de comptes

#### Modération du Contenu
- Validation des activités publiées
- Suppression de contenu inapproprié
- Vérification des photos et descriptions

#### Statistiques Globales
- Nombre d'utilisateurs actifs
- Activités créées et réalisées
- Taux de satisfaction
- Analyse des tendances

---

## 🏗️ Architecture Technique

### Structure du Projet
Le projet est organisé en deux repositories distincts :

#### Backend (API REST)
- **Repository** : [https://github.com/ZakariaSo/Asmoun-Gadir-Backend.git]
- **Technologies** :
  - **Runtime** : Node.js
  - **Framework** : Express.js
  - **Base de données** : PostgreSQL
  - **ORM** : Sequelize
  - **Architecture** : MVC (Model-View-Controller)
  - **Authentification** : JWT (JSON Web Tokens)
  - **Upload de fichiers** : Multer
  - **Validation** : Express-validator ou Joi
  - **API** : RESTful

**Structure MVC Backend** :
```
backend/
├── config/
│   ├── database.js
│   └── env.js
├── controllers/
│   ├── authController.js
│   ├── activityController.js
│   ├── reservationController.js
│   └── userController.js
├── models/
│   ├── User.js
│   ├── Accommodation.js
│   ├── Activity.js
│   ├── Reservation.js
│   └── Review.js
├── routes/
│   ├── authRoutes.js
│   ├── activityRoutes.js
│   └── reservationRoutes.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   └── upload.js
├── utils/
│   └── emailService.js
└── server.js
```

#### Frontend (Application Mobile)
- **Repository** : [https://github.com/ZakariaSo/Asmoun-Gadir-Frontend.git]
- **Technologies** :
  - **Framework** : React Native
  - **Plateforme** : Expo
  - **Langage** : TypeScript
  - **Gestion d'état** : Zustand
  - **Requêtes API** : React Query (TanStack Query)
  - **Navigation** : Expo Router (File-based routing)
  - **Styling** : NativeWind (Tailwind CSS for React Native) ou Styled Components
  - **Formulaires** : React Hook Form

**Structure Frontend React Native** :
```
frontend/
├── app/
│   ├── (auth)/
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/
│   │   ├── index.tsx (home)
│   │   ├── activities.tsx
│   │   ├── bookings.tsx
│   │   └── profile.tsx
│   ├── activity/
│   │   └── [id].tsx
│   └── _layout.tsx
├── components/
│   ├── ActivityCard.tsx
│   ├── SearchBar.tsx
│   └── BookingModal.tsx
├── services/
│   ├── api.ts
│   └── auth.ts
├── store/
│   ├── authStore.ts
│   ├── activityStore.ts
│   └── userStore.ts
├── hooks/
│   ├── useActivities.ts
│   └── useAuth.ts
├── types/
│   ├── activity.ts
│   ├── user.ts
│   └── api.ts
├── utils/
│   └── constants.ts
└── app.json
```

### APIs et Intégrations
- API de paiement (Stripe, PayPal, CMI, etc.)
- Service d'envoi d'emails (Nodemailer avec Gmail/SendGrid)
- Service de stockage d'images (Cloudinary, AWS S3, Expo ImagePicker)
- API de géolocalisation/cartographie (Google Maps API, React Native Maps)
- Service de notifications push (Expo Notifications)

### Stack Technique Détaillée

#### Backend (Express.js + PostgreSQL)
- **Express.js** : Framework web minimaliste et flexible
- **Sequelize** : ORM pour PostgreSQL avec migrations et seeders
- **PostgreSQL** : Base de données relationnelle robuste
- **JWT** : Authentification stateless avec tokens
- **Bcrypt** : Hashage sécurisé des mots de passe
- **Multer** : Gestion d'upload de fichiers (images)
- **Nodemailer** : Envoi d'emails transactionnels
- **Joi/Express-validator** : Validation des données entrantes
- **CORS** : Configuration des origines autorisées
- **Dotenv** : Gestion des variables d'environnement
- **Morgan** : Logging des requêtes HTTP

#### Frontend (React Native + Expo + TypeScript)
- **React Native** : Framework mobile cross-platform (iOS/Android)
- **Expo** : Toolchain complète pour React Native
- **TypeScript** : Typage statique pour plus de robustesse
- **Zustand** : State management léger et performant
- **React Query** : Gestion du cache, synchronisation et mutations API
- **Expo Router** : Navigation file-based intuitive
- **React Native Maps** : Affichage de cartes interactives
- **Expo Image Picker** : Sélection de photos depuis la galerie
- **Expo Notifications** : Notifications push
- **Axios** : Client HTTP pour les appels API
- **React Hook Form** : Gestion performante des formulaires
- **Zod** : Validation de schémas TypeScript-first
- **AsyncStorage** : Stockage local persistant

### Sécurité
- Authentification par JWT avec refresh tokens
- Chiffrement des mots de passe avec Bcrypt (salt rounds: 10)
- Protection CSRF pour les endpoints critiques
- Validation des données (backend: Joi, frontend: Zod)
- Limitation du taux de requêtes (express-rate-limit)
- Politique CORS configurée pour l'app mobile
- Protection contre les injections SQL (Sequelize ORM)
- Sanitization des inputs utilisateurs
- HTTPS obligatoire en production
- Variables sensibles dans .env (non versionnées)
- Tokens stockés de manière sécurisée (SecureStore Expo)

---

## 💾 Modèle de Données

### Entités Principales

#### Utilisateur
- id, email, mot_de_passe, type (hébergement/touriste/admin)
- nom, prénom, téléphone
- photo_profil, date_inscription
- statut (actif/inactif/banni)

#### Hébergement (extension Utilisateur)
- nom_etablissement, type_etablissement
- adresse, ville, code_postal
- description, équipements
- numéro_licence, certification
- évaluation_moyenne, nombre_activités

#### Touriste (extension Utilisateur)
- nationalité, langue_préférée
- centres_intérêt
- date_naissance

#### Activité
- id, titre, description
- id_hebergement (créateur)
- catégorie, sous_catégorie
- date_debut, date_fin, durée
- lieu_rendez-vous (adresse, coordonnées GPS)
- nombre_places_total, places_disponibles
- prix, devise
- photos[], équipements_requis
- conditions_participation
- statut (brouillon/publié/complet/annulé/terminé)
- date_creation, date_modification

#### Réservation
- id, id_activité, id_touriste
- nombre_participants
- statut (en_attente/confirmé/refusé/annulé)
- date_reservation
- montant_total
- code_confirmation

#### Évaluation
- id, id_activité, id_touriste
- note (1-5), commentaire
- date_evaluation

#### Message
- id, id_expediteur, id_destinataire
- id_activité (optionnel)
- contenu, date_envoi
- lu (boolean)

---

## 🎨 Design et Expérience Utilisateur

### Principes de Design
- Interface mobile intuitive et native
- Design responsive adapté aux tailles d'écrans (smartphones et tablettes)
- Accessibilité optimisée pour mobile
- Performance optimisée (temps de chargement rapide)
- Navigation gestuelle naturelle (swipe, pull-to-refresh)
- Feedback haptique sur les interactions importantes

### Charte Graphique
- Couleurs inspirées d'Agadir (bleu océan, jaune soleil, blanc cassé)
- Typographie native optimisée (SF Pro pour iOS, Roboto pour Android)
- Iconographie cohérente (Expo Vector Icons)
- Photos haute qualité des activités optimisées pour mobile
- Design moderne avec animations fluides (Reanimated)

### Expérience Mobile
- Onboarding interactif au premier lancement
- Authentification biométrique (Face ID, Touch ID, empreinte)
- Mode hors-ligne pour consultation des activités sauvegardées
- Géolocalisation pour activités à proximité
- Notifications push personnalisées
- Partage d'activités via réseaux sociaux
- Deep linking pour partage d'activités spécifiques

---

## 📱 Fonctionnalités Complémentaires

### Système de Notifications
- Notifications push natives via Expo Notifications
- Notifications en temps réel pour :
  - Confirmation de réservation
  - Rappels 24h avant l'activité
  - Modifications d'activité
  - Nouveaux messages
  - Places disponibles sur activités favorites
- Badge count sur l'icône de l'app
- Notifications groupées par type
- Gestion des permissions de notifications

### Application Mobile Native
- Support iOS et Android via Expo
- Navigation par onglets (bottom tabs)
- Pull-to-refresh sur les listes
- Infinite scroll pour les activités
- Swipe gestures pour actions rapides
- Partage natif d'activités
- Mode sombre / clair automatique
- Stockage local avec AsyncStorage
- Cache intelligent avec React Query

### Système d'Évaluation
- Notes sur 5 étoiles avec icônes animées
- Commentaires modérés
- Galerie photos des participants (optionnel)
- Réponses de l'hébergement aux avis
- Badge de qualité pour les meilleurs hébergements
- Filtrage par note moyenne

### Géolocalisation
- Carte interactive avec React Native Maps
- Affichage des activités à proximité
- Calcul de distance depuis la position actuelle
- Directions vers le point de rendez-vous
- Clustering des marqueurs pour performance

---

## 🔄 User Stories

### En tant qu'hébergement :
- Je veux créer une activité de surf pour demain matin avec 10 places
- Je veux voir combien de personnes se sont inscrites à mon excursion
- Je veux communiquer un changement de lieu de rendez-vous à tous les participants
- Je veux analyser quelles activités fonctionnent le mieux

### En tant que touriste :
- Je veux trouver une activité culturelle ce weekend proche de ma position
- Je veux réserver 2 places pour une excursion dans les montagnes
- Je veux laisser un avis sur l'activité à laquelle j'ai participé
- Je veux recevoir une notification si une place se libère sur une activité complète

### En tant qu'administrateur :
- Je veux valider les nouveaux hébergements avant qu'ils puissent publier
- Je veux supprimer une activité signalée comme inappropriée
- Je veux voir les statistiques globales de la plateforme
- Je veux envoyer un message à tous les hébergements

---

## 🚀 Phases de Développement

### Phase 1 - MVP (Minimum Viable Product)
**Backend** :
- Setup Express.js + PostgreSQL + Sequelize
- Modèles Sequelize (User, Activity, Reservation)
- Authentification JWT (register, login, refresh token)
- CRUD API activités avec upload d'images
- API réservations (create, list, cancel)
- Middlewares d'authentification et validation
- Seeders pour données de test

**Frontend Mobile** :
- Configuration Expo + TypeScript
- Setup Zustand stores (auth, activities)
- Configuration React Query
- Expo Router (navigation file-based)
- Écrans d'authentification (login/register)
- Liste et détail des activités
- Système de réservation basique
- Stockage sécurisé du token (SecureStore)

### Phase 2 - Fonctionnalités Avancées
**Backend** :
- API de recherche et filtres avancés
- Système de notifications (email avec Nodemailer)
- API de messagerie
- API d'évaluations et avis
- Statistiques pour hébergements
- Gestion des médias (Cloudinary)
- Rate limiting et sécurité renforcée

**Frontend Mobile** :
- Recherche et filtres dynamiques
- Carte interactive (React Native Maps)
- Notifications push (Expo Notifications)
- Système d'évaluations avec photos
- Profil utilisateur éditable
- Historique des réservations
- Mode hors-ligne pour activités favorites
- Animations fluides (Reanimated)

### Phase 3 - Optimisation et Polish
**Backend** :
- Optimisation des requêtes SQL (indexes, joins)
- Cache Redis pour requêtes fréquentes
- WebSocket pour chat en temps réel
- Tests automatisés (Jest + Supertest)
- Documentation API (Swagger)
- Monitoring et logging (Winston)

**Frontend Mobile** :
- Optimisation des performances (memoization)
- Skeleton loaders
- Mode sombre/clair
- Multilingue (i18n)
- Onboarding interactif
- Deep linking
- Préparation pour stores (App Store, Google Play)
- Tests E2E (Detox)

---

## 📊 Critères de Succès

### Indicateurs Techniques
- Temps de réponse API < 200ms (moyenne)
- Disponibilité du service > 99%
- Taux d'erreur < 0.1%
- Support iOS 13+ et Android 8+
- Taille de l'app < 50MB
- Temps de démarrage < 3 secondes
- Frame rate stable (60 FPS)
- Score performances React Native > 80

### Indicateurs Métiers
- Nombre d'hébergements inscrits
- Nombre d'activités publiées par mois
- Taux de remplissage moyen des activités
- Nombre de réservations effectuées
- Taux de satisfaction utilisateurs > 4/5
- Taux de rétention à 30 jours > 40%
- Temps moyen de réservation < 2 minutes

---

## 🛡️ Contraintes et Risques

### Contraintes Techniques
- Performance : support de 1000 utilisateurs simultanés
- Sécurité : conformité RGPD pour les données personnelles
- Scalabilité : architecture évolutive (horizontal scaling possible)
- Compatibilité : iOS 13+ / Android 8+ (API Level 26+)
- Taille app : optimisation pour stores (< 50MB)
- Mode hors-ligne : fonctionnalités de base accessibles sans connexion
- Temps de build : < 5 minutes (Expo EAS Build)

### Risques Identifiés
- **Faible adoption initiale** : stratégie marketing ciblée, partenariats avec hébergements
- **Qualité des activités** : processus de validation manuelle au début
- **Litiges entre utilisateurs** : CGU claires, système de signalement et médiation
- **Saisonnalité touristique** : adaptation de l'offre selon les périodes
- **Performances mobile** : optimisation images, lazy loading, cache intelligent
- **Permissions refusées** : expérience dégradée mais fonctionnelle sans géolocalisation/notifications
- **Versions OS obsolètes** : support limité aux versions récentes (iOS 13+, Android 8+)

---

## 🔗 Liens Utiles

- **Repository Backend** : [https://github.com/ZakariaSo/Asmoun-Gadir-Backend.git]
- **Repository Frontend** : [https://github.com/ZakariaSo/Asmoun-Gadir-Frontend.git]
- **Application en ligne** : [IN PROGRESS ... ]
- **Maquettes Figma/Adobe XD** : [IN PROGRESS ...]

---

## 👨‍💻 Équipe de Développement

- **Développeur(s)** : [ZAKARIA SOBAHI]
- **Formation** : [SIMPLOS - DEV MOBILE]
- **Période** : [16/12/2025]
- **Encadrant** : [mohamed harbouli]

---

## 📧 Contact

Pour toute question concernant ce projet :
- Email : [zakariaa.sobahi@gmail.com]
- GitHub : [ZakariaSo]

---

*Document créé le [16/12/2025] - Version 1.0*