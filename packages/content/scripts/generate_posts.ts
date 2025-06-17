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
import matter from 'gray-matter'

// O script próprio de descoberta de keywords
import { KeywordInfo, fetchDailyTrendingTopics, pickHighValueTopics } from '../src/keywordService'
import { safeSlug, withRetry } from '../src/utils'
import { z } from 'zod'

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

// Definição de sites alvo
// Prioridade: argumentos de CLI > variável de ambiente SITES > todos os sites (excluindo site-template)
const cliArgs = process.argv.slice(2).filter((arg) => !arg.startsWith('-'))

const TARGET_SITES = cliArgs.length
    ? cliArgs
    : process.env.SITES
        ? process.env.SITES.split(',').map((s) => s.trim()).filter(Boolean)
        : Object.keys(siteConfigs)

            // Remover duplicatas e garantir que não inclua o template nem o portal
            .filter((s, idx, arr) => arr.indexOf(s) === idx) // unique
            .filter((s) => s !== 'site-template' && s !== 'portal')

const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

export interface PostContent {
    slug?: string // opcional na resposta da IA
    title: string
    description: string
    content: string
    tags: string[]
    image?: string
    faq?: { question: string; answer: string }[]
}

// Adiciona variação de personas e formatos de artigo
const PERSONAS = [
    'Especialista Setorial',
    'Analista de Mercado',
    'Engenheiro',
    'Investidor',
    'Entusiasta'
] as const

const TEMPLATES = [
    'How-To Guide',
    'Listicle',
    'Comparativo',
    'FAQ',
    'Review',
    'Case Study',
    'News Flash'
] as const

function randomChoice<T>(arr: readonly T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
}

// ───────────────────────────────────────────────
// HELPERS
// ───────────────────────────────────────────────

function buildPrompt(
    topic: string,
    existingTitles: string[],
    existingPosts: { title: string; slug: string }[],
    template: string,
    persona: string,
    highCpcKeywords: string[]
): string {
    const previous = existingTitles.length
        ? `\n\nTítulos já publicados sobre temas relacionados:\n- ${existingTitles.join('\n- ')}\n\n`
        : ''

    return `INSTRUÇÃO FUNDAMENTAL: Você DEVE escrever EXCLUSIVAMENTE em português brasileiro. Nada em inglês.

Você é ${persona}. Escreva um ${template} otimizado para a consulta "${topic}".${previous}

IMPORTANTE: TODO O CONTEÚDO DEVE SER EM PORTUGUÊS BRASILEIRO (título, descrição, conteúdo, tags, FAQ).

Requisitos:
- H1 (título) até 60 caracteres com palavra-chave principal EM PORTUGUÊS
- Meta descrição 150-160 caracteres EM PORTUGUÊS
- 1200–2500 palavras EM PORTUGUÊS
- Use ## e ### com variações semânticas
- Inclua lista ou tabela
- Gere seção FAQ com 3–5 perguntas EM PORTUGUÊS
- NÃO inclua links internos ou externos no conteúdo
- Utilize pelo menos 3 destas palavras de alto CPC: ${highCpcKeywords.slice(0, 8).join(', ')}
- Tags devem ser EM PORTUGUÊS BRASILEIRO
- Formato Markdown válido

### Regras de Markdown (obrigatório)
1. NÃO coloque "{#id}" em headings.
2. Headings devem ser somente o texto.
3. NÃO inclua nenhum tipo de link no conteúdo.
4. ESCREVA TUDO EM PORTUGUÊS BRASILEIRO.

Responda APENAS em JSON:
{
  "title": "Título do artigo EM PORTUGUÊS",
  "description": "Meta description EM PORTUGUÊS",
  "content": "Markdown do corpo EM PORTUGUÊS",
  "tags": ["tag1 em português", "tag2 em português"],
  "faq": [{"question":"Pergunta em português","answer":"Resposta em português"}]
}`
}

const POST_SCHEMA = z.object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
    tags: z.array(z.string()).optional().default([]),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
    image: z.string().optional(),
})

