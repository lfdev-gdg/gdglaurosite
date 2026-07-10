# Arquitetura - GDG Lauro de Freitas

## Stack

- Next.js 14+ com App Router
- TypeScript em strict mode
- Tailwind CSS
- Radix UI / Shadcn UI para acessibilidade
- Firebase Hosting via GitHub Actions

## Estrutura proposta

- src/app: páginas e layouts
- src/components: componentes UI
- src/hooks: hooks reutilizáveis
- src/lib: integrações e configurações
- src/services: regras de negócio e chamadas externas
- src/styles: estilos globais
- src/types: definições de tipos

## Fluxo de deploy

1. Push para o repositório
2. GitHub Actions executa build
3. Build é publicado no Firebase Hosting
