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
      fr: 'Alternance Développeur Embarqué — Carrier Culoz SA',
      en: 'Embedded Developer Apprenticeship — Carrier Culoz SA',
    },
    description: {
      fr: 'Programmation embarquée sur automates de traitement d\'air industriel et régulation CVC. Migration logicielle Carrel vers STone en Langage ST.',
      en: 'Embedded programming on industrial air handling unit PLCs and HVAC controls. Software migration from legacy Carrel to STone platform using Structured Text.',
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
        fr: 'Développeur Embarqué / Automaticien (Alternant BUT3)',
        en: 'Embedded Developer / PLC Automation Engineer (Apprentice)',
      },
      duration: {
        fr: '31/08/2026 – 02/07/2027 (11 mois)',
        en: 'Aug 2026 – Jul 2027 (11 months)',
      },
      context: {
        fr: 'Carrier Culoz SA est un leader industriel dans les systèmes de traitement d\'air et de climatisation tertiaire/industrielle. Dans le cadre de ma 3ème année de BUT Informatique à l\'IUT2 Grenoble, j\'interviens au cœur de la division R&D logicielle pour moderniser les architectures automates.',
        en: 'Carrier Culoz SA is a worldwide industrial leader in air handling and HVAC solutions. As part of my 3rd year Computer Science degree at IUT2 Grenoble, I contribute to the embedded software R&D division to modernize PLC controller platforms.',
      },
      highlights: {
        fr: [
          'Portage et migration complète des logiques de pilotage de la plateforme propriétaire Carrel vers la nouvelle plateforme STone.',
          'Développement de programmes d\'automates en Langage ST (Structured Text) selon la norme internationale IEC 61131-3.',
          'Gestion des boucles de régulation climatique (température, hygrométrie, débit d\'air, vannes proportionnelles et sécurités incendie).',
          'Tests et validation sur bancs d\'essai industriels et analyse des protocoles de communication machine-to-machine.',
        ],
        en: [
          'Complete porting and software migration of controller routines from legacy Carrel platform to modern STone.',
          'Development of industrial PLC programs in Structured Text (ST) conforming to the IEC 61131-3 standard.',
          'Climate control feedback loops implementation (temperature, humidity, air flow, proportional valves, and safety interlocks).',
          'Industrial test bench validation and telemetry verification across machine-to-machine communication protocols.',
        ],
      },
      learnings: {
        fr: 'Compétence rare alliant informatique avancée, rigueur industrielle critique et maîtrise des systèmes embarqués en temps réel.',
        en: 'High-value intersection of modern computer science, strict industrial safety standards, and real-time embedded systems.',
      },
    },
  },
  {
    slug: 'stage-chai',
    title: {
      fr: 'Stage DSI — Centre Hospitalier Alpes-Isère',
      en: 'IT Internship — Alps-Isère Hospital Center',
    },
    description: {
      fr: 'Automatisation de l\'infrastructure sous PowerShell, déploiement d\'un cluster Kubernetes en haute disponibilité et gestion de 1800+ utilisateurs.',
      en: 'Infrastructure automation with PowerShell, high-availability Kubernetes cluster deployment, and directory administration for 1,800+ healthcare users.',
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
        fr: 'Stagiaire Ingénieur Systèmes & Réseaux DSI',
        en: 'IT Infrastructure & Systems Engineer Intern',
      },
      duration: {
        fr: '10 semaines (Avril – Juin 2026)',
        en: '10 weeks (April – June 2026)',
      },
      context: {
        fr: 'Le Centre Hospitalier Alpes-Isère (CHAI) exploite une infrastructure critique assurant la prise en charge de milliers de patients avec plus de 1800 comptes praticiens et agents hospitaliers.',
        en: 'The Alps-Isère Hospital Center (CHAI) operates a critical healthcare IT environment supporting thousands of patients and 1,800+ hospital staff accounts.',
      },
      highlights: {
        fr: [
          'Création de scripts PowerShell d\'administration automatisée réduisant les temps de maintenance récurrents de 70%.',
          'Déploiement d\'un cluster conteneurisé Kubernetes & Docker avec tolérance aux pannes et réplication de charges.',
          'Administration avancée d\'Active Directory : sécurisation des rôles, gestion des GPO et durcissement des accès.',
          'Audit et maintenance des bases relationnelles MariaDB pour les applications médicales en production.',
        ],
        en: [
          'Authored comprehensive PowerShell automation suites reducing recurring admin tasks by 70%.',
          'Deployed high-availability Docker and Kubernetes container orchestration clusters.',
          'Advanced Active Directory administration: role-based access control, GPO enforcement, and privilege minimization.',
          'Audited and fine-tuned MariaDB relational instances supporting hospital medical software in production.',
        ],
      },
      learnings: {
        fr: 'Expérience approfondie de la gestion d\'infrastructures de santé hautement sécurisées soumises au secret médical et à des contraintes 24/7 sans interruption.',
        en: 'Deep exposure to high-security healthcare infrastructure subject to strict uptime guarantees and patient data protection regulations.',
      },
    },
  },
  {
    slug: 'algofy',
    title: {
      fr: 'Algofy — Plateforme SaaS de Trading Algorithmique',
      en: 'Algofy — Algorithmic Trading SaaS Platform',
    },
    description: {
      fr: 'SaaS Fintech complet connecté à Hyperliquid DEX : exécution d\'ordres automatisée en millisecondes, gestion du risque en temps réel, webhooks Telegram et Stripe.',
      en: 'Full-featured fintech SaaS connected to Hyperliquid DEX: sub-second automated order execution, real-time risk engine, Telegram alerts, and Stripe billing.',
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
        fr: 'Fondateur, Architecte & Développeur Solo (Full-Stack & DevOps)',
        en: 'Solo Founder, Architect & Full-Stack / DevOps Engineer',
      },
      duration: {
        fr: 'Projet majeur en production continue',
        en: 'Major production project (Active)',
      },
      context: {
        fr: 'Plateforme SaaS clé en main pour le trading quantitatif non-custodial sur Hyperliquid DEX (L1 décentralisé à haute vitesse). L\'objectif était de concevoir un produit financier fiable exécutant des algorithmes sans intervention humaine.',
        en: 'End-to-end turnkey SaaS platform for quantitative non-custodial algorithmic trading on Hyperliquid DEX. Engineered for resilient, zero-downtime execution without human intervention.',
      },
      highlights: {
        fr: [
          'Architecture conteneurisée Docker Compose (Backend Django Gunicorn, Frontend React Nginx, Base PostgreSQL) avec réseau privé interne.',
          'Daemons Linux systemd pour l\'exécution des bots 24/7 avec monitoring temps réel et redémarrage automatique en cas de panne réseau.',
          'Chiffrement symétrique Fernet (AES-256) des clés d\'API Agent en base de données pour une sécurité sans faille.',
          'Bot Telegram bidirectionnel permettant de piloter les bots à distance, modifier l\'allocation et recevoir les PnL en direct.',
          'Facturation Stripe Checkout (plans multi-tiers) et système de parrainage avec commissions dynamiques via Stripe Connect.',
          'Moteur de backtest intégrant les cycles macro Bitcoin (halvings) et détection automatique des bull traps.',
        ],
        en: [
          'Docker Compose microservice architecture (Django Gunicorn backend, React Nginx frontend, isolated PostgreSQL).',
          'Dedicated Linux systemd service daemons ensuring 24/7 bot availability with sub-second reconnection logic.',
          'Client API Agent private keys encrypted on-the-fly using Fernet AES-256 symmetric cipher prior to database persistence.',
          'Bidirectional Telegram Bot for remote control, leverage tuning, kill-switch, and real-time fill notifications.',
          'Tiered subscription billing with Stripe Checkout and affiliate revenue sharing via Stripe Connect.',
          'Quantitative backtesting engine modeling historical 4-year Bitcoin market cycles and liquidity traps.',
        ],
      },
      learnings: {
        fr: 'Maîtrise de bout en bout d\'un cycle SaaS complet : sécurité financière, devises temps réel, conformité paiement, et fiabilité Linux serveur.',
        en: 'Full-lifecycle SaaS mastery: financial security compliance, low-latency API integration, automated billing, and Linux systems engineering.',
      },
    },
  },
  {
    slug: 'lifeos',
    title: {
      fr: 'LifeOS — Second Brain & Operating System Personnel',
      en: 'LifeOS — Second Brain & Personal Operating System',
    },
    description: {
      fr: 'Tableau de bord unifié centralisant productivité, finances décentralisées, microservices de trading et suivi des routines avec synchronisation temps réel.',
      en: 'Unified personal dashboard centralizing productivity, DeFi portfolio, trading microservices, and daily habit tracking with real-time reactive sync.',
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
        fr: 'Architecte Logiciel & Développeur',
        en: 'Software Architect & Full-Stack Developer',
      },
      duration: {
        fr: 'Développement continu (2025 – Présent)',
        en: 'Ongoing development (2025 – Present)',
      },
      context: {
        fr: 'Conçu comme un véritable système d\'exploitation personnel, LifeOS unifie plus de 30 modules applicatifs quotidiens (finances, productivité, santé, connaissances) dans une interface ultra-rapide.',
        en: 'Engineered as a personal operating system, LifeOS aggregates over 30 modular tools (finances, productivity, wellness, knowledge base) in an ultra-responsive interface.',
      },
      highlights: {
        fr: [
          'Backend asynchrone FastAPI Python couplé à un frontend modulaire React 18 & TypeScript.',
          'Parseur CSV universel multi-plateformes unifiant les historiques de transactions bancaires et crypto.',
          'Files de tâches asynchrones Celery orchestrées par un broker Redis pour les calculs d\'analyse financière.',
          'Architecture modulaire orientée services déployée sous Docker avec persistance PostgreSQL.',
        ],
        en: [
          'Asynchronous FastAPI Python backend paired with a modular React 18 and TypeScript dashboard.',
          'Universal multi-exchange and bank CSV parser aggregating multi-currency transactional ledgers.',
          'Asynchronous background job worker queues powered by Celery and Redis broker for quantitative reports.',
          'Service-oriented modular architecture containerized with Docker and relational PostgreSQL persistence.',
        ],
      },
      learnings: {
        fr: 'Création d\'un système sur-mesure combinant haute performance, réactivité asynchrone et modélisation complexe de données personnelles.',
        en: 'Engineering a custom high-throughput platform combining async Python concurrency, modular UI architecture, and complex data modeling.',
      },
    },
  },
  {
    slug: 'chronia',
    title: {
      fr: 'Chronia — Application Web d\'Aide à la Personne',
      en: 'Chronia — Caregiving & Elderly Assistance Platform',
    },
    description: {
      fr: 'Solution web ergonomique facilitant le maintien à domicile des seniors et la coordination quotidienne entre familles et auxiliaires de vie.',
      en: 'Ergonomic assistive web platform designed to streamline daily routines for seniors and facilitate coordination with caregivers and family.',
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
        fr: 'Développeur Web Full-Stack (Projet BUT)',
        en: 'Full-Stack Web Developer (Academic Project)',
      },
      duration: {
        fr: 'Semestre 4 BUT Informatique (2026)',
        en: 'Semester 4 CS Degree (2026)',
      },
      context: {
        fr: 'Développé pour répondre aux enjeux du vieillissement de la population, Chronia propose un portail accessible aux seniors et un tableau de bord collaboratif pour les soignants et familles.',
        en: 'Developed to address the challenges of elderly independence, Chronia offers an accessible interface for seniors and a collaborative hub for caregivers and families.',
      },
      highlights: {
        fr: [
          'Interface pensée pour l\'accessibilité numérique (gros contrastes, navigation simplifiée, typographie lisible).',
          'Gestion de plannings partagés, rappels de prises médicamenteuses et journal de liaison soignants.',
          'Déploiement en ligne et hébergement sur VPS Linux OVH avec serveur web Apache/PHP et base MySQL.',
        ],
        en: [
          'Dedicated accessibility design system (high-contrast ratios, intuitive navigation, legible typography).',
          'Shared scheduling calendar, medication reminders, and caregiver daily communication log.',
          'Deployed live on an OVH Linux VPS with Apache/PHP stack and relational MySQL database.',
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
      fr: 'Application de bureau en Java pour la gestion et réservation de séjours touristiques avec modélisation POO et persistance JSON.',
      en: 'Desktop application developed in Java for managing and booking travel packages, featuring modular OOP design and JSON persistence.',
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
        fr: 'Concepteur & Développeur Logiciel Java',
        en: 'Java Software Designer & Developer',
      },
      duration: {
        fr: 'Semestre 3 BUT Informatique (2025)',
        en: 'Semester 3 CS Degree (2025)',
      },
      context: {
        fr: 'Projet d\'application lourde de gestion commerciale : catalogue de voyages, recherche multicritères, gestion des clients et devis de réservation.',
        en: 'Desktop software application managing a travel agency catalog, multi-criteria filtering, client accounts, and quotation generation.',
      },
      highlights: {
        fr: [
          'Architecture orientée objet rigoureuse appliquant les design patterns MVC et DAO.',
          'Interface graphique fluide sous JavaFX avec styles CSS sur mesure et formulaires dynamiques.',
          'Système de sérialisation et persistance des données sous format JSON sans dépendance externe lourde.',
        ],
        en: [
          'Rigorous Object-Oriented Architecture implementing MVC and DAO design patterns.',
          'Smooth desktop GUI built with JavaFX, custom CSS styling, and reactive validation forms.',
          'Robust serialization and persistence engine utilizing structured JSON file storage.',
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
      fr: 'Écosystème multi-plateformes comprenant un portail d\'administration Symfony et une application native Android interconnectés par API REST.',
      en: 'Multi-platform ecosystem pairing a Symfony web management portal with a native Android mobile app synchronized via secure REST APIs.',
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
        fr: 'Développeur Multi-Plateforme (Web & Mobile)',
        en: 'Cross-Platform Developer (Web & Mobile)',
      },
      duration: {
        fr: 'Semestre 4 BUT Informatique (2026)',
        en: 'Semester 4 CS Degree (2026)',
      },
      context: {
        fr: 'Modernisation complète d\'un système d\'information comprenant une refonte web responsive sous Symfony et la création d\'une application mobile native Android.',
        en: 'Complete modernization of an information system pairing a responsive Symfony web portal with a native Android client app.',
      },
      highlights: {
        fr: [
          'Back-office web sous framework Symfony avec Doctrine ORM, migrations et validation de formulaires.',
          'Création d\'endpoints API REST sécurisés pour la transmission de données JSON en temps réel.',
          'Application mobile Android native en Java avec appels réseau asynchrones et stockage local SQLite.',
        ],
        en: [
          'Full-featured Symfony back-office leveraging Doctrine ORM, automated migrations, and validation.',
          'Secure REST API endpoints delivering real-time JSON payloads to remote clients.',
          'Native Android client written in Java featuring asynchronous networking and SQLite local caching.',
        ],
      },
    },
  },
  {
    slug: 'chatenger',
    title: {
      fr: 'Chatenger — Messagerie Web Sécurisée',
      en: 'Chatenger — Secure Web Messaging',
    },
    description: {
      fr: 'Application de messagerie instantanée en PHP/MySQL avec gestion des sessions utilisateurs, hachage des identifiants et prévention des failles web.',
      en: 'Full-stack instant messaging application in PHP/MySQL featuring authenticated user sessions, salted password hashing, and injection protection.',
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
        fr: 'Projet Lycée (Terminale NSI) — Développeur Web & Sécurité',
        en: 'High School Project (Senior Year CS) — Web Developer & Security',
      },
      duration: {
        fr: 'Terminale Générale NSI (2023)',
        en: 'High School Senior Year (CS / 2023)',
      },
      context: {
        fr: 'Conçu en classe de Terminale dans le cadre de la spécialité NSI, Chatenger est une messagerie web temps réel mettant l\'accent sur la robustesse du code et la défense contre les vulnérabilités du Top 10 OWASP (injections SQL, failles XSS, CSRF).',
        en: 'Engineered during high school senior year (NSI CS specialty), Chatenger is a real-time web messenger designed with strict focus on software hardening and OWASP Top 10 vulnerability mitigation.',
      },
      highlights: {
        fr: [
          'Authentification sécurisée avec hachage bcrypt, tokens de session uniques et protection contre les attaques CSRF.',
          'Filtrage rigoureux des entrées pour neutraliser les injections SQL et failles XSS persistantes.',
          'Actualisation automatique des salons de discussion par requêtes asynchrones Fetch / AJAX.',
        ],
        en: [
          'Hardened user authentication with bcrypt salting, secure cookie flags, and CSRF token defenses.',
          'Strict input sanitization preventing SQL injection vectors and persistent XSS exploits.',
          'Asynchronous chatroom polling and message broadcasting powered by vanilla AJAX / Fetch.',
        ],
      },
    },
  },
  {
    slug: 'modele-neurone',
    title: {
      fr: 'Modèle de Neurone Artificiel & Deep Learning',
      en: 'Artificial Neuron Model & Deep Learning',
    },
    description: {
      fr: 'Modélisation mathématique d\'un neurone artificiel et réseaux de neurones profonds en Python avec TensorFlow et calcul matriciel NumPy.',
      en: 'Mathematical modeling and implementation of artificial neurons and dense networks using Python, TensorFlow, and vectorized NumPy computations.',
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
        fr: 'Développeur IA & Algorithmique',
        en: 'AI & Machine Learning Developer',
      },
      duration: {
        fr: 'Recherche & Expérimentation personnelle (2022)',
        en: 'Independent Research Project (2022)',
      },
      context: {
        fr: 'Étude pratique des fondements de l\'intelligence artificielle : du perceptron simple codé from scratch avec NumPy jusqu\'aux réseaux de neurones denses avec TensorFlow.',
        en: 'Practical exploration of foundational AI: from simple single-layer perceptron written from scratch in NumPy to dense feedforward neural nets in TensorFlow.',
      },
      highlights: {
        fr: [
          'Implémentation manuelle de la rétropropagation du gradient (backpropagation) et fonctions d\'activation (Sigmoïde, ReLU).',
          'Optimisation des calculs matriciels vectorisés via NumPy pour accélérer les temps d\'entraînement.',
          'Classification et prédiction de jeux de données avec métriques d\'évaluation de perte (Loss) et précision (Accuracy).',
        ],
        en: [
          'Implemented mathematical backpropagation from scratch including loss derivatives and activation functions (Sigmoid, ReLU).',
          'Vectorized matrix operations using NumPy for accelerated tensor transformations.',
          'Model evaluation on classification datasets tracking categorical cross-entropy loss and accuracy curves.',
        ],
      },
    },
  },
  {
    slug: 'gestionnaire-taches-csharp',
    title: {
      fr: 'Gestionnaire de Tâches C# Windows Forms',
      en: 'C# Windows Forms Task Manager',
    },
    description: {
      fr: 'Logiciel de bureau Windows en C# .NET permettant l\'organisation et le suivi de tâches avec sérialisation de données JSON.',
      en: 'Windows desktop utility created with C# and .NET Windows Forms for organized task tracking, status filtering, and structured JSON serialization.',
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
        fr: 'Développeur C# .NET',
        en: 'C# .NET Desktop Developer',
      },
      duration: {
        fr: 'Projet autonome (2022)',
        en: 'Independent Project (2022)',
      },
      context: {
        fr: 'Création d\'un utilitaire de bureau natif Windows pour structurer sa todo list quotidienne avec archivage local et interface réactive.',
        en: 'Windows native desktop utility designed to organize personal tasks with persistent local storage and responsive UI.',
      },
      highlights: {
        fr: [
          'Développement sous .NET Windows Forms avec gestion d\'événements asynchrones et raccourcis clavier.',
          'Sérialisation et désérialisation automatique des états de tâches sous format JSON.',
          'Recherche instantanée et filtres par priorités (Basse, Moyenne, Haute, Terminée).',
        ],
        en: [
          '.NET Windows Forms interface with event-driven architecture and productivity keyboard shortcuts.',
          'Automated object serialization/deserialization to disk using JSON structures.',
          'Instant keyword filtering and multi-level priority tagging (Low, Medium, High, Done).',
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
      fr: 'Simulation algorithmique en Python de l\'automate cellulaire de Conway illustrant les comportements émergents et la logique de grille torique.',
      en: 'Python algorithmic simulation of Conway\'s cellular automaton exploring emergence, neighborhood rules, and efficient 2D grid matrix updates.',
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
        fr: 'Développeur Algorithmique Python',
        en: 'Python Algorithms Developer',
      },
      duration: {
        fr: 'Projet personnel (2023)',
        en: 'Personal Project (2023)',
      },
      context: {
        fr: 'Exploration de la vie artificielle et des mathématiques discrètes à travers le célèbre automate cellulaire à deux dimensions conçu par John Horton Conway.',
        en: 'Exploration of artificial life and discrete mathematics through John Conway\'s renowned 2D cellular automaton.',
      },
      highlights: {
        fr: [
          'Modélisation matricielle de la grille torique (bords connectés) pour une simulation sans limites artificielles.',
          'Algorithme de calcul du voisinage de Moore (8 cellules adjacentes) avec optimisation des cycles d\'itération.',
          'Interface interactive permettant de dessiner des configurations initiales (Gliders, Pulsars, Spaceships).',
        ],
        en: [
          'Toroidal 2D grid simulation connecting edges to avoid artificial boundary constraints.',
          'Optimized Moore neighborhood evaluation loop (8 adjacent cells) for fast generation steps.',
          'Interactive UI allowing custom cell seeding (Gliders, Oscillators, Pulsars, Spaceships).',
        ],
      },
    },
  },
  {
    slug: 'trading-investissement',
    title: {
      fr: 'Trading & Investissement Financier',
      en: 'Trading & Financial Investment',
    },
    description: {
      fr: 'Analyse technique approfondie, stratégies de backtesting quantitatif et gestion stricte du ratio risque/bénéfice sur les marchés cryptomonnaies.',
      en: 'Quantitative technical analysis, backtested risk-adjusted strategies, and systematic capital management on decentralized crypto markets.',
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
        fr: 'Trader Quantitatif Indépendant & Investisseur',
        en: 'Independent Quantitative Trader & Investor',
      },
      duration: {
        fr: 'Depuis 2024 (Activité continue)',
        en: 'Since 2024 (Active)',
      },
      context: {
        fr: 'Pratique quotidienne de la finance quantitative et de l\'analyse de marché, reliant mathématiques appliquées, psychologie du risque et automatisation logicielle.',
        en: 'Daily quantitative financial analysis combining applied mathematics, behavioral risk management, and software automation.',
      },
      highlights: {
        fr: [
          'Élaboration de stratégies basées sur le carnet d\'ordres, la liquidité institutionnelle et les flux on-chain.',
          'Gestion rigoureuse du risque : calcul de positionnement (position sizing), R:R minimum 1:3 et limitation stricte du drawdown.',
          'Backtesting systématique sur données historiques pour valider l\'espérance mathématique des setups.',
        ],
        en: [
          'Formulation of rules-based setups around orderbook imbalances, institutional liquidity pools, and on-chain metrics.',
          'Disciplined risk management: dynamic position sizing, 1:3+ Risk/Reward ratio, and stringent drawdown caps.',
          'Systematic backtesting on multi-year historical candles to verify positive mathematical expectancy.',
        ],
      },
    },
  },
  {
    slug: 'montage-video',
    title: {
      fr: 'Montage Vidéo & Création Audiovisuelle',
      en: 'Video Editing & Audiovisual Production',
    },
    description: {
      fr: 'Plus de 7 ans d\'expérience dans le montage vidéo narratif, le compositing, le sound design et le graphisme animé sur Adobe Creative Cloud.',
      en: 'Over 7 years of hands-on experience in video pacing, motion design, color grading, and audio post-production using Adobe Premiere & After Effects.',
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
        fr: 'Monteur Vidéo & Motion Designer',
        en: 'Video Editor & Motion Designer',
      },
      duration: {
        fr: '7+ ans de pratique (2017 – Présent)',
        en: '7+ years of experience (2017 – Present)',
      },
      context: {
        fr: 'Passionné par la narration visuelle et le rythme audiovisuel, j\'ai réalisé des centaines de vidéos (contenus YouTube, courts métrages, animations de logos et commandes freelance).',
        en: 'Passionate about audiovisual pacing and visual storytelling, having edited hundreds of videos (YouTube features, short form, branded motion design, and freelance commissions).',
      },
      highlights: {
        fr: [
          'Maîtrise avancée d\'Adobe Premiere Pro (montage dynamique, synchronisation multitrack, étalonnage colorimétrique Lumetri).',
          'Compositing et animations sous After Effects (motion graphics, transitions cinématiques, titrage animé).',
          'Sound design minutieux : spatialisation, mixage audio équilibré et habillage sonore immersif.',
        ],
        en: [
          'Advanced proficiency in Adobe Premiere Pro (rapid cutting, multi-camera sync, Lumetri color grading).',
          'Motion design and VFX compositing in After Effects (keyframe animation, kinetic typography, cinematic wipes).',
          'Detailed sound design: audio spatialization, spectral cleaning, and immersive background scoring.',
        ],
      },
    },
  },
]
