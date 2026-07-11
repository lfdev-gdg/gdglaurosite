import { H2, P, H3 } from '@/components/atoms/typography'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const projects = [
  {
    title: 'GDG Lauro Talks',
    description:
      'Série de palestras e entrevistas com profissionais de tecnologia da comunidade local, abordando carreira, tendências e aprendizado.',
    techs: ['Google Cloud', 'AI', 'Web'],
  },
]

export function SocialTechSection() {
  return (
    <section id="socialtech" className="border-t border-border bg-card/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <H2>SocialTech</H2>
          <P className="mt-4">
            Projetos sociais da comunidade que usam tecnologia para gerar impacto positivo.
            Envie sua ideia e colabore com a gente.
          </P>
        </div>

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
            {projects.map((project) => (
              <div key={project.title} className="space-y-3">
                <h4 className="font-medium text-foreground">{project.title}</h4>
                <P className="text-sm">{project.description}</P>
                <div className="flex flex-wrap gap-2">
                  {project.techs.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <P className="font-medium text-foreground">
            Junte-se a nós para construir um futuro melhor pela comunidade.
          </P>
        </div>
      </div>
    </section>
  )
}
