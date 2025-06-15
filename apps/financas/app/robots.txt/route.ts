// @ts-nocheck
import { getSiteConfig } from '@multi-site-ai/config'

const SITE_ID = 'financas'

export function GET() {
    const { url } = getSiteConfig(SITE_ID)
    const baseUrl = url.replace(/\/$/, '')
    const content = `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml`;
    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain',
        },
    })
}