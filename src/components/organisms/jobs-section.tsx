import { H2, P } from '@/components/atoms/typography'

const jobs = [
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
  return (
    <section id="vagas" className="border-t border-border bg-card/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <H2>Vagas de Emprego</H2>
          <P className="mt-4">
            Oportunidades divulgadas pela comunidade. Conectamos talentos a empresas que
            contratam.
          </P>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {jobs.map((job) => (
            <div
              key={job.title}
              className="flex flex-col justify-between rounded-xl border border-border bg-card p-5"
            >
              <div>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {job.tech}
                </span>
                <h3 className="mt-3 font-semibold text-foreground">{job.title}</h3>
                <P className="mt-1 text-xs">{job.company}</P>
              </div>
              <span className="mt-4 text-xs font-medium text-primary">{job.level}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
