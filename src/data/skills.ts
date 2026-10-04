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
    techs: ['React', 'Next.js', 'Tailwind CSS', 'HTML5 / CSS3'],
  },
  {
    title: { fr: 'Backend', en: 'Backend' },
    techs: ['Django REST', 'Symfony', 'Node.js', 'JavaFX'],
  },
  {
    title: { fr: 'DevOps & Infra', en: 'DevOps & Infra' },
    techs: ['Docker', 'Kubernetes', 'Linux', 'Nginx', 'PowerShell', 'Git'],
  },
  {
    title: { fr: 'Données', en: 'Data' },
    techs: ['PostgreSQL', 'MySQL', 'SQLite'],
  },
  {
    title: { fr: 'Outils', en: 'Tools' },
    techs: ['Figma', 'Premiere Pro', 'After Effects', 'Photoshop', 'Android Studio'],
  },
]

export const allTechMarquee = [
  'React', 'Next.js', 'TypeScript', 'Python', 'Django',
  'Docker', 'Kubernetes', 'PostgreSQL', 'Linux',
  'PowerShell', 'Java', 'Symfony', 'PHP', 'C#', 'C/C++',
  'Langage ST', 'Git', 'Nginx', 'Tailwind',
]
