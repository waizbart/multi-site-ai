import type { SiteConfig } from '../site-config'

export const financasConfig: SiteConfig = {
    name: 'Finanças',
    description: 'Dicas práticas de finanças pessoais, investimentos e orçamento familiar',
    domain: 'financas.neostream.com.br',
    url: 'https://financas.neostream.com.br',
    logo: '/logo.png',
    favicon: '/favicon.ico',
    adsenseId: 'ca-pub-6189411019780384',
    themeColor: '#10b981',
    defaultLocale: 'pt-BR',
    author: {
        name: 'Omar Haddad',
        email: 'omar@neostream.com.br',
        url: 'https://financas.neostream.com.br/sobre',
        bio: 'Com carreira no setor bancário e startups financeiras, Omar escreve sobre economia, criptomoedas e educação financeira. Sua missão é ajudar leitores a entender e melhorar sua relação com o dinheiro.',
        credentials: 'Economista e Especialista em Fintech | Dubai, Emirados Árabes Unidos',
        image: '/autor.png'
    },
    social: {
        twitter: '@FinancasNeoStream',
        github: 'username/financas',
        linkedin: 'financas-neostream'
    },
    seo: {
        defaultTitle: 'Finanças',
        titleTemplate: '%s | Finanças',
        defaultDescription: 'Dicas práticas de finanças pessoais, investimentos inteligentes e orçamento familiar. Aprenda a economizar dinheiro, investir melhor e alcançar independência financeira.',
        keywords: [
            // Finanças pessoais
            "como economizar dinheiro",
            "dicas orçamento familiar",
            "controle de gastos aplicativo",
            "planilha financeira grátis",
            "educação financeira básica",
            "como sair das dívidas",
            "reserva de emergência",
            "planejamento financeiro 2025",
            "metas financeiras anuais",
            "organizar finanças casal",
            "finanças pessoais para autônomos",
            "investir com pouco dinheiro",
            "quitar dívidas rapidamente",
            "regra 50 30 20 explicação",
            "custo de vida capital vs interior",
            "finanças para universitários",
            "como negociar dívidas",
            "habitos financeiros saudáveis",
            "calculadora juros compostos",
            "apps de cashback comparativo",

            // Investimentos – Renda fixa
            "melhor cdb 2025",
            "taxa selic hoje",
            "tesouro direto rendimentos",
            "tesouro ipca 2025 vale a pena",
            "tesouro prefixado previsões",
            "poupança vale a pena",
            "lci e lca isentas",
            "debentures incentivadas",
            "cdb liquidez diária",
            "comparativo tesouro vs cdb",
            "renda fixa pós fixado",
            "simulador renda fixa",
            "taxas cdb bancos digitais",
            "como investir em debêntures",
            "fundo de renda fixa baixo risco",
            "indexador cdi significado",
            "fundos de inflação 2025",
            "taxa adm fundos renda fixa",
            "melhor lca 2025",
            "selic previsão 2026",

            // Fundos de investimento
            "melhores fiis 2025",
            "fundos imobiliários dividendos",
            "fundo de ações vs multimercado",
            "fundo internacional dolarizado",
            "taxa de performance como funciona",
            "fundo de previdência vantagens",
            "gestão ativa vs passiva",
            "como escolher um fundo multimercado",
            "melhor fii de logística",
            "fundo cambial proteção",
            "cotização d+0 significado",
            "come cotas fundo de investimento",
            "taxa de saída fundo multimercado",
            "fundos de criptomoedas",
            "fundo quantitativo rentabilidade",
            "rating anbid categorias",
            "benchmark ibovespa outperformance",
            "risco de liquidez em fiis",
            "fundo small caps 2025",
            "plano previdência vs fundos",

            // Ações e renda variável
            "como comprar ações",
            "melhores ações para 2025",
            "dividendos mensais carteira",
            "taxa de corretagem zero",
            "investir na bolsa iniciante",
            "ipo calendário brasil 2025",
            "small caps promissoras",
            "blue chips brasileiras",
            "estratégia buy and hold",
            "swing trade dicas",
            "day trade vale a pena",
            "análise fundamentalista básica",
            "análise técnica suportes",
            "valuation múltiplos",
            "dividend yield alto",
            "bdrs como investir",
            "rebalanceamento carteira trimestral",
            "pl curto prazo",
            "stop loss configurar",
            "long short estratégia",

            // Criptomoedas & Blockchain
            "bitcoin preço hoje",
            "como comprar criptomoedas",
            "imposto de renda cripto 2025",
            "ethereum staking tutorial",
            "carteira hardware segurança",
            "melhores altcoins 2025",
            "defi oportunidades",
            "stablecoins rendimento",
            "taxas binance brasil",
            "cotas etf cripto na bolsa",
            "web3 conceitos básicos",
            "airdrops futuros",
            "metaverso tokens",
            "regulação cripto brasil",
            "cripto ativos risco",
            "tokenização de ativos reais",
            "nft investimento vale a pena",
            "hashrate significado",
            "mineração de bitcoin caseiro",
            "criptomoedas promissoras centavos",

            // Cartões & Bancos digitais
            "cartão de crédito sem anuidade",
            "melhores cartões cashback 2025",
            "cartão black benefícios",
            "limite cartão aumentar",
            "banco digital conta grátis",
            "pix limite aumentar",
            "open finance vantagens",
            "cartão de crédito para acumular milhas",
            "cartão premium não exige renda",
            "cartão para negativado",
            "cartão pré pago internacional",
            "banco digital cdb 100 por cento cdi",
            "cartão virtual segurança",
            "apple pay bancos compatíveis",
            "google pay brasil",
            "spread bancário o que é",
            "cashback na fatura",
            "programa de pontos transferência",
            "cartão de crédito corporativo",
            "pool miles cartões parceiros",

            // Empréstimos & Crédito pessoal
            "empréstimo consignado taxas",
            "empréstimo pessoal online",
            "antecipação fgts vale a pena",
            "financiamento veículos 2025",
            "taxas crédito imobiliário",
            "refinanciamento imobiliário",
            "score baixo como melhorar",
            "cartão consignado benefícios",
            "taxa de juros rotativo",
            "empréstimo peer to peer",
            "microcrédito para MEI",
            "simulador financiamento caixa",
            "portabilidade crédito imobiliário",
            "financiamento estudantil particular",
            "cartão de crédito parcelamento fatura",
            "crédito para negativados",
            "cheque especial juros",
            "empréstimo com garantia de veículo",
            "empréstimo para energia solar",
            "refis governo 2025",

            // Impostos & Contabilidade
            "imposto de renda 2025 prazo",
            "como declarar investimentos",
            "cálculo ganho de capital ações",
            "isencao imposto renda fiis",
            "carnê leão autônomos",
            "darfs atrasadas negociar",
            "lucro presumido x real",
            "mei faturamento limite",
            "nota fiscal de serviço eletrônica",
            "tabela inss 2025",
            "redução icms energia",
            "tributação cripto moedas",
            "bitributação dividendos",
            "simples nacional vantagens",
            "taxas alfandegarias importação",
            "lci e lca ir isento",
            "como gerar darf",
            "planejamento tributário empresas",
            "dedução despesas médicas",
            "regime caixa competência",

            // Seguros & Previdência
            "seguro de vida barato",
            "previdência privada dedução ir",
            "vgbL vs pgbL diferenças",
            "previdência complementar empresa",
            "fundos de pensão rendimentos",
            "seguro auto mais barato",
            "cobertura seguro residencial",
            "seguro viagem internacional",
            "capitalização vale a pena",
            "assistência 24h seguro",
            "portabilidade previdência privada",
            "taxa carregamento 0",
            "tábua atuarial impacto",
            "previdência fiscal progressivo",
            "seguro pet preços",
            "seguro prestamista é obrigatório",
            "renda vitalícia simulação",
            "aposentadoria planejamento",
            "ranking seguradoras solvencia",
            "taxa interna de retorno previdência",

            // Macroeconomia & Câmbio
            "dólar hoje cotação",
            "previsão dólar 2025",
            "inflação ipca acumulada",
            "cdi taxa diária",
            "igp-m reajuste aluguel",
            "swap cambial definição",
            "balanço de pagamentos brasil",
            "taxa de desemprego dados",
            "gdp brasil 2024",
            "decision copom próxima reunião",
            "fmi projeções econômicas",
            "relatório focus expectativa",
            "risco país cds brasil",
            "superávit primário meta",
            "taxa juros fed impacto",
            "política fiscal brasil",
            "selic meta bc",
            "cenário macro 2025",
            "guerra impacta commodities",
            "câmbio turismo vs comercial"
        ]
    },
    ymyl: {
        isYMYL: true,
        financialDisclaimer: 'As informações financeiras fornecidas neste site são apenas para fins educacionais e informativos. Não oferecemos consultoria financeira ou de investimentos. Sempre consulte um profissional financeiro qualificado antes de tomar decisões de investimento. Os investimentos envolvem riscos e podem resultar em perdas.'
    },
    legal: {
        privacyPolicyUrl: '/politica-de-privacidade',
        termsOfServiceUrl: '/termos-de-uso',
        cookiePolicyUrl: '/politica-de-cookies',
        aboutUrl: '/sobre'
    }
}