# 🛡️ Coach Post-Rupture IA

**L'app qui t'aide à tourner la page, pas à rouvrir des plaies.**

Une application web mobile-first guidée par une IA, permettant d'éviter les comportements impulsifs après une rupture, de comprendre ses émotions, et de structurer sa reconstruction émotionnelle.

## 🎯 Objectif

Cette application vise à aider les utilisateurs à :
- **Éviter les rechutes** : Messages à l'ex, stalking, recontact toxique
- **Comprendre la rupture** : Analyse objective de ce qui s'est passé
- **Structurer la reconstruction** : Plan personnalisé jour après jour
- **Suivre sa progression** : Journal émotionnel et suivi d'évolution

**Principe éthique absolu** : L'app ne doit JAMAIS aider à recontacter un ex.

## ✨ Fonctionnalités

### MVP (Version 1.0)

#### 1. Chat IA "Coach Post-Rupture"
- Interface de discussion simple et intuitive
- IA avec rôle de coach : calme, logique, protecteur
- Détection automatique des signaux toxiques
- Refus catégorique d'aider à des comportements nocifs

#### 2. Mode Anti-Rechute
Déclenché automatiquement si l'utilisateur écrit des phrases comme :
- "Je veux écrire à mon ex"
- "Je vais regarder son Instagram"
- "Je vais lui envoyer un message"

Réponse du coach :
- Exercice de respiration guidée
- Redirection émotionnelle
- Analyse du besoin caché
- Proposition d'activités alternatives

#### 3. Journal Émotionnel
- Espace d'écriture libre
- Analyse IA des émotions
- Tags émotionnels automatiques
- Suivi de l'évolution au fil du temps

#### 4. Plan de Reconstruction (7-30 jours)
- Tâches quotidiennes personnalisées
- Objectifs émotionnels
- Exercices d'introspection
- Gestion des limites

#### 5. Section "Comprendre la Rupture"
Analyse objective de :
- Ce qui s'est réellement passé
- Les erreurs de chacun
- Les illusions émotionnelles
- Les patterns toxiques
- La santé réelle de la relation

#### 6. PWA (Progressive Web App)
- Installable sur smartphone
- Fonctionne hors ligne (cache)
- Icône sur l'écran d'accueil

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone <repository-url>
cd rupture

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env.local

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🏗️ Architecture technique

### Frontend
- **Framework** : Next.js 14 (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS
- **State** : React Hooks + localStorage (MVP)

### Backend
- **API Routes** : Next.js API routes
- **IA** : OpenAI GPT-4 ou Anthropic Claude (intégration prête)
- **Database** : localStorage pour MVP (Supabase ready)
- **Auth** : Prêt pour Supabase Auth

### PWA
- Service Worker configuré
- Manifest.json
- Cache stratégique

## 📁 Structure du projet

```
rupture/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Landing page
│   │   ├── onboarding/              # Flux d'inscription
│   │   ├── dashboard/               # Dashboard principal
│   │   │   ├── page.tsx            # Chat IA
│   │   │   ├── journal/            # Journal émotionnel
│   │   │   ├── plan/               # Plan de reconstruction
│   │   │   └── analysis/           # Analyse de rupture
│   │   └── api/                     # API routes
│   │       ├── chat/               # Chat avec IA
│   │       ├── journal/            # Analyse journal
│   │       └── analysis/           # Analyse rupture
│   ├── components/                  # Composants réutilisables
│   ├── lib/
│   │   ├── constants.ts            # Constantes (prompts, triggers)
│   │   └── utils.ts                # Fonctions utilitaires
│   └── types/
│       └── index.ts                # Types TypeScript
├── public/
│   ├── manifest.json               # Manifest PWA
│   ├── sw.js                       # Service Worker
│   └── icons/                      # Icônes PWA
└── README.md
```

## 🔒 Éthique & Garde-fous

L'application intègre plusieurs niveaux de protection :

### 1. Détection automatique de rechute
Phrases déclencheurs surveillées :
- Contact avec l'ex
- Stalking sur réseaux sociaux
- Tentatives de manipulation
- Revenge texting

### 2. Refus catégorique
L'IA refuse systématiquement d'aider à :
- Recontacter l'ex
- Manipuler ou tester l'autre
- Stalker sur les réseaux
- Comportements de vengeance

### 3. Système d'alerte
Détection de signes de :
- Dépendance excessive à l'app
- Obsession persistante
- Détresse psychologique sévère

### 4. Disclaimer clair
"L'app n'aide pas à reprendre contact ou à influencer autrui. Elle protège votre stabilité émotionnelle."

## 🛠️ Configuration

### Variables d'environnement

Créer un fichier `.env.local` :

```bash
# IA (optionnel pour MVP)
OPENAI_API_KEY=your_key_here
# ou
ANTHROPIC_API_KEY=your_key_here

# Database (optionnel pour MVP)
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here

# Paiement (optionnel)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_key_here
STRIPE_SECRET_KEY=your_key_here
```

### Intégration IA

Pour activer l'IA réelle (au lieu des réponses placeholders) :

1. Obtenir une clé API OpenAI ou Anthropic
2. Ajouter la clé dans `.env.local`
3. Décommenter le code IA dans les fichiers API :
   - `src/app/api/chat/route.ts`
   - `src/app/api/journal/analyze/route.ts`
   - `src/app/api/analysis/route.ts`

### Intégration Supabase (Database & Auth)

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Copier l'URL et la clé anonyme
3. Créer les tables nécessaires (schéma SQL fourni)
4. Configurer l'authentification email

## 📦 Déploiement

### Vercel (recommandé)

```bash
npm install -g vercel
vercel
```

### Build production

```bash
npm run build
npm start
```

## 🎨 Design

**Philosophie** : Sobre, apaisant, protecteur

**Couleurs** :
- Primaire : Bleu doux (#0158a1)
- Neutre : Gris (#4b5563)
- Calme : Bleu-gris (#5a78ab)

**Ton de communication** :
- Direct mais bienveillant
- Protecteur sans être condescendant
- Jamais mielleux ou dramatique

## 🗺️ Roadmap

### Phase 1 : MVP ✅
- [x] Landing page
- [x] Onboarding
- [x] Chat IA
- [x] Mode anti-rechute
- [x] Journal émotionnel
- [x] Plan de reconstruction
- [x] Analyse de rupture
- [x] PWA

### Phase 2 : Amélioration
- [ ] Authentification complète
- [ ] Base de données (Supabase)
- [ ] Intégration IA réelle (OpenAI/Claude)
- [ ] Graphiques d'évolution émotionnelle
- [ ] Modules audio (méditations)

### Phase 3 : Monétisation
- [ ] Stripe subscription
- [ ] Paywall léger (7,99-12,99€/mois)
- [ ] Essai gratuit 7 jours

### Phase 4 : Extension
- [ ] Version mobile native (React Native)
- [ ] Communauté modérée
- [ ] Thérapeutes partenaires
- [ ] Exercices cognitifs avancés

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## ⚠️ Avertissement

Cette application est un outil de soutien émotionnel, **pas un substitut à une thérapie professionnelle**.

En cas de détresse psychologique sévère, contactez :
- Un psychologue professionnel
- SOS Amitié : 09 72 39 40 50
- Urgences : 15 (SAMU)

## 📧 Contact

Pour toute question : [votre email]

---

**Fait avec 💙 pour aider les gens à tourner la page sainement.**
