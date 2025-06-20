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
        name: 'Camila Duarte',
        email: 'camila@neostream.com.br',
        url: 'https://viagem-lifestyle.neostream.com.br/sobre',
        bio: 'Camila trocou uma carreira corporativa por uma mochila e nunca mais parou. Latina, LGBTQIA+, e apaixonada por culturas locais, compartilha roteiros, experiências autênticas e dicas práticas para viajantes curiosos.',
        credentials: 'Jornalista e Nômade Digital | Lisboa, Portugal',
        image: '/autor.png'
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
            // Português
            "roteiros de viagem luxo acessível 2025",
            "turismo de bem-estar destinos 2025",
            "viagens fitness retiros saudáveis Brasil",
            "melhores spas com pacote all inclusive",
            "dicas viagem com foco em saúde mental",
            "experiências de luxo com custo moderado",
            "destinos exóticos seguros para família 2025",
            "trilhas e aventuras com conforto e bem-estar",
            "como planejar viagem de luxo econômica",
            "melhor temporada para wellness retreats",

            // Inglês
            "luxury travel experiences under $200",
            "wellness travel retreats 2025 Europe",
            "fitness travel packages available now",
            "best spa resorts all inclusive Caribbean",
            "family friendly exotic destinations 2025",
            "health focused vacation ideas near me",
            "affordable luxury travel tips guide",
            "wellness holidays with yoga and meditation",
            "active travel adventures for families",
            "eco-friendly luxury travel trends"
        ]
    },
    legal: {
        privacyPolicyUrl: '/politica-de-privacidade',
        termsOfServiceUrl: '/termos-de-uso',
        cookiePolicyUrl: '/politica-de-cookies',
        aboutUrl: '/sobre'
    }
}