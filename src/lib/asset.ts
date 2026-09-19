export function assetPath(path: string): string {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('mailto:')) {
    return path
  }
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${base}${cleanPath}`
}
