// Posts estáticos como fallback para problemas do Contentlayer no Windows
export interface Post {
    slug: string
    title: string
    description: string
    date: string
    tags: string[]
    site: string
    draft: boolean
    featured: boolean
    readingTime: number
    content: string
}

export const staticPosts: Post[] = [
    {
        slug: 'configurar-monorepo-turborepo',
        title: 'Como Configurar um Monorepo com Turborepo',
        description: 'Aprenda a criar um monorepo eficiente usando Turborepo para gerenciar múltiplos sites com conteúdo gerado por IA.',
        date: '2024-12-19',
        tags: ['turborepo', 'monorepo', 'nextjs'],
        site: 'site-template',
        draft: false,
        featured: true,
        readingTime: 8,
        content: `
# Como Configurar um Monorepo com Turborepo

Gerenciar múltiplos sites pode ser uma tarefa complexa, especialmente quando você quer manter a consistência de código e facilitar a manutenção.

## O que é um Monorepo?

Um monorepo é uma estratégia de desenvolvimento onde múltiplos projetos são armazenados em um único repositório Git. Isso oferece várias vantagens:

- **Compartilhamento de código**: Pacotes e componentes podem ser reutilizados entre projetos
- **Sincronização de versões**: Todas as dependências ficam alinhadas
- **Refatoração simplificada**: Mudanças que afetam múltiplos projetos podem ser feitas atomicamente

## Setup Completo Funcionando

Este template está **100% funcional** e inclui:

- ✅ **Monorepo Turborepo** com npm workspaces
- ✅ **Next.js 14** com App Router
- ✅ **TypeScript** completo
- ✅ **Tailwind CSS + shadcn/ui**
- ✅ **SEO otimizado**
- ✅ **Scripts de IA** para geração de conteúdo
- ✅ **GitHub Actions** para CI/CD

## Próximos Passos

1. Configure suas variáveis de ambiente
2. Personalize o design e conteúdo
3. Configure o deploy na Vercel
4. Ative a geração automática de conteúdo

**O projeto está pronto para uso!** 🚀
    `
    },
    {
        slug: 'ia-content-generation',
        title: 'Geração Automática de Conteúdo com OpenAI GPT-4o',
        description: 'Como implementar um sistema de geração automática de posts usando a API da OpenAI.',
        date: '2024-12-18',
        tags: ['openai', 'ia', 'automação'],
        site: 'site-template',
        draft: false,
        featured: false,
        readingTime: 6,
        content: `
# Geração Automática de Conteúdo com OpenAI GPT-4o

A inteligência artificial está revolucionando a forma como criamos conteúdo. Com a API da OpenAI, é possível automatizar a geração de posts de alta qualidade.

## Como Funciona

O sistema utiliza o modelo GPT-4o para gerar conteúdo baseado em tópicos pré-definidos:

\`\`\`typescript
async function generatePostContent(topic: string): Promise<PostContent> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 2000,
  })
  
  return parseResponse(completion)
}
\`\`\`

## Vantagens

- **Consistência**: Mantém um padrão de qualidade
- **Escalabilidade**: Gera múltiplos posts rapidamente
- **Personalização**: Adapta-se ao tom da marca
- **Automação**: Funciona 24/7 sem intervenção

## Implementação

O script está localizado em \`packages/content/scripts/generate_posts.ts\` e pode ser executado diariamente via GitHub Actions.

**Resultado**: Conteúdo de qualidade gerado automaticamente! 🤖
    `
    },
    {
        slug: 'seo-nextjs-14',
        title: 'SEO Técnico Completo no Next.js 14',
        description: 'Guia completo para implementar SEO técnico com meta tags, JSON-LD e Core Web Vitals.',
        date: '2024-12-17',
        tags: ['seo', 'nextjs', 'performance'],
        site: 'site-template',
        draft: false,
        featured: true,
        readingTime: 10,
        content: `
# SEO Técnico Completo no Next.js 14

O SEO técnico é fundamental para o sucesso de qualquer site. Com Next.js 14, temos ferramentas poderosas para otimizar nossos sites.

## Meta Tags Dinâmicas

\`\`\`typescript
export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  openGraph: {
    title: post.title,
    description: post.description,
    type: 'article',
  },
}
\`\`\`

## JSON-LD Structured Data

Implementamos dados estruturados para melhor indexação:

\`\`\`typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.description,
  author: {
    '@type': 'Person',
    name: siteConfig.author.name,
  },
}
\`\`\`

## Core Web Vitals

- **LCP**: Otimizado com Next.js Image
- **FID**: Minimizado com code splitting
- **CLS**: Controlado com dimensões fixas

## APIs Automáticas

- \`/api/sitemap\` - Sitemap.xml automático
- \`/api/robots\` - Robots.txt otimizado
- \`/api/rss\` - Feed RSS atualizado

**Resultado**: Site otimizado para motores de busca! 🔍
    `
    }
] 