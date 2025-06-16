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

            console.log(rising)

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