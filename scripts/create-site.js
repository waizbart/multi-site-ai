#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function createSite(siteId, siteName, siteDescription) {
    if (!siteId || !siteName || !siteDescription) {
        console.error('❌ Uso: node scripts/create-site.js <site-id> <site-name> <site-description>');
        console.error('   Exemplo: node scripts/create-site.js tech-blog "Tech Blog" "Blog sobre tecnologia"');
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

    console.log(`🚀 Criando novo site: ${siteName} (${siteId})`);

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

    // 3. Criar layout.tsx
    const layoutContent = `import { getSiteConfig } from '@multi-site-ai/config'
import { createRootLayout, createLayoutMetadata } from '@multi-site-ai/shared-app'
import './globals.css'

const SITE_ID = '${siteId}'
const siteConfig = getSiteConfig(SITE_ID)

export const metadata = createLayoutMetadata(siteConfig)

export default createRootLayout(siteConfig)`;

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

    // 6. Copiar arquivos de configuração do template
    const templateDir = path.join(appsDir, 'site-template');

    // Copiar globals.css
    fs.copyFileSync(
        path.join(templateDir, 'app', 'globals.css'),
        path.join(siteDir, 'app', 'globals.css')
    );

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
    adsenseId: 'ca-pub-XXXXXXXXXX', // TODO: Substitua pelo seu ID do AdSense
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
const [, , siteId, siteName, siteDescription] = process.argv;
createSite(siteId, siteName, siteDescription); 