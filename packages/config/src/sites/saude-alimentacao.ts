import type { SiteConfig } from '../site-config'

export const saudealimentacaoConfig: SiteConfig = {
    name: 'Saúde e alimentação',
    description: 'Conteúdo completo sobre saúde, nutrição e bem-estar: receitas saudáveis, dicas de alimentação equilibrada, prevenção de doenças e estilo de vida ativo. Ajude seu corpo a viver melhor.',
    domain: 'saude-alimentacao.neostream.com.br', // TODO: Substitua pelo seu domínio
    url: 'https://saude-alimentacao.neostream.com.br', // TODO: Substitua pela sua URL
    logo: '/logo.png',
    favicon: '/favicon.ico',
    adsenseId: 'ca-pub-6189411019780384', // TODO: Substitua pelo seu ID do AdSense
    themeColor: '#3b82f6', // blue-500
    defaultLocale: 'pt-BR',
    author: {
        name: 'Autor do Saúde e alimentação',
        email: 'contato@saude-alimentacao.neostream.com.br', // TODO: Substitua pelo seu email
        url: 'https://saude-alimentacao.neostream.com.br'
    },
    social: {
        twitter: '@saude-alimentacao', // TODO: Substitua pelo seu Twitter
        github: 'username/saude-alimentacao', // TODO: Substitua pelo seu GitHub
        linkedin: 'company/saude-alimentacao' // TODO: Substitua pelo seu LinkedIn
    },
    seo: {
        defaultTitle: 'Saúde e alimentação',
        titleTemplate: '%s | Saúde e alimentação',
        defaultDescription: 'Conteúdo completo sobre saúde, nutrição e bem-estar: receitas saudáveis, dicas de alimentação equilibrada, prevenção de doenças e estilo de vida ativo. Ajude seu corpo a viver melhor.',
        keywords: [
            "alimentação saudável para emagrecer",
            "como montar dieta equilibrada semanalmente",
            "receitas saudáveis fáceis para o dia a dia",
            "controle de diabetes alimentação ideal",
            "nutrição esportiva: o que comer antes e depois do treino",
            "benefícios da alimentação plant-based",
            "como fortalecer a imunidade com alimentação",
            "dicas para reduzir colesterol naturalmente",
            "receitas veganas simples e saudáveis",
            "alimentos anti-inflamatórios para articulações",

            // Inglês
            "healthy meal prep ideas for weight loss",
            "tips for balanced nutrition and wellness",
            "best foods to boost immune system",
            "plant-based diet for beginners",
            "easy healthy recipes for busy people",
            "nutrition tips for cardio health",
            "anti-inflammatory foods benefits",
            "healthy vegan recipes no-fuss",
            "how to lower cholesterol with diet",
            "wellness tips for mental health foods"
        ]
    }
}