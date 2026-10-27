import { Download } from 'lucide-react'
import { SITE, assetUrl } from '../config/site'
import { useLanguage } from '../i18n/context'

type CvDownloadProps = {
  variant?: 'primary' | 'outline' | 'light' | 'outlineLight' | 'text' | 'textLight'
  showNote?: boolean
  className?: string
}

const variantClasses = {
  primary: 'btn btn-primary',
  outline: 'btn btn-outline',
  light: 'btn btn-light',
  outlineLight: 'btn btn-outline-light',
  text: 'inline-flex items-center gap-2 text-sm font-bold text-ink underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:text-teal-deep hover:decoration-teal',
  textLight:
    'inline-flex items-center gap-2 text-sm font-bold text-paper underline decoration-white/30 decoration-1 underline-offset-4 transition-colors hover:text-teal-light hover:decoration-teal-light',
}

const noteClasses = {
  primary: 'text-paper/65',
  outline: 'text-muted',
  light: 'text-ink/60',
  outlineLight: 'text-paper/60',
  text: 'text-muted',
  textLight: 'text-muted-dark',
}

export function CvDownload({
  variant = 'outline',
  showNote = false,
  className = '',
}: CvDownloadProps) {
  const { language, t } = useLanguage()
  const useEnglishCv = language === 'en' && Boolean(SITE.cvEn)
  const path = useEnglishCv && SITE.cvEn ? SITE.cvEn : SITE.cvFr
  const note = useEnglishCv ? t.common.cvFormatEnglish : t.common.cvFormatFrench
  const filename = useEnglishCv ? 'Sylvestre-Cote-CV-EN.pdf' : 'Sylvestre-Cote-CV-FR.pdf'

  return (
    <span className={`inline-flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}>
      <a
        href={assetUrl(path)}
        download={filename}
        aria-label={t.common.downloadAria}
        className={variantClasses[variant]}
      >
        <Download aria-hidden="true" size={16} strokeWidth={2.1} />
        {t.common.downloadCv}
      </a>
      {showNote ? <span className={`text-xs ${noteClasses[variant]}`}>{note}</span> : null}
    </span>
  )
}
