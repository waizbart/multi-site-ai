import type { SiteConfig } from '../site-config'

export const entretenimentoConfig: SiteConfig = {
    name: 'Entretenimento',
    description: 'Filmes, séries, livros, música e cultura pop - seu portal de entretenimento completo',
    domain: 'entretenimento.neostream.com.br',
    url: 'https://entretenimento.neostream.com.br',
    logo: '/logo.png',
    favicon: '/favicon.ico',
    adsenseId: 'ca-pub-6189411019780384',
    themeColor: '#a855f7',
    defaultLocale: 'pt-BR',
    author: {
        name: 'Equipe Entretenimento NeoStream',
        email: 'entretenimento@neostream.com.br',
        url: 'https://entretenimento.neostream.com.br/sobre',
        bio: 'Críticos especializados em entretenimento, com análises de filmes, séries, livros, música e cultura pop.',
        credentials: 'Equipe formada por críticos de cinema, literatura, música e especialistas em cultura pop.'
    },
    social: {
        twitter: '@EntNeoStream',
        github: 'neostream',
        linkedin: 'entretenimento-neostream'
    },
    seo: {
        defaultTitle: 'Entretenimento',
        titleTemplate: '%s | Entretenimento',
        defaultDescription: 'Reviews de filmes e séries, resenhas de livros, análises de música e tudo sobre cultura pop. Seu portal completo de entretenimento.',
        keywords: [
            'resenhas de filmes 2025',
            'séries Netflix melhores análises',
            'livros mais vendidos críticas',
            'lançamentos cinema brasileiro',
            'streaming plataformas comparação',
            'Oscar 2025 indicações previsões',
            'Emmy Awards séries premiadas',
            'literatura brasileira contemporânea',
            'música pop internacional tendências',
            'cultura pop fenômenos virais',
            'anime mangá recomendações',
            'documentários imperdíveis Netflix',
            'filmes horror suspense melhores',
            'comédia romântica lançamentos',
            'ficção científica fantasia clássicos',
            'biografias celebridades lançamentos',
            'thriller psicológico recomendações',
            'drama histórico filmes séries',
            'musicais teatro adaptações cinema',
            'quadrinhos graphic novels melhores',
            'podcast entretenimento cultura',
            'games narrativa storytelling',
            'cosplay cultura geek eventos',
            'festivais cinema internacional',
            'Comic Con eventos cultura nerd',
            'celebridades entrevistas exclusivas',
            'behind the scenes bastidores',
            'trilogias sagas cinematográficas',
            'remakes reboots vale a pena',
            'crítica cinematográfica profissional'
        ],
    },
    legal: {
        privacyPolicyUrl: '/politica-de-privacidade',
        termsOfServiceUrl: '/termos-de-uso',
        cookiePolicyUrl: '/politica-de-cookies',
        aboutUrl: '/sobre'
    }
} 