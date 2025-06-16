// @ts-nocheck
import { getSiteConfig } from '@multi-site-ai/config'

const SITE_ID = 'saude-alimentacao'

export function GET() {
    const siteConfig = getSiteConfig(SITE_ID)
    const baseUrl = siteConfig.url.replace(/\/$/, '')

    const robots = `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\nHost: ${baseUrl}`
    return new Response(robots, {
        headers: {
            'Content-Type': 'text/plain',
        },
    })
}