import Link from 'next/link'
import { P } from '@/components/atoms/typography'

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/gdg.community' },
  { label: 'Telegram', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'Meetup', href: '#' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <Link href="/" className="text-lg font-semibold text-foreground">
            GDG Lauro de Freitas
          </Link>
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center">
          <P className="text-xs">
            &copy; {new Date().getFullYear()} GDG Lauro de Freitas. Todos os direitos reservados.
          </P>
        </div>
      </div>
    </footer>
  )
}
