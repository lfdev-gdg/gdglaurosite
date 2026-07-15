'use client'

import { useState, useMemo } from 'react'
import { SectionTemplate } from '@/components/templates/section-template'
import { SectionHeader } from '@/components/molecules/section-header'
import { ProjectCard } from '@/components/molecules/project-card'
import { FilterBar } from '@/components/molecules/filter-bar'
import { P } from '@/components/atoms/typography'
import { H3 } from '@/components/atoms/typography'
import { Button } from '@/components/ui/button'
import { ProjectsFilterStrategy, FilterContext } from '@/lib/filters'
import { useFirestoreCollection } from '@/hooks/useFirestoreCollection'
import Link from 'next/link'
import type { SocialProject } from '@/types/job'
import type { FilterCriteria } from '@/lib/filters'

const MOCK_PROJECTS: SocialProject[] = [
  {
    title: 'GDG Lauro Talks',
    description:
      'Série de palestras e entrevistas com profissionais de tecnologia da comunidade local, abordando carreira, tendências e aprendizado.',
    techs: ['Google Cloud', 'AI', 'Web'],
  },
]

function MockBadge() {
  return (
    <span className="ml-2 inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-400">
      Exemplo
    </span>
  )
}

export function SocialTechSection() {
  const [criteria, setCriteria] = useState<FilterCriteria>({})
  const { data: projects, loading, error } = useFirestoreCollection<SocialProject>('socialProjects')

  const useMock = !loading && (error || projects.length === 0)
  const source = useMock ? MOCK_PROJECTS : projects

  const filterContext = useMemo(() => {
    const ctx = new FilterContext<SocialProject>()
    ctx.addStrategy(new ProjectsFilterStrategy())
    return ctx
  }, [])

  const filteredProjects = useMemo(
    () => filterContext.execute(source, criteria),
    [criteria, filterContext, source],
  )

  return (
    <SectionTemplate id="socialtech">
      <SectionHeader
        title="SocialTech"
        description="Projetos sociais da comunidade que usam tecnologia para gerar impacto positivo. Envie sua ideia e colabore com a gente."
      >
        {useMock && (
          <div className="mt-3">
            <MockBadge />
          </div>
        )}
        <FilterBar onFilterChange={setCriteria} />
      </SectionHeader>

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <H3 className="mb-4">Envie sua ideia</H3>
          <P className="text-sm">
            Tem uma ideia de projeto social usando tecnologia? Compartilhe conosco e
            vamos construir juntos algo incrível para a comunidade.
          </P>
          <Button className="mt-6" asChild>
            <Link href="#contato">Submeter ideia</Link>
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <H3 className="mb-4">Projetos em Destaque</H3>
          {loading ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Carregando projetos...
            </p>
          ) : (
            <>
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id ?? project.title} project={project} />
              ))}
              {filteredProjects.length === 0 && (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  Nenhum projeto encontrado com os filtros atuais.
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <div className="mt-12 text-center">
        <P className="font-medium text-foreground">
          Junte-se a nós para construir um futuro melhor pela comunidade.
        </P>
      </div>
    </SectionTemplate>
  )
}
