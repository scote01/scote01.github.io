import { Globe2 } from 'lucide-react'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { useLanguage } from '../i18n/context'

const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const

export function Languages() {
  const { t } = useLanguage()

  return (
    <section id="languages" className="section-pad relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-sand/90 blur-3xl"
      />

      <div className="container-page relative">
        <Reveal>
          <SectionHeading
            index="05"
            eyebrow={t.languages.eyebrow}
            title={t.languages.title}
            intro={t.languages.intro}
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-16">
          {t.languages.items.map((item, index) => (
            <Reveal key={item.id} delay={index * 70}>
              <article className="flex h-full flex-col rounded-[22px] border border-line bg-cream/60 p-6 transition-colors duration-300 hover:border-line-strong hover:bg-cream">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow text-muted">{item.cefr}</p>
                    <h3 className="mt-2 font-display text-[2rem] leading-none tracking-[-0.03em] text-ink">
                      {item.name}
                    </h3>
                  </div>
                  <span className="rounded-xl bg-teal-soft px-3 py-2 text-[0.8rem] font-extrabold text-teal-deep">
                    {item.level}
                  </span>
                </div>

                <p className="mt-4 text-[0.86rem] leading-relaxed text-muted">
                  {item.description}
                </p>

                <div className="mt-auto pt-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted">
                      {t.languages.scaleLabel}
                    </span>
                    <Globe2
                      aria-hidden="true"
                      size={14}
                      strokeWidth={1.8}
                      className="text-teal/70"
                    />
                  </div>

                  <div className="mt-2 grid grid-cols-6 gap-1.5" aria-hidden="true">
                    {cefrLevels.map((level, levelIndex) => (
                      <span
                        key={level}
                        className={`h-2 rounded-full ${
                          levelIndex < item.value ? 'bg-teal' : 'bg-line'
                        }`}
                      />
                    ))}
                  </div>

                  <div
                    className="mt-1.5 flex justify-between text-[9px] font-semibold text-muted/70"
                    aria-hidden="true"
                  >
                    {cefrLevels.map((level) => (
                      <span key={level}>{level}</span>
                    ))}
                  </div>

                  <p className="sr-only">
                    {t.languages.scaleLabel}: {item.level}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
