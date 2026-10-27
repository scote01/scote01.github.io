import { ArrowUp, ArrowUpRight, Download, Mail, MapPin, Phone } from 'lucide-react'
import { BrandMark } from './BrandMark'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useLanguage } from '../i18n/context'
import { SITE, assetUrl } from '../config/site'

const copyrightYear = new Date().getFullYear()

const footerNav = [
  { id: 'home', key: 'home' },
  { id: 'about', key: 'about' },
  { id: 'experience', key: 'experience' },
  { id: 'skills', key: 'skills' },
  { id: 'languages', key: 'languages' },
  { id: 'contact', key: 'contact' },
] as const

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative overflow-hidden bg-[#061521] text-paper">
      <div aria-hidden="true" className="grid-dark absolute inset-0 opacity-40" />
      <div className="container-page relative py-12 sm:py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#home" className="inline-flex items-center gap-3">
              <BrandMark tone="light" />
              <span>
                <span className="block font-display text-lg leading-tight tracking-[-0.02em]">
                  {t.common.name}
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-dark">
                  {t.common.role}
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-[0.85rem] leading-relaxed text-muted-dark">
              {t.footer.tagline}
            </p>
            <div className="mt-5 inline-flex items-center gap-2.5">
              <span className="status-dot bg-teal-light" aria-hidden="true" />
              <span className="text-[0.72rem] font-semibold text-paper/70">
                {t.common.availability}
              </span>
            </div>
          </div>

          <nav aria-label={t.footer.navLabel} className="md:col-span-3">
            <p className="eyebrow text-muted-dark">{t.footer.navLabel}</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 md:grid-cols-1">
              {footerNav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-[0.82rem] font-medium text-paper/70 transition-colors hover:text-teal-light"
                  >
                    {t.nav[item.key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="eyebrow text-muted-dark">{t.footer.contactLabel}</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="group inline-flex items-start gap-2.5 text-[0.82rem] font-medium text-paper/75 transition-colors hover:text-teal-light"
                >
                  <Mail aria-hidden="true" size={15} className="mt-0.5 flex-none text-teal-light" />
                  <span className="break-all">{SITE.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex items-center gap-2.5 text-[0.82rem] font-medium text-paper/75 transition-colors hover:text-teal-light"
                >
                  <Phone aria-hidden="true" size={15} className="flex-none text-teal-light" />
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-[0.82rem] font-medium text-paper/75">
                <MapPin aria-hidden="true" size={15} className="flex-none text-teal-light" />
                {SITE.location}
              </li>
              <li>
                <a
                  href={assetUrl(SITE.cvFr)}
                  download="Sylvestre-Cote-CV-FR.pdf"
                  className="inline-flex items-center gap-2.5 text-[0.82rem] font-medium text-paper/75 transition-colors hover:text-teal-light"
                >
                  <Download aria-hidden="true" size={15} className="flex-none text-teal-light" />
                  {t.footer.cv}
                </a>
              </li>
            </ul>

            <a
              href="#contact"
              className="group mt-5 inline-flex items-center gap-1.5 text-[0.75rem] font-bold text-teal-light"
            >
              {t.nav.cta}
              <ArrowUpRight
                aria-hidden="true"
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
            <p className="text-[0.72rem] text-muted-dark">
              © {copyrightYear} {t.common.name}. {t.footer.rights}
            </p>
            <span aria-hidden="true" className="hidden h-3 w-px bg-white/15 sm:block" />
            <p className="text-[0.72rem] text-muted-dark">{t.footer.privacy}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <LanguageSwitcher tone="dark" />
            <a
              href="#home"
              className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-paper/70 transition-colors hover:text-teal-light"
            >
              {t.footer.backToTop}
              <ArrowUp aria-hidden="true" size={13} strokeWidth={2.2} />
            </a>
          </div>
        </div>

        <p className="mt-4 text-[0.68rem] text-muted-dark/70">{t.footer.languageNote}</p>
      </div>
    </footer>
  )
}
