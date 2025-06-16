// @ts-nocheck
import { MetadataRoute } from 'next'
import { getPostsBySite } from '@multi-site-ai/content'
import { getSiteConfig } from '@multi-site-ai/config'

const SITE_ID = 'viagem-lifestyle'

export function GET(): MetadataRoute.Sitemap {
    const posts = getPostsBySite(SITE_ID)
    const siteConfig = getSiteConfig(SITE_ID)
    const baseUrl = siteConfig.url.replace(/\/$/, '')
    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...posts.map((post: any) => ({
            url: `${baseUrl}/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: 'weekly',
            priority: 0.8,
        })),
    ]
}