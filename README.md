# 🚀 Multi-Site AI

Monorepo Turborepo para múltiplos sites de conteúdo gerado por inteligência artificial. Template completo com Next.js 14, geração automática de posts via OpenAI, e deploy automatizado na Vercel.

## ✨ Características

- 🏗️ **Monorepo Turborepo** com pnpm workspaces
- 🤖 **Geração automática de conteúdo** via OpenAI GPT-4o
- ⚡ **Next.js 14** com App Router e SSG/ISR
- 📝 **Contentlayer** para MDX tipado
- 🎨 **Tailwind CSS + shadcn/ui** para UI consistente
- 🔍 **SEO otimizado** com meta tags, JSON-LD, sitemap e RSS
- 🚀 **Deploy automático** na Vercel via GitHub Actions
- 📊 **Core Web Vitals** otimizado

## 🏗️ Estrutura do Projeto

```
multi-site-ai/
├── apps/
│   └── site-template/         # Site exemplo (Next.js 14)
├── packages/
│   ├── config/               # Configurações de sites
│   ├── content/              # Gerenciamento de conteúdo MDX
│   └── ui/                   # Componentes UI compartilhados
├── .github/workflows/
│   └── deploy.yml           # CI/CD automatizado
├── turbo.json              # Configuração Turborepo
└── pnpm-workspace.yaml     # Workspaces pnpm
```

## 🚀 Início Rápido

### 1. Clone e Instale

```bash
git clone <seu-repo>
cd multi-site-ai
pnpm install
```

### 2. Configure Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-...
DALLE_ORG_ID=org-...

# Content Generation
POSTS_PER_DAY=5
DEFAULT_SITE=site-template

# Security
REVALIDATE_TOKEN=seu-token-secreto

# Vercel (para CI/CD)
VERCEL_TOKEN=...
VERCEL_ORG_ID=...
VERCEL_PROJECT_ID_SITE_TEMPLATE=...
```

### 3. Configure seu Site

Edite `packages/config/src/sites/site-template.ts`:

```typescript
export const siteTemplateConfig: SiteConfig = {
  name: 'Seu Site',
  description: 'Descrição do seu site',
  domain: 'seudominio.com',
  url: 'https://seudominio.com',
  adsenseId: 'ca-pub-XXXXXXXXXX', // Seu ID do AdSense
  themeColor: '#3b82f6',
  // ... outras configurações
}
```

### 4. Gere Conteúdo Inicial

```bash
# Gerar posts de exemplo
pnpm generate-posts

# Ou execute em modo dev
pnpm dev
```

### 5. Build e Deploy

```bash
# Build local
pnpm build

# Deploy será automático via GitHub Actions
```

## 📝 Gerando Conteúdo

### Geração Manual

```bash
# Gerar posts para o site padrão
pnpm generate-posts

# Gerar para site específico
DEFAULT_SITE=meu-site pnpm generate-posts
```

### Geração Automática

O sistema gera conteúdo automaticamente via GitHub Actions:

- **Diariamente às 04:00 UTC** (cron job)
- **A cada push** para main branch
- **Manualmente** via workflow_dispatch

### Personalizar Tópicos

Edite `packages/content/scripts/generate_posts.ts` para customizar os tópicos:

```typescript
const TOPICS = [
  'Seu tópico personalizado',
  'Outro tópico interessante',
  // ...
]
```

## 🎨 Criando Novos Sites

### 1. Duplicar Site Template

```bash
cp -r apps/site-template apps/meu-novo-site
```

### 2. Atualizar package.json

```json
{
  "name": "meu-novo-site",
  // ... resto da configuração
}
```

### 3. Criar Configuração

Crie `packages/config/src/sites/meu-novo-site.ts`:

```typescript
export const meuNovoSiteConfig: SiteConfig = {
  name: 'Meu Novo Site',
  description: 'Descrição do novo site',
  domain: 'meunovo.site',
  url: 'https://meunovo.site',
  // ... configurações específicas
}
```

### 4. Registrar no Index

Adicione em `packages/config/src/sites/index.ts`:

```typescript
import { meuNovoSiteConfig } from './meu-novo-site'

export const siteConfigs: Record<string, SiteConfig> = {
  'site-template': siteTemplateConfig,
  'meu-novo-site': meuNovoSiteConfig,
}
```

### 5. Configurar Deploy

Adicione no `.github/workflows/deploy.yml`:

```yaml
- name: Deploy to Vercel - Meu Novo Site
  uses: amondnet/vercel-action@v25
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
    vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID_MEU_NOVO_SITE }}
    working-directory: apps/meu-novo-site
    vercel-args: '--prod'
```

## 🔧 Configuração da Vercel

### 1. Criar Projetos na Vercel

Para cada site, crie um projeto na Vercel e anote os IDs.

### 2. Configurar GitHub Secrets

No seu repositório GitHub, adicione os secrets:

```
OPENAI_API_KEY=sk-...
VERCEL_TOKEN=...
VERCEL_ORG_ID=...
VERCEL_PROJECT_ID_SITE_TEMPLATE=...
REVALIDATE_TOKEN=...
SITE_TEMPLATE_URL=https://seu-site.vercel.app
```

### 3. Configurar Build Settings na Vercel

- **Framework Preset**: Next.js
- **Root Directory**: `apps/site-template`
- **Build Command**: `cd ../.. && pnpm turbo run build --filter=site-template...`
- **Install Command**: `pnpm install --frozen-lockfile`

## 📊 SEO e Performance

### Recursos Incluídos

- ✅ **Meta tags** otimizadas
- ✅ **Open Graph** e Twitter Cards
- ✅ **JSON-LD** structured data
- ✅ **Sitemap.xml** automático
- ✅ **RSS feed** automático
- ✅ **robots.txt** otimizado
- ✅ **Core Web Vitals** otimizado
- ✅ **ISR** para performance

### Monitoramento

Use ferramentas como:

- Google Search Console
- Google PageSpeed Insights
- Vercel Analytics
- Google Analytics (configurar GA_MEASUREMENT_ID)

## 🤖 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Iniciar todos os apps em modo dev
pnpm dev --filter=site-template  # Iniciar app específico

# Build
pnpm build            # Build todos os projetos
pnpm build --filter=packages/*   # Build apenas pacotes

# Geração de conteúdo
pnpm generate-posts   # Gerar novos posts

# Linting
pnpm lint             # Executar linter em todos os projetos

# Limpeza
pnpm clean            # Limpar builds
```

## 🛠️ Customização

### Temas e Cores

Personalize cores em `packages/config/src/sites/[site].ts`:

```typescript
themeColor: '#seu-hex-color'
```

### Componentes UI

Adicione novos componentes em `packages/ui/src/components/`.

### Prompts da IA

Customize prompts em `packages/content/scripts/generate_posts.ts`.

### Layout e Design

Modifique `apps/[site]/app/layout.tsx` e `apps/[site]/app/globals.css`.

## 🐛 Troubleshooting

### Erro de Build

```bash
# Limpar caches
pnpm clean
rm -rf node_modules
pnpm install
```

### Contentlayer não encontra posts

```bash
# Rebuild Contentlayer
pnpm --filter packages/content run build
```

### Problemas com tipos TypeScript

```bash
# Rebuild todos os pacotes
pnpm turbo run build --filter="packages/*"
```

## 📦 Dependências Principais

- **Next.js 14**: Framework React
- **Turborepo**: Build system para monorepos
- **Contentlayer**: Processamento de MDX
- **Tailwind CSS**: Framework CSS utilitário
- **OpenAI**: API para geração de conteúdo
- **@vercel/og**: Geração de imagens Open Graph

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

