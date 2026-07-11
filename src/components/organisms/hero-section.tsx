import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { H1, Eyebrow, P } from '@/components/atoms/typography'

const highlights = [
  'DevFest 2026',
  'Build with AI',
  'Mentorias',
  'Women Techmakers',
]

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-4 pt-16 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Eyebrow className="mb-6">Google Developer Group</Eyebrow>
        <H1 className="mb-6">
          Comunidade de tecnologia, aprendizado e inovação em Lauro de Freitas
        </H1>
        <P className="mx-auto mb-10 max-w-2xl text-lg">
          Faça parte da comunidade Google Developers. Participe de eventos, workshops
          e projetos que transformam vidas através da tecnologia.
        </P>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="#contato">Quero participar</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#iniciativas">Conhecer iniciativas</Link>
          </Button>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          {highlights.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
