#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function createSite(siteId, siteName, siteDescription, baseSiteId = 'site-template') {
    if (!siteId || !siteName || !siteDescription) {
        console.error('❌ Uso: node scripts/create-site.js <site-id> <site-name> <site-description> [site-base]');
        console.error('   Exemplo: node scripts/create-site.js tech-blog "Tech Blog" "Blog sobre tecnologia" site-modelo');
        process.exit(1);
    }

    // Verifica se o site base existe
    const baseSiteDir = path.join(__dirname, '..', 'apps', baseSiteId);
    if (!fs.existsSync(baseSiteDir)) {
        console.error(`❌ Site base '${baseSiteId}' não encontrado em apps/${baseSiteId}`);
        process.exit(1);
    }

    const appsDir = path.join(__dirname, '..', 'apps');
    const siteDir = path.join(appsDir, siteId);
    const packagesDir = path.join(__dirname, '..', 'packages');
    const contentDir = path.join(packagesDir, 'content', 'sites', siteId);
    const configDir = path.join(packagesDir, 'config', 'src', 'sites');

    // Verificar se o site já existe
    if (fs.existsSync(siteDir)) {
        console.error(`❌ Site '${siteId}' já existe!`);
        process.exit(1);
    }

    console.log(`🚀 Criando novo site: ${siteName} (${siteId}) a partir de '${baseSiteId}'`);

    // 1. Criar estrutura de pastas do app
    fs.mkdirSync(siteDir, { recursive: true });
    fs.mkdirSync(path.join(siteDir, 'app'), { recursive: true });
    fs.mkdirSync(path.join(siteDir, 'public'), { recursive: true });

    // 2. Criar package.json
    const packageJson = {
        name: siteId,
        version: "1.0.0",
        private: true,
        scripts: {
            build: "next build",
            dev: "next dev",
            lint: "next lint",
            start: "next start",
            clean: "rm -rf .next"
        },
        dependencies: {
            "@multi-site-ai/shared-app": "file:../../packages/shared-app",
            "@multi-site-ai/config": "file:../../packages/config",
            "@multi-site-ai/ui": "file:../../packages/ui",
            "@multi-site-ai/content": "file:../../packages/content",
            "@tailwindcss/typography": "^0.5.10",
            "next": "^14.0.0",
            "react": "^18.0.0",
            "react-dom": "^18.0.0"
        },
        devDependencies: {
            "@types/node": "^20.0.0",
            "@types/react": "^18.0.0",
            "@types/react-dom": "^18.0.0",
            "autoprefixer": "^10.4.0",
            "eslint": "^8.0.0",
            "eslint-config-next": "^14.0.0",
            "postcss": "^8.4.0",
            "tailwindcss": "^3.3.0",
            "typescript": "^5.0.0"
        }
    };

    fs.writeFileSync(
        path.join(siteDir, 'package.json'),
        JSON.stringify(packageJson, null, 4)
    );

    // 3. Criar layout.tsx - usando padrão atualizado
    const layoutContent = `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { createRootLayout, createLayoutMetadata } from '@multi-site-ai/shared-app'
import { getSiteConfig } from '@multi-site-ai/config'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ 
    subsets: ['latin'],
    display: 'swap',
    preload: true
})

const siteConfig = getSiteConfig('${siteId}')
const RootLayout = createRootLayout(siteConfig)

export const metadata: Metadata = {
    ...createLayoutMetadata(siteConfig),
    ...(siteConfig.adsenseId && {
        other: {
            'google-adsense-account': siteConfig.adsenseId,
        }
    }),
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return <RootLayout>{children}</RootLayout>
}`;

    fs.writeFileSync(path.join(siteDir, 'app', 'layout.tsx'), layoutContent);

    // 4. Criar page.tsx (home)
    const pageContent = `import { createHomePage } from '@multi-site-ai/shared-app'

const SITE_ID = '${siteId}'

export const revalidate = 60 // ISR: revalidar a cada minuto

export default createHomePage(SITE_ID)`;

    fs.writeFileSync(path.join(siteDir, 'app', 'page.tsx'), pageContent);

    // 5. Criar pasta [slug] e page.tsx do post
    fs.mkdirSync(path.join(siteDir, 'app', '[slug]'), { recursive: true });

    const postPageContent = `import { createPostPage } from '@multi-site-ai/shared-app'

const SITE_ID = '${siteId}'

const postPageConfig = createPostPage(SITE_ID)

export const generateStaticParams = postPageConfig.generateStaticParams
export const generateMetadata = postPageConfig.generateMetadata
export const revalidate = postPageConfig.revalidate

export default postPageConfig.PostPage`;

    fs.writeFileSync(path.join(siteDir, 'app', '[slug]', 'page.tsx'), postPageContent);

    // 5.1 Criar páginas legais simplificadas
    const legalPages = [
        { name: 'politica-de-privacidade', title: 'Política de Privacidade' },
        { name: 'termos-de-uso', title: 'Termos de Uso' },
        { name: 'politica-de-cookies', title: 'Política de Cookies' },
        { name: 'sobre', title: 'Sobre Nós' },
        { name: 'contato', title: 'Contato' }
    ];

    legalPages.forEach(({ name, title }) => {
        const pageDir = path.join(siteDir, 'app', name);
        fs.mkdirSync(pageDir, { recursive: true });

        const isFinance = siteId.includes('financas');
        const isHealth = siteId.includes('saude');

        const disclaimer = isFinance
            ? `As informações financeiras fornecidas neste site são apenas para fins educacionais e informativos. 
Não oferecemos consultoria financeira ou de investimentos. Sempre consulte um profissional financeiro 
qualificado antes de tomar decisões de investimento.`
            : isHealth
                ? `As informações de saúde fornecidas neste site são apenas para fins educacionais e informativos. 
Não substituem o aconselhamento médico profissional. Sempre consulte um profissional de saúde 
qualificado antes de tomar decisões sobre sua saúde.`
                : '';

        const content = name === 'politica-de-privacidade'
            ? `Informações que coletamos, como utilizamos seus dados, cookies e tecnologias similares, seus direitos (LGPD).`
            : name === 'termos-de-uso'
                ? `Termos e condições de uso do site, responsabilidades do usuário e limitações de responsabilidade.`
                : name === 'politica-de-cookies'
                    ? `Como utilizamos cookies para melhorar sua experiência de navegação e para fins de análise.`
                    : name === 'sobre'
                        ? `Informações sobre nossa missão, equipe e compromisso com a qualidade do conteúdo.`
                        : `Entre em contato conosco através dos canais disponíveis.`;

        const pageContent = `import { getSiteConfig } from '@multi-site-ai/config'
import Link from 'next/link'

const siteConfig = getSiteConfig('${siteId}')

export default function ${title.replace(/\s+/g, '')}Page() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">${title}</h1>
                <p className="text-muted-foreground">
                    Última atualização: {new Date().toLocaleDateString('pt-BR')}
                </p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                ${disclaimer ? `<div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
                    <p className="text-sm text-amber-800 dark:text-amber-200 mb-0">
                        <strong>Aviso Importante:</strong> ${disclaimer}
                    </p>
                </div>` : ''}
                
                <p className="text-lg">
                    ${content}
                </p>
                
                <p>
                    Para mais informações, entre em contato através do email: 
                    <Link href={\`mailto:\${siteConfig.author.email}\`} className="text-primary hover:underline">
                        {siteConfig.author.email}
                    </Link>
                </p>
            </div>
        </div>
    )
}`;

        fs.writeFileSync(path.join(pageDir, 'page.tsx'), pageContent);
    });

    // 5.2 Criar rota ads.txt para AdSense
    const adsTxtDir = path.join(siteDir, 'app', 'ads.txt');
    fs.mkdirSync(adsTxtDir, { recursive: true });

    const adsTxtContent = `export function GET() {
    const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-6189411019780384'
    const content = \`google.com, \${adsenseId}, DIRECT, f08c47fec0942fa0\`
    
    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain',
        },
    })
}`;

    fs.writeFileSync(path.join(adsTxtDir, 'route.ts'), adsTxtContent);

    // 5.3 Criar rotas SEO (sitemap, robots, rss)
    const seoRoutes = [
        {
            dir: ['sitemap.xml'],
            filename: 'route.ts',
            content: `import { getPostsBySite } from '@multi-site-ai/content'
import { getSiteConfig } from '@multi-site-ai/config'

const SITE_ID = '${siteId}'

export function GET() {
    const posts = getPostsBySite(SITE_ID)
    const siteConfig = getSiteConfig(SITE_ID)
    const baseUrl = siteConfig.url.replace(/\\/$/, '')
    
    const urls = [
        \`<url><loc>\${baseUrl}</loc><lastmod>\${new Date().toISOString()}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>\`,
        ...posts.map((post: any) => \`<url><loc>\${baseUrl}/\${post.slug}</loc><lastmod>\${new Date(post.date).toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\`),
    ].join('')

    const sitemap = \`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\${urls}</urlset>\`

    return new Response(sitemap, { headers: { 'Content-Type': 'application/xml' } })
}`
        },
        {
            dir: ['robots.txt'],
            filename: 'route.ts',
            content: `import { getSiteConfig } from '@multi-site-ai/config'

const SITE_ID = '${siteId}'

export function GET() {
    const siteConfig = getSiteConfig(SITE_ID)
    const baseUrl = siteConfig.url.replace(/\\/$/, '')
    const robots = \
        \`User-agent: *\\nAllow: /\\nSitemap: \${baseUrl}/sitemap.xml\\nHost: \${baseUrl}\`

    return new Response(robots, {
        headers: { 'Content-Type': 'text/plain' },
    })
}`
        },
        {
            dir: ['rss.xml'],
            filename: 'route.ts',
            content: `// @ts-nocheck
import { getPostsBySite } from '@multi-site-ai/content'
import { getSiteConfig } from '@multi-site-ai/config'

const SITE_ID = '${siteId}'

export async function GET() {
    const posts = getPostsBySite(SITE_ID)
    const siteConfig = getSiteConfig(SITE_ID)
    const baseUrl = siteConfig.url.replace(/\\/$/, '')

    const urls = [
        \`<url><loc>\${baseUrl}</loc><lastmod>\${new Date().toISOString()}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>\`,
        ...posts.map((post: any) => \`<url><loc>\${baseUrl}/\${post.slug}</loc><lastmod>\${new Date(post.date).toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\`),
    ].join('')

    const sitemap = \`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\${urls}</urlset>\`

    return new Response(sitemap, { headers: { 'Content-Type': 'application/xml' } })
}`
        },
    ]

    seoRoutes.forEach(({ dir, filename, content }) => {
        const routeDir = path.join(siteDir, 'app', ...dir)
        fs.mkdirSync(routeDir, { recursive: true })
        fs.writeFileSync(path.join(routeDir, filename), content)
    })

    // 6. Copiar arquivos de configuração do template
    const templateDir = path.join(appsDir, baseSiteId);

    // Copiar globals.css
    fs.copyFileSync(
        path.join(templateDir, 'app', 'globals.css'),
        path.join(siteDir, 'app', 'globals.css')
    );

    // NOVO: Copiar favicon.ico para manter o mesmo ícone em todos os sites
    const faviconSrc = path.join(templateDir, 'public', 'favicon.ico')
    const faviconDest = path.join(siteDir, 'public', 'favicon.ico')
    if (fs.existsSync(faviconSrc)) {
        fs.copyFileSync(faviconSrc, faviconDest)
    } else {
        console.warn(`⚠️  favicon.ico não encontrado em ${faviconSrc}. Adicione manualmente em apps/${siteId}/public se necessário.`)
    }

    // Copiar arquivos de configuração
    const configFiles = [
        'tailwind.config.ts',
        'next.config.mjs',
        'postcss.config.mjs',
        'tsconfig.json',
        '.eslintrc.json',
        'next-env.d.ts'
    ];

    configFiles.forEach(file => {
        if (fs.existsSync(path.join(templateDir, file))) {
            fs.copyFileSync(
                path.join(templateDir, file),
                path.join(siteDir, file)
            );
        }
    });

    // Adicionar '@multi-site-ai/content' em transpilePackages no next.config.mjs
    const nextConfigPath = path.join(siteDir, 'next.config.mjs')
    if (fs.existsSync(nextConfigPath)) {
        let nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8')
        if (nextConfigContent.includes('transpilePackages')) {
            nextConfigContent = nextConfigContent.replace(
                /transpilePackages:\s*\[(.*?)\]/,
                (match, p1) => {
                    if (p1.includes("'@multi-site-ai/content'")) return match
                    return match.replace(p1, `${p1}, '@multi-site-ai/content'`)
                }
            )
            fs.writeFileSync(nextConfigPath, nextConfigContent)
        }
    }

    // 7. Criar pasta de conteúdo
    fs.mkdirSync(contentDir, { recursive: true });
    fs.writeFileSync(
        path.join(contentDir, 'exemplo.mdx'),
        `---
title: "Primeiro Post do ${siteName}"
description: "Este é o primeiro post do seu novo site!"
date: "${new Date().toISOString()}"
tags: ["exemplo", "primeiro-post"]
featured: true
---

# Bem-vindo ao ${siteName}!

Este é seu primeiro post. Você pode editar este arquivo em:
\`packages/content/sites/${siteId}/exemplo.mdx\`

## Como adicionar mais posts

1. Crie novos arquivos .mdx na pasta \`packages/content/sites/${siteId}/\`
2. Adicione o frontmatter (metadados) no início do arquivo
3. Escreva seu conteúdo em Markdown

## Próximos passos

- Customize as configurações do site em \`packages/config/src/sites/${siteId}.ts\`
- Adicione mais posts na pasta de conteúdo
- Personalize os estilos em \`apps/${siteId}/app/globals.css\`

Divirta-se criando conteúdo!`
    );

    // 8. Criar configuração do site
    const configContent = `import type { SiteConfig } from '../site-config'

export const ${siteId.replace(/-/g, '')}Config: SiteConfig = {
    name: '${siteName}',
    description: '${siteDescription}',
    domain: '${siteId}.neostream.com.br', // TODO: Substitua pelo seu domínio
    url: 'https://${siteId}.neostream.com.br', // TODO: Substitua pela sua URL
    logo: '/logo.png',
    favicon: '/favicon.ico',
    adsenseId: 'ca-pub-6189411019780384', // TODO: Substitua pelo seu ID do AdSense
    themeColor: '#3b82f6', // blue-500
    defaultLocale: 'pt-BR',
    author: {
        name: 'Autor do ${siteName}',
        email: 'contato@${siteId}.neostream.com.br', // TODO: Substitua pelo seu email
        url: 'https://${siteId}.neostream.com.br'
    },
    social: {
        twitter: '@${siteId}', // TODO: Substitua pelo seu Twitter
        github: 'username/${siteId}', // TODO: Substitua pelo seu GitHub
        linkedin: 'company/${siteId}' // TODO: Substitua pelo seu LinkedIn
    },
    seo: {
        defaultTitle: '${siteName}',
        titleTemplate: '%s | ${siteName}',
        defaultDescription: '${siteDescription}',
        keywords: [
            // TODO: Adicione palavras-chave relevantes
            'blog',
            'conteúdo',
            'artigos'
        ]
    }
}`;

    fs.writeFileSync(path.join(configDir, `${siteId}.ts`), configContent);

    // 9. Atualizar index.ts das configurações
    const indexPath = path.join(configDir, 'index.ts');
    let indexContent = fs.readFileSync(indexPath, 'utf8');

    // Adicionar import
    const importLine = `import { ${siteId.replace(/-/g, '')}Config } from './${siteId}'`;
    indexContent = indexContent.replace(
        /import { siteTemplateConfig } from '\.\/site-template'/,
        `import { siteTemplateConfig } from './site-template'\n${importLine}`
    );

    // Adicionar ao objeto de configurações
    indexContent = indexContent.replace(
        /'site-template': siteTemplateConfig,/,
        `'site-template': siteTemplateConfig,\n    '${siteId}': ${siteId.replace(/-/g, '')}Config,`
    );

    // Adicionar ao export
    indexContent = indexContent.replace(
        /export { siteTemplateConfig }/,
        `export { siteTemplateConfig, ${siteId.replace(/-/g, '')}Config }`
    );

    fs.writeFileSync(indexPath, indexContent);

    console.log('✅ Site criado com sucesso!');
    console.log(`
📁 Estrutura criada:
   - apps/${siteId}/ (aplicação Next.js)
   - packages/content/sites/${siteId}/ (posts/conteúdo)
   - packages/config/src/sites/${siteId}.ts (configuração)

🚀 Próximos passos:
   1. cd apps/${siteId}
   2. npm install
   3. npm run dev
   4. Edite a configuração em packages/config/src/sites/${siteId}.ts
   5. Adicione posts em packages/content/sites/${siteId}/

🎉 Seu site ${siteName} está pronto!
`);
}

// Executar script
const [, , siteId, siteName, siteDescription, baseSiteId] = process.argv;
createSite(siteId, siteName, siteDescription, baseSiteId); 