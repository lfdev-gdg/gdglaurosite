import { P } from '@/components/atoms/typography'
import { TechBadge } from './tech-badge'
import type { Job } from '@/types/job'

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-5">
      <div>
        <TechBadge label={job.tech} />
        <h3 className="mt-3 font-semibold text-foreground">{job.title}</h3>
        <P className="mt-1 text-xs">{job.company}</P>
      </div>
      <span className="mt-4 text-xs font-medium text-primary">{job.level}</span>
    </div>
  )
}
