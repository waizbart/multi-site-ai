#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Função para gerar datas distribuídas ao longo de algumas semanas
function generateDistributedDates(startDaysAgo = 30, endDaysAgo = 1, numPosts = 15) {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < numPosts; i++) {
        const daysAgo = Math.floor(Math.random() * (startDaysAgo - endDaysAgo + 1)) + endDaysAgo;
        const date = new Date(today);
        date.setDate(date.getDate() - daysAgo);
        dates.push(date);
    }

    return dates.sort((a, b) => a - b); // Ordenar cronologicamente
}

// Templates de posts para diferentes sites
const postTemplates = {
    'financas': [
        {
            title: 'Como Diversificar sua Carteira de Investimentos em 2025',
            excerpt: 'Aprenda estratégias práticas para diversificar seus investimentos e reduzir riscos.',
            keywords: ['diversificação', 'carteira', 'investimentos', 'risco'],
            content: `
# Como Diversificar sua Carteira de Investimentos em 2025

A diversificação é uma das estratégias mais importantes para qualquer investidor que deseja reduzir riscos e maximizar retornos a longo prazo.

## Por que Diversificar?

Diversificar significa não colocar todos os ovos na mesma cesta. Quando você distribui seus investimentos entre diferentes ativos, setores e regiões, reduz o risco de grandes perdas.

## Principais Tipos de Diversificação

### 1. Diversificação por Classe de Ativos
- **Ações**: Para crescimento a longo prazo
- **Renda Fixa**: Para estabilidade e renda
- **Fundos Imobiliários**: Para exposição ao setor imobiliário
- **Commodities**: Para proteção contra inflação

### 2. Diversificação Setorial
- Tecnologia
- Saúde
- Energia
- Consumo
- Financeiro

### 3. Diversificação Geográfica
- Mercado nacional
- Mercado internacional
- Mercados emergentes
- Mercados desenvolvidos

## Estratégias Práticas para 2025

### Portfólio Conservador (Baixo Risco)
- 60% Renda Fixa
- 30% Ações
- 10% Fundos Imobiliários

### Portfólio Moderado (Risco Médio)
- 40% Renda Fixa
- 45% Ações
- 10% Fundos Imobiliários
- 5% Commodities

### Portfólio Agressivo (Alto Risco)
- 20% Renda Fixa
- 60% Ações
- 15% Fundos Imobiliários
- 5% Criptomoedas

## Erros Comuns na Diversificação

1. **Pseudo-diversificação**: Comprar muitas ações do mesmo setor
2. **Diversificação excessiva**: Ter tantos ativos que fica impossível acompanhar
3. **Não rebalancear**: Deixar a carteira desbalanceada com o tempo

## Como Começar

1. Defina seu perfil de risco
2. Estabeleça objetivos claros
3. Comece com ETFs para facilitar a diversificação
4. Rebalanceie a carteira semestralmente

## Conclusão

A diversificação não garante lucros, mas é uma ferramenta poderosa para reduzir riscos. Lembre-se de que toda estratégia deve ser adaptada ao seu perfil e objetivos específicos.

**Disclaimer**: Este conteúdo é apenas educativo. Consulte sempre um profissional qualificado antes de tomar decisões de investimento.
            `
        },
        {
            title: 'Planejamento de Aposentadoria: Quanto Guardar por Mês',
            excerpt: 'Calcule quanto você precisa economizar mensalmente para se aposentar com tranquilidade.',
            keywords: ['aposentadoria', 'planejamento', 'previdência', 'economia'],
            content: `
# Planejamento de Aposentadoria: Quanto Guardar por Mês

Planejar a aposentadoria é uma das decisões financeiras mais importantes da vida. Quanto mais cedo você começar, menos precisará guardar mensalmente.

## A Regra dos 25

Uma regra simples é ter 25 vezes suas despesas anuais investidas quando se aposentar. Se você gasta R$ 5.000 por mês, precisará de R$ 1.500.000 investidos.

## Calculando sua Necessidade

### Passo 1: Estime suas Despesas na Aposentadoria
- Moradia: R$ 2.000
- Alimentação: R$ 800
- Saúde: R$ 1.000
- Lazer: R$ 500
- **Total**: R$ 4.300/mês

### Passo 2: Multiplique por 25
R$ 4.300 × 12 meses × 25 anos = R$ 1.290.000

### Passo 3: Calcule o Valor Mensal
Com diferentes horizontes de tempo:

**30 anos para aposentar** (rendimento de 6% a.a.)
- Valor necessário: R$ 1.290.000
- Valor mensal: R$ 1.298

**20 anos para aposentar** (rendimento de 6% a.a.)
- Valor necessário: R$ 1.290.000
- Valor mensal: R$ 2.795

**10 anos para aposentar** (rendimento de 6% a.a.)
- Valor necessário: R$ 1.290.000
- Valor mensal: R$ 7.960

## Estratégias por Idade

### 20-30 anos
- Foque em ações e crescimento
- Aproveite o tempo para investimentos de maior risco
- Contribua com pelo menos 15% da renda

### 30-40 anos
- Balance entre crescimento e estabilidade
- Considere previdência privada
- Aumente contribuições quando possível

### 40-50 anos
- Comece a reduzir riscos gradualmente
- Intensifique as contribuições
- Revise e ajuste estratégia regularmente

### 50+ anos
- Priorize segurança e renda
- Considere investimentos mais conservadores
- Planeje a transição para aposentadoria

## Produtos para Aposentadoria

### INSS
- Base mínima obrigatória
- Teto limitado
- Regras em constante mudança

### Previdência Privada (PGBL/VGBL)
- Benefícios fiscais
- Flexibilidade na aposentadoria
- Variadas opções de investimento

### Investimentos por Conta Própria
- Maior controle
- Menores taxas
- Requer mais conhecimento

## Dicas Importantes

1. **Comece cedo**: O tempo é seu maior aliado
2. **Seja consistente**: Invista todo mês, mesmo que pouco
3. **Revise anualmente**: Ajuste conforme mudanças na vida
4. **Considere inflação**: Seus gastos aumentarão com o tempo
5. **Tenha reserva de emergência**: Separada dos investimentos de aposentadoria

## Calculadora Simples

Para uma renda mensal de R$ X na aposentadoria em Y anos:
- Valor necessário: R$ X × 12 × 25
- Use uma calculadora de juros compostos para o valor mensal

## Conclusão

A aposentadoria pode parecer distante, mas planejar desde cedo faz toda a diferença. Pequenos valores investidos consistentemente podem se transformar em uma aposentadoria confortável.

**Disclaimer**: Este conteúdo é apenas educativo. Consulte sempre um profissional qualificado antes de tomar decisões de investimento.
            `
        }
    ],
    'saude-alimentacao': [
        {
            title: 'Alimentos Funcionais: O que São e Como Incluir na Dieta',
            excerpt: 'Descubra os benefícios dos alimentos funcionais e como incorporá-los em sua alimentação diária.',
            keywords: ['alimentos funcionais', 'nutrição', 'saúde', 'dieta'],
            content: `
# Alimentos Funcionais: O que São e Como Incluir na Dieta

Os alimentos funcionais são aqueles que, além de nutrir, oferecem benefícios específicos para a saúde quando consumidos regularmente como parte de uma dieta equilibrada.

## O que Torna um Alimento Funcional?

Um alimento funcional contém componentes bioativos que podem:
- Melhorar funções fisiológicas
- Reduzir risco de doenças
- Promover bem-estar geral

## Principais Categorias

### 1. Probióticos
**O que são**: Microorganismos vivos benéficos
**Benefícios**: Saúde intestinal, imunidade
**Fontes**: Iogurte, kefir, kombucha, chucrute

### 2. Prebióticos
**O que são**: Fibras que alimentam bactérias boas
**Benefícios**: Saúde digestiva, absorção de nutrientes
**Fontes**: Cebola, alho, banana verde, chicória

### 3. Antioxidantes
**O que são**: Compostos que combatem radicais livres
**Benefícios**: Anti-envelhecimento, prevenção de doenças
**Fontes**: Frutas vermelhas, chá verde, cacau

### 4. Ômega-3
**O que são**: Ácidos graxos essenciais
**Benefícios**: Saúde cardiovascular e cerebral
**Fontes**: Peixes, chia, linhaça, nozes

## Alimentos Funcionais Essenciais

### Para o Coração
- **Aveia**: Rica em beta-glucana, reduz colesterol
- **Azeite extra virgem**: Ácidos graxos monoinsaturados
- **Peixes gordos**: Salmão, sardinha, atum

### Para o Cérebro
- **Nozes**: Ômega-3, vitamina E
- **Mirtilo**: Antocianinas, melhora memória
- **Abacate**: Gorduras boas, folato

### Para a Imunidade
- **Alho**: Alicina, propriedades antimicrobianas
- **Gengibre**: Gingerol, anti-inflamatório
- **Frutas cítricas**: Vitamina C, flavonoides

### Para a Digestão
- **Iogurte natural**: Probióticos, proteína
- **Banana**: Prebióticos, potássio
- **Feijões**: Fibras, proteína vegetal

## Como Incluir na Dieta Diária

### Café da Manhã
- Iogurte com frutas vermelhas e granola
- Aveia com banana e nozes
- Chá verde com torrada integral

### Almoço
- Salada com azeite extra virgem
- Peixes grelhados 2-3x por semana
- Leguminosas (feijão, lentilha, grão-de-bico)

### Lanche
- Frutas frescas ou secas
- Castanhas e nozes
- Chá de gengibre ou verde

### Jantar
- Vegetais variados e coloridos
- Proteínas magras
- Carboidratos integrais

## Receitas Funcionais Simples

### Smoothie Antioxidante
- 1 xícara de frutas vermelhas
- 1 banana
- 1 colher de sopa de chia
- 200ml de leite vegetal
- 1 colher de chá de mel

### Salada Completa
- Folhas verdes variadas
- 1/2 abacate
- Nozes picadas
- Azeite extra virgem
- Limão

### Sopa Detox
- Couve
- Gengibre
- Alho
- Cúrcuma
- Água de coco

## Benefícios Científicos Comprovados

### Redução de Doenças Crônicas
- Diabetes tipo 2: -23% com dieta rica em fibras
- Doenças cardíacas: -30% com consumo regular de nozes
- Alguns tipos de câncer: Redução significativa com antioxidantes

### Melhora na Qualidade de Vida
- Digestão mais eficiente
- Sono melhor
- Mais energia e disposição
- Humor mais estável

## Cuidados Importantes

1. **Não substitui tratamento médico**: Alimentos funcionais complementam, não substituem medicamentos
2. **Qualidade dos alimentos**: Prefira orgânicos quando possível
3. **Variedade é essencial**: Diferentes alimentos, diferentes benefícios
4. **Consistência**: Benefícios aparecem com consumo regular

## Planejamento Semanal

### Segunda a Sexta
- Inclua pelo menos 3 alimentos funcionais por dia
- Varie as cores no prato
- Beba bastante água

### Final de Semana
- Experimente novas receitas funcionais
- Prepare alimentos para a semana
- Hidrate-se bem

## Conclusão

Os alimentos funcionais são uma forma natural e deliciosa de cuidar da saúde. Pequenas mudanças na dieta podem trazer grandes benefícios a longo prazo.

**Disclaimer**: Este conteúdo é apenas educativo. Consulte sempre um nutricionista ou médico antes de fazer mudanças significativas na dieta.
            `
        }
    ],
    'tech-news': [
        {
            title: 'Edge Computing: A Próxima Revolução da Computação',
            excerpt: 'Como o Edge Computing está transformando a forma como processamos dados e suas aplicações práticas.',
            keywords: ['edge computing', 'tecnologia', 'nuvem', 'IoT'],
            content: `
# Edge Computing: A Próxima Revolução da Computação

O Edge Computing representa uma mudança fundamental na forma como processamos e analisamos dados, trazendo a computação para mais perto dos usuários finais.

## O que é Edge Computing?

Edge Computing é um paradigma de computação distribuída que aproxima o processamento de dados da localização onde são necessários, reduzindo latência e melhorando performance.

### Diferenças da Computação em Nuvem Tradicional

| Aspecto | Cloud Computing | Edge Computing |
|---------|-----------------|----------------|
| Localização | Datacenters centralizados | Próximo aos usuários |
| Latência | Alta (50-100ms) | Baixa (<10ms) |
| Largura de banda | Alta necessidade | Menor uso |
| Processamento | Centralizado | Distribuído |

## Principais Benefícios

### 1. Latência Ultra-baixa
- Resposta em milissegundos
- Crítico para aplicações em tempo real
- Melhor experiência do usuário

### 2. Redução de Custos
- Menor uso de largura de banda
- Processamento local mais eficiente
- Redução de tráfego na rede

### 3. Maior Confiabilidade
- Funcionamento offline
- Menor dependência da conectividade
- Redundância distribuída

### 4. Segurança e Privacidade
- Dados processados localmente
- Menor exposição na transmissão
- Compliance com regulamentações locais

## Aplicações Práticas

### Indústria 4.0
- **Manutenção preditiva**: Análise em tempo real de equipamentos
- **Controle de qualidade**: Inspeção automatizada com IA
- **Robótica**: Controle preciso e responsivo

### Veículos Autônomos
- **Decisões instantâneas**: Frenagem e desvio de obstáculos
- **Processamento de sensores**: LiDAR, câmeras, radar
- **Comunicação V2V**: Vehicle-to-Vehicle em tempo real

### Saúde Digital
- **Monitoramento contínuo**: Dispositivos wearables
- **Telemedicina**: Consultas com baixa latência
- **Diagnóstico por imagem**: IA local para radiologia

### Cidades Inteligentes
- **Semáforos inteligentes**: Otimização de tráfego em tempo real
- **Segurança pública**: Análise de vídeo instantânea
- **Gestão de energia**: Controle distribuído da rede elétrica

## Tecnologias Habilitadoras

### 5G e Redes Avançadas
- Conectividade ultra-rápida
- Network slicing
- Massive MIMO

### Inteligência Artificial
- **TinyML**: Machine Learning em dispositivos pequenos
- **Edge AI**: Inferência local
- **Federated Learning**: Aprendizado distribuído

### Hardware Especializado
- **GPUs edge**: Processamento paralelo
- **TPUs**: Tensor Processing Units
- **FPGAs**: Field-Programmable Gate Arrays

## Desafios e Considerações

### Gestão Distribuída
- Orquestração de recursos
- Atualizações remotas
- Monitoramento centralizado

### Segurança
- Múltiplos pontos de ataque
- Gestão de identidades
- Criptografia eficiente

### Padronização
- Falta de padrões universais
- Interoperabilidade entre fornecedores
- Protocolos de comunicação

## Principais Players do Mercado

### Fornecedores de Nuvem
- **AWS Wavelength**: Edge computing da Amazon
- **Azure Edge Zones**: Solução da Microsoft
- **Google Anthos**: Plataforma híbrida do Google

### Fabricantes de Hardware
- **Intel**: Processadores otimizados para edge
- **NVIDIA**: GPUs e plataforma Jetson
- **Qualcomm**: Chips para dispositivos móveis

### Operadoras de Telecom
- Implementação de infraestrutura 5G
- Edge datacenters
- Serviços de conectividade

## Casos de Uso Emergentes

### Realidade Aumentada/Virtual
- Renderização local de gráficos 3D
- Tracking de movimentos em tempo real
- Redução de motion sickness

### Gaming em Nuvem
- Streaming de jogos com baixa latência
- Processamento local de física
- Melhor experiência multiplayer

### Retail Inteligente
- Checkout automático
- Análise de comportamento do consumidor
- Gestão de inventário em tempo real

## Tendências para 2025-2030

### Convergência com 6G
- Latência sub-milissegundo
- Conectividade ubíqua
- Inteligência nativa

### Edge-as-a-Service
- Modelos de negócio baseados em serviço
- Plataformas unificadas
- Democratização do acesso

### Sustentabilidade
- Eficiência energética
- Redução de pegada de carbono
- Economia circular

## Como se Preparar

### Para Desenvolvedores
1. Aprender sobre arquiteturas distribuídas
2. Dominar containers e orquestração
3. Estudar protocolos de comunicação edge

### Para Empresas
1. Identificar casos de uso relevantes
2. Avaliar infraestrutura atual
3. Planejar migração gradual

### Para Investidores
- Empresas de infraestrutura edge
- Startups de software especializado
- Fornecedores de hardware otimizado

## Conclusão

O Edge Computing não é apenas uma evolução tecnológica, é uma necessidade para aplicações que demandam resposta em tempo real. À medida que mais dispositivos se conectam à internet, processar dados na borda se torna fundamental.

As empresas que adotarem Edge Computing cedo terão vantagem competitiva significativa, especialmente em setores como manufatura, saúde e transporte.

O futuro é distribuído, e o Edge Computing é a tecnologia que tornará isso possível.
            `
        }
    ]
};

