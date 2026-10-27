import { createContext, useContext } from 'react'
import type { Dictionary, Language } from './dictionary'

export type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: Dictionary
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
