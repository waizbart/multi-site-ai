import type { SiteConfig } from '../site-config'

export const portalConfig: SiteConfig = {
    name: 'Portal NeoStream',
    description: 'Portal central da NeoStream - Acesse todos os nossos sites especializados em um só lugar',
    domain: 'neostream.com.br',
    url: 'https://neostream.com.br',
    logo: '/logo.png',
    favicon: '/favicon.ico',
    adsenseId: 'ca-pub-6189411019780384',
    themeColor: '#3b82f6', // blue-500
    defaultLocale: 'pt-BR',
    author: {
        name: 'NeoStream',
        email: 'contato@neostream.com.br',
        url: 'https://neostream.com.br'
    },
    social: {
        twitter: '@neostream',
        github: 'neostream',
        linkedin: 'company/neostream'
    },
    seo: {
        defaultTitle: 'Portal NeoStream',
        titleTemplate: '%s | Portal NeoStream',
        defaultDescription: 'Portal central da NeoStream - Acesse todos os nossos sites especializados em um só lugar',
        keywords: [
            'portal neostream',
            'sites especializados',
            'conteúdo de qualidade',
            'finanças pessoais',
            'tecnologia',
            'automóveis',
            'saúde e alimentação',
            'viagem e lifestyle',
            'blog brasileiro',
            'artigos especializados',
            'informação confiável',
            'rede de sites'
        ]
    }
}