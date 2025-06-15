#!/usr/bin/env ts-node

/*
 * Gera posts diários para TODOS os sites cadastrados em packages/config.
 * 1. Descobre os tópicos em alta usando google-trends-api a partir das keywords do próprio site.
 * 2. Usa OpenAI GPT para produzir o conteúdo em Markdown seguindo boas práticas de SEO.
 * 3. Salva o .mdx em packages/content/sites/<site-id>/.
 * 4. Faz commit automático com git.
 */

import * as fs from 'fs'
import * as path from 'path'
import { execSync } from 'child_process'
import OpenAI from 'openai'
import slugify from 'slugify'
import dotenv from 'dotenv'
import * as googleTrends from 'google-trends-api'

// Importa configs dos sites diretamente da fonte TS
import { siteConfigs } from '../../config/src/sites'
import type { SiteConfig } from '../../config/src/site-config'

// ───────────────────────────────────────────────
// SETUP
// ───────────────────────────────────────────────

dotenv.config({ path: path.resolve(__dirname, '../../../.env') })

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
if (!OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY não encontrada nas variáveis de ambiente')
    process.exit(1)
}

const POSTS_PER_SITE = parseInt(process.env.POSTS_PER_SITE || process.env.POSTS_PER_DAY || '5')
// Se quiser limitar a execução para sites específicos, ex: SITES=tech-news,fin-news
const TARGET_SITES = process.env.SITES
    ? process.env.SITES.split(',').map(s => s.trim())
    : Object.keys(siteConfigs)

const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

interface PostContent {
    title: string
    description: string
    content: string
    tags: string[]
    image?: string
}

// ───────────────────────────────────────────────
// HELPERS
// ───────────────────────────────────────────────

async function getTrendingTopics(
    keywords: string[],
    count = 5,
    geo = 'BR'
): Promise<string[]> {
    if (keywords.length === 0) return []

    const now = new Date()
    const from = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) // últimos 7 dias

    const results = await Promise.all(
        keywords.map(async (k) => {
            try {
                const jsonStr = await googleTrends.interestOverTime({
                    keyword: k,
                    startTime: from,
                    geo,
                })
                const data = JSON.parse(jsonStr).default.timelineData as any[]
                const score = data.reduce((acc, d) => acc + (d.value[0] || 0), 0)
                return { k, score }
            } catch (_) {
                return { k, score: 0 }
            }
        })
    )

    return results
        .sort((a, b) => b.score - a.score)
        .slice(0, count)
        .map((r) => r.k)
}

async function generatePostContent(topic: string): Promise<PostContent> {
    console.log(`🤖 Gerando conteúdo para: ${topic}`)

    const prompt = `Você é um(a) especialista em ${topic}. Escreva um artigo aprofundado e envolvente sobre este assunto.

Requisitos:
- Título chamativo e otimizado para SEO (até 60 caracteres)
- Descrição de 150-160 caracteres
- Artigo entre 1200 e 2000 palavras
- Use ## e ### com palavras-chave relevantes
- Inclua pelo menos uma lista numerada ou tabela
- Finalize com uma conclusão convidando o leitor a comentar
- 3-6 tags pertinentes
- Formato Markdown válido
- Não inclua links externos; use /posts/slug-relacionado onde fizer sentido para links internos

Responda APENAS em JSON neste formato:
{
  "title": "Título do artigo",
  "description": "Descrição breve",
  "content": "Conteúdo completo em markdown",
  "tags": ["tag1", "tag2", "tag3"]
}`

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        max_tokens: 3000,
    })

    const responseContent = completion.choices[0]?.message?.content ?? ''

    const jsonMatch = responseContent.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
        throw new Error('Formato JSON não encontrado na resposta da OpenAI')
    }

    const postData = JSON.parse(jsonMatch[0]) as PostContent
    console.log(`✅ Conteúdo gerado: ${postData.title}`)
    return postData
}

async function generateImage(prompt: string): Promise<string | undefined> {
    // TODO: Implementar geração de imagem com DALL-E 3 caso deseje
    return undefined
}

