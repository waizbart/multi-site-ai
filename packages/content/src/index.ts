// Import posts from Contentlayer
let contentlayerPosts: any[] = []
try {
    const { allPosts: contentLayerAllPosts } = require('../.contentlayer/generated')
    contentlayerPosts = contentLayerAllPosts || []
    console.log(`Loaded ${contentlayerPosts.length} posts from Contentlayer`)
} catch (error) {
    console.warn('Failed to load posts from Contentlayer:', error instanceof Error ? error.message : String(error))
    console.log('Using static fallback posts')
}

// Static posts as fallback/main source
const staticPostsData: Record<string, any[]> = {
    'automoveis': [
        {
            slug: 'manutencao-preventiva-carros',
            title: 'Guia Completo de Manutenção Preventiva para Carros',
            description: 'Aprenda como manter seu carro em perfeito estado com dicas de manutenção preventiva que vão economizar dinheiro e evitar problemas.',
            date: new Date().toISOString(),
            tags: ['manutenção', 'carros', 'dicas'],
            featured: true,
            site: 'automoveis',
            readingTime: 8,
            draft: false,
            body: {
                raw: '# Guia Completo de Manutenção Preventiva\n\nA manutenção preventiva é essencial para manter seu veículo funcionando perfeitamente...',
                code: '<h1>Guia Completo de Manutenção Preventiva</h1><p>A manutenção preventiva é essencial para manter seu veículo funcionando perfeitamente...</p>'
            },
            url: '/manutencao-preventiva-carros',
            content: '# Guia Completo de Manutenção Preventiva\n\nA manutenção preventiva é essencial para manter seu veículo funcionando perfeitamente...'
        }
    ],
    'financas': [
        {
            slug: 'como-economizar-dinheiro',
            title: '10 Dicas Práticas Para Economizar Dinheiro Todo Mês',
            description: 'Descubra estratégias simples e eficazes para reduzir gastos e aumentar suas economias mensais.',
            date: new Date().toISOString(),
            tags: ['economia', 'finanças', 'dicas'],
            featured: true,
            site: 'financas',
            readingTime: 6,
            draft: false,
            body: {
                raw: '# 10 Dicas Para Economizar Dinheiro\n\nEconomizar dinheiro não precisa ser complicado...',
                code: '<h1>10 Dicas Para Economizar Dinheiro</h1><p>Economizar dinheiro não precisa ser complicado...</p>'
            },
            url: '/como-economizar-dinheiro',
            content: '# 10 Dicas Para Economizar Dinheiro\n\nEconomizar dinheiro não precisa ser complicado...'
        }
    ],
    'tech-news': [
        {
            slug: 'inteligencia-artificial-2024',
            title: 'As Principais Tendências em IA para 2024',
            description: 'Conheça as tecnologias de inteligência artificial que estão revolucionando o mercado em 2024.',
            date: new Date().toISOString(),
            tags: ['ia', 'tecnologia', 'tendências'],
            featured: true,
            site: 'tech-news',
            readingTime: 7,
            draft: false,
            body: {
                raw: '# Tendências em IA para 2024\n\nA inteligência artificial continua evoluindo rapidamente...',
                code: '<h1>Tendências em IA para 2024</h1><p>A inteligência artificial continua evoluindo rapidamente...</p>'
            },
            url: '/inteligencia-artificial-2024',
            content: '# Tendências em IA para 2024\n\nA inteligência artificial continua evoluindo rapidamente...'
        }
    ],
    'saude-alimentacao': [
        {
            slug: 'alimentacao-saudavel',
            title: 'Como Manter uma Alimentação Saudável no Dia a Dia',
            description: 'Dicas práticas para incorporar hábitos alimentares saudáveis na sua rotina diária.',
            date: new Date().toISOString(),
            tags: ['saúde', 'alimentação', 'bem-estar'],
            featured: true,
            site: 'saude-alimentacao',
            readingTime: 5,
            draft: false,
            body: {
                raw: '# Alimentação Saudável no Dia a Dia\n\nManter uma alimentação equilibrada é fundamental...',
                code: '<h1>Alimentação Saudável no Dia a Dia</h1><p>Manter uma alimentação equilibrada é fundamental...</p>'
            },
            url: '/alimentacao-saudavel',
            content: '# Alimentação Saudável no Dia a Dia\n\nManter uma alimentação equilibrada é fundamental...'
        }
    ],
    'viagem-lifestyle': [
        {
            slug: 'destinos-brasil-2024',
            title: 'Os Melhores Destinos para Viajar no Brasil em 2024',
            description: 'Descubra lugares incríveis no Brasil para suas próximas férias, com dicas de roteiros e hospedagem.',
            date: new Date().toISOString(),
            tags: ['viagem', 'brasil', 'turismo'],
            featured: true,
            site: 'viagem-lifestyle',
            readingTime: 9,
            draft: false,
            body: {
                raw: '# Melhores Destinos no Brasil\n\nO Brasil oferece destinos incríveis para todos os gostos...',
                code: '<h1>Melhores Destinos no Brasil</h1><p>O Brasil oferece destinos incríveis para todos os gostos...</p>'
            },
            url: '/destinos-brasil-2024',
            content: '# Melhores Destinos no Brasil\n\nO Brasil oferece destinos incríveis para todos os gostos...'
        }
    ],
    'portal': [
        {
            slug: 'bem-vindos-portal',
            title: 'Bem-vindos ao Portal NeoStream',
            description: 'Conheça nossa plataforma completa de conteúdo sobre tecnologia, negócios e estilo de vida.',
            date: new Date().toISOString(),
            tags: ['portal', 'boas-vindas', 'conteúdo'],
            featured: true,
            site: 'portal',
            readingTime: 4,
            draft: false,
            body: {
                raw: '# Bem-vindos ao Portal\n\nSeja bem-vindo ao nosso portal de conteúdo diversificado...',
                code: '<h1>Bem-vindos ao Portal</h1><p>Seja bem-vindo ao nosso portal de conteúdo diversificado...</p>'
            },
            url: '/bem-vindos-portal',
            content: '# Bem-vindos ao Portal\n\nSeja bem-vindo ao nosso portal de conteúdo diversificado...'
        }
    ]
}

