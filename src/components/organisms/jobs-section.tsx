'use client'

import { useState, useMemo } from 'react'
import { SectionTemplate } from '@/components/templates/section-template'
import { SectionHeader } from '@/components/molecules/section-header'
import { JobCard } from '@/components/molecules/job-card'
import { FilterBar } from '@/components/molecules/filter-bar'
import { JobsFilterStrategy, FilterContext } from '@/lib/filters'
import type { Job } from '@/types/job'
import type { FilterCriteria } from '@/lib/filters'

const jobs: Job[] = [
  {
    title: 'Desenvolvedor Frontend React',
    company: 'TechStart Brasil',
    level: 'Júnior',
    tech: 'React',
  },
  {
    title: 'Engenheiro de Dados',
    company: 'DataFlow',
    level: 'Pleno',
    tech: 'Python',
  },
  {
    title: 'Desenvolvedor Mobile Flutter',
    company: 'AppInova',
    level: 'Pleno',
    tech: 'Flutter',
  },
  {
    title: 'Tech Lead Backend',
    company: 'CloudSys',
    level: 'Sênior',
    tech: 'Node.js',
  },
]

export function JobsSection() {
  const [criteria, setCriteria] = useState<FilterCriteria>({})

  const filterContext = useMemo(() => {
    const ctx = new FilterContext<Job>()
    ctx.addStrategy(new JobsFilterStrategy())
    return ctx
  }, [])

  const filteredJobs = useMemo(
    () => filterContext.execute(jobs, criteria),
    [criteria, filterContext],
  )

  return (
    <SectionTemplate id="vagas">
      <SectionHeader
        title="Vagas de Emprego"
        description="Oportunidades divulgadas pela comunidade. Conectamos talentos a empresas que contratam."
      >
        <FilterBar onFilterChange={setCriteria} showLevel />
      </SectionHeader>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filteredJobs.map((job) => (
          <JobCard key={job.title} job={job} />
        ))}
        {filteredJobs.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
            Nenhuma vaga encontrada com os filtros atuais.
          </p>
        )}
      </div>
    </SectionTemplate>
  )
}
