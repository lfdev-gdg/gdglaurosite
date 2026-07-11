import type { TypographyProps } from '@/types'

export function H1({ children, className }: TypographyProps) {
  return (
    <h1
      className={`text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl ${className ?? ''}`}
    >
      {children}
    </h1>
  )
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2
      className={`text-3xl font-medium tracking-tight text-foreground sm:text-4xl ${className ?? ''}`}
    >
      {children}
    </h2>
  )
}

export function H3({ children, className }: TypographyProps) {
  return (
    <h3 className={`text-xl font-medium text-foreground sm:text-2xl ${className ?? ''}`}>
      {children}
    </h3>
  )
}

export function P({ children, className }: TypographyProps) {
  return <p className={`text-muted-foreground leading-relaxed ${className ?? ''}`}>{children}</p>
}

export function Eyebrow({ children, className }: TypographyProps) {
  return (
    <p
      className={`text-sm uppercase tracking-[0.3em] text-primary ${className ?? ''}`}
    >
      {children}
    </p>
  )
}
