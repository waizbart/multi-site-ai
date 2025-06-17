const fs = require('fs')
const path = require('path')

const sites = [
    'automoveis',
    'financas',
    'portal',
    'saude-alimentacao',
    'tech-news',
    'viagem-lifestyle'
]

const pages = [
    {
        dir: 'politica-de-privacidade',
        component: 'PrivacyPolicyPage',
        title: 'Política de Privacidade',
        description: 'Conheça nossa política de privacidade e como protegemos seus dados pessoais.',
        functionName: 'PoliticaDePrivacidadePage'
    },
    {
        dir: 'termos-de-uso',
        component: 'TermsOfServicePage',
        title: 'Termos de Uso',
        description: 'Conheça os termos de uso do nosso site e as condições para utilização do conteúdo.',
        functionName: 'TermosDeUsoPage'
    },
    {
        dir: 'politica-de-cookies',
        component: 'CookiePolicyPage',
        title: 'Política de Cookies',
        description: 'Saiba como utilizamos cookies em nosso site e como você pode gerenciá-los.',
        functionName: 'PoliticaDeCookiesPage'
    },
    {
        dir: 'sobre',
        component: 'AboutPage',
        title: 'Sobre Nós',
        description: 'Conheça nossa equipe e nossa missão.',
        functionName: 'SobrePage'
    },
    {
        dir: 'contato',
        component: 'ContactPage',
        title: 'Contato',
        description: 'Entre em contato conosco para dúvidas, sugestões ou feedback.',
        functionName: 'ContatoPage'
    }
]

function createSharedPageContent(page, site) {
    return `import { Metadata } from 'next'
import { getSiteConfig } from '@multi-site-ai/config'
import { ${page.component} } from '@multi-site-ai/shared-app'

const siteConfig = getSiteConfig('${site}')

export const metadata: Metadata = {
    title: '${page.title}',
    description: '${page.description}',
}

export default function ${page.functionName}() {
    return <${page.component} siteConfig={siteConfig} />
}
`
}

function convertSitePages() {
    sites.forEach(site => {
        console.log(`\n🔄 Convertendo páginas do site: ${site}`)

        pages.forEach(page => {
            const appDir = path.join(__dirname, '..', 'apps', site, 'app')
            const pageDir = path.join(appDir, page.dir)
            const pageFile = path.join(pageDir, 'page.tsx')

            // Verifica se a página existe
            if (fs.existsSync(pageFile)) {
                console.log(`   ✅ Convertendo ${page.dir}/page.tsx`)

                // Cria o conteúdo da nova página
                const newContent = createSharedPageContent(page, site)

                // Escreve o novo arquivo
                fs.writeFileSync(pageFile, newContent, 'utf8')
            } else {
                console.log(`   ⚠️  Página não encontrada: ${page.dir}/page.tsx`)

                // Cria a página se não existir
                if (!fs.existsSync(pageDir)) {
                    fs.mkdirSync(pageDir, { recursive: true })
                }

                const newContent = createSharedPageContent(page, site)
                fs.writeFileSync(pageFile, newContent, 'utf8')
                console.log(`   ✨ Criada nova página: ${page.dir}/page.tsx`)
            }
        })
    })
}

function showCurrentStatus() {
    console.log('📊 Status atual das páginas legais:\n')

    sites.forEach(site => {
        console.log(`📁 ${site}:`)

        pages.forEach(page => {
            const pageFile = path.join(__dirname, '..', 'apps', site, 'app', page.dir, 'page.tsx')
            const exists = fs.existsSync(pageFile)
            const status = exists ? '✅' : '❌'
            console.log(`   ${status} ${page.dir}`)
        })
        console.log('')
    })
}

// Função principal
function main() {
    console.log('🚀 Convertendo todas as páginas legais para componentes compartilhados...\n')

    showCurrentStatus()

    console.log('🔄 Iniciando conversão...')
    convertSitePages()

    console.log('\n✅ Conversão concluída!')
    console.log('\n📈 Benefícios da conversão:')
    console.log('   • Código 90% mais limpo')
    console.log('   • Manutenção centralizada')
    console.log('   • Consistência entre sites')
    console.log('   • YMYL disclaimers automáticos')
    console.log('   • Atualizações instantâneas em todos os sites')

    console.log('\n📝 Próximos passos:')
    console.log('   1. Rode: npm run build (para verificar se tudo funciona)')
    console.log('   2. Teste as páginas em cada site')
    console.log('   3. Commit das alterações')
}

if (require.main === module) {
    main()
}

module.exports = { convertSitePages, showCurrentStatus } 