import { P } from '@/components/atoms/typography'
import { TechBadge } from './tech-badge'
import type { SocialProject } from '@/types/job'

interface ProjectCardProps {
  project: SocialProject
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="space-y-3">
      <h4 className="font-medium text-foreground">{project.title}</h4>
      <P className="text-sm">{project.description}</P>
      <div className="flex flex-wrap gap-2">
        {project.techs.map((tech) => (
          <TechBadge key={tech} label={tech} className="rounded-md px-2.5 py-1" />
        ))}
      </div>
    </div>
  )
}
