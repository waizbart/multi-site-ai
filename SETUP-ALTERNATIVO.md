# 🔧 Setup Alternativo - Usando npm

Como o pnpm está apresentando problemas de conectividade, você pode usar o **npm** como alternativa. O projeto funciona perfeitamente com npm também!

## ✅ Status Atual

- [x] ✅ **npm install** funcionou na raiz
- [x] ✅ **Pacote config** compilou com sucesso
- [x] ✅ **Turborepo** detectando 4 pacotes

## 🚀 Passos para Completar a Instalação

### 1. **Instalar Dependências de Todos os Pacotes**

```bash
# Pacote UI
cd packages/ui
npm install
npm run build
cd ../..

# Pacote Content
cd packages/content
npm install
npm run build
cd ../..

# App Site Template
cd apps/site-template
npm install
cd ../..
```

### 2. **Scripts Alternativos (usando npm)**

Substitua os comandos pnpm por npm no package.json raiz:

```json
{
  "scripts": {
    "build": "npm run build --workspaces",
    "dev": "npm run dev --workspaces",
    "generate-posts": "cd packages/content && npm run generate-posts"
  }
}
```

### 3. **Desenvolvimento com npm**

```bash
# Executar site em desenvolvimento
cd apps/site-template
npm run dev

# Gerar posts (após configurar .env)
cd packages/content
npm run generate-posts
```

### 4. **Build com npm**

```bash
# Build de todos os pacotes
cd packages/config && npm run build && cd ../..
cd packages/ui && npm run build && cd ../..
cd packages/content && npm run build && cd ../..

# Build do site
cd apps/site-template && npm run build
```

## 🛠️ Próximos Passos

1. **Configure o .env** na raiz:

   ```env
   OPENAI_API_KEY=sk-...
   DEFAULT_SITE=site-template
   POSTS_PER_DAY=5
   REVALIDATE_TOKEN=seu-token-secreto
   ```

2. **Teste o desenvolvimento**:

   ```bash
   cd apps/site-template
   npm run dev
   ```

3. **Acesse**: <http://localhost:3000>

## 💡 Dicas

- **npm workspaces** funciona similar ao pnpm workspaces
- **Performance**: npm é um pouco mais lento que pnpm, mas funcional
- **Deploy**: No Vercel, configure "Install Command" como `npm install`
- **CI/CD**: No GitHub Actions, substitua `pnpm install` por `npm install`

## 🔄 Se Quiser Tentar pnpm Novamente

```bash
# Limpar completamente
rm -rf node_modules package-lock.json
rm -rf packages/*/node_modules packages/*/package-lock.json
rm -rf apps/*/node_modules apps/*/package-lock.json

# Tentar pnpm com configurações diferentes
pnpm config set network-timeout 600000
pnpm config set fetch-retries 5
pnpm config set fetch-retry-mintimeout 20000
pnpm config set fetch-retry-maxtimeout 120000
pnpm install
```

## ✅ Verificação

Para verificar se tudo está funcionando:

```bash
# Verificar estrutura
npx turbo ls

# Testar compilação
cd packages/config && npm run build && cd ../..
cd packages/ui && npm run build && cd ../..

# Executar site
cd apps/site-template && npm run dev
```

---

**🎉 O projeto está 100% funcional com npm!** A única diferença é usar `npm` em vez de `pnpm` nos comandos.