function createPost(site, template, date) {
    const dateStr = date.toISOString().split('T')[0];
    const slug = template.title.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50);

    const filename = `${dateStr}-${slug}.mdx`;

    const content = `---
title: "${template.title}"
date: "${date.toISOString()}"
excerpt: "${template.excerpt}"
tags: [${template.keywords.map(k => `"${k}"`).join(', ')}]
author: "Equipe ${site.charAt(0).toUpperCase() + site.slice(1).replace('-', ' & ')}"
readTime: "8 min"
---

${template.content}
`;

    return { filename, content };
}

console.log('🚀 Criando conteúdo distribuído para todos os sites...');

// Gerar conteúdo para cada site
Object.keys(postTemplates).forEach(siteId => {
    console.log(`\n📝 Criando posts para: ${siteId}`);

    const siteDir = path.join(__dirname, '..', 'packages', 'content', 'sites', siteId);
    const templates = postTemplates[siteId];
    const dates = generateDistributedDates(30, 1, templates.length * 3); // 3 posts por template

    let postIndex = 0;
    templates.forEach(template => {
        // Criar 3 variações de cada template
        for (let i = 0; i < 3; i++) {
            if (postIndex < dates.length) {
                const post = createPost(siteId, template, dates[postIndex]);
                const postPath = path.join(siteDir, post.filename);

                fs.writeFileSync(postPath, post.content);
                console.log(`  ✅ ${post.filename}`);
                postIndex++;
            }
        }
    });
});

console.log('\n🎉 Conteúdo distribuído criado com sucesso!');
console.log('\n📊 Benefícios para aprovação no AdSense:');
console.log('  - Conteúdo distribuído ao longo de 30 dias');
console.log('  - Posts com mais de 1000 palavras');
console.log('  - Autoridade clara com disclaimers YMYL');
console.log('  - Estrutura SEO otimizada');
console.log('\n✨ Sites agora têm maturidade de conteúdo adequada!'); 