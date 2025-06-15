#!/usr/bin/env ts-node

import * as fs from 'fs'
import * as path from 'path'
import { execSync } from 'child_process'
import OpenAI from 'openai'
import slugify from 'slugify'
import dotenv from 'dotenv'

// Carregar variáveis de ambiente
dotenv.config({ path: path.resolve(__dirname, '../../../.env') })

// Configuração
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const DEFAULT_SITE = process.env.DEFAULT_SITE || 'site-template'
const POSTS_PER_DAY = parseInt(process.env.POSTS_PER_DAY || '5')

if (!OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY não encontrada nas variáveis de ambiente')
    process.exit(1)
}

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
})

// Tópicos de exemplo (você pode personalizar ou buscar de uma API)
const TOPICS = [
    'Inteligência Artificial e Automação',
    'Tecnologias Emergentes',
    'Desenvolvimento Web Moderno',
    'Tendências em UX/UI Design',
    'Sustentabilidade e Tecnologia',
    'Segurança Cibernética',
    'Blockchain e Criptomoedas',
    'Internet das Coisas (IoT)',
    'Realidade Virtual e Aumentada',
    'Machine Learning para Iniciantes',
    'DevOps e Cloud Computing',
    'Programação para Móveis',
    'Data Science e Analytics',
    'Startups e Empreendedorismo Tech',
    'Futuro do Trabalho Remoto'
]

interface PostContent {
    title: string
    description: string
    content: string
    tags: string[]
    image?: string
}

async function generatePostContent(topic: string): Promise<PostContent> {
    console.log(`🤖 Gerando conteúdo para: ${topic}`)

    const prompt = `
Você é um especialista em ${topic}. Escreva um artigo informativo e envolvente sobre este tópico.

Requisitos:
- Título atrativo e otimizado para SEO
- Descrição de 150-160 caracteres
- Artigo de 800-1200 palavras
- Tom profissional mas acessível
- Inclua exemplos práticos quando possível
- 3-5 tags relevantes
- Formatação em Markdown
- Subseções com ## e ###

Responda APENAS no formato JSON:
{
  "title": "Título do artigo",
  "description": "Descrição breve",
  "content": "Conteúdo completo em markdown",
  "tags": ["tag1", "tag2", "tag3"]
}
`

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 2000,
        })

        const responseContent = completion.choices[0]?.message?.content
        if (!responseContent) {
            throw new Error('Resposta vazia da OpenAI')
        }

        // Parse do JSON da resposta
        const jsonMatch = responseContent.match(/\{[\s\S]*\}/)
        if (!jsonMatch) {
            throw new Error('Formato JSON não encontrado na resposta')
        }

        const postData = JSON.parse(jsonMatch[0]) as PostContent

        console.log(`✅ Conteúdo gerado: ${postData.title}`)
        return postData

    } catch (error) {
        console.error(`❌ Erro ao gerar conteúdo para ${topic}:`, error)
        throw error
    }
}

async function generateImage(prompt: string): Promise<string | undefined> {
    // TODO: Implementar geração de imagem com DALL-E 3
    // if (process.env.DALLE_ORG_ID) {
    //   try {
    //     const response = await openai.images.generate({
    //       model: "dall-e-3",
    //       prompt: `Professional blog header image: ${prompt}`,
    //       size: "1792x1024",
    //       quality: "standard",
    //       n: 1,
    //     })
    //     return response.data[0]?.url
    //   } catch (error) {
    //     console.warn('⚠️ Erro ao gerar imagem:', error)
    //   }
    // }
    return undefined
}

function createMDXFile(postData: PostContent, siteId: string): string {
    const today = new Date().toISOString().split('T')[0]
    const slug = slugify(postData.title, { lower: true, strict: true })

    const frontmatter = `---
title: "${postData.title}"
description: "${postData.description}"
date: "${today}"
tags: [${postData.tags.map(tag => `"${tag}"`).join(', ')}]
site: "${siteId}"
draft: false
featured: false
${postData.image ? `image: "${postData.image}"` : ''}
---

${postData.content}`

    return frontmatter
}

async function savePost(postData: PostContent, siteId: string): Promise<string> {
    const today = new Date().toISOString().split('T')[0]
    const slug = slugify(postData.title, { lower: true, strict: true })
    const filename = `${today}-${slug}.mdx`

    // Criar diretório se não existir
    const sitePath = path.join(__dirname, '..', 'sites', siteId)
    if (!fs.existsSync(sitePath)) {
        fs.mkdirSync(sitePath, { recursive: true })
    }

    const filePath = path.join(sitePath, filename)
    const mdxContent = createMDXFile(postData, siteId)

    fs.writeFileSync(filePath, mdxContent)
    console.log(`📝 Post salvo: ${filePath}`)

    return filePath
}

function getRandomTopics(count: number): string[] {
    const shuffled = [...TOPICS].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
}

async function commitChanges() {
    try {
        const today = new Date().toISOString().split('T')[0]
        execSync('git add .', { cwd: path.join(__dirname, '../../..') })
        execSync(`git commit -m "chore(content): add daily posts ${today}"`, {
            cwd: path.join(__dirname, '../../..')
        })
        console.log('✅ Mudanças commitadas com sucesso')
    } catch (error) {
        console.warn('⚠️ Erro ao fazer commit (talvez não há mudanças):', error)
    }
}

async function main() {
    console.log('🚀 Iniciando geração de posts diários...')
    console.log(`📊 Configuração:`)
    console.log(`   - Site: ${DEFAULT_SITE}`)
    console.log(`   - Posts por dia: ${POSTS_PER_DAY}`)

    const topics = getRandomTopics(POSTS_PER_DAY)
    const generatedPosts: string[] = []

    for (const topic of topics) {
        try {
            const postData = await generatePostContent(topic)
            const image = await generateImage(postData.title)

            if (image) {
                postData.image = image
            }

            const filePath = await savePost(postData, DEFAULT_SITE)
            generatedPosts.push(filePath)

            // Pequena pausa entre as chamadas da API
            await new Promise(resolve => setTimeout(resolve, 1000))

        } catch (error) {
            console.error(`❌ Erro ao processar tópico "${topic}":`, error)
            continue
        }
    }

    if (generatedPosts.length > 0) {
        console.log(`\n✅ ${generatedPosts.length} posts gerados com sucesso!`)
        console.log('📋 Arquivos criados:')
        generatedPosts.forEach(file => console.log(`   - ${file}`))

        // Fazer commit automático
        await commitChanges()
    } else {
        console.log('❌ Nenhum post foi gerado.')
        process.exit(1)
    }
}

// Executar script se chamado diretamente
if (require.main === module) {
    main().catch((error) => {
        console.error('❌ Erro fatal:', error)
        process.exit(1)
    })
} 