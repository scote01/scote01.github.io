export const SITE = {
  name: 'Sylvestre Côté',
  email: 'sylvestre.cote@gmail.com',
  phone: '+33618777650',
  phoneDisplay: '+33 6 18 77 76 50',
  location: 'Gex, France',
  cvFr: 'cv/Sylvestre-Cote-CV-FR.pdf',
  // Add an approved English CV here once it is available (e.g. 'cv/Sylvestre-Cote-CV-EN.pdf').
  cvEn: null as string | null,
} as const

export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