// Export principal de todos os posts
export const allPosts = contentlayerPosts.length > 0 ? contentlayerPosts : Object.values(staticPostsData).flat()

// Tipos
export interface PostType {
    slug: string
    title: string
    description: string
    date: string
    tags: string[]
    site: string
    draft: boolean
    featured: boolean
    readingTime: number
    body: {
        raw: string
        code: string
    }
    url: string
}

// Funções utilitárias
export function getPostsBySite(siteId: string, posts: any[] = allPosts) {
    return posts.filter(post => post.site === siteId && !post.draft)
}

export function getFeaturedPosts(siteId: string, posts: any[] = allPosts, limit = 3) {
    return getPostsBySite(siteId, posts)
        .filter(post => post.featured)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit)
}

export function getRecentPosts(siteId: string, posts: any[] = allPosts, limit = 10) {
    return getPostsBySite(siteId, posts)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit)
}

export function getPostBySlug(slug: string, siteId: string, posts: any[] = allPosts) {
    return posts.find(post => post.slug === slug && post.site === siteId && !post.draft)
}

export function getAllTags(siteId: string, posts: any[] = allPosts) {
    const sitePosts = getPostsBySite(siteId, posts)
    const tagCounts = new Map<string, number>()

    sitePosts.forEach(post => {
        post.tags.forEach((tag: string) => {
            tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
        })
    })

    return Array.from(tagCounts.entries())
        .sort(([, a], [, b]) => b - a)
        .map(([tag, count]) => ({ tag, count }))
}

export function getPostsByTag(tag: string, siteId: string, posts: any[] = allPosts) {
    return getPostsBySite(siteId, posts)
        .filter(post => post.tags.includes(tag))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
} 