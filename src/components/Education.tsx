import { FileText, GraduationCap, HeartPulse } from 'lucide-react'
import { CvDownload } from './CvDownload'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { useLanguage } from '../i18n/context'

const educationIcons = {
  daeu: GraduationCap,
  psc: HeartPulse,
}

export function Education() {
  const { t } = useLanguage()

  return (
    <section
      id="formation"
      className="section-pad relative overflow-hidden border-y border-line bg-sand/55"
    >
      <div className="container-page relative">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow={t.education.eyebrow}
            title={t.education.title}
            intro={t.education.intro}
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {t.education.items.map((item, index) => {
            const Icon =
              educationIcons[item.id as keyof typeof educationIcons] ?? GraduationCap
            return (
              <Reveal key={item.id} delay={index * 70}>
                <article className="flex h-full flex-col rounded-[22px] border border-line bg-paper p-6 transition-colors duration-300 hover:border-line-strong">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-soft text-teal-deep">
                      <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
                    </span>
                    <span className="chip bg-cream">{item.tag}</span>
                  </div>
                  <h3 className="mt-5 font-display text-[1.7rem] leading-none tracking-[-0.03em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.86rem] font-bold leading-snug text-ink-soft">
                    {item.subtitle}
                  </p>
                  <p className="mt-3 text-[0.82rem] leading-relaxed text-muted">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            )
          })}

          <Reveal delay={140} className="md:col-span-2 lg:col-span-1">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[22px] bg-ink p-6 text-paper">
              <div aria-hidden="true" className="grid-dark absolute inset-0 opacity-60" />
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal/25 blur-3xl"
              />
              <div className="relative flex h-full flex-col">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.07] text-teal-light ring-1 ring-white/10">
                  <FileText aria-hidden="true" size={20} strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 font-display text-[1.7rem] leading-none tracking-[-0.03em] text-paper">
                  {t.contact.cvTitle}
                </h3>
                <p className="mt-3 text-[0.82rem] leading-relaxed text-muted-dark">
                  {t.contact.cvText}
                </p>
                <div className="mt-auto pt-6">
                  <CvDownload variant="outlineLight" showNote />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <p className="mt-6 text-[0.72rem] leading-relaxed text-muted">{t.education.note}</p>
        </Reveal>
      </div>
    </section>
  )
}
