import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, Download, Mail, Menu, Phone, X } from 'lucide-react'
import { BrandMark } from './BrandMark'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useLanguage } from '../i18n/context'
import { SITE, assetUrl } from '../config/site'
import { useScrollSpy } from '../hooks/useScrollSpy'

const navItems = [
  { id: 'home', key: 'home' },
  { id: 'about', key: 'about' },
  { id: 'experience', key: 'experience' },
  { id: 'skills', key: 'skills' },
  { id: 'languages', key: 'languages' },
  { id: 'contact', key: 'contact' },
] as const

const sectionIds = navItems.map((item) => item.id)

export function Header() {
  const { t } = useLanguage()
  const activeId = useScrollSpy(sectionIds)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const previousFocus = document.activeElement as HTMLElement | null
    const dialog = dialogRef.current
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        return
      }

      if (event.key !== 'Tab' || !dialog) return

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null)

      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
      previousFocus?.focus()
    }
  }, [menuOpen])

  const handleMobileNav = (id: string) => {
    setMenuOpen(false)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.setTimeout(() => {
      const section = document.getElementById(id)
      section?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      })
      window.history.replaceState(window.history.state, '', `#${id}`)
    }, 40)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-line/90 bg-paper/90 shadow-[0_1px_0_rgba(10,29,44,0.02)] backdrop-blur-xl'
          : 'border-b border-transparent bg-paper/70 backdrop-blur-md'
      }`}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <a
          href="#home"
          className="group flex min-w-0 items-center gap-3 rounded-lg"
          aria-label={`${t.common.name} — ${t.nav.home}`}
        >
          <BrandMark />
          <span className="min-w-0">
            <span className="block truncate text-[0.95rem] font-extrabold leading-tight tracking-[-0.015em] text-ink">
              {t.common.name}
            </span>
            <span className="hidden truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-muted sm:block">
              {t.common.role}
            </span>
          </span>
        </a>

        <nav
          aria-label={t.common.navigationLabel}
          className="hidden items-center gap-0.5 lg:flex"
        >
          {navItems.map((item) => {
            const isActive = activeId === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={`relative rounded-full px-3.5 py-2 text-[0.82rem] font-semibold transition-colors duration-200 ${
                  isActive ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {t.nav[item.key]}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3.5 bottom-0.5 h-px origin-left bg-teal transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            )
          })}
        </nav>

        <div className="flex flex-none items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <a
            href="#contact"
            className="btn btn-primary hidden min-h-10 px-4 py-2 text-[0.8rem] md:inline-flex"
          >
            {t.nav.cta}
            <ArrowUpRight aria-hidden="true" size={15} strokeWidth={2.2} />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t.common.menuOpen}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-cream/70 text-ink transition-colors hover:border-line-strong hover:bg-cream lg:hidden"
          >
            <Menu aria-hidden="true" size={19} strokeWidth={1.9} />
          </button>
        </div>
      </div>

      {menuOpen
        ? createPortal(
        <div
          id="mobile-navigation"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={t.common.navigationLabel}
          className="menu-enter fixed inset-0 z-[70] bg-paper lg:hidden"
        >
          <div className="flex h-full flex-col overflow-y-auto overscroll-contain">
            <div className="container-page flex h-[72px] flex-none items-center justify-between border-b border-line">
              <div className="flex items-center gap-3">
                <BrandMark />
                <span>
                  <span className="block text-sm font-extrabold leading-tight text-ink">
                    {t.common.name}
                  </span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    {t.common.role}
                  </span>
                </span>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={t.common.menuClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-cream/70 text-ink transition-colors hover:border-line-strong hover:bg-cream"
              >
                <X aria-hidden="true" size={20} strokeWidth={1.9} />
              </button>
            </div>

            <nav className="container-page flex-1 py-8" aria-label={t.common.navigationLabel}>
              <ul className="space-y-1">
                {navItems.map((item, index) => {
                  const isActive = activeId === item.id
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(event) => {
                          event.preventDefault()
                          handleMobileNav(item.id)
                        }}
                        aria-current={isActive ? 'location' : undefined}
                        className="group flex items-center justify-between gap-6 border-b border-line/60 py-4"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="w-6 text-[11px] font-bold tabular-nums text-teal">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span
                            className={`font-display text-[2rem] leading-none tracking-[-0.02em] ${
                              isActive ? 'text-teal-deep' : 'text-ink'
                            }`}
                          >
                            {t.nav[item.key]}
                          </span>
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          size={20}
                          className="text-line-strong transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal"
                        />
                      </a>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-8 flex items-center justify-between gap-4">
                <span className="eyebrow text-muted">{t.common.languageLabel}</span>
                <LanguageSwitcher />
              </div>
            </nav>

            <div className="container-page flex-none border-t border-line py-6">
              <div className="grid gap-3 text-sm">
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 font-semibold text-ink"
                >
                  <Mail aria-hidden="true" size={16} className="text-teal" />
                  <span className="break-all">{SITE.email}</span>
                </a>
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center gap-3 font-semibold text-ink"
                >
                  <Phone aria-hidden="true" size={16} className="text-teal" />
                  {SITE.phoneDisplay}
                </a>
                <a
                  href={assetUrl(SITE.cvFr)}
                  download="Sylvestre-Cote-CV-FR.pdf"
                  className="flex items-center gap-3 font-semibold text-ink"
                >
                  <Download aria-hidden="true" size={16} className="text-teal" />
                  {t.footer.cv}
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )
        : null}
    </header>
  )
}
