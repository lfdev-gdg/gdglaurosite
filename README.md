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

## Fluxo de branches

- `main`: branch de produção. Só recebe merge vindo de `develop`. Todo push em `main` dispara o deploy automático para o site de produção do Firebase Hosting.
- `develop`: branch de integração. É para onde todo Pull Request deve ser aberto. Todo push em `develop` dispara a checagem de CI (typecheck + build) e o deploy automático para o site de staging.
- `feature/*`, `fix/*`, `bug/*`: branches de trabalho, sempre criadas a partir de `develop`.

## Ambientes

O projeto Firebase `gdglaurosite` tem dois **Hosting sites** (definidos em `firebase.json` / `.firebaserc`), cada um com deploy automático a partir de uma branch diferente:

| Ambiente   | Branch    | Site Firebase       | URL                                                                |
| ---------- | --------- | -------------------- | ------------------------------------------------------------------- |
| Produção   | `main`    | `gdglaurosite`        | https://gdglaurosite.web.app                                        |
| Staging    | `develop` | `gdglaurosite-dev`    | https://gdglaurosite-dev.web.app                                    |
| Preview PR | `feature/*` → PR para `develop`/`main` | `gdglaurosite-dev` (canal temporário) | link gerado automaticamente pelo bot do GitHub Actions no PR, expira em 7 dias |

Os dois sites vivem no **mesmo projeto Firebase** (Firestore, Analytics etc. são compartilhados), só o Hosting é separado — não há custo adicional no plano Spark.

## Como abrir um Pull Request

1. Atualize sua `develop` local:

   ```bash
   git checkout develop
   git pull origin develop
   ```

2. Crie sua branch de trabalho a partir de `develop`, usando o mesmo padrão dos commits (`feature/`, `fix/` ou `bug/`):

   ```bash
   git checkout -b feature/nome-da-funcionalidade
   ```

3. Faça suas alterações e commits seguindo o [padrão de commits](#padrão-de-commits).

4. Antes de abrir o PR, rode localmente as mesmas checagens do CI:

   ```bash
   npm run typecheck
   npm run build
   ```

5. Envie a branch para o repositório remoto:

   ```bash
   git push origin feature/nome-da-funcionalidade
   ```

6. Abra o Pull Request no GitHub com **base em `develop`** (nunca direto em `main`), descrevendo o que foi feito e, se possível, incluindo prints/GIFs para mudanças visuais.

7. Aguarde o workflow de CI (checagem automática de tipos e build) e o deploy de preview no Firebase Hosting, gerados automaticamente para o PR. Corrija o que for necessário até os checks ficarem verdes.

8. Peça revisão de pelo menos um outro colaborador. Após aprovação e checks passando, faça o merge para `develop`.

9. Periodicamente, um mantenedor abre o Pull Request de `develop` para `main` para publicar uma nova versão em produção.
