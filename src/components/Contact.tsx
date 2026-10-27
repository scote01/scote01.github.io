import { useEffect, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import { CvDownload } from './CvDownload'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { useLanguage } from '../i18n/context'
import { SITE } from '../config/site'

type CopyStatus = 'idle' | 'copied' | 'error'

export function Contact() {
  const { t } = useLanguage()
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle')
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  const resetLater = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setCopyStatus('idle'), 2600)
  }

  const legacyCopy = () => {
    const textarea = document.createElement('textarea')
    textarea.value = SITE.email
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    let copied = false
    try {
      copied = document.execCommand('copy')
    } catch {
      copied = false
    }
    document.body.removeChild(textarea)
    return copied
  }

  const copyEmail = async () => {
    let copied = false

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(SITE.email)
        copied = true
      } catch {
        // Permission can be denied even in a secure context: fall through.
        copied = false
      }
    }

    if (!copied) copied = legacyCopy()

    setCopyStatus(copied ? 'copied' : 'error')
    resetLater()
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-ink text-paper">
      <div aria-hidden="true" className="grid-dark absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-teal/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-32 h-[28rem] w-[28rem] rounded-full bg-teal/10 blur-3xl"
      />

      <div className="container-page section-pad relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                dark
                index="06"
                eyebrow={t.contact.eyebrow}
                title={t.contact.title}
                intro={t.contact.intro}
              />
            </Reveal>

            <Reveal delay={90}>
              <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-muted-dark">
                {t.contact.body}
              </p>
            </Reveal>

            <Reveal delay={150}>
              <div className="mt-8 rounded-[22px] border border-white/10 bg-white/[0.045] p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-teal/15 text-teal-light">
                    <ShieldCheck aria-hidden="true" size={18} strokeWidth={1.9} />
                  </span>
                  <div>
                    <p className="text-[0.85rem] font-bold text-paper">
                      {t.contact.noFormTitle}
                    </p>
                    <p className="mt-1.5 text-[0.78rem] leading-relaxed text-muted-dark">
                      {t.contact.noForm}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={210}>
              <div className="mt-6 inline-flex items-center gap-2.5">
                <span className="status-dot bg-teal-light" aria-hidden="true" />
                <span className="text-[0.75rem] font-semibold text-paper/80">
                  {t.contact.availability}
                </span>
              </div>
            </Reveal>
          </div>

          <div className="space-y-3 lg:col-span-7">
            <Reveal delay={80}>
              <div className="rounded-[22px] border border-white/10 bg-white/[0.045] p-5 transition-colors duration-300 hover:border-white/20 sm:p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-teal/15 text-teal-light">
                    <Mail aria-hidden="true" size={19} strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="eyebrow pt-1 text-muted-dark">
                        {t.contact.emailCardLabel}
                      </p>
                      <button
                        type="button"
                        onClick={copyEmail}
                        aria-label={
                          copyStatus === 'copied'
                            ? t.common.copied
                            : `${t.contact.copy} : ${SITE.email}`
                        }
                        className="inline-flex min-h-9 flex-none items-center gap-1.5 rounded-full border border-white/15 px-3 text-[0.7rem] font-bold text-paper transition-colors hover:border-white/35 hover:bg-white/10"
                      >
                        {copyStatus === 'copied' ? (
                          <Check aria-hidden="true" size={13} strokeWidth={2.4} />
                        ) : (
                          <Copy aria-hidden="true" size={13} strokeWidth={2} />
                        )}
                        <span className="hidden sm:inline">
                          {copyStatus === 'copied' ? t.contact.copied : t.contact.copy}
                        </span>
                      </button>
                    </div>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="mt-1.5 block break-words text-[1rem] font-semibold text-paper transition-colors hover:text-teal-light sm:text-[1.08rem]"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </div>
                <p
                  className={`mt-3 min-h-4 pl-[3.75rem] text-[0.7rem] ${
                    copyStatus === 'error' ? 'text-red-300' : 'text-teal-light'
                  }`}
                  aria-live="polite"
                >
                  {copyStatus === 'copied'
                    ? t.common.copied
                    : copyStatus === 'error'
                      ? t.common.copyError
                      : ''}
                </p>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <a
                href={`tel:${SITE.phone}`}
                className="group flex items-center gap-4 rounded-[22px] border border-white/10 bg-white/[0.045] p-5 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.07] sm:p-6"
              >
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-teal/15 text-teal-light">
                  <Phone aria-hidden="true" size={19} strokeWidth={1.8} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="eyebrow block text-muted-dark">
                    {t.contact.phoneCardLabel}
                  </span>
                  <span className="mt-1.5 block text-[1rem] font-semibold text-paper sm:text-[1.08rem]">
                    {SITE.phoneDisplay}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  size={18}
                  className="text-muted-dark transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-light"
                />
              </a>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex items-center gap-4 rounded-[22px] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-white/[0.06] text-teal-light">
                  <MapPin aria-hidden="true" size={19} strokeWidth={1.8} />
                </span>
                <div>
                  <p className="eyebrow text-muted-dark">{t.contact.locationCardLabel}</p>
                  <p className="mt-1.5 text-[1rem] font-semibold text-paper">{SITE.location}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="flex flex-col gap-4 rounded-[22px] border border-white/10 bg-white/[0.045] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <p className="eyebrow text-muted-dark">{t.contact.cvTitle}</p>
                  <p className="mt-1.5 max-w-sm text-[0.8rem] leading-relaxed text-muted-dark">
                    {t.contact.cvText}
                  </p>
                </div>
                <CvDownload variant="light" className="flex-none" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
