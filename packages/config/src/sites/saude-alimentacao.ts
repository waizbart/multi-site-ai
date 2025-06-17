import type { SiteConfig } from '../site-config'

export const saudealimentacaoConfig: SiteConfig = {
    name: 'Saúde & Alimentação',
    description: 'Dicas de alimentação saudável, receitas nutritivas e hábitos para uma vida mais saudável',
    domain: 'saude-alimentacao.neostream.com.br',
    url: 'https://saude-alimentacao.neostream.com.br',
    adsenseId: 'ca-pub-6189411019780384',
    themeColor: '#f59e0b',
    defaultLocale: 'pt-BR',
    author: {
        name: 'Equipe Saúde & Alimentação NeoStream',
        email: 'saude@neostream.com.br',
        url: 'https://saude-alimentacao.neostream.com.br/sobre',
        bio: 'Nutricionistas e especialistas em saúde dedicados a compartilhar informações baseadas em evidências científicas.',
        credentials: 'Equipe formada por nutricionistas registrados (CRN) e profissionais de saúde qualificados.'
    },
    social: {
        twitter: '@SaudeNeoStream',
        linkedin: 'saude-alimentacao-neostream'
    },
    seo: {
        defaultTitle: 'Saúde & Alimentação',
        titleTemplate: '%s | Saúde & Alimentação',
        defaultDescription: 'Dicas de alimentação saudável, receitas nutritivas e hábitos para uma vida mais saudável. Informações baseadas em evidências científicas sobre nutrição e bem-estar.',
        keywords: [
            'alimentação saudável para emagrecer',
            'receitas veganas fáceis e nutritivas',
            'dieta anti-inflamatória alimentos',
            'como reduzir colesterol naturalmente',
            'alimentos para saúde do coração',
            'nutrição esportiva pré e pós treino',
            'receitas fit baixo carboidrato',
            'alimentos ricos em fibras lista',
            'dieta mediterrânea benefícios',
            'como aumentar imunidade naturalmente',
            'alimentos probióticos saúde intestinal',
            'receitas detox caseiras eficazes',
            'suplementos vitamínicos necessários',
            'alimentação infantil saudável dicas',
            'como controlar diabetes pela alimentação',
            'alimentos que combatem inflamação',
            'receitas sem glúten deliciosas',
            'dieta cetogênica iniciantes guia',
            'alimentos para ganhar massa muscular',
            'nutrição na terceira idade cuidados',
            'como ler rótulos alimentos corretamente',
            'jejum intermitente benefícios riscos',
            'alimentação consciente mindful eating',
            'vitaminas essenciais mulheres homens',
            'receitas rápidas saudáveis trabalho',
            'alimentos orgânicos vale a pena',
            'hidratação adequada quantidade água',
            'snacks saudáveis para lanches',
            'alimentação equilibrada planejamento semanal',
            'superalimentos lista benefícios científicos'
        ],
    },
    ymyl: {
        isYMYL: true,
        medicalDisclaimer: 'As informações sobre saúde e alimentação fornecidas neste site são apenas para fins educacionais e informativos. Não substituem aconselhamento médico, diagnóstico ou tratamento profissional. Sempre consulte um médico, nutricionista ou outro profissional de saúde qualificado antes de fazer mudanças em sua dieta ou rotina de saúde. Nunca ignore conselhos médicos profissionais ou atrase a busca por tratamento devido a informações encontradas neste site.'
    },
    legal: {
        privacyPolicyUrl: '/politica-de-privacidade',
        termsOfServiceUrl: '/termos-de-uso',
        cookiePolicyUrl: '/politica-de-cookies',
        aboutUrl: '/sobre'
    }
}