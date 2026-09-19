import React from 'react'

interface TechIconProps {
  name: string
  className?: string
  size?: number
}

export default function TechIcon({ name, className = 'w-4 h-4', size = 18 }: TechIconProps) {
  const norm = name.trim().toLowerCase()

  // TypeScript
  if (norm.includes('typescript') || norm === 'ts') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M11.5 13.5H9.25V7H7.75V5.5H13V7H11.5V13.5ZM13.8 13.5V12.1C14.3 12.6 15 12.9 15.8 12.9C16.8 12.9 17.4 12.4 17.4 11.6C17.4 10.2 14 10.4 14 8C14 6.7 15.1 5.7 16.8 5.7C17.6 5.7 18.3 6 18.8 6.4L18.2 7.7C17.7 7.4 17.2 7.2 16.7 7.2C15.9 7.2 15.4 7.6 15.4 8.2C15.4 9.5 18.8 9.2 18.8 11.7C18.8 13.2 17.5 14.1 15.8 14.1C14.8 14.1 14.1 13.8 13.8 13.5Z" fill="white" />
      </svg>
    )
  }

  // JavaScript
  if (norm.includes('javascript') || norm === 'js') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path d="M7 16.5V7H9.2V14.5C9.2 15.4 9.7 15.8 10.5 15.8C10.9 15.8 11.3 15.7 11.6 15.5L12 17C11.4 17.3 10.6 17.5 9.8 17.5C8 17.5 7 16.5 7 14.5ZM13.5 17.2L14.7 15.8C15.4 16.4 16.2 16.7 17.2 16.7C18.1 16.7 18.7 16.3 18.7 15.6C18.7 14.4 15.5 14.6 15.5 12.1C15.5 10.7 16.6 9.6 18.4 9.6C19.3 9.6 20.1 9.9 20.7 10.4L19.7 11.8C19.1 11.4 18.5 11.2 17.9 11.2C17.1 11.2 16.6 11.6 16.6 12.2C16.6 13.3 19.8 13.1 19.8 15.7C19.8 17.2 18.6 18.2 16.8 18.2C15.6 18.2 14.4 17.8 13.5 17.2Z" fill="#1A1A1A" />
      </svg>
    )
  }

  // Python
  if (norm.includes('python')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M11.9 2C8.7 2 8.8 3.4 8.8 3.4L8.8 4.9H12V5.4H5.3S2 5 2 9.2c0 4.1 2.9 4 2.9 4H6.2V11.5S6 8.5 9 8.5h4.8s2.8.1 2.8-2.7c0-2.8-2.6-3.8-4.7-3.8z" fill="#3776AB" />
        <circle cx="7" cy="4" r="0.7" fill="white" />
        <path d="M12.1 22c3.2 0 3.1-1.4 3.1-1.4l0-1.5H12v-.5h6.7s3.3.4 3.3-3.8c0-4.1-2.9-4-2.9-4h-1.3v1.7s.2 3-2.8 3H10.2s-2.8-.1-2.8 2.7c0 2.8 2.6 3.8 4.7 3.8z" fill="#FFD43B" />
        <circle cx="17" cy="20" r="0.7" fill="#1A1A1A" />
      </svg>
    )
  }

  // React
  if (norm.includes('react')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
      </svg>
    )
  }

  // Next.js
  if (norm.includes('next')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="11" fill="black" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <path d="M16.5 17.5L8.5 7.5H6.5V16.5H8V10L15 18.5H16.5V17.5Z" fill="white" />
        <path d="M15 7.5H16.5V13.5H15V7.5Z" fill="white" />
      </svg>
    )
  }

  // Docker
  if (norm.includes('docker')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M22.5 10.5C22 9.5 20.8 9.5 20.8 9.5c-.3-1.6-1.6-2.5-1.6-2.5-.2 1.3-.8 2-1 2.3-1.2-.8-2.9-.8-3.4-.7C14 4.5 10 4 10 4s-.8 2.2 0 4.5c-1.3.1-2.4.8-2.8 1.1-.3-.2-.8-.4-1.3-.4-1.4 0-2.3 1-2.4 1.1C1.8 11.2.6 13 1 15.5c.8 4 4.5 6 10 6 6.8 0 10.5-3.5 11.5-8.5.5-1.2.3-2.1 0-2.5zM7.5 8.5h2v2h-2v-2zm-3 3h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm-3-3h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2z" fill="#2496ED" />
      </svg>
    )
  }

  // Kubernetes
  if (norm.includes('kubernetes') || norm === 'k8s') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2L3 7.2V17.6L12 22.8L21 17.6V7.2L12 2Z" stroke="#326CE5" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        <circle cx="12" cy="12.4" r="3.5" stroke="#326CE5" strokeWidth="1.5" fill="none" />
        <path d="M12 9V5.5M9 14L6 16.5M15 14L18 16.5M7 10.5L4 8.5M17 10.5L20 8.5M12 16V19.5" stroke="#326CE5" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }

  // Tailwind CSS
  if (norm.includes('tailwind')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M6 9.5C7.5 7 9.5 6.5 12 8C13.5 8.9 14.5 9.5 16 9.5C18 9.5 19.5 8.5 20.5 6.5C19 9 17 9.5 14.5 8C13 7.1 12 6.5 10.5 6.5C8.5 6.5 7 7.5 6 9.5ZM1.5 16.5C3 14 5 13.5 7.5 15C9 15.9 10 16.5 11.5 16.5C13.5 16.5 15 15.5 16 13.5C14.5 16 12.5 16.5 10 15C8.5 14.1 7.5 13.5 6 13.5C4 13.5 2.5 14.5 1.5 16.5Z" fill="#38BDF8" />
      </svg>
    )
  }

  // PostgreSQL
  if (norm.includes('postgres')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.5 9.9v-7h-2.5v-2.9h2.5V9.8c0-2.5 1.5-3.8 3.7-3.8 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6v1.8h2.7l-.4 2.9h-2.3v7C18.3 21.1 22 17 22 12c0-5.5-4.5-10-10-10z" fill="#4169E1" opacity="0.1" />
        <path d="M17.5 8.5c-.8-1.2-2.2-2-3.8-2.2-2.2-.2-4.2.9-5.2 2.7-1.3 2.3-.9 5.3.8 7.2 1.3 1.4 3.2 2.1 5.1 1.9 1.8-.2 3.3-1.3 4.2-2.8.4-.7.6-1.5.7-2.3.1-1.6-.5-3.3-1.8-4.5zM12 16.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z" fill="#336791" />
      </svg>
    )
  }

  // Linux
  if (norm.includes('linux')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2C9.5 2 8 3.8 8 6.5c0 1.2.3 2.5.8 3.5C7.2 11.2 6 13.5 6 16c0 3.5 2.5 5 6 5s6-1.5 6-5c0-2.5-1.2-4.8-2.8-6 .5-1 .8-2.3.8-3.5C16 3.8 14.5 2 12 2z" fill="#FCC624" />
        <circle cx="10" cy="6" r="1" fill="#1A1A1A" />
        <circle cx="14" cy="6" r="1" fill="#1A1A1A" />
        <path d="M10 8.5c.6.5 1.4.8 2 .8s1.4-.3 2-.8" stroke="#E95420" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M7 16c-1.5.5-2.5 1.5-2.5 2.5 0 1.5 2 2.5 4.5 2.5M17 16c1.5.5 2.5 1.5 2.5 2.5 0 1.5-2 2.5-4.5 2.5" stroke="#1A1A1A" strokeWidth="1.5" />
      </svg>
    )
  }

  // PowerShell
  if (norm.includes('powershell')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="4" fill="#012456" />
        <path d="M6.5 7.5L11.5 12L6.5 16.5M12 16.5H17.5" stroke="#2D89EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  // Git
  if (norm.includes('git') && !norm.includes('github actions')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M21.5 10.7l-8.2-8.2c-.7-.7-1.8-.7-2.5 0L8.5 4.8l3.2 3.2c.7-.2 1.6 0 2.2.6.6.6.8 1.5.6 2.2l3.1 3.1c.7-.2 1.6 0 2.2.6.9.9.9 2.3 0 3.2-.9.9-2.3.9-3.2 0-.7-.7-.8-1.7-.5-2.5L13 12.1v4.8c.2.2.3.5.3.8 0 1.2-1 2.3-2.3 2.3-1.2 0-2.3-1-2.3-2.3 0-1.1.8-2 1.9-2.2V10.7c-1.1-.2-1.9-1.1-1.9-2.2 0-.3.1-.6.2-.9L5.8 4.5 2.5 7.8c-.7.7-.7 1.8 0 2.5l8.2 8.2c.7.7 1.8.7 2.5 0l8.2-8.2c.7-.6.7-1.7.1-2.4z" fill="#F05032" />
      </svg>
    )
  }

  // Java
  if (norm.includes('java') && !norm.includes('javascript') && !norm.includes('javafx')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M8.5 16.5c0 0 2.5 1.5 6 0s2-2 2-2-1.5.8-3.5.8-4.5-.8-4.5-.8z" fill="#EA2D2E" />
        <path d="M7 19c0 0 3.5 2 8 0s2.5-2.5 2.5-2.5-2 1-4.5 1-6-1-6-1z" fill="#5382A1" />
        <path d="M12 4c-2 2-1 4-1 4s2-2 3-1c1 1 0 3-2 4 0 0 2.5-1 2.5-3 0-2.5-2.5-4-2.5-4z" fill="#EA2D2E" />
        <path d="M10 2c-1 1.5-.5 3-.5 3s1.5-1.5 2.5-.5c1 1-.5 2.5-1.5 3 0 0 2-.5 2-2.5C12.5 3 10 2 10 2z" fill="#5382A1" />
      </svg>
    )
  }

  // JavaFX
  if (norm.includes('javafx')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="4" fill="#E76F00" opacity="0.2" />
        <path d="M6 16.5l4-9h2.5l-4 9H6zm7-9h5.5v2.2H15v1.4h3v2.2h-3V16.5H13v-9z" fill="#E76F00" />
      </svg>
    )
  }

  // C#
  if (norm.includes('c#') || norm.includes('csharp')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="4" fill="#239120" opacity="0.15" />
        <path d="M10.5 7.5c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5c1.8 0 3.3-1 4-2.5h-2.3c-.5.8-1 1.1-1.7 1.1-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5c.7 0 1.2.3 1.7 1.1h2.3c-.7-1.5-2.2-2.5-4-2.5zm5.5 3v1h1v1h-1v1h-1v-1h-1v-1h1v-1h1zm3 0v1h1v1h-1v1h-1v-1h-1v-1h1v-1h1z" fill="#239120" />
      </svg>
    )
  }

  // C/C++
  if (norm.includes('c/c++') || norm.includes('c++') || norm === 'c') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="4" fill="#00599C" opacity="0.15" />
        <path d="M10 8c-2.2 0-4 1.8-4 4s1.8 4 4 4c1.5 0 2.8-.8 3.5-2h-1.8c-.4.7-1 1-1.7 1-1.1 0-2-.9-2-2s.9-2 2-2c.7 0 1.3.3 1.7 1h1.8c-.7-1.2-2-2-3.5-2zm4.5 3.5v1h1v-1h1v-1h-1v-1h-1v1h-1v1h1zm3.5 0v1h1v-1h1v-1h-1v-1h-1v1h-1v1h1z" fill="#00599C" />
      </svg>
    )
  }

  // Langage ST (Structured Text / Automates)
  if (norm.includes('langage st') || norm.includes('automates') || norm.includes('stone') || norm.includes('carrel')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="4" fill="#D4A843" opacity="0.2" />
        <path d="M6 7h12v2.5h-4.5V17H11V9.5H6V7z" fill="#D4A843" />
        <circle cx="18" cy="16" r="2" fill="#F5D785" />
      </svg>
    )
  }

  // PHP
  if (norm.includes('php')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="4" fill="#777BB4" opacity="0.2" />
        <ellipse cx="12" cy="12" rx="9" ry="6" stroke="#777BB4" strokeWidth="1.5" />
        <text x="7.5" y="14" fill="#777BB4" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">PHP</text>
      </svg>
    )
  }

  // Symfony
  if (norm.includes('symfony')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" fill="black" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <path d="M15.5 8.5C14.5 7.5 13.5 7 12 7c-2.5 0-4 1.5-4 3.5 0 3 5 2.5 5 4.5 0 .8-.8 1.5-1.8 1.5-1.5 0-2.7-.8-3.2-2l-1.5 1C7.2 17 9 18 11.2 18c2.8 0 4.3-1.6 4.3-3.7 0-3.2-5-2.7-5-4.6 0-.7.6-1.2 1.5-1.2 1.2 0 2.2.6 2.7 1.5l1.3-1.5z" fill="white" />
      </svg>
    )
  }

  // FastAPI
  if (norm.includes('fastapi')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" fill="#009688" opacity="0.2" stroke="#009688" strokeWidth="1" />
        <path d="M13 3L6 14h5l-1 7 7-11h-5l1-7z" fill="#009688" />
      </svg>
    )
  }

  // Django
  if (norm.includes('django')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="4" fill="#092E20" />
        <path d="M11 6v7.5c-.5.3-1.1.5-1.8.5-1.5 0-2.4-.9-2.4-2.5 0-1.6.9-2.5 2.4-2.5.4 0 .7.1 1 .2V7.4c-.3-.1-.7-.2-1.2-.2-2.5 0-4.1 1.7-4.1 4.3 0 2.5 1.5 4.3 4 4.3 1.1 0 2-.4 2.6-.9v.7h1.6V6H11zm5.2 2.8c-.6 0-1.1.5-1.1 1.1 0 .6.5 1.1 1.1 1.1.6 0 1.1-.5 1.1-1.1 0-.6-.5-1.1-1.1-1.1zm-.8 3.1h1.6V18h-1.6v-6.1z" fill="#44B78B" />
      </svg>
    )
  }

  // Redis
  if (norm.includes('redis')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M3 8l9-4 9 4-9 4-9-4z" fill="#DC382D" />
        <path d="M3 12l9 4 9-4M3 16l9 4 9-4" stroke="#A82319" strokeWidth="1.5" />
      </svg>
    )
  }

  // Nginx
  if (norm.includes('nginx')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="4" fill="#009639" opacity="0.2" />
        <path d="M7 6v12l10-12v12" stroke="#009639" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  // Node.js
  if (norm.includes('node')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" fill="#339933" opacity="0.2" />
        <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" stroke="#339933" strokeWidth="1.5" fill="none" />
        <text x="8.5" y="14" fill="#339933" fontSize="6.5" fontWeight="bold">JS</text>
      </svg>
    )
  }

  // .NET
  if (norm.includes('.net')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="4" fill="#512BD4" opacity="0.2" />
        <circle cx="8" cy="14" r="1.5" fill="#512BD4" />
        <text x="10.5" y="15" fill="#512BD4" fontSize="8" fontWeight="bold" fontFamily="sans-serif">NET</text>
      </svg>
    )
  }

  // MariaDB / MySQL
  if (norm.includes('mariadb') || norm.includes('mysql') || norm.includes('sqlite') || norm.includes('sql')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#00758F" strokeWidth="1.5" fill="none" />
        <path d="M4 6v6c0 1.6 3.6 3 8 3s8-1.4 8-3V6M4 12v6c0 1.6 3.6 3 8 3s8-1.4 8-3v-6" stroke="#00758F" strokeWidth="1.5" />
      </svg>
    )
  }

  // GSAP / Framer Motion
  if (norm.includes('gsap') || norm.includes('motion') || norm.includes('framer')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M4 4h16v8h-8v8H4V4z" fill="#0AE448" opacity="0.2" />
        <path d="M4 4h16v8h-8v8H4V4z" stroke="#0AE448" strokeWidth="1.5" fill="none" />
        <path d="M12 12l8 8" stroke="#0AE448" strokeWidth="1.5" />
      </svg>
    )
  }

  // Figma
  if (norm.includes('figma')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="5" y="2" width="7" height="7" rx="3.5" fill="#F24E1E" />
        <rect x="12" y="2" width="7" height="7" rx="3.5" fill="#FF7262" />
        <rect x="5" y="9" width="7" height="7" rx="3.5" fill="#A259FF" />
        <circle cx="15.5" cy="12.5" r="3.5" fill="#1ABCFE" />
        <rect x="5" y="16" width="7" height="7" rx="3.5" fill="#0ACF83" />
      </svg>
    )
  }

  // Adobe Creative (Premiere, After Effects, Photoshop)
  if (norm.includes('premiere') || norm.includes('after effects') || norm.includes('photoshop')) {
    const isPr = norm.includes('premiere')
    const isAe = norm.includes('after')
    const color = isPr ? '#EA77FF' : isAe ? '#9999FF' : '#31A8FF'
    const label = isPr ? 'Pr' : isAe ? 'Ae' : 'Ps'
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="4" fill="#00000B" stroke={color} strokeWidth="1" />
        <text x="6" y="16" fill={color} fontSize="10" fontWeight="bold" fontFamily="sans-serif">{label}</text>
      </svg>
    )
  }

  // Android Studio
  if (norm.includes('android')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M6 10h12v8c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1v-8z" fill="#3DDC84" />
        <path d="M7 9a5 5 0 0110 0H7z" fill="#3DDC84" />
        <circle cx="9.5" cy="7.5" r=".7" fill="black" />
        <circle cx="14.5" cy="7.5" r=".7" fill="black" />
        <path d="M8 5l-1.5-2M16 5l1.5-2" stroke="#3DDC84" strokeWidth="1" strokeLinecap="round" />
      </svg>
    )
  }

  // Default fallback: sleek clean circuit/code icon in warm gold
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#D4A843" strokeWidth="1.5" className={className}>
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
