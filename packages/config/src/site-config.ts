export interface SiteConfig {
    name: string
    description: string
    domain: string
    url: string
    logo?: string
    favicon?: string
    adsenseId?: string
    themeColor: string
    defaultLocale: string
    author: {
        name: string
        email: string
        url?: string
    }
    social?: {
        twitter?: string
        github?: string
        linkedin?: string
    }
    seo: {
        defaultTitle: string
        titleTemplate: string
        defaultDescription: string
        keywords: string[]
    }
} 