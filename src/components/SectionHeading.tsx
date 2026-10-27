type SectionHeadingProps = {
  index: string
  eyebrow: string
  title: string
  intro?: string
  dark?: boolean
  className?: string
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  dark = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <div className="mb-5 flex items-center gap-4">
        <span
          className={`font-display text-lg tabular-nums ${
            dark ? 'text-teal-light' : 'text-teal'
          }`}
        >
          {index}
        </span>
        <span
          aria-hidden="true"
          className={`h-px w-10 ${dark ? 'bg-white/25' : 'bg-line-strong'}`}
        />
        <span className={`eyebrow ${dark ? 'text-muted-dark' : 'text-muted'}`}>
          {eyebrow}
        </span>
      </div>

      <h2 className={`section-title max-w-3xl ${dark ? 'text-paper' : 'text-ink'}`}>
        {title}
      </h2>

      {intro ? (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed sm:text-[1.0625rem] ${
            dark ? 'text-muted-dark' : 'text-muted'
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  )
}
