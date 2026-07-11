import { H2, P, H3 } from '@/components/atoms/typography'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const initiatives = [
  {
    title: 'Encontros Virtuais',
    description:
      'Palestras e discussões online sobre tecnologias Google, acessíveis de qualquer lugar.',
  },
  {
    title: 'Encontros Presenciais',
    description: 'Palestras, laboratórios e networking presencial na região de Lauro de Freitas.',
  },
  {
    title: 'DevFest',
    description:
      'O maior evento anual da comunidade Google Developers, reunindo centenas de participantes.',
  },
  {
    title: 'Build with AI',
    description:
      'Workshops práticos focados em inteligência artificial com tecnologias Google.',
  },
  {
    title: 'Workshops',
    description: 'Sessões hands-on para aprender novas habilidades com especialistas da comunidade.',
  },
  {
    title: 'Mentorias',
    description:
      'Programa de mentoria para desenvolvedores em início de carreira guiados por profissionais experientes.',
  },
  {
    title: 'Women Techmakers',
    description:
      'Programa Google que promove visibilidade, comunidade e recursos para mulheres na tecnologia.',
  },
]

export function InitiativesSection() {
  return (
    <section id="iniciativas" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <H2>Nossas Iniciativas</H2>
          <P className="mt-4">
            Conheça os programas e encontros que movimentam a comunidade Google Developers
            em Lauro de Freitas.
          </P>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {initiatives.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
            >
              <H3 className="text-lg">{item.title}</H3>
              <P className="mt-3 text-sm">{item.description}</P>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link href="#contato">Inscreva-se para participar</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
