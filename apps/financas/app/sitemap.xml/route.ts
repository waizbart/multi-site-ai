// @ts-nocheck
import { getPostsBySite } from '@multi-site-ai/content'
import { getSiteConfig } from '@multi-site-ai/config'

const SITE_ID = 'financas'

export function GET() {
    const posts = getPostsBySite(SITE_ID)
    const { url } = getSiteConfig(SITE_ID)
    const baseUrl = url.replace(/\/$/, '')

    const urls = [
        `<url><loc>${baseUrl}</loc></url>`,
        ...posts.map((p) => `<url><loc>${baseUrl}/${p.slug}</loc><lastmod>${new Date(p.date).toISOString()}</lastmod></url>`),
    ].join('')

    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`
    return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
}