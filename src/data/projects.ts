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
      fr: 'Carrier Culoz SA — Régulation d\'automates CVC',
      en: 'Carrier Culoz SA — Industrial HVAC Automation',
    },
    description: {
      fr: 'Programmation sur automates de traitement d\'air en langage ST (Structured Text) et migration logicielle vers la plateforme STone.',
      en: 'PLC programming for industrial air handling units in Structured Text and software migration to the STone platform.',
    },
    category: 'pro',
    year: '2026-2027',
    status: 'in-progress',
    featured: true,
    image: '/images/projects/carrier-card.svg',
    tags: ['Langage ST', 'Automates Programmables', 'HVAC / CVC', 'STone', 'Carrel', 'Systèmes Embarqués'],
    links: {},
    details: {
      role: {
        fr: 'Développeur Embarqué (Alternance 3e année BUT)',
        en: 'Embedded Developer (Apprenticeship)',
      },
      duration: {
        fr: 'Sept. 2026 – Juil. 2027 (11 mois)',
        en: 'Sept 2026 – July 2027 (11 months)',
      },
      context: {
        fr: 'Dans le cadre de mon alternance chez Carrier Culoz, j\'interviens dans l\'équipe R&D logicielle pour migrer les programmes des automates de traitement d\'air vers une nouvelle plateforme.',
        en: 'As part of my apprenticeship at Carrier Culoz, I work within the R&D software team to port air handling unit controller programs to a new platform.',
      },
      highlights: {
        fr: [
          'Migration des logiques de pilotage de l\'ancienne plateforme Carrel vers STone.',
          'Développement de programmes d\'automates en langage ST (norme IEC 61131-3).',
          'Gestion des boucles de régulation : température, débit d\'air, vannes et sécurités.',
          'Tests et validation sur bancs d\'essai industriels.',
        ],
        en: [
          'Porting control logic from legacy Carrel platform to STone.',
          'Developing PLC routines in Structured Text (IEC 61131-3).',
          'Managing climate control loops: temperature, air flow, valves, and safety triggers.',
          'Testing and validation on industrial test benches.',
        ],
      },
      learnings: {
        fr: 'Comprendre les exigences du temps réel industriel, la rigueur sur le matériel et les normes de sécurité.',
        en: 'Understanding real-time industrial constraints, hardware reliability, and safety standards.',
      },
    },
  },
  {
    slug: 'stage-chai',
    title: {
      fr: 'Centre Hospitalier Alpes-Isère — Stage DSI',
      en: 'Alps-Isère Hospital Center — IT Internship',
    },
    description: {
      fr: 'Automatisation de tâches sous PowerShell, déploiement d\'un cluster Kubernetes et support sur l\'infrastructure de 1 800 utilisateurs.',
      en: 'PowerShell automation, Kubernetes cluster deployment, and infrastructure support for 1,800 users.',
    },
    category: 'pro',
    year: '2026',
    status: 'completed',
    featured: true,
    image: '/images/projects/stage-chai.png',
    tags: ['PowerShell', 'Kubernetes', 'Docker', 'Active Directory', 'MariaDB', 'DevOps'],
    links: {},
    details: {
      role: {
        fr: 'Stagiaire Systèmes & Réseaux',
        en: 'Systems & Networks Intern',
      },
      duration: {
        fr: '10 semaines (Avril – Juin 2026)',
        en: '10 weeks (April – June 2026)',
      },
      context: {
        fr: 'Stage de 10 semaines à la DSI du Centre Hospitalier Alpes-Isère (1 800 comptes agents). Mon rôle : automatiser les opérations récurrentes et tester de nouveaux déploiements conteneurisés.',
        en: '10-week internship at CHAI hospital IT department (1,800 staff accounts). My role was automating routine tasks and deploying containerized services.',
      },
      highlights: {
        fr: [
          'Scripts PowerShell pour automatiser l\'administration des comptes et des postes.',
          'Déploiement d\'un cluster Kubernetes et Docker en environnement de test.',
          'Gestion des utilisateurs et des droits sous Active Directory (GPO, sécurisation).',
          'Maintenance et requêtes SQL sur bases MariaDB d\'applications internes.',
        ],
        en: [
          'PowerShell scripts to automate account management and workstation setup.',
          'Deployed a Kubernetes & Docker cluster in test environment.',
          'Active Directory user and permissions management (GPOs, hardening).',
          'Maintenance and SQL queries on internal MariaDB instances.',
        ],
      },
      learnings: {
        fr: 'Gérer des problématiques concrètes sur un grand réseau hospitalier où la continuité de service est primordiale.',
        en: 'Handling real-world challenges in a large hospital network where uptime and service continuity are critical.',
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
      fr: 'Tableau de bord centralisé pour suivre finances, projets et routines au même endroit avec backend asynchrone FastAPI.',
      en: 'Centralized dashboard to track finances, projects, and routines in one place with async FastAPI backend.',
    },
    category: 'personal',
    year: '2026',
    status: 'in-progress',
    featured: true,
    image: '/images/projects/lifeos.png',
    tags: ['FastAPI', 'React/TypeScript', 'PostgreSQL', 'Redis', 'Celery', 'Docker'],
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
        fr: 'Conçu pour regrouper mes données utiles (suivi de portefeuille, tâches quotidiennes, notes) sans dépendre de multiples outils séparés.',
        en: 'Built to unify personal data (portfolio tracking, daily habits, notes) without switching between multiple apps.',
      },
      highlights: {
        fr: [
          'Backend asynchrone avec FastAPI (Python) et frontend modulaire en React / TypeScript.',
          'Parseur CSV multi-plateformes pour importer ses relevés bancaires et crypto.',
          'Files de tâches asynchrones Celery avec Redis pour les calculs d\'analyse.',
          'Déploiement sous Docker avec base de données PostgreSQL.',
        ],
        en: [
          'Async Python backend with FastAPI and modular React / TypeScript frontend.',
          'Multi-platform CSV parser to import bank and crypto statements.',
          'Asynchronous task queues with Celery and Redis for analytics.',
          'Docker deployment with PostgreSQL database.',
        ],
      },
      learnings: {
        fr: 'Structurer une architecture asynchrone en Python et concevoir une interface réactive pour des volumes de données variés.',
        en: 'Structuring an async Python architecture and building a clean interface for diverse data streams.',
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
    slug: 'gestionnaire-taches-csharp',
    title: {
      fr: 'Gestionnaire de Tâches C#',
      en: 'C# Task Manager',
    },
    description: {
      fr: 'Application de bureau Windows en C# pour organiser ses tâches quotidiennes avec sauvegarde locale en JSON.',
      en: 'Windows desktop task manager in C# .NET with local JSON persistence.',
    },
    category: 'personal',
    year: '2022',
    status: 'completed',
    featured: false,
    image: '/images/projects/gestionnaire-taches.png',
    tags: ['C#', '.NET Framework', 'Windows Forms', 'JSON Serialization'],
    links: {
      github: 'https://github.com/AlexisSerano/Task-managerV1-ByKys3n',
    },
    details: {
      role: {
        fr: 'Projet personnel',
        en: 'Personal Project',
      },
      duration: {
        fr: '2022',
        en: '2022',
      },
      context: {
        fr: 'Petit utilitaire de bureau développé en C# Windows Forms pour gérer sa liste de tâches avec filtres par priorité.',
        en: 'Small Windows Forms desktop utility developed in C# to manage daily tasks with priority filters.',
      },
      highlights: {
        fr: [
          'Interface Windows Forms avec raccourcis clavier.',
          'Sauvegarde et chargement des tâches en JSON.',
          'Filtres par statut et par niveau de priorité.',
        ],
        en: [
          'Windows Forms UI with keyboard shortcuts.',
          'Task saving and loading with JSON serialization.',
          'Filters by status and priority level.',
        ],
      },
    },
  },
  {
    slug: 'jeu-de-la-vie',
    title: {
      fr: 'Jeu de la Vie de Conway',
      en: 'Conway\'s Game of Life',
    },
    description: {
      fr: 'Simulation en Python de l\'automate cellulaire de Conway avec rendu graphique sous Pygame.',
      en: 'Python simulation of Conway\'s cellular automaton with Pygame graphical rendering.',
    },
    category: 'personal',
    year: '2023',
    status: 'completed',
    featured: false,
    image: '/images/projects/jeu-de-la-vie.gif',
    tags: ['Python', 'Automate Cellulaire', 'Algorithmique', 'Pygame'],
    links: {
      github: 'https://github.com/AlexisSerano/Jeu-de-la-vie',
    },
    details: {
      role: {
        fr: 'Projet personnel',
        en: 'Personal Project',
      },
      duration: {
        fr: '2023',
        en: '2023',
      },
      context: {
        fr: 'Projet algorithmique pour explorer les règles de Conway et observer comment des motifs complexes naissent de règles simples.',
        en: 'Algorithmic project exploring Conway\'s rules and observing how complex patterns emerge from simple rules.',
      },
      highlights: {
        fr: [
          'Calcul du voisinage de Moore sur une grille torique.',
          'Affichage et contrôle de la vitesse d\'itération avec Pygame.',
          'Possibilité de dessiner ses propres cellules de départ.',
        ],
        en: [
          'Moore neighborhood calculation on a 2D toroidal grid.',
          'Pygame visualization and iteration speed controls.',
          'Interactive cell drawing to test custom starting seeds.',
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
