import {
  ArrowUpRight,
  HeartHandshake,
  Layers,
  Lightbulb,
  Quote,
  Target,
  Users,
} from 'lucide-react'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { useLanguage } from '../i18n/context'

const highlightIcons = {
  versatility: Layers,
  problem: Lightbulb,
  team: Users,
  customer: HeartHandshake,
}

export function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="section-pad relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-teal-soft/50 blur-3xl"
      />

      <div className="container-page relative">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow={t.about.eyebrow}
            title={t.about.title}
            intro={t.about.intro}
          />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <div className="space-y-5 text-[1.01rem] leading-7 text-muted sm:text-[1.05rem] sm:leading-8">
                {t.about.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {t.about.highlights.map((highlight, index) => {
                const Icon =
                  highlightIcons[highlight.id as keyof typeof highlightIcons] ?? Layers
                return (
                  <Reveal key={highlight.id} delay={index * 70}>
                    <article className="h-full rounded-2xl border border-line bg-cream/65 p-5 transition-colors duration-300 hover:border-line-strong hover:bg-cream">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-soft text-teal-deep">
                        <Icon aria-hidden="true" size={17} strokeWidth={1.9} />
                      </span>
                      <h3 className="mt-4 text-[0.95rem] font-extrabold tracking-[-0.01em] text-ink">
                        {highlight.title}
                      </h3>
                      <p className="mt-1.5 text-[0.82rem] leading-relaxed text-muted">
                        {highlight.text}
                      </p>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>

          <div className="space-y-5 lg:sticky lg:top-28 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:self-start">
            <Reveal delay={90}>
              <aside className="relative overflow-hidden rounded-[26px] bg-ink p-7 text-paper sm:p-8">
                <div aria-hidden="true" className="grid-dark absolute inset-0 opacity-70" />
                <div
                  aria-hidden="true"
                  className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-teal/20 blur-3xl"
                />
                <div className="relative">
                  <span className="eyebrow text-teal-light">{t.about.approachLabel}</span>
                  <Quote
                    aria-hidden="true"
                    size={28}
                    strokeWidth={1.4}
                    className="mt-6 text-teal-light/70"
                  />
                  <blockquote className="mt-3 font-display text-[1.8rem] leading-[1.15] tracking-[-0.02em] text-paper">
                    {t.about.approachQuote}
                  </blockquote>
                  <p className="mt-5 text-sm leading-relaxed text-muted-dark">
                    {t.about.approachText}
                  </p>
                </div>
              </aside>
            </Reveal>

            <Reveal delay={160}>
              <div className="rounded-[22px] border border-line bg-sand/55 p-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-paper text-teal-deep">
                    <Target aria-hidden="true" size={17} strokeWidth={1.9} />
                  </span>
                  <div>
                    <p className="eyebrow text-muted">{t.about.lookingForLabel}</p>
                    <p className="mt-2 text-[0.9rem] font-semibold leading-relaxed text-ink">
                      {t.about.lookingFor}
                    </p>
                    <a
                      href="#contact"
                      className="group mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-teal-deep underline decoration-teal/30 underline-offset-4 transition-colors hover:decoration-teal"
                    >
                      {t.about.lookingForLink}
                      <ArrowUpRight
                        aria-hidden="true"
                        size={14}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
