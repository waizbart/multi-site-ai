#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

console.log('🔍 Testing MDX posts parsing...\n')

const sites = ['automoveis', 'financas', 'tech-news', 'saude-alimentacao', 'viagem-lifestyle', 'portal']

sites.forEach(site => {
    const sitePath = path.join(__dirname, '..', 'sites', site)

    if (!fs.existsSync(sitePath)) {
        console.log(`⚠️  Site directory not found: ${site}`)
        return
    }

    const files = fs.readdirSync(sitePath).filter(file => file.endsWith('.mdx'))
    console.log(`📁 Site: ${site} (${files.length} files)`)

    files.forEach(file => {
        try {
            const filePath = path.join(sitePath, file)
            const fileContent = fs.readFileSync(filePath, 'utf8')
            const { data, content } = matter(fileContent)

            // Validar frontmatter
            const required = ['title', 'description', 'date', 'site']
            const missing = required.filter(field => !data[field])

            if (missing.length > 0) {
                console.log(`   ❌ ${file}: Missing fields: ${missing.join(', ')}`)
            } else {
                console.log(`   ✅ ${file}: OK`)
            }

            // Verificar se a data é válida
            if (data.date && isNaN(new Date(data.date).getTime())) {
                console.log(`   ⚠️  ${file}: Invalid date format: ${data.date}`)
            }

        } catch (error) {
            console.log(`   ❌ ${file}: Parse error - ${error.message}`)
        }
    })

    console.log('')
})

console.log('✨ Post testing completed!') 