function createMDXFile(postData: PostContent, siteId: string, siteConfig: SiteConfig): string {
    const todayISO = new Date().toISOString()
    const slug = slugify(postData.title, { lower: true, strict: true })

    const frontmatterLines = [
        '---',
        `title: "${postData.title.replace(/"/g, '\"')}"`,
        `description: "${postData.description.replace(/"/g, '\"')}"`,
        `date: "${todayISO}"`,
        `slug: "${slug}"`,
        `canonical: "${siteConfig.url.replace(/\/$/, '')}/posts/${slug}"`,
        `tags: [${postData.tags.map((tag) => `"${tag}"`).join(', ')}]`,
        `site: "${siteId}"`,
        'draft: false',
        'featured: false',
    ]

    if (postData.image) {
        frontmatterLines.push(`featuredImage: "${postData.image}"`)
    }

    frontmatterLines.push('---', '', postData.content)

    return frontmatterLines.join('\n')
}

async function savePost(postData: PostContent, siteId: string, siteConfig: SiteConfig): Promise<string> {
    const slug = slugify(postData.title, { lower: true, strict: true })
    const filename = `${new Date().toISOString().split('T')[0]}-${slug}.mdx`

    const sitePath = path.join(__dirname, '..', 'sites', siteId)
    if (!fs.existsSync(sitePath)) {
        fs.mkdirSync(sitePath, { recursive: true })
    }

    const filePath = path.join(sitePath, filename)
    const mdxContent = createMDXFile(postData, siteId, siteConfig)

    fs.writeFileSync(filePath, mdxContent)
    console.log(`📝 Post salvo: ${filePath}`)
    return filePath
}

async function commitChanges() {
    try {
        execSync('git add .', { cwd: path.join(__dirname, '../../..') })
        execSync(`git commit -m "chore(content): daily auto-generated posts"`, {
            cwd: path.join(__dirname, '../../..'),
        })
        console.log('✅ Mudanças commitadas com sucesso')
    } catch (error) {
        console.warn('⚠️  Erro ao fazer commit (talvez não há mudanças):', error)
    }
}

// ───────────────────────────────────────────────
// MAIN
// ───────────────────────────────────────────────

async function main() {
    console.log('🚀 Iniciando geração de posts diários...')
    console.log(`📊 Sites alvo: ${TARGET_SITES.join(', ')}`)
    console.log(`📄 Posts por site: ${POSTS_PER_SITE}`)

    const generatedFiles: string[] = []

    for (const siteId of TARGET_SITES) {
        const siteConfig = siteConfigs[siteId]
        if (!siteConfig) {
            console.warn(`⚠️  Configuração não encontrada para o site: ${siteId}`)
            continue
        }

        console.log(`\n📰 Site: ${siteId}`)
        let topics: string[] = []
        try {
            topics = await getTrendingTopics(siteConfig.seo.keywords, POSTS_PER_SITE)
        } catch (err) {
            console.warn('⚠️  Falha ao obter tópicos em alta, usando keywords aleatórias')
            topics = [...siteConfig.seo.keywords].sort(() => 0.5 - Math.random()).slice(0, POSTS_PER_SITE)
        }

        for (const topic of topics) {
            try {
                const postData = await generatePostContent(topic)
                const image = await generateImage(postData.title)
                if (image) postData.image = image

                const filePath = await savePost(postData, siteId, siteConfig)
                generatedFiles.push(filePath)

                // Respeita rate-limit da OpenAI
                await new Promise((r) => setTimeout(r, 1000))
            } catch (err) {
                console.error(`❌ Erro ao gerar post para o tópico "${topic}":`, err)
            }
        }
    }

    if (generatedFiles.length) {
        await commitChanges()
        console.log('\n✅ Concluído! Posts gerados:')
        generatedFiles.forEach((f) => console.log('   -', f))
    } else {
        console.log('❌ Nenhum post gerado.')
        process.exit(1)
    }
}

if (require.main === module) {
    main().catch((err) => {
        console.error('❌ Erro fatal:', err)
        process.exit(1)
    })
} 