export interface SkillCategory {
  title: { fr: string; en: string }
  techs: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: { fr: 'Langages', en: 'Languages' },
    techs: ['TypeScript', 'JavaScript', 'Python', 'Java', 'PHP', 'C#', 'C/C++', 'Langage ST'],
  },
  {
    title: { fr: 'Frontend', en: 'Frontend' },
    techs: ['React', 'Next.js', 'Tailwind CSS', 'HTML5 / CSS3', 'GSAP', 'Framer Motion'],
  },
  {
    title: { fr: 'Backend', en: 'Backend' },
    techs: ['FastAPI', 'Django REST', 'Symfony', 'Node.js', '.NET', 'JavaFX'],
  },
  {
    title: { fr: 'DevOps & Infra', en: 'DevOps & Infra' },
    techs: ['Docker', 'Kubernetes', 'Linux', 'Nginx', 'PowerShell', 'Git', 'GitHub Actions'],
  },
  {
    title: { fr: 'Données', en: 'Data' },
    techs: ['PostgreSQL', 'MySQL', 'MariaDB', 'SQLite', 'Redis'],
  },
  {
    title: { fr: 'Outils', en: 'Tools' },
    techs: ['Figma', 'Premiere Pro', 'After Effects', 'Photoshop', 'Android Studio'],
  },
]

export const allTechMarquee = [
  'React', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'Django',
  'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'Linux',
  'PowerShell', 'Java', 'Symfony', 'PHP', 'C#', 'C/C++',
  'Langage ST', 'Git', 'Nginx', 'Tailwind', 'GSAP',
]
