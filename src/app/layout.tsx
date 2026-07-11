import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GDG Lauro de Freitas — Comunidade Google Developers',
  description:
    'Comunidade de tecnologia, aprendizado e inovação em Lauro de Freitas. Participe de eventos, workshops e projetos que transformam vidas através da tecnologia.',
  keywords: [
    'GDG',
    'Google Developers',
    'Lauro de Freitas',
    'tecnologia',
    'comunidade',
    'eventos tech',
    'workshops',
    'mentoria',
  ],
  openGraph: {
    title: 'GDG Lauro de Freitas — Comunidade Google Developers',
    description:
      'Participe da comunidade Google Developers em Lauro de Freitas. Eventos, workshops e projetos.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
