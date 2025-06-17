// Sistema de fallback robusto para carregamento de posts
import { staticPosts } from './posts'

// Tentar importar do Contentlayer gerado, com fallback
let allPosts: any[] = []

try {
    // Tentar importar os posts do Contentlayer
    const contentlayerPosts = require('../.contentlayer/generated')
    allPosts = contentlayerPosts.allPosts || []
} catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.warn('Contentlayer posts not available, using static fallback:', errorMessage)
    allPosts = staticPosts
}

export { allPosts }

// Exportar tipos e interfaces
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
    url?: string
}

export type { Post as PostType }

// Função para obter posts por site
export function getPostsBySite(siteId: string): Post[] {
    return allPosts.filter(post => post.site === siteId) || []
}

// Re-exportar posts estáticos para backup
export { staticPosts }

export function getFeaturedPosts(siteId: string, limit = 3) {
    return getPostsBySite(siteId)
        .filter((post: any) => post.featured)
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit)
}

export function getRecentPosts(siteId: string, limit = 10) {
    return getPostsBySite(siteId)
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit)
}

export function getPostBySlug(slug: string, siteId: string) {
    return allPosts.find((post: any) => post.slug === slug && post.site === siteId && !post.draft)
}

export function getAllTags(siteId: string) {
    const posts = getPostsBySite(siteId)
    const tagCounts = new Map<string, number>()

    posts.forEach((post: any) => {
        post.tags.forEach((tag: string) => {
            tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
        })
    })

    return Array.from(tagCounts.entries())
        .sort(([, a], [, b]) => b - a)
        .map(([tag, count]) => ({ tag, count }))
}

export function getPostsByTag(tag: string, siteId: string) {
    return getPostsBySite(siteId)
        .filter((post: any) => post.tags.includes(tag))
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
} 