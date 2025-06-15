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
    return path.resolve(process.cwd(), '../../packages/content/sites', siteId)
}

export function getAllPosts(siteId: string): Post[] {
    try {
        const POSTS_DIR = getPostsDir(siteId)

        if (!fs.existsSync(POSTS_DIR)) {
            console.warn('Posts directory does not exist:', POSTS_DIR)
            return []
        }

        const files = fs.readdirSync(POSTS_DIR)
        const posts = files
            .filter(file => file.endsWith('.mdx'))
            .map(file => {
                const filePath = path.join(POSTS_DIR, file)
                const fileContent = fs.readFileSync(filePath, 'utf8')
                const { data, content } = matter(fileContent)

                const slug = file.replace('.mdx', '')
                const readingTime = Math.ceil(content.split(' ').length / 200)

                return {
                    slug,
                    title: data.title || '',
                    description: data.description || '',
                    date: data.date || new Date().toISOString(),
                    tags: data.tags || [],
                    featured: data.featured || false,
                    site: data.site || siteId,
                    readingTime,
                    content
                }
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        return posts
    } catch (error) {
        console.warn('Error loading posts:', error)
        return []
    }
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