async function generatePostContent(
    topic: string,
    existingTitles: string[],
    existingPosts: { title: string; slug: string }[],
    template: string,
    persona: string,
    highCpcKeywords: string[]
): Promise<PostContent> {
    console.log(`🤖 Gerando conteúdo para: ${topic} | template=${template} | persona=${persona}`)

    const prompt = buildPrompt(topic, existingTitles, existingPosts, template, persona, highCpcKeywords)

    const completion = await withRetry(() =>
        openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.8,
            max_tokens: 1800,
        })
    )

    const responseContent = completion.choices[0]?.message?.content ?? ''

    const jsonMatch = responseContent.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
        throw new Error('Formato JSON não encontrado na resposta da OpenAI')
    }

    const rawData = JSON.parse(jsonMatch[0])
    const validated = POST_SCHEMA.parse(rawData)
    const postData: PostContent = validated

    console.log(`✅ Conteúdo gerado: ${postData.title}`)
    return postData
}

async function generateImage(prompt: string): Promise<string | undefined> {
    // TODO: Implementar geração de imagem com DALL-E 3 caso deseje
    return undefined
}

function createMDXFile(postData: PostContent, siteId: string, siteConfig: SiteConfig, filename: string): string {
    const todayISO = new Date().toISOString()
    // Extract slug from filename (without .mdx extension) to match the URL path
    const slug = filename.replace('.mdx', '')

    const safeTags = Array.isArray(postData.tags) ? postData.tags.filter((t) => typeof t === 'string') : []

    const frontmatterLines = [
        '---',
        `title: "${postData.title.replace(/"/g, '\\"')}"`,
        `description: "${postData.description.replace(/"/g, '\\"')}"`,
        `date: "${todayISO}"`,
        `slug: "${slug}"`,
        `canonical: "${siteConfig.url.replace(/\/$/, '')}/${slug}"`,
        `tags: [${safeTags.map((tag) => `"${tag}"`).join(', ')}]`,
        `site: "${siteId}"`,
        'draft: false',
        'featured: false',
    ]

    if (postData.image) {
        frontmatterLines.push(`featuredImage: "${postData.image}"`)
    }

    frontmatterLines.push('---', '', postData.content.trim())

    return frontmatterLines.join('\n')
}

async function savePost(postData: PostContent, siteId: string, siteConfig: SiteConfig, existingPosts: { title: string; slug: string }[]): Promise<string> {
    const slug = safeSlug(postData.title, existingPosts.map((p) => p.slug))
    const filename = `${new Date().toISOString().split('T')[0]}-${slug}.mdx`

    const sitePath = path.join(__dirname, '..', 'sites', siteId)
    if (!fs.existsSync(sitePath)) {
        fs.mkdirSync(sitePath, { recursive: true })
    }

    const filePath = path.join(sitePath, filename)
    const mdxContent = createMDXFile(postData, siteId, siteConfig, filename)

    fs.writeFileSync(filePath, mdxContent)
    console.log(`📝 Post salvo: ${filePath}`)
    return filePath
}

async function commitChanges(files: string[]) {
    try {
        execSync(`git add ${files.map((f) => path.relative(path.join(__dirname, '../../..'), f)).join(' ')}`, {
            cwd: path.join(__dirname, '../../..'),
        })
        execSync(`git diff --cached --quiet || git commit -m "chore(content): auto-generated posts"`, {
            cwd: path.join(__dirname, '../../..'),
        })
        console.log('✅ Mudanças commitadas com sucesso')
    } catch (error) {
        console.warn('⚠️  Erro ao fazer commit (talvez não há mudanças):', error)
    }
}

// ───────────────────────────────────────────────
// DUPLICATE AVOIDANCE
// ───────────────────────────────────────────────

function getExistingSlugs(siteId: string): Set<string> {
    const siteDir = path.join(__dirname, '..', 'sites', siteId)
    const slugs = new Set<string>()

    if (!fs.existsSync(siteDir)) return slugs

    const files = fs.readdirSync(siteDir).filter((f) => f.endsWith('.mdx'))

    for (const file of files) {
        try {
            const filePath = path.join(siteDir, file)
            const raw = fs.readFileSync(filePath, 'utf-8')

            // Tenta extrair via frontmatter
            const parsed = matter(raw)
            if (parsed.data && typeof parsed.data.slug === 'string') {
                slugs.add(parsed.data.slug)
                continue
            }

            // Fallback: usa nome do arquivo (removendo data YYYY-MM-DD-)
            const match = file.match(/\d{4}-\d{2}-\d{2}-(.+)\.mdx$/)
            if (match) {
                slugs.add(match[1])
            }
        } catch (_) {
            /* ignore malformed files */
        }
    }

    return slugs
}

