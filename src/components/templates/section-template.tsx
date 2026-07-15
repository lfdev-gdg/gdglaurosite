import type { ReactNode } from 'react'

interface SectionTemplateProps {
  id: string
  children: ReactNode
  className?: string
}

export function SectionTemplate({ id, children, className }: SectionTemplateProps) {
  return (
    <section
      id={id}
      className={`border-t border-border bg-card/50 py-24 sm:py-32 ${className ?? ''}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}
