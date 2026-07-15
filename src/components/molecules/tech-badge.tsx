import { cn } from '@/lib/utils'

interface TechBadgeProps {
  label: string
  className?: string
}

export function TechBadge({ label, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        'rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground',
        className,
      )}
    >
      {label}
    </span>
  )
}
