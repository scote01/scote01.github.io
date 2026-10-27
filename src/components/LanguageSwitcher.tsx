import { useLanguage } from '../i18n/context'
import type { Language } from '../i18n/dictionary'

type LanguageSwitcherProps = {
  tone?: 'light' | 'dark'
  className?: string
}

const options: Array<{ value: Language; label: string }> = [
  { value: 'fr', label: 'FR' },
  { value: 'en', label: 'EN' },
]

export function LanguageSwitcher({ tone = 'light', className = '' }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage()

  const shell =
    tone === 'dark'
      ? 'border-white/15 bg-white/5'
      : 'border-line bg-cream/70'
  const inactive = tone === 'dark' ? 'text-muted-dark hover:text-paper' : 'text-muted hover:text-ink'
  const active = tone === 'dark' ? 'bg-paper text-ink' : 'bg-ink text-paper'

  return (
    <div
      role="group"
      aria-label={t.common.languageLabel}
      className={`inline-flex items-center gap-0.5 rounded-full border p-1 ${shell} ${className}`}
    >
      {options.map((option) => {
        const isActive = option.value === language
        return (
          <button
            key={option.value}
            type="button"
            lang={option.value}
            aria-pressed={isActive}
            aria-label={
              isActive
                ? `${t.common.languageLabel}: ${option.label}`
                : option.value === 'fr'
                  ? 'Français'
                  : 'English'
            }
            onClick={() => setLanguage(option.value)}
            className={`min-h-8 min-w-9 rounded-full px-2.5 text-[11px] font-bold tracking-[0.08em] transition-colors duration-200 ${
              isActive ? active : inactive
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
