# 🏗️ Arquitetura Modular Multi-Site AI

## 🎯 Visão Geral

Esta arquitetura permite criar **múltiplos sites** com a **mesma estrutura**, onde cada site precisa apenas de:

- ✅ **Configuração específica** (nome, domínio, cores, etc.)
- ✅ **Posts/conteúdo específico** (artigos únicos por site)
- ✅ **Arquivos mínimos de configuração**

## 📁 Estrutura do Projeto

```
multi-site-ai/
├── packages/
│   ├── shared-app/          # 🔧 Componentes/páginas compartilhadas
│   │   ├── src/
│   │   │   ├── components/  # Layout, componentes reutilizáveis
│   │   │   ├── pages/       # HomePage, PostPage
│   │   │   └── lib/         # Lógica de posts
│   │   └── package.json
│   ├── config/              # ⚙️ Configurações dos sites
│   │   └── src/sites/       # Uma config por site
│   ├── content/             # 📝 Conteúdo por site
│   │   └── sites/           # Uma pasta por site
│   └── ui/                  # 🎨 Componentes de UI
└── apps/
    ├── site-template/       # 🌐 Site exemplo
    ├── meu-blog/           # 🌐 Seu blog
    └── tech-news/          # 🌐 Site de notícias
```

## 🚀 Como Criar um Novo Site

### Método 1: Script Automático (Recomendado)

```bash
node scripts/create-site.js meu-blog "Meu Blog Pessoal" "Blog sobre tecnologia e programação"
```

### Método 2: Manual

1. **Criar aplicação**:

```bash
mkdir apps/meu-blog
cd apps/meu-blog
```

2. **Criar arquivos mínimos**:
   - `package.json` (dependências básicas)
   - `app/layout.tsx` (3 linhas!)
   - `app/page.tsx` (3 linhas!)
   - `app/[slug]/page.tsx` (6 linhas!)
   - `app/globals.css` (copiar do template)

3. **Adicionar configuração**:
   - `packages/config/src/sites/meu-blog.ts`

4. **Criar pasta de conteúdo**:
   - `packages/content/sites/meu-blog/`

## 📋 Arquivos Mínimos por Site

### `apps/meu-blog/app/layout.tsx`

```typescript
import { getSiteConfig } from '@multi-site-ai/config'
import { createRootLayout, createLayoutMetadata } from '@multi-site-ai/shared-app'
import './globals.css'

const SITE_ID = 'meu-blog'
const siteConfig = getSiteConfig(SITE_ID)

export const metadata = createLayoutMetadata(siteConfig)
export default createRootLayout(siteConfig)
```

### `apps/meu-blog/app/page.tsx`

```typescript
import { createHomePage } from '@multi-site-ai/shared-app'

const SITE_ID = 'meu-blog'

export const revalidate = 60
export default createHomePage(SITE_ID)
```

### `apps/meu-blog/app/[slug]/page.tsx`

```typescript
import { createPostPage } from '@multi-site-ai/shared-app'

const SITE_ID = 'meu-blog'
const postPageConfig = createPostPage(SITE_ID)

export const generateStaticParams = postPageConfig.generateStaticParams
export const generateMetadata = postPageConfig.generateMetadata
export const revalidate = postPageConfig.revalidate

export default postPageConfig.PostPage
```

## ⚙️ Configuração do Site

### `packages/config/src/sites/meu-blog.ts`

```typescript
import type { SiteConfig } from '../site-config'

export const meublogConfig: SiteConfig = {
    name: 'Meu Blog Pessoal',
    description: 'Blog sobre tecnologia e programação',
    domain: 'meu-blog.com',
    url: 'https://meu-blog.com',
    themeColor: '#3b82f6',
    defaultLocale: 'pt-BR',
    author: {
        name: 'Seu Nome',
        email: 'contato@meu-blog.com',
        url: 'https://meu-blog.com'
    },
    seo: {
        defaultTitle: 'Meu Blog Pessoal',
        titleTemplate: '%s | Meu Blog',
        defaultDescription: 'Blog sobre tecnologia e programação',
        keywords: ['tecnologia', 'programação', 'blog']
    }
    // ... mais configurações
}
```

## 📝 Conteúdo do Site

### Estrutura de posts

```
packages/content/sites/meu-blog/
├── primeiro-post.mdx
├── segundo-post.mdx
└── tutorial-react.mdx
```

### Exemplo de post

```markdown
---
title: "Meu Primeiro Post"
description: "Descrição do post"
date: "2024-01-15"
tags: ["tutorial", "javascript"]
featured: true
---

# Conteúdo em Markdown

Este é o conteúdo do seu post...
```

## 🔧 Shared App Package

### Componentes disponíveis

- `createRootLayout(siteConfig)` - Layout principal
- `createLayoutMetadata(siteConfig)` - Metadata SEO
- `createHomePage(siteId)` - Página inicial
- `createPostPage(siteId)` - Página de post

### Funções de posts

- `getAllPosts(siteId)` - Todos os posts
- `getPostBySlug(siteId, slug)` - Post específico
- `getFeaturedPosts(siteId, limit)` - Posts em destaque
- `getRecentPosts(siteId, limit)` - Posts recentes

## 🎨 Personalização

### Por site

- **Configuração**: `packages/config/src/sites/[site-id].ts`
- **Conteúdo**: `packages/content/sites/[site-id]/`
- **Estilos**: `apps/[site-id]/app/globals.css`

### Global

- **Componentes**: `packages/shared-app/src/components/`
- **Páginas**: `packages/shared-app/src/pages/`
- **UI**: `packages/ui/src/`

## 🚀 Comandos Úteis

```bash
# Criar novo site
node scripts/create-site.js site-id "Site Name" "Description"

# Rodar site específico
cd apps/meu-blog
npm run dev

# Build todos os sites
npm run build

# Limpar cache
npm run clean
```

## ✅ Vantagens

1. **📦 Reutilização Máxima**: Páginas e componentes compartilhados
2. **⚡ Criação Rápida**: Novos sites em minutos
3. **🔧 Manutenção Fácil**: Atualização em um lugar afeta todos
4. **🎯 Foco no Conteúdo**: Cada site só precisa de config + posts
5. **🏗️ Escalabilidade**: Quantos sites quiser
6. **🎨 Flexibilidade**: Personalização por site quando necessário

## 🔄 Fluxo de Trabalho

1. **Criar site**: `node scripts/create-site.js`
2. **Configurar**: Editar `packages/config/src/sites/[site].ts`
3. **Adicionar posts**: Criar `.mdx` em `packages/content/sites/[site]/`
4. **Desenvolver**: `cd apps/[site] && npm run dev`
5. **Deploy**: `npm run build`

## 🎯 Próximos Passos

1. Testar criação de novo site
2. Personalizar configurações
3. Adicionar mais posts
4. Customizar estilos se necessário
5. Deploy dos sites

---

**🎉 Agora você pode criar sites rapidamente focando apenas no que importa: configuração e conteúdo!**
