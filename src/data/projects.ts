export interface ProjectDetail {
  role: { fr: string; en: string }
  duration: { fr: string; en: string }
  context: { fr: string; en: string }
  highlights: { fr: string[]; en: string[] }
  learnings?: { fr: string; en: string }
}

export interface Project {
  slug: string
  title: { fr: string; en: string }
  description: { fr: string; en: string }
  category: 'pro' | 'academic' | 'personal' | 'other'
  year: string
  status: 'production' | 'in-progress' | 'completed'
  featured: boolean
  // Search IMAGE_PLACEHOLDER to replace project image paths.
  image: string
  tags: string[]
  links: {
    github?: string
    live?: string
  }
  details: ProjectDetail
}

export const projects: Project[] = [
    {
    slug: 'alternance-carrier',
    title: {
      fr: 'Carrier R&D — Commissioning Web, Sécurité CRA/OTP & Carel STone',
      en: 'Carrier R&D — Web Commissioning, CRA/OTP Security & Carel STone',
    },
    description: {
      fr: 'Refonte de l’application web de commissioning (Alpine.js, Tailwind, API REST), architecture d’authentification OTP sur 4M de régulateurs/an (Cyber Resilience Act) et migration Carel STone.',
      en: 'Redesigned web commissioning app (Alpine.js, Tailwind, REST API), OTP authentication architecture across 4M controllers/yr (Cyber Resilience Act), and Carel STone migration.',
    },
    category: 'pro',
    year: '2026-2027',
    status: 'in-progress',
    featured: true,
    image: '/images/projects/carrier-card.svg',
    tags: ['Alpine.js', 'Tailwind CSS', 'API REST', 'Cybersécurité (CRA)', 'OTP Auth', 'Carel STone', 'Langage ST', 'Git/GitHub'],
    links: {},
    details: {
      role: {
        fr: 'Développeur Logiciel R&D (Alternance — 3e année Bachelor / BUT)',
        en: 'R&D Software Developer (Apprenticeship — Final Year Bachelor)',
      },
      duration: {
        fr: 'Août 2026 – Juillet 2027 (11 mois)',
        en: 'Aug 2026 – July 2027 (11 months)',
      },
      context: {
        fr: 'Au sein du centre R&D de Carrier à Culoz (leader mondial CVC : 47 000 employés, 21,75 Mrd$ CA, ~150 pays), je développe les briques logicielles et sécuritaires des régulateurs industriels pour répondre aux exigences du Cyber Resilience Act (CRA — échéance déc. 2027).',
        en: 'Within Carrier’s R&D center in Culoz (global HVAC leader: 47,000 employees, $21.75B revenue, ~150 countries), I engineer software and security layers for industrial controllers to meet European Cyber Resilience Act (CRA) standards.',
      },
      highlights: {
        fr: [
          'Refonte de l’application web de commissioning (Alpine.js, Tailwind CSS) consommant l’API REST de l’automate pour sécuriser 3 familles (Micro PC3, AeroConnect, etc.) — conformité CRA.',
          'Conception d’une architecture d’authentification OTP remplaçant le mot de passe à 4 chiffres identique sur un parc de 4 millions de régulateurs vendus/an (sécurisation console & routes API).',
          'Migration de la régulation du legacy C-Suite vers Carel STone en langage ST (norme IEC 61131-3).',
          'Initiation et formation de 5 développeurs R&D aux workflows Git/GitHub (branches, issues, pull requests).',
        ],
        en: [
          'Redesigned the web commissioning application (Alpine.js, Tailwind CSS) consuming the PLC REST API to secure 3 controller families (Micro PC3, AeroConnect, etc.) for CRA compliance.',
          'Engineered an OTP authentication architecture replacing the static 4-digit PIN across a fleet of 4M controllers sold/year, securing console access and API endpoints.',
          'Migrated HVAC control routines from legacy C-Suite to Carel STone in Structured Text (IEC 61131-3).',
          'Onboarded and trained 5 R&D developers on modern Git/GitHub workflows (branching, issues, pull requests).',
        ],
      },
      learnings: {
        fr: 'Concevoir des architectures logicielles et de cybersécurité à fort impact industriel (4M d’unités/an) selon les normes européennes (CRA).',
        en: 'Designing high-impact industrial software and cybersecurity architectures (4M units/year) compliant with strict European regulations (CRA).',
      },
    },
  },
  {
    slug: 'stage-chai',
    title: {
      fr: 'CH Alpes-Isère (CHAI) — Déploiement K3s, Automatisation AD/Exchange & Intranet',
      en: 'Alps-Isère Hospital (CHAI) — K3s Deployment, AD/Exchange Automation & Intranet',
    },
    description: {
      fr: 'Déploiement d’un cluster Kubernetes (K3s) sur 2 nœuds avec Nginx Load Balancer et Docker Compose, scripts PowerShell Active Directory/Exchange (1 800 pros) et refonte Intranet (23 apps).',
      en: 'Kubernetes (K3s) 2-node cluster with Nginx Load Balancer and Docker Compose, PowerShell AD/Exchange scripts (1,800 staff), and Intranet redesign (23 apps).',
    },
    category: 'pro',
    year: '2026',
    status: 'completed',
    featured: true,
    image: '/images/projects/stage-chai.png',
    tags: ['Kubernetes (K3s)', 'Docker Compose', 'Nginx LB', 'PowerShell', 'Active Directory', 'Exchange', 'WordPress'],
    links: {},
    details: {
      role: {
        fr: 'Stagiaire Déploiement & Automatisation (DSI)',
        en: 'Deployment & Automation Intern (Hospital IT)',
      },
      duration: {
        fr: 'Mai 2026 – Juin 2026',
        en: 'May 2026 – June 2026',
      },
      context: {
        fr: 'Au sein de la DSI du Centre Hospitalier Alpes-Isère (1 800 professionnels, 50 structures extra-hospitalières, ~300 lits), mise en place de conteneurs et automatisation de l’administration système.',
        en: 'Within the IT Department of Alps-Isère Hospital (1,800 healthcare professionals, 50 outpatient centers, ~300 beds), container deployment and system administration automation.',
      },
      highlights: {
        fr: [
          'Script PowerShell de normalisation Active Directory pour mettre en conformité l’annuaire de 1 800 professionnels.',
          'Optimisation de la gestion de la messagerie Exchange via indexation en mémoire (Hashtables) et désactivation de l’automapping Outlook sur les postes clients.',
          'Refonte de l’accueil de l’Intranet (WordPress, Astra, ACF, CPT UI) regroupant 23 applications métiers + guide d’administration pour l’équipe RH.',
          'Mise en place d’une infrastructure conteneurisée : Docker Compose, Nginx Load Balancer et orchestration Kubernetes (K3s) sur 2 nœuds virtuels.',
        ],
        en: [
          'PowerShell Active Directory normalization script to standardize accounts for 1,800 hospital staff members.',
          'Exchange mailbox management optimization using in-memory Hashtables and disabled Outlook automapping on client workstations.',
          'Hospital Intranet home portal redesign (WordPress, Astra, ACF, CPT UI) grouping 23 internal applications, with admin guide for HR.',
          'Containerized infrastructure setup: Docker Compose, Nginx Load Balancer, and Kubernetes (K3s) orchestration across 2 virtual nodes.',
        ],
      },
      learnings: {
        fr: 'Configurer un cluster K3s multi-nœuds et automatiser la gestion d’un parc de 1 800 comptes sous Active Directory.',
        en: 'Configuring a multi-node K3s cluster and automating account management for 1,800 users in Active Directory.',
      },
    },
  },
  {
    slug: 'algofy',
    title: {
      fr: 'Algofy — Trading Algorithmique sur Hyperliquid',
      en: 'Algofy — Algorithmic Trading on Hyperliquid',
    },
    description: {
      fr: 'Plateforme de trading automatisé connectée à Hyperliquid DEX : exécution d\'ordres en millisecondes, alertes Telegram et abonnements Stripe.',
      en: 'Automated trading platform connected to Hyperliquid DEX: sub-second execution, Telegram alerts, and Stripe subscriptions.',
    },
    category: 'personal',
    year: '2026',
    status: 'production',
    featured: true,
    image: '/images/projects/algofy.png',
    tags: ['Django REST', 'React/Vite', 'Docker', 'PostgreSQL', 'Hyperliquid API', 'Stripe', 'Telegram Bot', 'AES-256'],
    links: {},
    details: {
      role: {
        fr: 'Projet personnel — Conception & Développement',
        en: 'Personal Project — Creator & Developer',
      },
      duration: {
        fr: 'En ligne et en fonctionnement continu',
        en: 'Live and active',
      },
      context: {
        fr: 'J\'ai développé Algofy pour exécuter mes propres stratégies sur le DEX Hyperliquid sans devoir surveiller les écrans 24h/24, avec un tableau de bord pour piloter les bots à distance.',
        en: 'I built Algofy to automate my trading strategies on Hyperliquid DEX around the clock, with a dashboard and remote control via Telegram.',
      },
      highlights: {
        fr: [
          'Backend Django REST et frontend React, conteneurisés avec Docker Compose.',
          'Services Linux systemd tournant 24/7 avec reconnexion automatique en cas de coupure.',
          'Chiffrement AES-256 des clés API en base PostgreSQL.',
          'Bot Telegram pour ajuster ses positions, stopper les bots et recevoir les alertes.',
          'Paiements Stripe Checkout et parrainage via Stripe Connect.',
        ],
        en: [
          'Django REST backend and React frontend containerized with Docker Compose.',
          'Linux systemd background daemons running 24/7 with auto-reconnect.',
          'AES-256 encryption for user API keys in PostgreSQL.',
          'Telegram bot to tweak positions, trigger kill-switch, and get live alerts.',
          'Stripe Checkout subscriptions and affiliate tracking with Stripe Connect.',
        ],
      },
      learnings: {
        fr: 'Créer un projet de bout en bout : sécurité des données, interactions avec une API financière et fiabilité d\'un serveur Linux.',
        en: 'Building an end-to-end product: data security, financial API integration, and Linux server reliability.',
      },
    },
  },
  {
    slug: 'lifeos',
    title: {
      fr: 'LifeOS — Dashboard Personnel & Second Brain',
      en: 'LifeOS — Personal Dashboard & Second Brain',
    },
    description: {
      fr: 'Tableau de bord pour regrouper le suivi des finances, projets et routines au même endroit avec FastAPI et React.',
      en: 'Dashboard to track finances, projects, and routines in one place with FastAPI and React.',
    },
    category: 'personal',
    year: '2026',
    status: 'in-progress',
    featured: true,
    image: '/images/projects/lifeos.png',
    tags: ['FastAPI', 'React/TypeScript', 'PostgreSQL', 'Docker', 'Python'],
    links: {},
    details: {
      role: {
        fr: 'Projet personnel — Développeur Full-Stack',
        en: 'Personal Project — Full-Stack Developer',
      },
      duration: {
        fr: 'Développement continu (2025 – Présent)',
        en: 'Ongoing development (2025 – Present)',
      },
      context: {
        fr: 'Conçu pour regrouper mes données (suivi de portefeuille, tâches quotidiennes, notes) sans dépendre de plusieurs applications séparées.',
        en: 'Built to group personal data (portfolio tracking, daily habits, notes) without switching between multiple apps.',
      },
      highlights: {
        fr: [
          'Backend en Python avec FastAPI et frontend en React / TypeScript.',
          'Parseur CSV multi-plateformes pour importer des relevés bancaires et crypto.',
          'Suivi d’objectifs, journal quotidien et statistiques personnelles.',
          'Déploiement sous Docker avec base de données PostgreSQL.',
        ],
        en: [
          'Python backend with FastAPI and React / TypeScript frontend.',
          'Multi-platform CSV parser to import bank and crypto statements.',
          'Goal tracking, daily journal, and personal analytics.',
          'Docker deployment with PostgreSQL database.',
        ],
      },
      learnings: {
        fr: 'Structurer une API en Python avec FastAPI et relier un frontend React à une base PostgreSQL sous Docker.',
        en: 'Structuring a Python API with FastAPI and connecting a React frontend to PostgreSQL with Docker.',
      },
    },
  },
  {
    slug: 'chronia',
    title: {
      fr: 'Chronia — Application d\'Aide à la Personne',
      en: 'Chronia — Caregiving Assistance Platform',
    },
    description: {
      fr: 'Application web pour faciliter le quotidien des seniors et la coordination avec les familles et soignants.',
      en: 'Assistive web app designed to help seniors with daily routines and coordinate with caregivers and family.',
    },
    category: 'academic',
    year: '2026',
    status: 'completed',
    featured: false,
    image: '/images/projects/chronia.png',
    tags: ['PHP', 'SQL', 'JavaScript', 'HTML/CSS', 'Responsive Design'],
    links: {
      live: 'http://vps-e885b886.vps.ovh.net/chronia/',
    },
    details: {
      role: {
        fr: 'Développeur Web (Projet BUT)',
        en: 'Web Developer (Academic Project)',
      },
      duration: {
        fr: 'Semestre 4 BUT Informatique (2026)',
        en: 'Semester 4 CS Degree (2026)',
      },
      context: {
        fr: 'Projet de BUT Informatique : concevoir une interface accessible aux personnes âgées avec plannings partagés et suivi des soins.',
        en: 'Computer Science academic project: designing an accessible UI for seniors with shared schedules and care tracking.',
      },
      highlights: {
        fr: [
          'Interface adaptée à l\'accessibilité (grands contrastes, navigation simple).',
          'Planning partagé, rappels et journal de suivi pour les soignants.',
          'Hébergement sur un VPS Linux avec Apache, PHP et MySQL.',
        ],
        en: [
          'High-contrast and accessible interface with simple navigation.',
          'Shared scheduling, reminders, and daily caregiver log.',
          'Hosted on a Linux VPS with Apache, PHP, and MySQL.',
        ],
      },
    },
  },
  {
    slug: 'agence-voyages-javafx',
    title: {
      fr: 'Agence de Voyages JavaFX',
      en: 'Travel Agency Desktop App (JavaFX)',
    },
    description: {
      fr: 'Logiciel de bureau en Java pour gérer des catalogues de séjours, des clients et des devis avec interface JavaFX.',
      en: 'Java desktop application to manage travel packages, client accounts, and bookings with JavaFX.',
    },
    category: 'academic',
    year: '2025',
    status: 'completed',
    featured: false,
    image: '/images/projects/agence-voyages.png',
    tags: ['Java', 'JavaFX', 'POO Avancée', 'JSON', 'IHM GUI', 'Design Patterns'],
    links: {},
    details: {
      role: {
        fr: 'Développeur Logiciel Java (Projet BUT)',
        en: 'Java Software Developer (Academic Project)',
      },
      duration: {
        fr: 'Semestre 3 BUT Informatique (2025)',
        en: 'Semester 3 CS Degree (2025)',
      },
      context: {
        fr: 'Projet de gestion commerciale en Java : recherche multicritères, panier et génération de devis de réservation.',
        en: 'Academic Java software project: travel search filters, cart management, and booking estimates.',
      },
      highlights: {
        fr: [
          'Architecture orientée objet en MVC et DAO.',
          'Interface graphique sous JavaFX avec feuilles de style CSS.',
          'Sauvegarde et chargement des données au format JSON.',
        ],
        en: [
          'Object-oriented architecture using MVC and DAO patterns.',
          'JavaFX desktop interface with custom CSS styling.',
          'Data persistence using JSON files.',
        ],
      },
    },
  },
  {
    slug: 'refonte-mobile-web',
    title: {
      fr: 'Refonte Web Symfony & Mobile Android',
      en: 'Symfony Web & Android Mobile Redesign',
    },
    description: {
      fr: 'Portail web en Symfony et application Android native en Java, synchronisés via une API REST.',
      en: 'Symfony web management portal and native Android client app synchronized via a REST API.',
    },
    category: 'academic',
    year: '2026',
    status: 'completed',
    featured: false,
    image: '/images/projects/refonte-mobile.jpg',
    tags: ['Android Studio', 'Java Mobile', 'Symfony PHP', 'API REST', 'Doctrine ORM'],
    links: {},
    details: {
      role: {
        fr: 'Développeur Web & Mobile (Projet BUT)',
        en: 'Web & Mobile Developer (Academic Project)',
      },
      duration: {
        fr: 'Semestre 4 BUT Informatique (2026)',
        en: 'Semester 4 CS Degree (2026)',
      },
      context: {
        fr: 'Projet de BUT : refonte d\'un site web sous Symfony et création d\'une application mobile Android connectée.',
        en: 'Academic project: Symfony web portal redesign paired with an interconnected native Android app.',
      },
      highlights: {
        fr: [
          'Back-office sous Symfony avec Doctrine ORM et migrations.',
          'API REST pour échanger des données JSON avec l\'application mobile.',
          'Application Android en Java avec requêtes asynchrones et cache SQLite.',
        ],
        en: [
          'Symfony back-office with Doctrine ORM and automated migrations.',
          'REST API delivering JSON data to the mobile client.',
          'Native Android app in Java with asynchronous networking and SQLite cache.',
        ],
      },
    },
  },
  {
    slug: 'chatenger',
    title: {
      fr: 'Chatenger — Messagerie Web',
      en: 'Chatenger — Web Messaging',
    },
    description: {
      fr: 'Messagerie instantanée en PHP et MySQL avec salons de discussion et gestion des comptes utilisateurs.',
      en: 'Instant messaging web app in PHP and MySQL with chatrooms and user account management.',
    },
    category: 'academic',
    year: '2023',
    status: 'completed',
    featured: false,
    image: '/images/projects/chatenger.png',
    tags: ['PHP', 'MySQL', 'JavaScript', 'Sécurité Web', 'XSS/CSRF Shield'],
    links: {
      github: 'https://github.com/AlexisSerano/Chatenger/tree/main',
    },
    details: {
      role: {
        fr: 'Projet Lycée (Terminale NSI)',
        en: 'High School Project (Senior Year CS)',
      },
      duration: {
        fr: 'Terminale Générale NSI (2023)',
        en: 'High School Senior Year (CS / 2023)',
      },
      context: {
        fr: 'Projet de Terminale NSI : coder une messagerie web avec comptes utilisateurs et protection contre les injections SQL et failles XSS.',
        en: 'High school senior project (NSI): building a functional web messenger with protection against SQL injections and XSS exploits.',
      },
      highlights: {
        fr: [
          'Authentification avec hachage bcrypt et gestion des sessions.',
          'Protection contre les injections SQL et failles XSS.',
          'Actualisation automatique des messages via requêtes AJAX / Fetch.',
        ],
        en: [
          'User authentication with bcrypt hashing and session handling.',
          'Input filtering against SQL injections and XSS exploits.',
          'Automatic message updates using asynchronous AJAX / Fetch requests.',
        ],
      },
    },
  },
  {
    slug: 'modele-neurone',
    title: {
      fr: 'Modèle de Neurone & Deep Learning',
      en: 'Neuron Model & Deep Learning',
    },
    description: {
      fr: 'Expérimentation des bases du deep learning en Python : calcul matriciel NumPy et réseaux de neurones avec TensorFlow.',
      en: 'Hands-on exploration of deep learning basics in Python: NumPy matrix math and neural networks with TensorFlow.',
    },
    category: 'personal',
    year: '2022',
    status: 'completed',
    featured: false,
    image: '/images/projects/modele-neurone.png',
    tags: ['Python', 'TensorFlow', 'NumPy', 'Deep Learning', 'Calcul Matriciel'],
    links: {},
    details: {
      role: {
        fr: 'Projet personnel d\'apprentissage',
        en: 'Self-directed learning project',
      },
      duration: {
        fr: '2022',
        en: '2022',
      },
      context: {
        fr: 'Projet personnel pour comprendre le fonctionnement des réseaux de neurones : coder un perceptron from scratch avant d\'utiliser TensorFlow.',
        en: 'Personal exploration to understand how neural networks work: coding a perceptron from scratch before moving to TensorFlow.',
      },
      highlights: {
        fr: [
          'Calcul de la descente de gradient et fonctions d\'activation (Sigmoïde, ReLU).',
          'Calculs matriciels vectorisés avec NumPy.',
          'Entraînement et tests de classification sur jeux de données simples.',
        ],
        en: [
          'Implemented gradient descent and activation functions (Sigmoid, ReLU).',
          'Vectorized matrix operations with NumPy.',
          'Trained and evaluated simple classification datasets.',
        ],
      },
    },
  },
  {
    slug: 'trading-investissement',
    title: {
      fr: 'Trading & Investissement Crypto',
      en: 'Trading & Crypto Investment',
    },
    description: {
      fr: 'Pratique de l\'analyse technique, développement d\'outils de suivi et gestion du risque sur les marchés crypto.',
      en: 'Technical analysis practice, tracking tools development, and risk management across crypto markets.',
    },
    category: 'other',
    year: '2024-2026',
    status: 'in-progress',
    featured: false,
    image: '/images/projects/trading.png',
    tags: ['Analyse Technique', 'Gestion de Risque', 'Finance Quant', 'DeFi / DEX'],
    links: {},
    details: {
      role: {
        fr: 'Activité personnelle',
        en: 'Personal Activity',
      },
      duration: {
        fr: 'Depuis 2024 (Activité continue)',
        en: 'Since 2024 (Active)',
      },
      context: {
        fr: 'Activité personnelle reliant analyse de données de marché, mathématiques et automatisation de stratégies.',
        en: 'Personal activity combining market data analysis, mathematics, and strategy automation.',
      },
      highlights: {
        fr: [
          'Étude des flux de liquidité et des données de carnet d\'ordres.',
          'Règles strictes de gestion du capital (position sizing, ratio risque/gain).',
          'Backtest de stratégies sur données historiques.',
        ],
        en: [
          'Study of liquidity flows and order book data.',
          'Strict capital management rules (position sizing, risk/reward).',
          'Backtesting strategies on historical candle data.',
        ],
      },
    },
  },
  {
    slug: 'montage-video',
    title: {
      fr: 'Montage Vidéo & Motion Design',
      en: 'Video Editing & Motion Design',
    },
    description: {
      fr: 'Plus de 7 ans de pratique du montage vidéo, du motion design et du sound design sur Premiere Pro et After Effects.',
      en: 'Over 7 years of video editing, motion design, and sound design using Premiere Pro and After Effects.',
    },
    category: 'other',
    year: '2017-2026',
    status: 'in-progress',
    featured: false,
    image: '/images/projects/montage-video.jpg',
    tags: ['Premiere Pro', 'After Effects', 'Photoshop', 'Motion Design', 'Sound Design'],
    links: {},
    details: {
      role: {
        fr: 'Pratique autodidacte & freelance',
        en: 'Self-taught & freelance',
      },
      duration: {
        fr: '7+ ans de pratique (2017 – Présent)',
        en: '7+ years of experience (2017 – Present)',
      },
      context: {
        fr: 'Réalisation de montages vidéo (YouTube, vidéos courtes, projets personnels et commandes freelance). C\'est ce qui m\'a initié au travail sur ordinateur.',
        en: 'Editing video content (YouTube, short form, personal projects, freelance commissions). This originally sparked my passion for computers.',
      },
      highlights: {
        fr: [
          'Montage et étalonnage sur Adobe Premiere Pro.',
          'Animations graphiques et titrage sous After Effects.',
          'Mixage et habillage sonore.',
        ],
        en: [
          'Editing and color grading in Adobe Premiere Pro.',
          'Motion graphics and kinetic typography in After Effects.',
          'Audio mixing and sound design.',
        ],
      },
    },
  },
]
