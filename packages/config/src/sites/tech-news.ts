import type { SiteConfig } from '../site-config'

export const technewsConfig: SiteConfig = {
    name: 'Tech News',
    description: 'Últimas notícias e tendências em tecnologia, inovação e ciência',
    domain: 'tech-news.neostream.com.br',
    url: 'https://tech-news.neostream.com.br',
    logo: '/logo.png',
    favicon: '/favicon.ico',
    adsenseId: 'ca-pub-6189411019780384',
    themeColor: '#8b5cf6',
    defaultLocale: 'pt-BR',
    author: {
        name: 'Equipe Tech News NeoStream',
        email: 'tech@neostream.com.br',
        url: 'https://tech-news.neostream.com.br/sobre',
        bio: 'Jornalistas especializados em tecnologia e inovação, com foco em análises aprofundadas e tendências do mercado tech.',
        credentials: 'Equipe formada por jornalistas especializados em tecnologia e analistas do setor tech.'
    },
    social: {
        twitter: '@TechNewsNeoStream',
        github: 'neostream',
        linkedin: 'tech-news-neostream'
    },
    seo: {
        defaultTitle: 'Tech News',
        titleTemplate: '%s | Tech News',
        defaultDescription: 'Últimas notícias e tendências em tecnologia, IA, startups e inovação. Análises aprofundadas do mundo tech e suas implicações para o futuro.',
        keywords: [
            'notícias de tecnologia 2025',
            'inteligência artificial últimas novidades',
            'startups brasileiras inovadoras',
            'GPT-5 data de lançamento oficial',
            'comparação LLM open source melhores',
            'ferramentas de IA para desenvolvedores',
            'tendências tecnológicas futuro próximo',
            'inovações em machine learning',
            'blockchain aplicações práticas 2025',
            'criptomoedas análise mercado atual',
            'venture capital investimentos tech',
            'unicórnios brasileiros tecnologia',
            'transformação digital empresas',
            'cibersegurança ameaças emergentes',
            'cloud computing soluções empresariais',
            'realidade virtual realidade aumentada',
            'internet das coisas IoT aplicações',
            'desenvolvimento web frameworks modernos',
            'programação linguagens populares 2025',
            'DevOps ferramentas essenciais',
            'microsserviços arquitetura escalável',
            'APIs REST GraphQL comparação',
            'bancos de dados NoSQL relacionais',
            'containerização Docker Kubernetes',
            'automação testes software',
            'metodologias ágeis Scrum Kanban',
            'UX UI design tendências 2025',
            'e-commerce tecnologias emergentes',
            'fintech inovações pagamentos digitais',
            'healthtech soluções saúde digital'
        ],
    },
    legal: {
        privacyPolicyUrl: '/politica-de-privacidade',
        termsOfServiceUrl: '/termos-de-uso',
        cookiePolicyUrl: '/politica-de-cookies',
        aboutUrl: '/sobre'
    }
}