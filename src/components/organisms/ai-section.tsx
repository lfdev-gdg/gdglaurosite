import { H2, P } from '@/components/atoms/typography'

const services = [
  {
    title: 'Google Cloud',
    description:
      'Infraestrutura em nuvem com opções gratuitas generosas. Ideal para projetos pessoais, startups e aprendizado.',
  },
  {
    title: 'Firebase',
    description:
      'Plataforma de desenvolvimento de apps com banco de dados, autenticação, hosting e analytics gratuitos.',
  },
  {
    title: 'Gemini AI',
    description:
      'Modelos de inteligência artificial do Google para texto, código, imagens e muito mais.',
  },
  {
    title: 'TensorFlow',
    description:
      'Framework open-source de machine learning. Comece com tutoriais gratuitos e acelere sua carreira em IA.',
  },
]

export function AISection() {
  return (
    <section className="border-t border-border bg-card/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <H2>Inteligência Artificial e Serviços Google</H2>
          <P className="mt-4">
            Explore as tecnologias Google que estão moldando o futuro. De IA a Cloud,
            ferramentas gratuitas para você começar hoje.
          </P>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {services.map((svc) => (
            <div key={svc.title} className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground">{svc.title}</h3>
              <P className="mt-2 text-sm">{svc.description}</P>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
