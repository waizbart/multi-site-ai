#!/usr/bin/env ts-node

import * as fs from 'fs'
import * as path from 'path'

const SITE_ID = 'site-template'
const POSTS_DIR = path.join(__dirname, '..', 'sites', SITE_ID)

// Garantir que o diretório existe
if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true })
}

// Posts de exemplo para demonstrar o sistema
const samplePosts = [
    {
        slug: 'configurar-monorepo-turborepo',
        title: 'Como Configurar um Monorepo com Turborepo para Sites Múltiplos',
        description: 'Aprenda a criar um monorepo eficiente usando Turborepo para gerenciar múltiplos sites com conteúdo gerado por IA.',
        date: '2024-12-19',
        tags: ['turborepo', 'monorepo', 'next.js', 'typescript'],
        featured: true,
        readingTime: 8,
        content: `
# Como Configurar um Monorepo com Turborepo para Sites Múltiplos

Gerenciar múltiplos sites pode ser uma tarefa complexa, especialmente quando você quer manter a consistência de código e facilitar a manutenção. Neste artigo, vamos explorar como criar um monorepo usando Turborepo que pode hospedar vários sites com conteúdo gerado por inteligência artificial.

## O que é um Monorepo?

Um monorepo é uma estratégia de desenvolvimento onde múltiplos projetos são armazenados em um único repositório Git. Isso oferece várias vantagens:

- **Compartilhamento de código**: Pacotes e componentes podem ser reutilizados entre projetos
- **Sincronização de versões**: Todas as dependências ficam alinhadas
- **Refatoração simplificada**: Mudanças que afetam múltiplos projetos podem ser feitas atomicamente

## Por que Turborepo?

O Turborepo é uma ferramenta de build system para monorepos JavaScript/TypeScript que oferece:

### 🚀 Performance Otimizada
- **Cache inteligente**: Evita rebuilds desnecessários
- **Execução paralela**: Roda tarefas simultaneamente
- **Cache remoto**: Compartilha cache entre desenvolvedores

### 📦 Gerenciamento Simplificado
- **Pipelines declarativos**: Define dependências entre tarefas
- **Workspaces nativos**: Integra com npm/yarn/pnpm
- **Configuração mínima**: Setup rápido e fácil

## Estrutura do Projeto

\`\`\`
multi-site-ai/
├── apps/
│   ├── site-template/     # Site modelo
│   ├── tech-blog/         # Blog de tecnologia
│   └── news-site/         # Site de notícias
├── packages/
│   ├── ui/               # Componentes compartilhados
│   ├── config/           # Configurações
│   └── content/          # Sistema de conteúdo
└── turbo.json           # Configuração do Turborepo
\`\`\`

## Setup Completo Funcionando

Este template está **100% funcional** e inclui:

- ✅ **Monorepo Turborepo** com npm workspaces
- ✅ **Next.js 14** com App Router
- ✅ **TypeScript** completo
- ✅ **Tailwind CSS + shadcn/ui**
- ✅ **SEO otimizado**
- ✅ **Scripts de IA** para geração de conteúdo
- ✅ **GitHub Actions** para CI/CD

## Comandos Principais

\`\`\`bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Gerar conteúdo com IA
npm run generate-posts

# Lint e formatação
npm run lint
npm run format
\`\`\`

## Próximos Passos

1. Configure suas variáveis de ambiente
2. Personalize o design e conteúdo
3. Configure o deploy na Vercel
4. Ative a geração automática de conteúdo

**O projeto está pronto para uso!** 🚀
        `
    },
    {
        slug: 'ia-content-generation',
        title: 'Geração Automática de Conteúdo com IA: Guia Completo',
        description: 'Descubra como automatizar a criação de conteúdo usando OpenAI GPT-4 e Contentlayer para sites Next.js.',
        date: '2024-12-18',
        tags: ['ia', 'openai', 'contentlayer', 'automacao'],
        featured: true,
        readingTime: 6,
        content: `
# Geração Automática de Conteúdo com IA: Guia Completo

A inteligência artificial revolucionou a forma como criamos conteúdo. Neste guia, você aprenderá como implementar um sistema completo de geração automática de posts usando OpenAI GPT-4.

## Por que Automatizar a Criação de Conteúdo?

### 🎯 Benefícios Principais
- **Consistência**: Conteúdo regular e de qualidade
- **Escalabilidade**: Múltiplos sites simultaneamente
- **Eficiência**: Economia de tempo e recursos
- **SEO**: Conteúdo otimizado automaticamente

## Arquitetura do Sistema

\`\`\`typescript
// Script de geração
const generatePost = async (topic: string) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "Você é um especialista em criar conteúdo técnico..."
      },
      {
        role: "user", 
        content: \`Crie um post sobre: \${topic}\`
      }
    ]
  })
  
  return completion.choices[0].message.content
}
\`\`\`

## Integração com Contentlayer

O Contentlayer processa automaticamente os arquivos MDX:

\`\`\`javascript
// contentlayer.config.js
export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: \`**/*.mdx\`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    featured: { type: 'boolean', default: false }
  }
}))
\`\`\`

## Automação com GitHub Actions

\`\`\`yaml
name: Generate Content
on:
  schedule:
    - cron: '0 9 * * *'  # Diariamente às 9h

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Generate Posts
        run: npm run generate-posts
        env:
          OPENAI_API_KEY: \${{ secrets.OPENAI_API_KEY }}
\`\`\`

## Melhores Práticas

### 📝 Qualidade do Conteúdo
- Use prompts específicos e detalhados
- Implemente validação de qualidade
- Revise e edite o conteúdo gerado

### 🔧 Performance
- Cache de respostas da API
- Rate limiting para evitar limites
- Processamento em lote

### 🎨 SEO e UX
- Meta tags automáticas
- Estrutura semântica
- Imagens e mídia relevantes

## Resultados Esperados

Com este sistema, você pode:
- Gerar 10+ posts por dia
- Manter múltiplos sites atualizados
- Focar em estratégia ao invés de criação
- Escalar seu negócio de conteúdo

**A IA é o futuro da criação de conteúdo!** 🤖
        `
    },
    {
        slug: 'seo-nextjs-14',
        title: 'SEO Avançado no Next.js 14: App Router e Metadata API',
        description: 'Domine as técnicas de SEO mais avançadas do Next.js 14 com App Router, Metadata API e otimizações de performance.',
        date: '2024-12-17',
        tags: ['seo', 'nextjs', 'app-router', 'performance'],
        featured: false,
        readingTime: 10,
        content: `
# SEO Avançado no Next.js 14: App Router e Metadata API

O Next.js 14 trouxe mudanças significativas para SEO com o App Router e a nova Metadata API. Neste guia completo, você aprenderá todas as técnicas avançadas para otimizar seus sites.

## Metadata API: A Nova Era do SEO

### 🎯 Configuração Básica

\`\`\`typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: 'Meu Site',
    template: '%s | Meu Site'
  },
  description: 'Descrição otimizada para SEO',
  keywords: ['next.js', 'seo', 'react'],
  authors: [{ name: 'Seu Nome' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://seusite.com',
    siteName: 'Meu Site'
  }
}
\`\`\`

### 📄 Metadata Dinâmica

\`\`\`typescript
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author]
    }
  }
}
\`\`\`

## Structured Data (JSON-LD)

### 📊 Schema.org Implementation

\`\`\`typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.description,
  author: {
    '@type': 'Person',
    name: 'Autor'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Site Name'
  }
}

return (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
)
\`\`\`

## Performance e Core Web Vitals

### ⚡ Otimizações Essenciais

1. **Image Optimization**
\`\`\`typescript
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Descrição"
  width={1200}
  height={600}
  priority
  placeholder="blur"
/>
\`\`\`

2. **Font Optimization**
\`\`\`typescript
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})
\`\`\`

3. **Dynamic Imports**
\`\`\`typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />
})
\`\`\`

## Sitemap e Robots.txt

### 🗺️ Sitemap Dinâmico

\`\`\`typescript
// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  
  return [
    {
      url: 'https://seusite.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    ...posts.map(post => ({
      url: \`https://seusite.com/\${post.slug}\`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly',
      priority: 0.8
    }))
  ]
}
\`\`\`

### 🤖 Robots.txt

\`\`\`typescript
// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/'
    },
    sitemap: 'https://seusite.com/sitemap.xml'
  }
}
\`\`\`

## Técnicas Avançadas

### 🔍 Internal Linking
- Links contextuais automáticos
- Breadcrumbs semânticos
- Related posts inteligentes

### 📱 Mobile-First
- Responsive design
- Touch-friendly interfaces
- Fast loading on mobile

### 🌐 Internationalization
- Multi-language support
- Hreflang tags
- Localized content

## Monitoramento e Analytics

### 📈 Ferramentas Essenciais
- Google Search Console
- PageSpeed Insights
- Core Web Vitals
- Google Analytics 4

## Checklist de SEO

- ✅ Metadata completa
- ✅ Structured data
- ✅ Performance otimizada
- ✅ Mobile-friendly
- ✅ Sitemap atualizado
- ✅ Internal linking
- ✅ Content quality
- ✅ Technical SEO

**Com essas técnicas, seu site estará no topo dos resultados!** 🚀
        `
    },
    {
        slug: 'typescript-advanced-patterns',
        title: 'Padrões Avançados de TypeScript para Aplicações Escaláveis',
        description: 'Explore padrões avançados de TypeScript incluindo utility types, conditional types e template literal types.',
        date: '2024-12-16',
        tags: ['typescript', 'patterns', 'advanced', 'scalability'],
        featured: false,
        readingTime: 12,
        content: `
# Padrões Avançados de TypeScript para Aplicações Escaláveis

TypeScript oferece recursos poderosos que vão muito além da tipagem básica. Neste artigo, exploraremos padrões avançados que tornam suas aplicações mais robustas e escaláveis.

## Utility Types Avançados

### Custom Utility Types

\`\`\`typescript
// Deep Partial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Non-Nullable  
type NonNullable<T> = T extends null | undefined ? never : T

// Required Keys
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]
\`\`\`

## Conditional Types

### ⚡ Type Guards Avançados

\`\`\`typescript
type IsArray<T> = T extends readonly unknown[] ? true : false
type IsFunction<T> = T extends (...args: any[]) => any ? true : false

// Conditional Return Types
type ApiResponse<T> = T extends string 
  ? { message: T }
  : T extends number
  ? { count: T }
  : { data: T }
\`\`\`

## Template Literal Types

### 🎨 String Manipulation

\`\`\`typescript
// CSS Properties
type CSSProperty = \`--\${string}\`
type EventName = \`on\${Capitalize<string>}\`

// Route Generation
type Route = '/users' | '/posts' | '/settings'
type ApiRoute<T extends Route> = \`/api\${T}\`

// Usage
const apiRoute: ApiRoute<'/users'> = '/api/users' // OK
\`\`\`

## Mapped Types Avançados

### 🗺️ Transformações Complexas

\`\`\`typescript
// Make Optional by Key
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// Readonly by Key  
type ReadonlyBy<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>

// Prefix Keys
type PrefixKeys<T, P extends string> = {
  [K in keyof T as \`\${P}\${string & K}\`]: T[K]
}
\`\`\`

## Padrões de Design com TypeScript

### 🏗️ Builder Pattern

\`\`\`typescript
class QueryBuilder<T> {
  private query: Partial<T> = {}
  
  where<K extends keyof T>(key: K, value: T[K]): QueryBuilder<T> {
    this.query[key] = value
    return this
  }
  
  build(): Partial<T> {
    return { ...this.query }
  }
}

// Usage
const userQuery = new QueryBuilder<User>()
  .where('name', 'John')
  .where('age', 30)
  .build()
\`\`\`

### 🏭 Factory Pattern

\`\`\`typescript
interface DatabaseConfig {
  type: 'postgres' | 'mysql' | 'mongodb'
  host: string
  port: number
}

type DatabaseConnection<T extends DatabaseConfig['type']> = 
  T extends 'postgres' ? PostgresConnection :
  T extends 'mysql' ? MySQLConnection :
  T extends 'mongodb' ? MongoConnection :
  never

class DatabaseFactory {
  static create<T extends DatabaseConfig['type']>(
    config: DatabaseConfig & { type: T }
  ): DatabaseConnection<T> {
    // Implementation
  }
}
\`\`\`

## Error Handling Avançado

### 🚨 Result Pattern

\`\`\`typescript
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E }

async function fetchUser(id: string): Promise<Result<User, 'NOT_FOUND' | 'NETWORK_ERROR'>> {
  try {
    const user = await api.getUser(id)
    return { success: true, data: user }
  } catch (error) {
    return { 
      success: false, 
      error: error.code === 404 ? 'NOT_FOUND' : 'NETWORK_ERROR' 
    }
  }
}

// Usage
const result = await fetchUser('123')
if (result.success) {
  console.log(result.data.name) // Type-safe access
} else {
  console.error(result.error) // 'NOT_FOUND' | 'NETWORK_ERROR'
}
\`\`\`

## Performance e Otimização

### ⚡ Lazy Loading Types

\`\`\`typescript
// Lazy evaluation
type LazyType<T> = () => T

// Memoized types
type Memoize<T> = T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : never
\`\`\`

## Testing com TypeScript

### 🧪 Type-Safe Tests

\`\`\`typescript
// Test utilities
type MockFunction<T extends (...args: any[]) => any> = jest.MockedFunction<T>

interface TestUser {
  id: string
  name: string
  email: string
}

const createMockUser = (overrides?: Partial<TestUser>): TestUser => ({
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  ...overrides
})
\`\`\`

## Melhores Práticas

### 📋 Checklist de Qualidade

1. **Strict Mode**: Sempre ative o modo strict
2. **No Any**: Evite \`any\` a todo custo
3. **Utility Types**: Use utility types built-in
4. **Generic Constraints**: Constrainja seus generics
5. **Discriminated Unions**: Para type safety
6. **Branded Types**: Para validação em runtime

### 🎯 Exemplo Prático

\`\`\`typescript
// Branded types para validação
type Email = string & { __brand: 'Email' }
type UserId = string & { __brand: 'UserId' }

const createEmail = (value: string): Email | null => {
  return /^[^@]+@[^@]+\.[^@]+$/.test(value) ? value as Email : null
}

const createUserId = (value: string): UserId => {
  return value as UserId
}

// Usage
const email = createEmail('user@example.com') // Email | null
const userId = createUserId('123') // UserId

function sendEmail(to: Email, userId: UserId) {
  // Type-safe function
}
\`\`\`

## Conclusão

TypeScript oferece ferramentas poderosas para criar aplicações robustas e escaláveis. Dominar esses padrões avançados é essencial para desenvolvedores que querem levar suas habilidades ao próximo nível.

**Continue praticando e explorando!** 🚀
        `
    },
    {
        slug: 'react-performance-optimization',
        title: 'Otimização de Performance em React: Guia Definitivo 2024',
        description: 'Técnicas avançadas de otimização de performance em React incluindo memoization, lazy loading e profiling.',
        date: '2024-12-15',
        tags: ['react', 'performance', 'optimization', 'memoization'],
        featured: true,
        readingTime: 15,
        content: `
# Otimização de Performance em React: Guia Definitivo 2024

Performance é crucial para uma boa experiência do usuário. Neste guia completo, você aprenderá todas as técnicas essenciais para otimizar aplicações React.

## Fundamentos da Performance

### 🎯 Métricas Importantes

- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s  
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

## React.memo e Memoization

### 🧠 Componentes Puros

\`\`\`typescript
// Componente sem otimização
const UserCard = ({ user, onEdit }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onEdit(user.id)}>Edit</button>
    </div>
  )
}

// Componente otimizado
const UserCard = React.memo(({ user, onEdit }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onEdit(user.id)}>Edit</button>
    </div>
  )
}, (prevProps, nextProps) => {
  // Custom comparison
  return prevProps.user.id === nextProps.user.id &&
         prevProps.user.name === nextProps.user.name
})
\`\`\`

### ⚡ useMemo e useCallback

\`\`\`typescript
const ExpensiveComponent = ({ items, filter }) => {
  // Expensive calculation memoized
  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    ).sort((a, b) => a.priority - b.priority)
  }, [items, filter])

  // Callback memoized
  const handleItemClick = useCallback((itemId) => {
    // Handle click logic
    analytics.track('item_clicked', { itemId })
  }, [])

  return (
    <div>
      {filteredItems.map(item => (
        <ItemCard 
          key={item.id} 
          item={item} 
          onClick={handleItemClick}
        />
      ))}
    </div>
  )
}
\`\`\`

## Code Splitting e Lazy Loading

### 📦 Dynamic Imports

\`\`\`typescript
// Route-based splitting
const Dashboard = lazy(() => import('./Dashboard'))
const Profile = lazy(() => import('./Profile'))
const Settings = lazy(() => import('./Settings'))

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </Router>
  )
}
\`\`\`

### 🎨 Component-based Splitting

\`\`\`typescript
// Heavy component lazy loading
const ChartComponent = lazy(() => 
  import('./ChartComponent').then(module => ({
    default: module.ChartComponent
  }))
)

const DataVisualization = ({ data }) => {
  const [showChart, setShowChart] = useState(false)

  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        Show Chart
      </button>
      
      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <ChartComponent data={data} />
        </Suspense>
      )}
    </div>
  )
}
\`\`\`

## Virtualization

### 📜 Large Lists

\`\`\`typescript
import { FixedSizeList as List } from 'react-window'

const VirtualizedList = ({ items }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <ItemComponent item={items[index]} />
    </div>
  )

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={80}
      width="100%"
    >
      {Row}
    </List>
  )
}
\`\`\`

## State Management Optimization

### 🏪 Context Optimization

\`\`\`typescript
// Split contexts by concern
const UserContext = createContext()
const ThemeContext = createContext()
const NotificationContext = createContext()

// Avoid single large context
const AppProvider = ({ children }) => {
  return (
    <UserProvider>
      <ThemeProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </ThemeProvider>
    </UserProvider>
  )
}
\`\`\`

### ⚛️ State Colocation

\`\`\`typescript
// Bad: Global state for local UI
const [isModalOpen, setIsModalOpen] = useGlobalState('modalOpen')

// Good: Local state for local UI
const Modal = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && <ModalContent onClose={() => setIsOpen(false)} />}
    </>
  )
}
\`\`\`

## Image Optimization

### 🖼️ Next.js Image Component

\`\`\`typescript
import Image from 'next/image'

const OptimizedImage = ({ src, alt }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
      priority={false}
      loading="lazy"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}
\`\`\`

## Bundle Analysis

### 📊 Webpack Bundle Analyzer

\`\`\`bash
# Install analyzer
npm install --save-dev webpack-bundle-analyzer

# Add to package.json
"analyze": "npm run build && npx webpack-bundle-analyzer build/static/js/*.js"

# Run analysis
npm run analyze
\`\`\`

## Performance Monitoring

### 📈 React DevTools Profiler

\`\`\`typescript
import { Profiler } from 'react'

const onRenderCallback = (id, phase, actualDuration) => {
  console.log('Component:', id)
  console.log('Phase:', phase)
  console.log('Duration:', actualDuration)
}

const App = () => {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <MainContent />
    </Profiler>
  )
}
\`\`\`

### 🔍 Web Vitals

\`\`\`typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
\`\`\`

## Advanced Patterns

### 🎭 Render Props Optimization

\`\`\`typescript
const DataProvider = ({ children, ...props }) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Memoize render prop to prevent unnecessary re-renders
  const renderProp = useMemo(() => 
    children({ data, loading, setData }), 
    [data, loading, children]
  )

  return renderProp
}
\`\`\`

### 🏗️ Compound Components

\`\`\`typescript
const Accordion = ({ children, ...props }) => {
  const [openItems, setOpenItems] = useState(new Set())

  const contextValue = useMemo(() => ({
    openItems,
    toggle: (id) => setOpenItems(prev => {
      const newSet = new Set(prev)
      newSet.has(id) ? newSet.delete(id) : newSet.add(id)
      return newSet
    })
  }), [openItems])

  return (
    <AccordionContext.Provider value={contextValue}>
      <div {...props}>{children}</div>
    </AccordionContext.Provider>
  )
}
\`\`\`

## Checklist de Performance

### ✅ Otimizações Essenciais

- [ ] React.memo para componentes puros
- [ ] useMemo para cálculos caros
- [ ] useCallback para funções estáveis
- [ ] Code splitting por rotas
- [ ] Lazy loading de componentes
- [ ] Virtualização para listas grandes
- [ ] Otimização de imagens
- [ ] Bundle analysis regular
- [ ] Performance monitoring
- [ ] State colocation
- [ ] Context splitting
- [ ] Preloading crítico

## Ferramentas Recomendadas

### 🛠️ Development
- React DevTools Profiler
- Chrome DevTools Performance
- Lighthouse
- Web Vitals Extension

### 📦 Build
- Webpack Bundle Analyzer
- source-map-explorer
- bundlephobia.com

**Performance é uma jornada, não um destino!** 🚀
        `
    }
]

// Criar os arquivos MDX
samplePosts.forEach(post => {
    const frontmatter = `---
title: "${post.title}"
description: "${post.description}"
date: "${post.date}"
tags: [${post.tags.map(tag => `"${tag}"`).join(', ')}]
featured: ${post.featured}
site: "${SITE_ID}"
---`

    const content = frontmatter + '\n' + post.content.trim()
    const filePath = path.join(POSTS_DIR, `${post.slug}.mdx`)

    // Usar line endings Unix (\n) para compatibilidade
    const normalizedContent = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

    fs.writeFileSync(filePath, normalizedContent, 'utf8')
    console.log(`✅ Created: ${post.slug}.mdx`)
})

console.log(`\n🎉 Created ${samplePosts.length} sample posts!`)
console.log('Now run: npm run build') 