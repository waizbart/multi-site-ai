// @ts-nocheck
import { MetadataRoute } from 'next'
import { getSiteConfig } from '@multi-site-ai/config'

const SITE_ID = 'viagem-lifestyle'

export default function robots(): MetadataRoute.Robots {
    const siteConfig = getSiteConfig(SITE_ID)
    const baseUrl = siteConfig.url.replace(/\/$/, '')
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    }
}