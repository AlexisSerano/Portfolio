export interface Experience {
  title: { fr: string; en: string }
  subtitle: { fr: string; en: string }
  description: { fr: string; en: string }
  date: string
  tags: string[]
  current: boolean
  link?: string
  projectSlug?: string
  icon: 'Building2' | 'Activity' | 'GraduationCap' | 'School' | 'TrendingUp' | 'Film'
}

export const experiences: Experience[] = [
  {
    title: { fr: 'Alternance — Carrier Culoz SA', en: 'Apprenticeship — Carrier Culoz SA' },
    subtitle: { fr: 'Développeur Embarqué — 3ème année BUT', en: 'Embedded Developer — 3rd Year CS Degree' },
    description: {
      fr: 'Programmation sur automates de traitement d\'air et régulation CVC. Migration du code Carrel vers STone en langage ST.',
      en: 'PLC programming for air handling units and HVAC controls. Porting codebase from Carrel to STone in Structured Text.'
    },
    date: 'SEPT. 2026 → JUIL. 2027',
    tags: ['Langage ST', 'Automates', 'HVAC'],
    current: true,
    projectSlug: 'alternance-carrier',
    icon: 'Building2',
  },
  {
    title: { fr: 'Stage DSI — Centre Hospitalier Alpes-Isère', en: 'IT Internship — Alps-Isère Hospital Center' },
    subtitle: { fr: 'Administration Système & Scripting', en: 'System Administration & Scripting' },
    description: {
      fr: 'Scripts PowerShell pour automatiser l\'administration, déploiement d\'un cluster Kubernetes et support sur l\'infrastructure de 1 800 utilisateurs.',
      en: 'PowerShell automation scripts, Kubernetes cluster deployment, and infrastructure support for 1,800 hospital users.'
    },
    date: '2026',
    tags: ['PowerShell', 'Kubernetes', 'Active Directory'],
    current: false,
    projectSlug: 'stage-chai',
    icon: 'Activity',
  },
  {
    title: { fr: 'BUT Informatique — IUT2 de Grenoble', en: 'Computer Science Degree — IUT2 Grenoble' },
    subtitle: { fr: 'Parcours développement logiciel', en: 'Software Development Track' },
    description: {
      fr: 'Développement logiciel (Java, C, Web), architecture réseaux, bases de données et projets en équipe.',
      en: 'Software engineering (Java, C, Web), networking, databases, and team projects.'
    },
    date: '2024 → 2027',
    tags: ['Java', 'Web', 'SQL', 'Réseaux'],
    current: true,
    icon: 'GraduationCap',
  },
  {
    title: {
      fr: 'Baccalauréat Général — Mathématiques & NSI',
      en: 'General Baccalaureate — Mathematics & Computer Science',
    },
    subtitle: {
      fr: 'Spécialités Mathématiques & NSI · Mention Assez Bien',
      en: 'Mathematics & CS Specialties · Honors (Assez Bien)',
    },
    description: {
      fr: 'Algorithmique, Python, logique booléenne et bases des systèmes informatiques.',
      en: 'Algorithms, Python programming, boolean logic, and computer fundamentals.'
    },
    date: '2021 → 2024',
    tags: ['Mathématiques', 'NSI', 'Python', 'Algorithmique'],
    current: false,
    icon: 'School',
  },
  {
    title: { fr: 'Trading & Investissement', en: 'Trading & Investment' },
    subtitle: { fr: 'Investissement & automatisation — Crypto', en: 'Investment & Automation — Crypto' },
    description: {
      fr: 'Conception de bots de trading automatisés, analyse technique et gestion du risque.',
      en: 'Automated trading bot development, technical analysis, and risk management.'
    },
    date: '2024 → Present',
    tags: ['Analyse Technique', 'Gestion de Risque', 'Crypto'],
    current: true,
    icon: 'TrendingUp',
  },
  {
    title: { fr: 'Montage Vidéo & Création Numérique', en: 'Video Editing & Digital Creation' },
    subtitle: { fr: 'Pratique autodidacte — 7 ans d\'expérience', en: 'Self-taught — 7 years of practice' },
    description: {
      fr: "Création de vidéos et motion design sur Premiere Pro et After Effects. C'est ce qui m'a d'abord donné le goût de l'informatique.",
      en: 'Video editing and motion design with Premiere Pro and After Effects. What first sparked my interest in tech.'
    },
    date: '2017 → Present',
    tags: ['Premiere Pro', 'After Effects', 'Photoshop'],
    current: true,
    icon: 'Film',
  },
]

