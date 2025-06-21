import * as googleTrends from 'google-trends-api'

/**
 * Informações de uma palavra-chave candidata a virar post.
 */
export interface KeywordInfo {
    /** Consulta exatamente como aparece nos resultados */
    query: string
    /** Score simplificado de tendência (0-100) */
    trendScore: number
    /** Valor estimado de CPC em dólares – stubado enquanto não integramos Ads/DFS */
    cpcUsd: number
}

/**
 * Obtém consultas em alta perto das "seed keywords" e atribui um score de tendência.
 * Para cada seed chamamos `relatedQueries` e pegamos as queries "rising".
 *
 * Se a API falhar, devolvemos as próprias seeds com score aleatório para não travar o pipeline.
 */
export async function fetchTrendingQueries(
    seedKeywords: string[],
    geo = 'BR'
): Promise<KeywordInfo[]> {
    if (!seedKeywords.length) return []

    const all: KeywordInfo[] = []
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

    for (const seed of seedKeywords) {
        try {
            const jsonStr = await googleTrends.relatedQueries({ keyword: seed, startTime: since, geo })
            const data = JSON.parse(jsonStr)
            const rising: any[] | undefined = data?.default?.rising ?? []

            for (const item of rising ?? []) {
                all.push({
                    query: item.query as string,
                    trendScore: item.value as number,
                    cpcUsd: Math.random() * 2 + 0.5 // TODO integrar com Keyword Planner
                })
            }
        } catch (err) {
            /* falha silenciosa – provavelmente quota/timeout */
        }
    }

    // Fallback: se nada encontrado, usa seeds
    if (!all.length) {
        return seedKeywords.map((k) => ({ query: k, trendScore: Math.random() * 50 + 10, cpcUsd: 1 }))
    }

    return all
}

/**
 * Seleciona os tópicos de maior valor ordenando por (trendScore × log10(cpc))
 */
export async function pickHighValueTopics(
    seedKeywords: string[],
    count = 5,
    geo = 'BR'
): Promise<KeywordInfo[]> {
    const list = await fetchTrendingQueries(seedKeywords, geo)

    console.log(list)

    const scored = list.map((k) => ({
        ...k,
        score: k.trendScore * Math.log10(k.cpcUsd + 1)
    }))

    scored.sort((a, b) => b.score - a.score)

    // Elimina duplicados mantendo o de maior score
    const uniq: KeywordInfo[] = []
    const seen = new Set<string>()
    for (const item of scored) {
        if (!seen.has(item.query.toLowerCase())) {
            uniq.push(item)
            seen.add(item.query.toLowerCase())
        }
        if (uniq.length >= count) break
    }
    return uniq.slice(0, count)
}

/**
 * Busca trending searches diárias (top 20) para um país.
 */
export async function fetchDailyTrendingTopics(geo = 'BR', count = 10): Promise<KeywordInfo[]> {
    try {
        const jsonStr = await googleTrends.dailyTrends({ geo })
        const data = JSON.parse(jsonStr)
        const searches: any[] = data?.default?.trendingSearchesDays?.[0]?.trendingSearches ?? []
        return searches.slice(0, count).map((s: any) => ({
            query: s.title.query as string,
            trendScore: (s.formattedTraffic || '0').replace(/[^\d]/g, '') as any as number,
            cpcUsd: 1, // sem informação de CPC
        }))
    } catch (_) {
        return []
    }
}

/**
 * Busca uma combinação híbrida de:
 * 1. Tendências gerais atuais (fonte primária)
 * 2. Tendências relacionadas às keywords do site (fonte secundária)
 * 
 * Isso garante que sempre acompanhamos o que está "hot" mas mantemos relevância para o nicho.
 */
export async function fetchHybridTrendingTopics(
    siteKeywords: string[],
    count = 5,
    geo = 'BR'
): Promise<KeywordInfo[]> {
    const results: KeywordInfo[] = []

    // 1º: Busca tendências gerais atuais (60% dos posts)
    const generalTrendingCount = Math.ceil(count * 0.6)
    try {
        const generalTrends = await fetchDailyTrendingTopics(geo, generalTrendingCount * 2) // pega mais para filtrar

        // Filtra tendências que tenham alguma relação com as keywords do site
        const relevantTrends = generalTrends.filter(trend => {
            const queryLower = trend.query.toLowerCase()
            return siteKeywords.some(keyword =>
                queryLower.includes(keyword.toLowerCase()) ||
                keyword.toLowerCase().includes(queryLower) ||
                // Palavras relacionadas por proximidade semântica básica
                shareCommonWords(queryLower, keyword.toLowerCase())
            )
        })

        // Se temos tendências relevantes, usa elas; senão pega as primeiras tendências gerais
        const trendsToUse = relevantTrends.length > 0 ? relevantTrends : generalTrends
        results.push(...trendsToUse.slice(0, generalTrendingCount))

    } catch (err) {
        console.warn('⚠️  Falha ao buscar tendências gerais')
    }

    // 2º: Completa com tendências específicas das keywords do site (40% dos posts)
    const specificTrendingCount = count - results.length
    if (specificTrendingCount > 0) {
        try {
            const specificTrends = await pickHighValueTopics(siteKeywords, specificTrendingCount, geo)
            results.push(...specificTrends)
        } catch (err) {
            console.warn('⚠️  Falha ao buscar tendências específicas')
            // Fallback final: usa keywords aleatórias do site
            const fallbackKeywords = siteKeywords
                .sort(() => Math.random() - 0.5)
                .slice(0, specificTrendingCount)
                .map(k => ({
                    query: k,
                    trendScore: Math.random() * 30 + 20,
                    cpcUsd: 1
                }))
            results.push(...fallbackKeywords)
        }
    }

    // Remove duplicados e garante que não excede o count
    const unique = results.filter((item, index, arr) =>
        arr.findIndex(other => other.query.toLowerCase() === item.query.toLowerCase()) === index
    )

    return unique.slice(0, count)
}

/**
 * Verifica se duas strings compartilham palavras em comum (relevância semântica básica)
 */
function shareCommonWords(str1: string, str2: string): boolean {
    const words1 = str1.split(/\s+/).filter(w => w.length > 3) // palavras com mais de 3 chars
    const words2 = str2.split(/\s+/).filter(w => w.length > 3)

    return words1.some(w1 => words2.some(w2 => w1.includes(w2) || w2.includes(w1)))
}
