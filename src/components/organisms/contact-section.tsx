import { H2, P } from '@/components/atoms/typography'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const channels = [
  { label: 'Instagram', href: 'https://instagram.com/gdg.community', description: '@gdg.community' },
  { label: 'Grupo do Telegram', href: '#', description: 'Comunidade no Telegram' },
  { label: 'GitHub', href: '#', description: 'github.com/gdg-lauro' },
  { label: 'Meetup', href: '#', description: 'Eventos e encontros' },
]

export function ContactSection() {
  return (
    <section id="contato" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <H2>Onde nos encontrar</H2>
          <P className="mt-4">
            Acompanhe o GDG Lauro de Freitas nas redes sociais e fique por dentro de tudo.
          </P>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((channel) => (
            <Link
              key={channel.label}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-lg"
            >
              <h3 className="font-semibold text-foreground">{channel.label}</h3>
              <P className="mt-1 text-xs">{channel.description}</P>
            </Link>
          ))}
        </div>

        <div className="mt-16 mx-auto max-w-xl rounded-xl border border-border bg-card p-6 sm:p-8">
          <h3 className="text-center text-lg font-semibold text-foreground">
            Quer falar com a gente?
          </h3>
          <P className="mt-2 text-center text-sm">
            Preencha o formulário abaixo para entrar em contato, enviar ideias de projetos
            ou se candidatar como organizador.
          </P>
          <form className="mt-8 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Seu nome completo"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Conte-nos sobre sua ideia, dúvida ou interesse..."
              />
            </div>
            <Button type="submit" className="w-full">
              Enviar mensagem
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
