type BrandMarkProps = {
  tone?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'h-9 w-9 rounded-[11px] text-[13px]',
  md: 'h-11 w-11 rounded-[14px] text-[16px]',
  lg: 'h-16 w-16 rounded-[20px] text-[24px]',
}

export function BrandMark({ tone = 'dark', size = 'md', className = '' }: BrandMarkProps) {
  const toneClasses =
    tone === 'dark'
      ? 'bg-ink text-paper ring-1 ring-white/10'
      : 'bg-paper text-ink ring-1 ring-ink/10'

  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex flex-none items-center justify-center font-display leading-none tracking-[-0.06em] ${sizeClasses[size]} ${toneClasses} ${className}`}
    >
      SC
      <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-teal ring-2 ring-paper" />
    </span>
  )
}
