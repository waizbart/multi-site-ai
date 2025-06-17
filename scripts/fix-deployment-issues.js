#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🔧 Fixing deployment issues...\n')

// Função para verificar se diretório existe
function checkDirectory(dirPath, description) {
    if (fs.existsSync(dirPath)) {
        console.log(`✅ ${description}: ${dirPath}`)
        return true
    } else {
        console.log(`❌ ${description}: ${dirPath} (not found)`)
        return false
    }
}

// Função para listar arquivos em um diretório
function listFiles(dirPath, description) {
    try {
        const files = fs.readdirSync(dirPath)
        console.log(`📁 ${description} (${files.length} files):`)
        files.forEach(file => {
            console.log(`   - ${file}`)
        })
        console.log('')
        return files
    } catch (error) {
        console.log(`❌ Could not read ${description}: ${error.message}\n`)
        return []
    }
}

// Verificar estrutura do projeto
console.log('📋 Checking project structure...\n')

// Verificar diretórios principais
checkDirectory('./packages/content', 'Content package')
checkDirectory('./packages/content/sites', 'Content sites directory')
checkDirectory('./packages/shared-app', 'Shared app package')

// Verificar sites específicos
const sites = ['automoveis', 'financas', 'tech-news', 'saude-alimentacao', 'viagem-lifestyle', 'portal']

sites.forEach(site => {
    const sitePath = `./packages/content/sites/${site}`
    if (checkDirectory(sitePath, `${site} content`)) {
        listFiles(sitePath, `${site} posts`)
    }
})

// Verificar se Contentlayer foi executado
console.log('🔍 Checking Contentlayer build...\n')
checkDirectory('./packages/content/.contentlayer', 'Contentlayer output')
checkDirectory('./packages/content/.contentlayer/generated', 'Contentlayer generated files')

// Verificar builds dos apps
console.log('🏗️  Checking app builds...\n')
sites.forEach(site => {
    checkDirectory(`./apps/${site}/.next`, `${site} Next.js build`)
})

// Verificar package.json dos apps
console.log('📦 Checking package.json prebuild scripts...\n')
sites.forEach(site => {
    const packagePath = `./apps/${site}/package.json`
    if (fs.existsSync(packagePath)) {
        try {
            const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
            if (packageJson.scripts && packageJson.scripts.prebuild) {
                console.log(`✅ ${site}: has prebuild script`)
            } else {
                console.log(`❌ ${site}: missing prebuild script`)
            }
        } catch (error) {
            console.log(`❌ ${site}: error reading package.json`)
        }
    }
})

// Sugestões de correção
console.log('\n💡 Suggestions to fix deployment issues:\n')

console.log('1. Run content build before app build:')
console.log('   npm run build --workspace=@multi-site-ai/content')
console.log('')

console.log('2. Clean and rebuild everything:')
console.log('   npm run clean')
console.log('   npm install')
console.log('   npm run build')
console.log('')

console.log('3. Check Vercel build settings:')
console.log('   - Build Command: npm run build')
console.log('   - Install Command: npm install')
console.log('   - Framework Preset: Next.js')
console.log('')

console.log('4. Environment variables for Vercel:')
console.log('   - NODE_ENV=production')
console.log('   - NPM_CONFIG_PRODUCTION=false (to install devDependencies)')
console.log('')

console.log('5. If using static posts fallback:')
console.log('   - Posts should still appear using backup content')
console.log('   - Check browser console for loading messages')
console.log('')

console.log('✨ Deployment fix script completed!') 