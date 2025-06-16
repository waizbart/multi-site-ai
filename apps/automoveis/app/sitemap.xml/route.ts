// @ts-nocheck
import { getPostsBySite } from '@multi-site-ai/content'
import { getSiteConfig } from '@multi-site-ai/config'

const SITE_ID = 'automoveis'

export function GET() {
    const posts = getPostsBySite(SITE_ID)
    const siteConfig = getSiteConfig(SITE_ID)
    const baseUrl = siteConfig.url.replace(/\/$/, '')

    const urls = [
        `<url><loc>${baseUrl}</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>`,
        ...posts.map((post: any) => `<url><loc>${baseUrl}/${post.slug}</loc><lastmod>${new Date(post.date).toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`),
    ].join('')

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    })
}