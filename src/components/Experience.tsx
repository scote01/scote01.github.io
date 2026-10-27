import { Check, Info } from 'lucide-react'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { useLanguage } from '../i18n/context'

export function Experience() {
  const { t } = useLanguage()

  return (
    <section
      id="experience"
      className="section-pad relative overflow-hidden border-y border-line bg-cream"
    >
      <div
        aria-hidden="true"
        className="dot-light pointer-events-none absolute inset-y-0 right-0 w-1/3 opacity-40 [mask-image:linear-gradient(to_left,black,transparent)]"
      />

      <div className="container-page relative">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow={t.experience.eyebrow}
            title={t.experience.title}
            intro={t.experience.intro}
          />
        </Reveal>

        <ol className="relative mt-12 space-y-6 before:absolute before:bottom-6 before:left-[7px] before:top-6 before:w-px before:bg-line-strong/70 sm:space-y-7 lg:mt-16">
          {t.experience.items.map((item, index) => (
            <li key={item.id} className="relative pl-8 sm:pl-10">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-8 z-10 h-[15px] w-[15px] rounded-full border-2 ${
                  item.family
                    ? 'border-teal bg-teal-soft shadow-[0_0_0_4px_var(--color-cream)]'
                    : 'border-teal bg-paper shadow-[0_0_0_4px_var(--color-cream)]'
                }`}
              />

              <Reveal delay={index * 60}>
                <article
                  className={`rounded-[24px] border p-6 transition-colors duration-300 sm:p-7 ${
                    item.family
                      ? 'border-teal/25 bg-teal-soft/35'
                      : 'border-line bg-paper hover:border-line-strong'
                  }`}
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex items-start gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 font-display text-[1.55rem] leading-none tabular-nums text-line-strong"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="card-title text-ink">{item.role}</h3>
                        <p className="mt-1.5 text-sm font-semibold text-ink-soft">
                          {item.org}
                          {item.place ? (
                            <span className="font-medium text-muted"> · {item.place}</span>
                          ) : null}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 md:justify-end">
                      <span className="chip border-sand bg-sand/80 text-ink-soft">
                        {item.period}
                      </span>
                      <span
                        className={`chip ${
                          item.family
                            ? 'border-teal/25 bg-paper/70 text-teal-deep'
                            : 'bg-cream/80'
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>
                  </div>

                  <p className="mt-5 border-l-2 border-teal/30 pl-3.5 text-[0.9rem] italic leading-relaxed text-muted">
                    {item.summary}
                  </p>

                  <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                    {item.responsibilities.map((responsibility) => (
                      <li
                        key={responsibility}
                        className="flex items-start gap-2.5 text-[0.84rem] leading-relaxed text-ink-soft"
                      >
                        <Check
                          aria-hidden="true"
                          size={14}
                          strokeWidth={2.3}
                          className="mt-[0.22rem] flex-none text-teal"
                        />
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal>
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-line bg-paper/70 px-5 py-4">
            <Info
              aria-hidden="true"
              size={17}
              strokeWidth={1.9}
              className="mt-0.5 flex-none text-teal"
            />
            <p className="text-[0.8rem] leading-relaxed text-muted">
              {t.experience.familyNote}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
