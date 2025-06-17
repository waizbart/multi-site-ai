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
        bio?: string
        credentials?: string
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
    ymyl?: {
        isYMYL: boolean
        disclaimer?: string
        medicalDisclaimer?: string
        financialDisclaimer?: string
    }
    legal?: {
        privacyPolicyUrl?: string
        termsOfServiceUrl?: string
        cookiePolicyUrl?: string
        aboutUrl?: string
    }
} 