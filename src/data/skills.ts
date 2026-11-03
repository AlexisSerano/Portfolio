export interface SkillCategory {
  title: { fr: string; en: string }
  subtitle: { fr: string; en: string }
  techs: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: { fr: 'Langages & Embarqué', en: 'Languages & Embedded' },
    subtitle: { fr: 'POO, scripts & automates industriels', en: 'OOP, scripting & industrial PLCs' },
    techs: ['Python', 'TypeScript', 'JavaScript', 'Java', 'PHP', 'C/C++', 'C#', 'Langage ST'],
  },
  {
    title: { fr: 'Frontend & Interfaces', en: 'Frontend & UI' },
    subtitle: { fr: 'Interfaces web & commissioning automate', en: 'Web interfaces & PLC commissioning' },
    techs: ['React', 'Next.js', 'Tailwind CSS', 'Alpine.js', 'HTML5 / CSS3', 'JavaFX'],
  },
  {
    title: { fr: 'Backend & APIs', en: 'Backend & APIs' },
    subtitle: { fr: 'Serveurs web, API REST & ORM', en: 'Web servers, REST APIs & ORM' },
    techs: ['Django REST', 'FastAPI', 'Symfony', 'Node.js', 'API REST'],
  },
  {
    title: { fr: 'Systèmes, Réseaux & Outils', en: 'Systems, Networks & Tools' },
    subtitle: { fr: 'Conteneurs, clusters K3s & scripts système', en: 'Containers, K3s clusters & system scripts' },
    techs: ['Docker', 'Kubernetes (K3s)', 'Linux', 'Nginx', 'PowerShell', 'Git / GitHub'],
  },
  {
    title: { fr: 'Données & Annuaire', en: 'Data & Directory' },
    subtitle: { fr: 'Bases SQL & annuaire Active Directory', en: 'SQL databases & Active Directory' },
    techs: ['PostgreSQL', 'MySQL', 'SQLite', 'Active Directory', 'Exchange'],
  },
    {
    title: { fr: 'Sécurité & Création', en: 'Security & Media' },
    subtitle: { fr: 'Norme CRA, authentification OTP & vidéo', en: 'CRA standard, OTP auth & video' },
    techs: ['Cybersécurité (CRA)', 'OTP Auth', 'AES-256 / Bcrypt', 'Méthodes Agiles', 'Premiere Pro', 'After Effects'],
  },
]

export const allTechMarquee = [
  'Python', 'Django REST', 'FastAPI', 'React', 'Next.js', 'TypeScript',
  'Tailwind CSS', 'Docker', 'Kubernetes (K3s)', 'Nginx',
  'PostgreSQL', 'MySQL', 'PowerShell', 'Active Directory', 'Linux',
  'Carel STone', 'Langage ST', 'Cybersécurité (CRA)', 'OTP Auth', 'Java', 'Symfony', 'Git',
]
