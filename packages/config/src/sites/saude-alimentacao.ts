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
        name: 'Dr. Isaac Owusu',
        email: 'isaac@neostream.com.br',
        url: 'https://saude-alimentacao.neostream.com.br/sobre',
        bio: 'Com formação em medicina tropical e saúde pública, Dr. Isaac escreve para tornar a ciência médica compreensível. Focado em bem-estar, nutrição e desmistificação de temas de saúde, é conhecido por sua linguagem clara e humana.',
        credentials: 'Médico e Divulgador Científico | Acra, Gana',
        image: '/autor.png'
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
            // Hábitos saudáveis & estilo de vida
            "como ter uma alimentação saudável",
            "hábitos saudáveis diários",
            "rotina matinal bem-estar",
            "hidratação quantidade ideal",
            "sono e imunidade relação",
            "reduzir açúcar dieta",
            "alimentação balanceada cardápio",
            "planejamento de refeições semanais",
            "guias alimentares brasileiros 2025",
            "pirâmide alimentar atualizada",

            // Dietas & padrões alimentares
            "dieta mediterrânea benefícios",
            "dieta plant-based cardápio",
            "dieta low carb riscos",
            "dieta cetogênica vegetariana",
            "jejum intermitente protocolo 16 8",
            "dieta DASH pressão alta",
            "dieta flexitariana o que é",
            "dieta paleolítica cardápio",
            "dieta nórdica alimentos",
            "dieta FODMAP sintomas",

            // Nutrientes & suplementos
            "proteína vegetal fontes",
            "ômega 3 benefícios",
            "vitamina D dose diária",
            "cálcio para veganos",
            "ferro de origem vegetal",
            "vitamina B12 suplementação",
            "zinco sistema imune",
            "magnésio sono reparador",
            "creatina para mulheres",
            "colágeno hidrolisado pele",

            // Saúde intestinal & microbiota
            "probióticos naturais",
            "prebióticos fibras solúveis",
            "sim bióticos diferença",
            "alimentos fermentados kefir",
            "saúde intestinal inflamação",
            "síndrome do intestino irritável dieta",
            "permeabilidade intestinal sintomas",
            "microbioma e obesidade",
            "kombucha caseiro receita",
            "fibras prebióticas inulina",

            // Controle de peso & metabolismo
            "cardápio para emagrecer",
            "taxa metabólica basal calcular",
            "deficit calórico seguro",
            "treino aliado à dieta",
            "alimentos termogênicos naturais",
            "controle de porções dicas",
            "saciedade proteínas altas",
            "índice glicêmico tabela",
            "reeducação alimentar passos",
            "efeito sanfona como evitar",

            // Doenças crônicas & prevenção
            "alimentação para diabetes tipo 2",
            "hipertensão dieta sem sal",
            "colesterol alto o que comer",
            "gordura no fígado dieta",
            "artrite alimentos anti-inflamatórios",
            "saúde cardíaca ômega 3",
            "câncer prevenção alimentar",
            "osteoporose cálcio vitamina D",
            "saúde renal proteína moderada",
            "doença celíaca alimentos proibidos",

            // Saúde mental & alimentação
            "alimentos que melhoram o humor",
            "triptofano e serotonina",
            "dieta e ansiedade",
            "café e saúde mental",
            "nutrição para TDAH",
            "probióticos e depressão",
            "magnésio para ansiedade",
            "dieta anti-inflamatória cérebro",
            "chocolate amargo e bem-estar",
            "chá de camomila relaxante",

            // Alimentação infantil & gestação
            "introdução alimentar BLW",
            "lancheira saudável escola",
            "necessidades nutricionais adolescência",
            "suplemento pré-natal",
            "ácido fólico gravidez",
            "alergias alimentares criança",
            "vitamina D pediatria",
            "obesidade infantil prevenção",
            "amamentação e dieta materna",
            "ferro em bebês",

            // Esporte & performance
            "nutrição esportiva runners",
            "pré treino natural alimentos",
            "carboidrato durante maratona",
            "recuperação muscular pós treino",
            "hidratação isotônica caseira",
            "dieta para ganho de massa",
            "low carb e performance",
            "beta alanina efeitos",
            "sais minerais reposição",
            "periodização nutricional",

            // Segurança dos alimentos
            "lista de agrotóxicos 2025",
            "lavar frutas corretamente",
            "higienização de verduras",
            "data de validade interpretação",
            "armazenamento carnes geladeira",
            "congelamento seguro alimentos",
            "temperatura zona de perigo",
            "contaminação cruzada evitar",
            "boas práticas cozinha doméstica",
            "rotulagem frontal alertas",

            // Sustentabilidade & consumo consciente
            "dieta sustentável benefícios",
            "pegada de carbono alimentos",
            "reduzir desperdício de comida",
            "compostagem resíduos orgânicos",
            "comer sazonal Brasil",
            "proteína de inseto tendência",
            "horta caseira apartamento",
            "embalagens recicláveis alimento",
            "comprar de produtores locais",
            "orgânicos certificados",

            // Alimentos funcionais & tendências
            "pó de matcha propriedades",
            "golden milk receita",
            "chia benefícios saúde",
            "aveia beta glucana",
            "cúrcuma antiinflamatório",
            "spirulina proteína",
            "cogumelos adaptógenos",
            "ashwagandha cortisol",
            "oleaginosas e coração",
            "cacau flavonoides",

            // Bebidas & hidratação
            "água saborizada receitas",
            "chá verde emagrece",
            "café filtrado vs espresso",
            "suco verde detox",
            "kombucha benefícios intestino",
            "bebidas isotônicas caseiras",
            "leite vegetal qual escolher",
            "smoothie proteico vegano",
            "refresco sem açúcar",
            "hidratação verão dicas",

            // Culpa & alimentação emocional
            "fome emocional como controlar",
            "mindful eating exercícios",
            "ansiedade e compulsão alimentar",
            "gatilhos alimentares identificação",
            "auto compaixão dieta",
            "planejamento refeições intuitivo",
            "tcc para compulsão alimentar",
            "registro alimentar diário",
            "comer consciente técnicas",
            "saborear sem culpa",

            // Gastronomia & culinária saudável
            "air fryer receitas saudáveis",
            "cozinha low carb fácil",
            "substituir glúten receitas",
            "doces sem açúcar",
            "molhos saudáveis caseiros",
            "proteína vegetal hambúrguer",
            "panificação integral dicas",
            "temperos naturais ervas",
            "batch cooking domingo",
            "cozinha zero desperdício",

            // Rotinas & ferramentas
            "aplicativos contagem caloria",
            "smartwatch saúde métricas",
            "balança de bioimpedância caseira",
            "jejum intermitente app",
            "planilha cardápio semanal",
            "nutricionista online consulta",
            "delivery comida saudável",
            "assinatura de refeições fit",
            "marketplace produtos naturais",
            "podcasts nutrição brasileira"
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