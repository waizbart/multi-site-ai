// Importar e exportar do Contentlayer gerado
import { allPosts } from '../.contentlayer/generated'
export { allPosts } from '../.contentlayer/generated'
export type { Post, Post as PostType } from '../.contentlayer/generated'

export function getPostsBySite(siteId: string) {
    return allPosts.filter((post) => post.site === siteId && !post.draft)
}

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