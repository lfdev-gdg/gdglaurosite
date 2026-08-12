'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'Iniciativas', href: '#iniciativas' },
  { label: 'SocialTech', href: '#socialtech' },
  { label: 'Organizadores', href: '#organizadores' },
  { label: 'Vagas', href: '#vagas' },
  { label: 'Contato', href: '#contato' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-blue-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-white">
          <Image
            src="/assets/images/logo_gdgsite.jpg"
            alt="GDG Lauro de Freitas"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
            priority
          />
          <span className="text-base font-semibold sm:text-lg">GDG Lauro de Freitas</span>
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Button
          variant="outline"
          size="sm"
          asChild
          className="hidden border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white md:inline-flex"
        >
          <Link href="#contato">Participar</Link>
        </Button>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-md p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white md:hidden"
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-white/10 bg-blue-500/10 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-1 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="#contato" onClick={() => setIsOpen(false)}>
                  Participar
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
