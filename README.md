# GDG Lauro de Freitas

Este projeto é a base de um site single-page institucional para o GDG Lauro de Freitas, com foco em apresentar a comunidade, eventos, iniciativas e oportunidades de conexão com desenvolvedores e entusiastas de tecnologia.

## Tecnologias

- Next.js 14+ com App Router
- TypeScript em strict mode
- Tailwind CSS
- Radix UI / Shadcn UI para acessibilidade
- Deploy via GitHub Actions e Firebase Hosting

## Como instalar

1. Clone o repositório:

   ```bash
   git clone https://github.com/lfdev-gdg/gdglaurosite.git
   cd gdglaurosite
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Rode o projeto localmente:

   ```bash
   npm run dev
   ```

4. Acesse no navegador:
   ```text
   http://localhost:3000
   ```

## Estrutura do projeto

- src/app: páginas e layouts do Next.js
- src/components: componentes reutilizáveis
- src/hooks: hooks customizados
- src/lib: integrações e configurações
- src/services: regras de negócio e chamadas externas
- src/styles: estilos globais
- src/types: tipos TypeScript
- public/assets/images: imagens e arquivos estáticos

## Padrão de commits

Use mensagens curtas e descritivas seguindo este padrão:

- feature: para novas funcionalidades
- fix: para correções de bugs
- bug: para ajustes relacionados a problemas específicos

Exemplos:

```bash
feature: criar hero section
fix: ajustar responsividade no menu
bug: corrigir erro de carregamento de imagem
```

## Assets

Imagens e arquivos estáticos devem ser salvos em:

```text
public/assets/images
```
