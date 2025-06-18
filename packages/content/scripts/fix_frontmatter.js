const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

/**
 * Corrige frontmatter dos posts MDX garantindo os campos obrigatórios
 * - description: usa excerpt ou primeira linha de conteúdo se ausente
 * - site: inferido pelo diretório pai
 * - featured: força booleano
 */
function fixFile(filePath, siteId) {
    const raw = fs.readFileSync(filePath, 'utf8')
    const parsed = matter(raw)
    const data = parsed.data

    let changed = false

    // description
    if (!data.description) {
        if (data.excerpt) {
            data.description = String(data.excerpt).trim()
            changed = true
        } else {
            // Use primeira linha não vazia do conteúdo
            const firstLine = parsed.content.split('\n').find(l => l.trim().length > 10)
            if (firstLine) {
                data.description = firstLine.trim().replace(/^#+\s*/, '')
                changed = true
            }
        }
    }

    // site
    if (!data.site || data.site !== siteId) {
        data.site = siteId
        changed = true
    }

    // featured
    if (typeof data.featured !== 'boolean') {
        if (typeof data.featured === 'string') {
            data.featured = data.featured.trim().toLowerCase() === 'true'
        } else {
            data.featured = false
        }
        changed = true
    }

    // remove campos obsoletos
    if (data.excerpt) {
        delete data.excerpt
        changed = true
    }

    if (changed) {
        const newContent = matter.stringify(parsed.content, data)
        fs.writeFileSync(filePath, newContent)
        return true
    }
    return false
}

function main() {
    const sitesDir = path.join(__dirname, '..', 'sites')
    const sites = fs.readdirSync(sitesDir).filter(d => fs.statSync(path.join(sitesDir, d)).isDirectory())

    let total = 0
    let fixed = 0

    for (const siteId of sites) {
        const siteDir = path.join(sitesDir, siteId)
        const files = fs.readdirSync(siteDir).filter(f => f.endsWith('.mdx'))
        for (const file of files) {
            total++
            const fp = path.join(siteDir, file)
            if (fixFile(fp, siteId)) fixed++
        }
    }

    console.log(`✔️  Frontmatter corrigido em ${fixed} de ${total} arquivos`)
}

if (require.main === module) {
    main()
} 