export interface Experience {
  title: { fr: string; en: string }
  subtitle: { fr: string; en: string }
  companyContext?: { fr: string; en: string }
  description: { fr: string; en: string }
  highlights?: { fr: string[]; en: string[] }
  date: string
  tags: string[]
  current: boolean
  link?: string
  projectSlug?: string
  icon: 'Building2' | 'Activity' | 'GraduationCap' | 'School' | 'TrendingUp' | 'Film'
}

export const experiences: Experience[] = [
  {
    title: {
      fr: 'Développeur Logiciel R&D (Alternance) — Carrier',
      en: 'R&D Software Developer (Apprenticeship) — Carrier',
    },
    subtitle: {
      fr: 'Service Recherche & Développement · Culoz (01350), France',
      en: 'Research & Development Department · Culoz (01350), France',
    },
    companyContext: {
      fr: 'Leader mondial de la climatisation (47 000 employés, 21,75 Mrd$ CA, ~150 pays, 4M d’unités vendues/an)',
      en: 'Global HVAC leader (47,000 employees, $21.75B revenue, ~150 countries, 4M units sold/yr)',
    },
    description: {
      fr: 'Développement logiciel, sécurité applicative (conformité Cyber Resilience Act) et migration de la régulation industrielle au sein du pôle R&D.',
      en: 'Software engineering, application security (Cyber Resilience Act compliance), and industrial control migration within the R&D division.',
    },
    highlights: {
      fr: [
        'Refonte de l’application web de commissioning (Alpine.js, Tailwind CSS) consommant l’API REST de l’automate pour sécuriser 3 familles (Micro PC3, AeroConnect, etc.) — conformité CRA (échéance déc. 2027).',
        'Conception d’une architecture d’authentification OTP remplaçant le mot de passe à 4 chiffres identique sur un parc de 4M de régulateurs vendus/an, sécurisant l’accès console et les routes API.',
        'Migration de la régulation du legacy C-Suite vers Carel STone (Langage ST) ; initiation et formation de 5 développeurs à Git/GitHub (branches, issues, pull requests).',
      ],
      en: [
        'Redesigned the web commissioning application (Alpine.js, Tailwind CSS) consuming the PLC REST API to secure 3 controller families (Micro PC3, AeroConnect, etc.) for Cyber Resilience Act (CRA) compliance.',
        'Designed an OTP authentication architecture replacing the static 4-digit PIN across 4M controllers sold/year, securing console access and API routes.',
        'Migrated HVAC control logic from legacy C-Suite to Carel STone (Structured Text); onboarded and trained 5 R&D developers on Git/GitHub workflows.',
      ],
    },
    date: 'AOÛT 2026 → JUIL. 2027',
    tags: ['Alpine.js', 'Tailwind CSS', 'API REST', 'Cybersécurité (CRA)', 'OTP Auth', 'Carel STone', 'Langage ST', 'Git/GitHub'],
    current: true,
    projectSlug: 'alternance-carrier',
    icon: 'Building2',
  },
  {
    title: {
      fr: 'Stage Déploiement & Automatisation — CH Alpes-Isère (CHAI)',
      en: 'Deployment & Automation Intern — Alps-Isère Hospital (CHAI)',
    },
    subtitle: {
      fr: 'Direction des Systèmes d’Information (DSI) · St-Égrève (38120), France',
      en: 'IT & Infrastructure Department · St-Égrève (38120), France',
    },
    companyContext: {
      fr: 'Établissement public de santé (1 800 professionnels, 50 structures extra-hospitalières, ~300 lits)',
      en: 'Public healthcare institution (1,800 staff members, 50 outpatient facilities, ~300 beds)',
    },
    description: {
      fr: 'Automatisation Active Directory/Exchange, déploiement d’un cluster Kubernetes (K3s) et refonte de l’Intranet.',
      en: 'Active Directory/Exchange automation, Kubernetes (K3s) cluster deployment, and Intranet redesign.',
    },
    highlights: {
      fr: [
        'Script d’automatisation PowerShell de normalisation Active Directory sur l’annuaire de 1 800 professionnels.',
        'Optimisation de la messagerie Exchange et des requêtes annuaire via structures de données indexées, supprimant les ralentissements liés à l’automontage Outlook.',
        'Refonte de l’accueil de l’Intranet (WordPress, Astra, ACF, CPT UI) regroupant 23 applications métiers + guide d’administration pour l’équipe RH.',
        'Mise en place d’une infrastructure conteneurisée (Docker Compose, Nginx Load Balancer et cluster Kubernetes/K3s sur 2 nœuds virtuels).',
      ],
      en: [
        'PowerShell Active Directory normalization script across 1,800 healthcare professionals.',
        'Exchange mailbox management optimization using indexed data structures, removing workstation slowdowns caused by Outlook automapping.',
        'Hospital Intranet portal redesign (WordPress, Astra, ACF, CPT UI) grouping 23 business applications, with admin guide for the HR team.',
        'Containerized stack deployment (Docker Compose, Nginx Load Balancer, and Kubernetes/K3s orchestration across 2 virtual nodes).',
      ],
    },
    date: 'MAI 2026 → JUIN 2026',
    tags: ['Kubernetes (K3s)', 'Docker Compose', 'Nginx LB', 'PowerShell', 'Active Directory', 'Exchange'],
    current: false,
    projectSlug: 'stage-chai',
    icon: 'Activity',
  },
  {
    title: {
      fr: 'B.U.T. Informatique (Grade de Bachelor - 180 ECTS)',
      en: 'Bachelor of Technology in Computer Science (180 ECTS)',
    },
    subtitle: {
      fr: 'I.U.T.2 Université Grenoble Alpes · Parcours Réalisation d’Applications',
      en: 'IUT2 Grenoble Alpes University · Software Engineering Track',
    },
    description: {
      fr: 'Architecture logicielle, développement Full-Stack (Python, Java, PHP/Symfony, JS), administration systèmes & réseaux Linux, bases de données et méthodes Agiles.',
      en: 'Software architecture, Full-Stack development (Python, Java, PHP/Symfony, JS), Linux system & network administration, databases, and Agile methodologies.',
    },
    date: '2024 → 2027',
    tags: ['Grade Bachelor', '180 ECTS', 'Java', 'Python', 'Symfony', 'Linux', 'SQL', 'Agile'],
    current: true,
    icon: 'GraduationCap',
  },
  {
    title: {
      fr: 'Baccalauréat Général — Mathématiques & NSI',
      en: 'French General Baccalaureate — Mathematics & Computer Science',
    },
    subtitle: {
      fr: 'Spécialités Mathématiques & Numérique et Sciences Informatiques · Mention Assez Bien',
      en: 'Mathematics & Computer Science Specialties · With Honors',
    },
    description: {
      fr: 'Algorithmique, structures de données en Python, programmation orientée objet, bases de données SQL et architectures réseaux.',
      en: 'Algorithms, Python data structures, object-oriented programming, SQL databases, and network architectures.',
    },
    date: '2021 → 2024',
    tags: ['Mathématiques', 'NSI', 'Python', 'Algorithmique'],
    current: false,
    icon: 'School',
  },
  {
    title: {
      fr: 'Montage Vidéo & Motion Design',
      en: 'Video Editing & Motion Design',
    },
    subtitle: {
      fr: 'Pratique autodidacte & projets créatifs — 7+ ans d’expérience',
      en: 'Self-taught & creative projects — 7+ years of experience',
    },
    description: {
      fr: 'Réalisation, motion design et habillage sonore sous Premiere Pro et After Effects. Sens du détail visuel, du rythme et de la fluidité d’animation.',
      en: 'Video production, motion graphics, and sound design with Premiere Pro and After Effects. Strong eye for visual pacing and fluid motion.',
    },
    date: '2017 → PRÉSENT',
    tags: ['Premiere Pro', 'After Effects', 'Photoshop', 'Motion Design'],
    current: true,
    projectSlug: 'montage-video',
    icon: 'Film',
  },
]

