import { H2, P, H3 } from '@/components/atoms/typography'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const organizers = [
  { name: 'Daniele', role: 'Organizadora' },
  { name: 'Michele', role: 'Organizadora' },
  { name: 'Flávio', role: 'Organizador' },
  { name: 'Ed', role: 'Organizador' },
  { name: 'Marcelo', role: 'Organizador' },
]

export function OrganizersSection() {
  return (
    <section id="organizadores" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <H2>Organizadores</H2>
          <P className="mt-4">
            Conheça as pessoas que fazem o GDG Lauro de Freitas acontecer.
          </P>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
          {organizers.map((org) => (
            <div key={org.name} className="text-center">
              <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <span className="text-xl font-semibold text-muted-foreground">
                  {org.name[0]}
                </span>
              </div>
              <H3 className="text-base">{org.name}</H3>
              <P className="text-xs">{org.role}</P>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link href="#contato">Quero ser organizador</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
