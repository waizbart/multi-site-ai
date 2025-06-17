import Script from 'next/script'
import type { SiteConfig } from '@multi-site-ai/config'

interface StructuredDataProps {
    siteConfig: SiteConfig
    page?: {
        title: string
        description: string
        url: string
        publishedAt?: string
        modifiedAt?: string
        author?: string
    }
}

export function StructuredData({ siteConfig, page }: StructuredDataProps) {
    const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": siteConfig.name,
        "description": siteConfig.description,
        "url": siteConfig.url,
        "logo": siteConfig.logo ? `${siteConfig.url}${siteConfig.logo}` : undefined,
        "contactPoint": {
            "@type": "ContactPoint",
            "email": siteConfig.author.email,
            "contactType": "Customer Service"
        },
        "sameAs": Object.values(siteConfig.social || {}).filter(Boolean)
    }
    
    const websiteData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": siteConfig.name,
        "description": siteConfig.description,
        "url": siteConfig.url,
        "publisher": {
            "@type": "Organization",
            "name": siteConfig.name
        }
    }
    
    const breadcrumbData = page ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteConfig.url
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": page.title,
                "item": page.url
            }
        ]
    } : null
    
    const articleData = page && page.publishedAt ? {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": page.title,
        "description": page.description,
        "url": page.url,
        "datePublished": page.publishedAt,
        "dateModified": page.modifiedAt || page.publishedAt,
        "author": {
            "@type": "Person",
            "name": page.author || siteConfig.author.name
        },
        "publisher": {
            "@type": "Organization",
            "name": siteConfig.name,
            "logo": siteConfig.logo ? `${siteConfig.url}${siteConfig.logo}` : undefined
        }
    } : null
    
    return (
        <>
            <Script
                id="organization-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationData)
                }}
            />
            <Script
                id="website-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteData)
                }}
            />
            {breadcrumbData && (
                <Script
                    id="breadcrumb-structured-data"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(breadcrumbData)
                    }}
                />
            )}
            {articleData && (
                <Script
                    id="article-structured-data"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(articleData)
                    }}
                />
            )}
        </>
    )
}