function getExistingTitles(siteId: string, limit = 50): string[] {
    const siteDir = path.join(__dirname, '..', 'sites', siteId)
    if (!fs.existsSync(siteDir)) return []

    const files = fs.readdirSync(siteDir).filter((f) => f.endsWith('.mdx'))
        .sort((a, b) => fs.statSync(path.join(siteDir, b)).mtimeMs - fs.statSync(path.join(siteDir, a)).mtimeMs)
        .slice(0, limit)

    const titles: string[] = []
    for (const file of files) {
        try {
            const raw = fs.readFileSync(path.join(siteDir, file), 'utf-8')
            const parsed = matter(raw)
            if (parsed.data && typeof parsed.data.title === 'string') {
                titles.push(parsed.data.title)
            }
        } catch (_) {
            /* ignore */
        }
    }
    return titles
}

function getExistingPosts(siteId: string, limit = 50): { title: string; slug: string }[] {
    const siteDir = path.join(__dirname, '..', 'sites', siteId)
    if (!fs.existsSync(siteDir)) return []

    const files = fs.readdirSync(siteDir).filter((f) => f.endsWith('.mdx'))
        .sort((a, b) => fs.statSync(path.join(siteDir, b)).mtimeMs - fs.statSync(path.join(siteDir, a)).mtimeMs)
        .slice(0, limit)

    const posts: { title: string; slug: string }[] = []
    for (const file of files) {
        try {
            const raw = fs.readFileSync(path.join(siteDir, file), 'utf-8')
            const parsed = matter(raw)
            if (parsed.data && typeof parsed.data.title === 'string' && typeof parsed.data.slug === 'string') {
                posts.push({
                    title: parsed.data.title,
                    slug: parsed.data.slug
                })
            }
        } catch (_) {
            /* ignore */
        }
    }
    return posts
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

        let keywordInfos: KeywordInfo[] = []
        try {
            // 1º: Trending específicos do tema (relatedQueries+score)
            keywordInfos = await pickHighValueTopics(siteConfig.seo.keywords, POSTS_PER_SITE)
            // Fallback: trending geral do país
            if (!keywordInfos.length) {
                keywordInfos = await fetchDailyTrendingTopics('BR', POSTS_PER_SITE)
            }
        } catch (err) {
            console.warn('⚠️  Falha ao obter tópicos em alta, usando keywords aleatórias')
            keywordInfos = siteConfig.seo.keywords.slice(0, POSTS_PER_SITE).map((k) => ({ query: k, trendScore: 10, cpcUsd: 1 }))
        }

        const existingSlugs = getExistingSlugs(siteId)
        const existingTitles = getExistingTitles(siteId)
        const existingPosts = getExistingPosts(siteId)

        // Processamento sequencial para evitar problemas de concorrência
        for (const ki of keywordInfos) {
            const slugCandidate = slugify(ki.query, { lower: true, strict: true })
            if (existingSlugs.has(slugCandidate)) {
                console.log(`ℹ️  Já existe post para o tópico "${ki.query}", pulando.`)
                continue
            }

            const template = randomChoice(TEMPLATES)
            const persona = randomChoice(PERSONAS)
            const highCpcKeywords = keywordInfos.map((k) => k.query)

            try {
                const postData = await generatePostContent(ki.query, existingTitles, existingPosts, template, persona, highCpcKeywords)
                const image = await generateImage(postData.title)
                if (image) postData.image = image

                const filePath = await savePost(postData, siteId, siteConfig, existingPosts)
                generatedFiles.push(filePath)
                existingTitles.push(postData.title)
            } catch (err) {
                console.error(`❌ Erro ao gerar post para o tópico "${ki.query}":`, err)
            }
        }
    }

    if (generatedFiles.length) {
        await commitChanges(generatedFiles)
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