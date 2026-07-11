import { H2, P } from '@/components/atoms/typography'

const events = [
  { date: 'Março 2026', title: 'Kickoff GDG Lauro de Freitas', attendees: 60 },
  { date: 'Abril 2026', title: 'Workshop Firebase para Iniciantes', attendees: 45 },
  { date: 'Maio 2026', title: 'Introdução ao Google Cloud', attendees: 52 },
  { date: 'Junho 2026', title: 'Build with AI: Criando com Gemini', attendees: 80 },
]

export function TimelineSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <H2>Linha do Tempo de Meetups</H2>
          <P className="mt-4">
            Acompanhe a evolução da comunidade. Cada evento é um passo na nossa jornada
            coletiva.
          </P>
        </div>

        <div className="mt-16 max-w-3xl mx-auto space-y-8">
          {events.map((event, index) => (
            <div key={event.title} className="group flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-sm font-medium text-foreground">
                  {index + 1}
                </div>
                {index < events.length - 1 && (
                  <div className="mt-2 h-full w-px bg-border group-last:hidden" />
                )}
              </div>
              <div className="pb-8">
                <span className="text-xs font-medium text-muted-foreground">{event.date}</span>
                <h3 className="mt-1 font-semibold text-foreground">{event.title}</h3>
                <P className="mt-1 text-sm">{event.attendees} participantes</P>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
