# 💈 Barberflow

Este é o repositório principal (Monorepo) do Barberflow, gerido com [Turborepo](https://turbo.build/) e [pnpm](https://pnpm.io/).

## 📦 Estrutura do Projeto

O projeto está dividido em várias aplicações independentes dentro da pasta `apps/`:

- `apps/panel`: Painel administrativo (Next.js 16 + Supabase + Tailwind CSS) - Deploy via Cloudflare Workers (OpenNext).
- `apps/web`: Landing page / Site público.
- `apps/mobile`: Aplicação móvel (Expo / React Native).

## 🚀 Como iniciar o projeto localmente

**1. Instalar as dependências na raiz:**
\`\`\`bash
pnpm install
\`\`\`

**2. Iniciar o ambiente de desenvolvimento de todas as aplicações simultaneamente:**
\`\`\`bash
pnpm dev
\`\`\`

**3. Iniciar apenas o Painel Administrativo:**
\`\`\`bash
pnpm --filter panel run dev
\`\`\`

## ☁️ Deploy (Cloudflare)

O deploy do `panel` é gerido automaticamente através do GitHub para a Cloudflare, utilizando a compilação do [OpenNext](https://opennext.js.org/).
