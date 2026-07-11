import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Iniciativas', href: '#iniciativas' },
  { label: 'SocialTech', href: '#socialtech' },
  { label: 'Organizadores', href: '#organizadores' },
  { label: 'Vagas', href: '#vagas' },
  { label: 'Contato', href: '#contato' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold text-foreground">
          GDG Lauro de Freitas
        </Link>
        <ul className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Button variant="outline" size="sm" asChild className="hidden md:inline-flex">
          <Link href="#contato">Participar</Link>
        </Button>
      </nav>
    </header>
  )
}
