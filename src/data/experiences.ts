export interface Experience {
  title: { fr: string; en: string }
  subtitle: { fr: string; en: string }
  description: { fr: string; en: string }
  date: string
  tags: string[]
  current: boolean
  link?: string
  icon: string
}

export const experiences: Experience[] = [
  {
    title: { fr: 'Alternance — Carrier Culoz SA', en: 'Apprenticeship — Carrier Culoz SA' },
    subtitle: { fr: 'Développeur Embarqué — 3ème année BUT Informatique', en: 'Embedded Developer — 3rd Year CS Degree' },
    description: {
      fr: 'Programmation embarquée sur automates de traitement de l\'air. Migration logicielle Carrel → STone (Langage ST).',
      en: 'Embedded programming on air handling unit PLCs. Software migration from Carrel to STone (Structured Text).'
    },
    date: 'SEPT. 2026 → JUIL. 2027',
    tags: ['Langage ST', 'Automates', 'HVAC'],
    current: true,
    link: '/projects/alternance-carrier',
    icon: '🏭',
  },
  {
    title: { fr: 'Stage DSI — Centre Hospitalier Alpes-Isère', en: 'IT Internship — Alps-Isère Hospital Center' },
    subtitle: { fr: 'Administration Système & DevOps', en: 'System Administration & DevOps' },
    description: {
      fr: 'Automatisation PowerShell, déploiement cluster Kubernetes, gestion de 1800+ utilisateurs en haute disponibilité 24/7.',
      en: 'PowerShell automation, Kubernetes cluster deployment, managing 1800+ users in 24/7 high availability.'
    },
    date: '2026',
    tags: ['PowerShell', 'Kubernetes', 'Active Directory'],
    current: false,
    link: '/projects/stage-chai',
    icon: '🏥',
  },
  {
    title: { fr: 'BUT Informatique — IUT2 de Grenoble', en: 'Computer Science Degree — IUT2 Grenoble' },
    subtitle: { fr: 'Bachelor Universitaire de Technologie — Parcours développement logiciel', en: 'University Bachelor of Technology — Software Development Track' },
    description: {
      fr: 'Formation complète en développement logiciel, architecture réseau, bases de données, projet d\'envergure.',
      en: 'Comprehensive training in software development, network architecture, databases, large-scale projects.'
    },
    date: '2024 → 2027',
    tags: ['Java', 'Web', 'SQL', 'Réseaux'],
    current: true,
    icon: '🎓',
  },
  {
    title: {
      fr: 'Baccalauréat Général — Mathématiques & NSI',
      en: 'General Baccalaureate — Mathematics & Computer Science',
    },
    subtitle: {
      fr: 'Spécialités Mathématiques & NSI (Numérique et Sciences Informatiques) · Mention Assez Bien',
      en: 'Mathematics & CS Specialties · Honors (Assez Bien)',
    },
    description: {
      fr: 'Fondations solides en mathématiques appliquées, algorithmique, logique booléenne, programmation Python et architecture des ordinateurs.',
      en: 'Rigorous foundation in applied mathematics, algorithmic problem solving, boolean logic, Python, and computer systems architecture.',
    },
    date: '2021 → 2024',
    tags: ['Mathématiques', 'NSI', 'Python', 'Algorithmique'],
    current: false,
    icon: '🏫',
  },
  {
    title: { fr: 'Trading & Investissement', en: 'Trading & Investment' },
    subtitle: { fr: 'Investisseur indépendant — Marchés crypto & financiers', en: 'Independent Investor — Crypto & Financial Markets' },
    description: {
      fr: 'Développement de stratégies d\'investissement, analyse technique, création de bots de trading.',
      en: 'Development of investment strategies, technical analysis, creation of trading bots.'
    },
    date: '2024 → Present',
    tags: ['Analyse Technique', 'Gestion de Risque', 'Crypto'],
    current: true,
    icon: '📊',
  },
  {
    title: { fr: 'Montage Vidéo & Création Numérique', en: 'Video Editing & Digital Creation' },
    subtitle: { fr: 'Freelance / Passionné', en: 'Freelance / Enthusiast' },
    description: {
      fr: 'Premières expériences dans le numérique à travers le montage vidéo, qui ont éveillé ma passion pour l\'informatique.',
      en: 'First digital experiences through video editing, which sparked my passion for computer science.'
    },
    date: '2017 → Present',
    tags: ['Premiere Pro', 'After Effects', 'Photoshop'],
    current: true,
    icon: '🎬',
  },
]
