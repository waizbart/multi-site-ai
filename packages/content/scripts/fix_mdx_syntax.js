#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

/**
 * Sanitiza o conteúdo MDX para evitar erros de parsing
 */
function sanitizeMDXContent(content) {
    return content
        // Escapa < seguido de números (que podem ser interpretados como tags HTML)
        .replace(/(<)(\d)/g, '&lt;$2')
        // Escapa > seguido de números
        .replace(/(\d)(>)/g, '$1&gt;')
        // Remove caracteres de controle invisíveis
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
        // Normaliza quebras de linha
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
}

function fixMDXFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8')
        const { data, content: bodyContent } = matter(content)

        // Sanitiza o conteúdo
        const sanitizedContent = sanitizeMDXContent(bodyContent)

        // Se houve mudanças, reescreve o arquivo
        if (sanitizedContent !== bodyContent) {
            const newContent = matter.stringify(sanitizedContent, data)
            fs.writeFileSync(filePath, newContent)
            console.log(`✅ Corrigido: ${filePath}`)
            return true
        }

        return false
    } catch (error) {
        console.error(`❌ Erro ao processar ${filePath}:`, error)
        return false
    }
}

function main() {
    console.log('🔧 Iniciando correção de sintaxe MDX...')

    const sitesDir = path.join(__dirname, '..', 'sites')
    let totalFixed = 0
    let totalProcessed = 0

    // Processa todos os sites
    const sites = fs.readdirSync(sitesDir).filter(item =>
        fs.statSync(path.join(sitesDir, item)).isDirectory()
    )

    for (const site of sites) {
        const siteDir = path.join(sitesDir, site)
        const files = fs.readdirSync(siteDir).filter(file => file.endsWith('.mdx'))

        console.log(`\n📁 Processando site: ${site} (${files.length} arquivos)`)

        for (const file of files) {
            const filePath = path.join(siteDir, file)
            totalProcessed++

            if (fixMDXFile(filePath)) {
                totalFixed++
            }
        }
    }

    console.log(`\n✅ Concluído! ${totalFixed} arquivos corrigidos de ${totalProcessed} processados.`)
}

if (require.main === module) {
    main()
} 