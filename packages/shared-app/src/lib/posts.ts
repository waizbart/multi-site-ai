import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Post {
    slug: string
    title: string
    description: string
    date: string
    tags: string[]
    featured: boolean
    site: string
    readingTime: number
    content: string
}

export function getPostsDir(siteId: string): string {
    // Try multiple possible paths for posts
    const possiblePaths = [
        // Development - from apps directory
        path.resolve(process.cwd(), '../../packages/content/sites', siteId),
        // Build context - from project root
        path.resolve(process.cwd(), 'packages/content/sites', siteId),
        // Alternative build context
        path.resolve(__dirname, '../../../content/sites', siteId),
        // Vercel deployment
        path.resolve('/var/task', 'packages/content/sites', siteId),
        // Local relative path
        path.join(__dirname, '../../../packages/content/sites', siteId)
    ]

    for (const possiblePath of possiblePaths) {
        if (fs.existsSync(possiblePath)) {
            console.log(`Found posts directory at: ${possiblePath}`)
            return possiblePath
        }
    }

    console.warn('Posts directory not found in any of the expected locations:', possiblePaths)
    return possiblePaths[0] // Return first path as fallback
}

export function getAllPosts(siteId: string): Post[] {
    try {
        const POSTS_DIR = getPostsDir(siteId)

        if (!fs.existsSync(POSTS_DIR)) {
            console.warn('Posts directory does not exist:', POSTS_DIR)
            return getStaticPosts(siteId)
        }

        const files = fs.readdirSync(POSTS_DIR)
        const mdxFiles = files.filter(file => file.endsWith('.mdx'))

        if (mdxFiles.length === 0) {
            console.warn('No MDX files found in:', POSTS_DIR)
            return getStaticPosts(siteId)
        }

        const posts = mdxFiles
            .map(file => {
                try {
                    const filePath = path.join(POSTS_DIR, file)
                    const fileContent = fs.readFileSync(filePath, 'utf8')
                    const { data, content } = matter(fileContent)

                    const slug = file.replace('.mdx', '')
                    const readingTime = Math.ceil(content.split(' ').length / 200)

                    return {
                        slug,
                        title: data.title || 'Título não encontrado',
                        description: data.description || 'Descrição não encontrada',
                        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
                        tags: Array.isArray(data.tags) ? data.tags : [],
                        featured: Boolean(data.featured),
                        site: data.site || siteId,
                        readingTime,
                        content
                    }
                } catch (error) {
                    console.error(`Error processing file ${file}:`, error)
                    return null
                }
            })
            .filter(Boolean) as Post[]

        const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        console.log(`Loaded ${sortedPosts.length} posts for site ${siteId}`)
        return sortedPosts

    } catch (error) {
        console.error('Error loading posts:', error)
        return getStaticPosts(siteId)
    }
}

// Static posts as fallback
function getStaticPosts(siteId: string): Post[] {
    console.log(`Using static fallback posts for site: ${siteId}`)

    const staticPosts: Record<string, Post[]> = {
        'automoveis': [
            {
                slug: 'manutencao-preventiva-carros',
                title: 'Guia Completo de Manutenção Preventiva para Carros',
                description: 'Aprenda como manter seu carro em perfeito estado com dicas de manutenção preventiva que vão economizar dinheiro e evitar problemas.',
                date: new Date().toISOString(),
                tags: ['manutenção', 'carros', 'dicas'],
                featured: true,
                site: siteId,
                readingTime: 8,
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
                site: siteId,
                readingTime: 6,
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
                site: siteId,
                readingTime: 7,
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
                site: siteId,
                readingTime: 5,
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
                site: siteId,
                readingTime: 9,
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
                site: siteId,
                readingTime: 4,
                content: '# Bem-vindos ao Portal\n\nSeja bem-vindo ao nosso portal de conteúdo diversificado...'
            }
        ]
    }

    return staticPosts[siteId] || []
}

export function getPostBySlug(siteId: string, slug: string): Post | null {
    const posts = getAllPosts(siteId)
    return posts.find(post => post.slug === slug) || null
}

export function getFeaturedPosts(siteId: string, limit = 3): Post[] {
    const posts = getAllPosts(siteId)
    return posts.filter(post => post.featured).slice(0, limit)
}

export function getRecentPosts(siteId: string, limit = 6): Post[] {
    const posts = getAllPosts(siteId)
    return posts.slice(0, limit)
} 