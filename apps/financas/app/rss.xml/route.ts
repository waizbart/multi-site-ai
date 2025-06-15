// @ts-nocheck
import { getPostsBySite } from '@multi-site-ai/content'
import { getSiteConfig } from '@multi-site-ai/config'

const SITE_ID = 'financas'

export async function GET() {
    const posts = getPostsBySite(SITE_ID)
    const siteConfig = getSiteConfig(SITE_ID)
    const baseUrl = siteConfig.url.replace(/\/$/, '')

    const items = posts.map((post: any) => {
        const link = `${baseUrl}/${post.slug}`
        return (
            '<item>' +
            '<title><![CDATA[' + post.title + ']]></title>' +
            '<link>' + link + '</link>' +
            '<description><![CDATA[' + post.description + ']]></description>' +
            '<pubDate>' + new Date(post.date).toUTCString() + '</pubDate>' +
            '<guid isPermaLink="true">' + link + '</guid>' +
            '</item>'
        )
    }).join('')

    const feed =
        '<?xml version="1.0" encoding="UTF-8"?>' +
        '<rss version="2.0">' +
        '<channel>' +
        '<title>' + siteConfig.name + '</title>' +
        '<link>' + baseUrl + '</link>' +
        '<description>' + siteConfig.description + '</description>' +
        items +
        '</channel>' +
        '</rss>'

    return new Response(feed, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
        },
    })
}