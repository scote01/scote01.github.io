import { Building2, Check, Monitor, Sparkles, Store, Truck } from 'lucide-react'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { useLanguage } from '../i18n/context'

const categoryIcons = {
  logistics: Truck,
  customer: Store,
  admin: Building2,
  digital: Monitor,
  personal: Sparkles,
}

const categorySpans: Record<string, string> = {
  logistics: 'sm:col-span-1 lg:col-span-3',
  customer: 'sm:col-span-1 lg:col-span-3',
  admin: 'sm:col-span-1 lg:col-span-2',
  digital: 'sm:col-span-1 lg:col-span-2',
  personal: 'sm:col-span-2 lg:col-span-2',
}

export function Skills() {
  const { t } = useLanguage()

  return (
    <section id="skills" className="section-pad relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-teal-soft/40 blur-3xl"
      />

      <div className="container-page relative">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow={t.skills.eyebrow}
            title={t.skills.title}
            intro={t.skills.intro}
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-6">
          {t.skills.categories.map((category, index) => {
            const Icon = categoryIcons[category.id as keyof typeof categoryIcons] ?? Sparkles
            const isTwoColumn = category.id === 'logistics' || category.id === 'customer'
            const isPersonal = category.id === 'personal'

            return (
              <Reveal
                key={category.id}
                delay={index * 60}
                className={categorySpans[category.id] ?? 'lg:col-span-2'}
              >
                <article className="flex h-full flex-col rounded-[22px] border border-line bg-cream/60 p-6 transition-colors duration-300 hover:border-line-strong hover:bg-cream">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-paper text-teal-deep ring-1 ring-line">
                      <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
                    </span>
                    {category.badge ? (
                      <span className="chip border-teal/20 bg-teal-soft/70 text-teal-deep">
                        {category.badge}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-5 text-[1.02rem] font-extrabold tracking-[-0.015em] text-ink">
                    {category.title}
                  </h3>
                  <p className="mt-1.5 text-[0.8rem] leading-relaxed text-muted">
                    {category.summary}
                  </p>

                  {isPersonal ? (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {category.items.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-full border border-line bg-paper/80 px-3 py-1.5 text-[0.73rem] font-semibold text-ink-soft"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul
                      className={`mt-5 grid gap-x-5 gap-y-2.5 ${
                        isTwoColumn ? 'sm:grid-cols-2' : 'grid-cols-1'
                      }`}
                    >
                      {category.items.map((skill) => (
                        <li
                          key={skill}
                          className="flex items-start gap-2 text-[0.8rem] leading-relaxed text-ink-soft"
                        >
                          <Check
                            aria-hidden="true"
                            size={13}
                            strokeWidth={2.4}
                            className="mt-[0.24rem] flex-none text-teal"
                          />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
