import { allPosts, getPostsBySite, getFeaturedPosts as getContentFeaturedPosts, getRecentPosts as getContentRecentPosts, getPostBySlug as getContentPostBySlug } from '@multi-site-ai/content'

export interface Post {
    slug: string
    title: string
    description: string
    date: string
    tags: string[]
    featured: boolean
    site: string
    readingTime: number
    body: {
        raw: string
        code: string
    }
    url: string
    content?: string // For backward compatibility
}

// Static posts as fallback
const staticPosts: Record<string, Post[]> = {
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
            body: {
                raw: '# Bem-vindos ao Portal\n\nSeja bem-vindo ao nosso portal de conteúdo diversificado...',
                code: '<h1>Bem-vindos ao Portal</h1><p>Seja bem-vindo ao nosso portal de conteúdo diversificado...</p>'
            },
            url: '/bem-vindos-portal',
            content: '# Bem-vindos ao Portal\n\nSeja bem-vindo ao nosso portal de conteúdo diversificado...'
        }
    ]
}

export function getAllPosts(siteId: string): Post[] {
    try {
        // Try to get posts from content package
        const posts = getPostsBySite(siteId, allPosts || [])

        if (posts && posts.length > 0) {
            console.log(`Loaded ${posts.length} posts for site ${siteId} from content package`)
            return posts
        }

        // Fallback to static posts
        console.log(`Using static fallback posts for site: ${siteId}`)
        return staticPosts[siteId] || []

    } catch (error) {
        console.error('Error loading posts from content package:', error)
        console.log(`Using static fallback posts for site: ${siteId}`)
        return staticPosts[siteId] || []
    }
}

export function getPostBySlug(siteId: string, slug: string): Post | null {
    try {
        // Try content package first
        const post = getContentPostBySlug(slug, siteId, allPosts || [])
        if (post) return post

        // Fallback to static posts
        const posts = getAllPosts(siteId)
        return posts.find(p => p.slug === slug) || null

    } catch (error) {
        console.error('Error getting post by slug:', error)
        const posts = getAllPosts(siteId)
        return posts.find(p => p.slug === slug) || null
    }
}

export function getFeaturedPosts(siteId: string, limit = 3): Post[] {
    try {
        // Try content package first
        const posts = getContentFeaturedPosts(siteId, allPosts || [], limit)
        if (posts && posts.length > 0) return posts

        // Fallback to static posts
        const allSitePosts = getAllPosts(siteId)
        return allSitePosts.filter(post => post.featured).slice(0, limit)

    } catch (error) {
        console.error('Error getting featured posts:', error)
        const allSitePosts = getAllPosts(siteId)
        return allSitePosts.filter(post => post.featured).slice(0, limit)
    }
}

export function getRecentPosts(siteId: string, limit = 10): Post[] {
    try {
        // Try content package first
        const posts = getContentRecentPosts(siteId, allPosts || [], limit)
        if (posts && posts.length > 0) return posts

        // Fallback to static posts
        const allSitePosts = getAllPosts(siteId)
        return allSitePosts
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, limit)

    } catch (error) {
        console.error('Error getting recent posts:', error)
        const allSitePosts = getAllPosts(siteId)
        return allSitePosts
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, limit)
    }
} 