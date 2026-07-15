import { H2, P } from '@/components/atoms/typography'
import type { ReactNode } from 'react'

interface SectionHeaderProps {
  title: string
  description: string
  className?: string
  children?: ReactNode
}

export function SectionHeader({ title, description, className, children }: SectionHeaderProps) {
  return (
    <div className={`mx-auto max-w-2xl text-center ${className ?? ''}`}>
      <H2>{title}</H2>
      <P className="mt-4">{description}</P>
      {children}
    </div>
  )
}
