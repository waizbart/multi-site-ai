import { NextResponse } from 'next/server'

export async function GET() {
    const robotsContent = `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://portal.neostream.com.br/sitemap.xml

# Crawl delay for better server performance
Crawl-delay: 1

# Disallow search and admin pages
Disallow: /search
Disallow: /admin
Disallow: /api

# Allow important pages
Allow: /politica-de-privacidade
Allow: /termos-de-uso
Allow: /sobre
Allow: /contato
Allow: /ads.txt
`

    return new NextResponse(robotsContent, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=86400',
        },
    })
}