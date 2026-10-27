import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  FileText,
  Globe2,
  Headphones,
  MapPin,
  Settings,
  Truck,
} from 'lucide-react'
import { CvDownload } from './CvDownload'
import { useLanguage } from '../i18n/context'
import { SITE, assetUrl } from '../config/site'

const domainIcons = {
  delivery: Truck,
  customer: Headphones,
  operations: Settings,
}

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div
        aria-hidden="true"
        className="grid-light pointer-events-none absolute inset-0 opacity-55 [mask-image:linear-gradient(to_bottom,black_20%,transparent_92%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-44 h-[38rem] w-[38rem] rounded-full bg-teal-soft/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-sand/80 blur-3xl"
      />

      <div className="container-page relative">
        <div className="grid items-center gap-14 pb-16 sm:pb-20 lg:grid-cols-12 lg:gap-10 lg:pb-24 xl:gap-16">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
              <span className="eyebrow text-teal-deep">{t.hero.eyebrow}</span>
              <span aria-hidden="true" className="h-px w-10 bg-teal/40" />
              <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold text-muted">
                <span className="status-dot" aria-hidden="true" />
                {t.hero.availability}
              </span>
            </div>

            <h1 className="hero-title mt-7 text-ink">
              <span className="block">{t.hero.titleA}</span>
              <span className="block italic text-teal-deep">{t.hero.titleB}</span>
              <span className="block">{t.hero.titleC}</span>
            </h1>

            <p className="mt-7 max-w-xl text-[1.02rem] leading-7 text-muted sm:text-[1.08rem] sm:leading-8">
              {t.hero.intro}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a href="#experience" className="btn btn-primary group">
                {t.hero.primary}
                <ArrowDown
                  aria-hidden="true"
                  size={17}
                  strokeWidth={2.1}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </a>
              <a href="#contact" className="btn btn-outline group">
                {t.hero.secondary}
                <ArrowUpRight
                  aria-hidden="true"
                  size={17}
                  strokeWidth={2.1}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <CvDownload variant="text" />
              <span className="hidden h-3 w-px bg-line-strong sm:block" aria-hidden="true" />
              <span className="text-xs text-muted">{t.hero.cvNote}</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ProfileCard />
          </div>
        </div>
      </div>

      <div className="relative border-y border-line bg-cream/55">
        <div className="container-page flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm text-xs font-medium leading-relaxed text-muted">
            {t.hero.strengthsLabel}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
            {t.hero.strengths.map((strength) => (
              <li
                key={strength}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-soft"
              >
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-teal" />
                {strength}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function ProfileCard() {
  const { t, language } = useLanguage()

  return (
    <div className="relative mx-auto w-full max-w-[27rem] lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute -inset-3 hidden rounded-[34px] border border-line/80 sm:block"
      />
      <div className="relative overflow-hidden rounded-[28px] bg-ink p-6 text-paper shadow-lift sm:p-7">
        <div aria-hidden="true" className="grid-dark absolute inset-0 opacity-80" />
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-teal/20 blur-3xl"
        />

        <svg
          aria-hidden="true"
          viewBox="0 0 420 520"
          fill="none"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
        >
          <path
            className="route-line"
            d="M360 70C330 96 336 132 305 150C274 168 246 156 232 190C218 224 238 250 210 274C182 298 140 288 122 322C104 356 126 392 96 424C78 444 54 456 34 476"
            stroke="rgba(127,209,200,0.28)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />
          <circle cx="360" cy="70" r="4" fill="#7fd1c8" />
          <circle cx="305" cy="150" r="3" fill="#7fd1c8" opacity="0.7" />
          <circle cx="210" cy="274" r="3" fill="#7fd1c8" opacity="0.55" />
          <circle cx="96" cy="424" r="3" fill="#7fd1c8" opacity="0.4" />
        </svg>

        <div className="relative">
          <div className="flex items-center justify-between gap-4">
            <span className="eyebrow text-teal-light">{t.hero.card.label}</span>
            <span className="text-[10px] font-bold tabular-nums tracking-[0.18em] text-muted-dark/70">
              SC / 01
            </span>
          </div>

          <div className="mt-7 flex items-center gap-4">
            <span
              aria-hidden="true"
              className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl border border-white/15 bg-white/[0.07] font-display text-[1.35rem] leading-none tracking-[-0.06em] text-paper"
            >
              SC
            </span>
            <div className="min-w-0">
              <p className="font-display text-[1.7rem] leading-tight tracking-[-0.025em] text-paper">
                {t.common.name}
              </p>
              <p className="mt-0.5 text-xs font-medium tracking-wide text-muted-dark">
                {t.hero.card.role}
              </p>
            </div>
          </div>

          <div className="mt-7 space-y-0 border-y border-white/10">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 py-3">
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-dark">
                <MapPin aria-hidden="true" size={13} className="text-teal-light" />
                {t.hero.card.basedIn}
              </span>
              <span className="text-right text-sm font-semibold text-paper">
                {SITE.location}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-white/10 py-3">
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-dark">
                <ArrowRight aria-hidden="true" size={13} className="text-teal-light" />
                {t.hero.card.mobility}
              </span>
              <span className="text-right text-sm font-semibold text-paper">
                {t.common.mobility}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-white/10 py-3">
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-dark">
                <Globe2 aria-hidden="true" size={13} className="text-teal-light" />
                {t.hero.card.languages}
              </span>
              <span className="text-right text-sm font-semibold text-paper">
                {t.hero.card.languagesValue}
              </span>
            </div>
            <a
              href={assetUrl(SITE.cvFr)}
              download="Sylvestre-Cote-CV-FR.pdf"
              className="group flex items-center justify-between gap-4 py-3"
            >
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-dark">
                <FileText aria-hidden="true" size={13} className="text-teal-light" />
                {t.hero.card.cv}
              </span>
              <span className="flex items-center gap-1.5 text-right text-sm font-semibold text-paper transition-colors group-hover:text-teal-light">
                {t.hero.card.cvValue}
                <ArrowUpRight
                  aria-hidden="true"
                  size={13}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </a>
          </div>

          <div className="mt-6">
            <p className="eyebrow text-muted-dark/80">{t.hero.card.domains}</p>
            <ul className="mt-3 space-y-2">
              {t.hero.domains.map((domain) => {
                const Icon = domainIcons[domain.id as keyof typeof domainIcons]
                return (
                  <li
                    key={domain.id}
                    className="flex items-center gap-3 text-[0.82rem] font-medium text-paper/90"
                  >
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-white/[0.06] text-teal-light">
                      <Icon aria-hidden="true" size={14} strokeWidth={1.8} />
                    </span>
                    {domain.label}
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-teal-light/20 bg-teal/10 px-3.5 py-3">
            <span className="status-dot bg-teal-light" aria-hidden="true" />
            <span className="text-[0.72rem] font-semibold leading-snug text-paper/85">
              {t.hero.availability}
            </span>
          </div>
        </div>
      </div>

      <span className="sr-only">
        {language === 'fr'
          ? 'Carte de présentation de Sylvestre Côté'
          : 'Sylvestre Côté profile card'}
      </span>
    </div>
  )
}
