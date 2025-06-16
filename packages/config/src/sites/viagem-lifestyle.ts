import type { SiteConfig } from '../site-config'

export const viagemlifestyleConfig: SiteConfig = {
    name: 'Viagem e lifestyle',
    description: 'Dicas e inspirações de viagens, lifestyle e bem-estar: roteiros exclusivos, luxo acessível, experiências saudáveis e tendências em turismo para quem busca viver melhor.',
    domain: 'viagem-lifestyle.neostream.com.br', // TODO: Substitua pelo seu domínio
    url: 'https://viagem-lifestyle.neostream.com.br', // TODO: Substitua pela sua URL
    logo: '/logo.png',
    favicon: '/favicon.ico',
    adsenseId: 'ca-pub-6189411019780384', // TODO: Substitua pelo seu ID do AdSense
    themeColor: '#3b82f6', // blue-500
    defaultLocale: 'pt-BR',
    author: {
        name: 'Autor do Viagem e lifestyle',
        email: 'contato@viagem-lifestyle.neostream.com.br', // TODO: Substitua pelo seu email
        url: 'https://viagem-lifestyle.neostream.com.br'
    },
    social: {
        twitter: '@viagem-lifestyle', // TODO: Substitua pelo seu Twitter
        github: 'username/viagem-lifestyle', // TODO: Substitua pelo seu GitHub
        linkedin: 'company/viagem-lifestyle' // TODO: Substitua pelo seu LinkedIn
    },
    seo: {
        defaultTitle: 'Viagem e lifestyle',
        titleTemplate: '%s | Viagem e lifestyle',
        defaultDescription: 'Dicas e inspirações de viagens, lifestyle e bem-estar: roteiros exclusivos, luxo acessível, experiências saudáveis e tendências em turismo para quem busca viver melhor.',
        keywords: [
            // TODO: Adicione palavras-chave relevantes
            'blog',
            'conteúdo',
            'artigos'
        ]
    }
}