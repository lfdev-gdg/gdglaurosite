# **Especificação de Arquitetura: Landing Page GDG Lauro de Freitas**

Este documento descreve a arquitetura técnica para a nova landing page do GDG Lauro de Freitas, com foco em uma infraestrutura de custo zero utilizando Firebase e padrões modernos de desenvolvimento web.

## **1\. Resumo Executivo**

O objetivo é migrar do site legado para uma landing page de alta performance e otimizada para SEO. Ao utilizar **Geração de Site Estático (SSG)** e o **Plano Spark do Firebase**, garantimos escalabilidade sem custos financeiros.

## **2\. Infraestrutura e Estratégia de Custo Zero**

| Serviço          | Provedor         | Estratégia de Otimização (Plano Gratuito)                                                           |
| :--------------- | :--------------- | :-------------------------------------------------------------------------------------------------- |
| Hospedagem       | Firebase Hosting | Uso de CDN global para ativos estáticos; minimização de requisições dinâmicas.                      |
| Funções de Borda | Cloud Functions  | Apenas para lógica crítica (ex: validação de formulários) dentro do limite de 2M de invocações/mês. |
| Banco de Dados   | Cloud Firestore  | Cache de leitura no momento do build (SSG) para manter leituras diárias abaixo de 50k.              |
| Analytics        | Google Analytics | Integração nativa com Firebase, sem custo para uso da comunidade.                                   |

## **3\. Stack Tecnológica**

- **Linguagem:** TypeScript (Strict Mode)
- **Framework:** Next.js 14+ (App Router)
- **Estilização:** Tailwind CSS
- **Componentes:** Radix UI / Shadcn UI (para acessibilidade)
- **Deploy:** GitHub Actions \-\> Firebase Hosting

## **4\. Padrões de Projeto (Design Patterns)**

### **4.1. Padrão Singleton (Inicialização do Firebase)**

Garante que a instância do Firebase seja inicializada apenas uma vez em ambientes cliente e servidor.

`// lib/firebase.ts`  
`import { initializeApp, getApps } from "firebase/app";`

`const firebaseConfig = { ... };`  
`const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];`  
`export default app;`

### **4.2. Padrão Strategy (Sistema de Filtros)**

Utilizado para os filtros do "Mural de Vagas" e "Projetos Sociais", permitindo extensibilidade sem modificar os componentes de UI.

### **4.3. Atomic Design**

Organização do diretório /components em:

- **Atoms:** Botões, Inputs, Tipografia.
- **Molecules:** Barra de Busca, Itens de Navegação.
- **Organisms:** Navbar, Footer, Lista de Vagas.
- **Templates:** Layout da Landing Page.

## **5\. Estrutura do Projeto**

`/src`  
 `/app          # Next.js App Router (Páginas e Layouts)`  
 `/components   # Componentes UI (Atomic Design)`  
 `/hooks        # React Hooks Customizados`  
 `/lib          # Configurações de terceiros (Firebase, Analytics)`  
 `/services     # Chamadas de API e Lógica de Negócio`  
 `/styles       # Tailwind e CSS Global`  
 `/types        # Definições de TypeScript`

## **6\. Performance e Segurança**

- **Otimização de Imagens:** Uso do next/image para conversão automática para WebP.
- **Regras de Segurança:** Firestore Security Rules para impedir escritas não autorizadas.
- **Variáveis de Ambiente:** Uso de .env.local para chaves do Firebase, mantendo-as fora do controle de versão público.

Versão do Documento: 1.1.0  
Autor: Winston (BMad Architect)
