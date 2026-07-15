'use client'

import { useState, useMemo } from 'react'
import { SectionTemplate } from '@/components/templates/section-template'
import { SectionHeader } from '@/components/molecules/section-header'
import { JobCard } from '@/components/molecules/job-card'
import { FilterBar } from '@/components/molecules/filter-bar'
import { JobsFilterStrategy, FilterContext } from '@/lib/filters'
import { useFirestoreCollection } from '@/hooks/useFirestoreCollection'
import type { Job } from '@/types/job'
import type { FilterCriteria } from '@/lib/filters'

export function JobsSection() {
  const [criteria, setCriteria] = useState<FilterCriteria>({})
  const { data: jobs, loading } = useFirestoreCollection<Job>('jobs')

  const filterContext = useMemo(() => {
    const ctx = new FilterContext<Job>()
    ctx.addStrategy(new JobsFilterStrategy())
    return ctx
  }, [])

  const filteredJobs = useMemo(
    () => filterContext.execute(jobs, criteria),
    [criteria, filterContext, jobs],
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
        {loading ? (
          <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
            Carregando vagas...
          </p>
        ) : (
          <>
            {filteredJobs.map((job) => (
              <JobCard key={job.id ?? job.title} job={job} />
            ))}
            {filteredJobs.length === 0 && (
              <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
                Nenhuma vaga encontrada com os filtros atuais.
              </p>
            )}
          </>
        )}
      </div>
    </SectionTemplate>
  )
}
