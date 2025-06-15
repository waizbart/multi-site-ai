#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function removeSite(siteId) {
    if (!siteId) {
        console.error('❌ Uso: node scripts/remove-site.js <site-id>');
        console.error('   Exemplo: node scripts/remove-site.js meu-blog');
        process.exit(1);
    }

    const appsDir = path.join(__dirname, '..', 'apps');
    const siteDir = path.join(appsDir, siteId);
    const packagesDir = path.join(__dirname, '..', 'packages');
    const contentDir = path.join(packagesDir, 'content', 'sites', siteId);
    const configDir = path.join(packagesDir, 'config', 'src', 'sites');
    const configFile = path.join(configDir, `${siteId}.ts`);

    // Verificar se o site existe
    if (!fs.existsSync(siteDir)) {
        console.error(`❌ Site '${siteId}' não existe!`);
        process.exit(1);
    }

    console.log(`🗑️ Removendo site: ${siteId}`);

    try {
        // 1. Remover pasta do app
        if (fs.existsSync(siteDir)) {
            fs.rmSync(siteDir, { recursive: true, force: true });
            console.log(`   ✅ App removido: apps/${siteId}/`);
        }

        // 2. Remover pasta de conteúdo
        if (fs.existsSync(contentDir)) {
            fs.rmSync(contentDir, { recursive: true, force: true });
            console.log(`   ✅ Conteúdo removido: packages/content/sites/${siteId}/`);
        }

        // 3. Remover arquivo de configuração
        if (fs.existsSync(configFile)) {
            fs.unlinkSync(configFile);
            console.log(`   ✅ Config removida: packages/config/src/sites/${siteId}.ts`);
        }

        // 4. Atualizar index.ts das configurações
        const indexPath = path.join(configDir, 'index.ts');
        if (fs.existsSync(indexPath)) {
            let indexContent = fs.readFileSync(indexPath, 'utf8');

            // Remover import
            const importRegex = new RegExp(`import\\s+{\\s*${siteId.replace(/-/g, '')}Config\\s*}\\s+from\\s+'\\.\\/${siteId}'\\s*\\n?`, 'g');
            indexContent = indexContent.replace(importRegex, '');

            // Remover do objeto de configurações
            const configRegex = new RegExp(`\\s*'${siteId}':\\s*${siteId.replace(/-/g, '')}Config,?\\s*\\n?`, 'g');
            indexContent = indexContent.replace(configRegex, '');

            // Remover do export
            const exportRegex = new RegExp(`,\\s*${siteId.replace(/-/g, '')}Config`, 'g');
            indexContent = indexContent.replace(exportRegex, '');

            // Limpar linhas vazias extras
            indexContent = indexContent.replace(/\n\s*\n\s*\n/g, '\n\n');

            fs.writeFileSync(indexPath, indexContent);
            console.log(`   ✅ Configurações atualizadas`);
        }

        console.log('✅ Site removido com sucesso!');
        console.log(`
🗑️ Itens removidos:
   - apps/${siteId}/ (aplicação Next.js)
   - packages/content/sites/${siteId}/ (posts/conteúdo)
   - packages/config/src/sites/${siteId}.ts (configuração)

💡 O site ${siteId} foi completamente removido do projeto.
`);

    } catch (error) {
        console.error('❌ Erro ao remover site:', error.message);
        process.exit(1);
    }
}

// Executar script
const [, , siteId] = process.argv;
removeSite(siteId); 