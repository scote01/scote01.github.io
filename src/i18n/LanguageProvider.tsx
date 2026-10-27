import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { dictionaries, type Language } from './dictionary'
import { LanguageContext } from './context'

const STORAGE_KEY = 'sylvestre-cote-language'

function isLanguage(value: unknown): value is Language {
  return value === 'fr' || value === 'en'
}

function readInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'fr'

  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (isLanguage(fromUrl)) return fromUrl

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isLanguage(stored)) return stored
  } catch {
    // Storage can be unavailable (private mode, strict browser settings).
  }

  return 'fr'
}

function upsertMeta(selector: string, attributes: Record<string, string>): void {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value)
  }
}

function upsertLink(selector: string, attributes: Record<string, string>): void {
  let element = document.head.querySelector<HTMLLinkElement>(selector)
  if (!element) {
    element = document.createElement('link')
    document.head.appendChild(element)
  }
  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value)
  }
}

function buildLanguageUrl(language: Language): string {
  const url = new URL(window.location.href)
  if (language === 'fr') {
    url.searchParams.delete('lang')
  } else {
    url.searchParams.set('lang', language)
  }
  return url.toString()
}

function applyDocumentMetadata(language: Language): void {
  const t = dictionaries[language]
  const currentUrl = new URL(window.location.href)
  currentUrl.searchParams.delete('lang')
  if (language === 'en') currentUrl.searchParams.set('lang', 'en')
  currentUrl.hash = ''

  document.documentElement.lang = t.meta.htmlLang
  document.title = t.meta.title

  upsertMeta('meta[name="description"]', {
    name: 'description',
    content: t.meta.description,
  })
  upsertMeta('meta[property="og:title"]', {
    property: 'og:title',
    content: t.meta.title,
  })
  upsertMeta('meta[property="og:description"]', {
    property: 'og:description',
    content: t.meta.description,
  })
  upsertMeta('meta[property="og:locale"]', {
    property: 'og:locale',
    content: t.meta.ogLocale,
  })
  upsertMeta('meta[property="og:locale:alternate"]', {
    property: 'og:locale:alternate',
    content: t.meta.ogLocaleAlternate,
  })
  upsertMeta('meta[property="og:url"]', {
    property: 'og:url',
    content: currentUrl.toString(),
  })
  upsertMeta('meta[name="twitter:title"]', {
    name: 'twitter:title',
    content: t.meta.title,
  })
  upsertMeta('meta[name="twitter:description"]', {
    name: 'twitter:description',
    content: t.meta.description,
  })

  const imageUrl = new URL(`${import.meta.env.BASE_URL}og-image.png`, window.location.origin)
  upsertMeta('meta[property="og:image"]', {
    property: 'og:image',
    content: imageUrl.toString(),
  })
  upsertMeta('meta[property="og:image:alt"]', {
    property: 'og:image:alt',
    content: t.meta.ogImageAlt,
  })
  upsertMeta('meta[name="twitter:image"]', {
    name: 'twitter:image',
    content: imageUrl.toString(),
  })
  upsertMeta('meta[name="twitter:image:alt"]', {
    name: 'twitter:image:alt',
    content: t.meta.ogImageAlt,
  })

  upsertLink('link[rel="canonical"]', {
    rel: 'canonical',
    href: currentUrl.toString(),
  })

  for (const alternate of ['fr', 'en'] as const) {
    const alternateUrl = new URL(window.location.href)
    alternateUrl.hash = ''
    if (alternate === 'fr') {
      alternateUrl.searchParams.delete('lang')
    } else {
      alternateUrl.searchParams.set('lang', alternate)
    }
    upsertLink(`link[rel="alternate"][hreflang="${alternate}"]`, {
      rel: 'alternate',
      hreflang: alternate,
      href: alternateUrl.toString(),
    })
  }

  const defaultUrl = new URL(window.location.href)
  defaultUrl.searchParams.delete('lang')
  defaultUrl.hash = ''
  upsertLink('link[rel="alternate"][hreflang="x-default"]', {
    rel: 'alternate',
    hreflang: 'x-default',
    href: defaultUrl.toString(),
  })
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readInitialLanguage)

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage)
  }, [])

  useEffect(() => {
    applyDocumentMetadata(language)

    const url = buildLanguageUrl(language)
    window.history.replaceState(window.history.state, '', url)

    try {
      window.localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // The preference simply will not persist.
    }
  }, [language])

  const value = useMemo(
    () => ({ language, setLanguage, t: dictionaries[language] }),
    [language, setLanguage],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
      <p className="sr-only" aria-live="polite">
        {language === 'fr' ? 'Langue du site : français' : 'Website language: English'}
      </p>
    </LanguageContext.Provider>
  )
}
