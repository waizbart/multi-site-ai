#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const sites = [
    'financas',
    'saude-alimentacao',
    'tech-news',
    'automoveis',
    'viagem-lifestyle',
    'portal'
];

// Função para otimizar o layout.tsx de cada site
function optimizeLayout(siteId) {
    const layoutPath = path.join(__dirname, '..', 'apps', siteId, 'app', 'layout.tsx');

    const optimizedLayout = `import type { Metadata } from 'next'
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
    other: {
        'google-adsense-account': siteConfig.adsenseId,
    },
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR" className={inter.className}>
            <head>
                {/* Preload critical resources */}
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link rel="dns-prefetch" href="//www.googletagmanager.com" />
                <link rel="dns-prefetch" href="//www.google-analytics.com" />
                <link rel="dns-prefetch" href="//googleads.g.doubleclick.net" />
                
                {/* AdSense */}
                <meta name="google-adsense-account" content={siteConfig.adsenseId} />
                
                {/* Performance hints */}
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
                <meta httpEquiv="x-dns-prefetch-control" content="on" />
            </head>
            <body className="min-h-screen bg-background font-sans antialiased">
                <RootLayout>
                    {children}
                </RootLayout>
                
                {/* Google Analytics */}
                <Script
                    src={\`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX\`}
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {\`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-XXXXXXXXXX');
                    \`}
                </Script>
                
                {/* AdSense */}
                <Script
                    async
                    src={\`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=\${siteConfig.adsenseId}\`}
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />
                
                {/* Cookie Consent */}
                <Script id="cookie-consent" strategy="afterInteractive">
                    {\`
                        (function() {
                            // Verificar se o consentimento já foi dado
                            if (localStorage.getItem('cookieConsent') === 'true') {
                                return;
                            }
                            
                            // Mostrar banner de cookies após 3 segundos
                            setTimeout(function() {
                                const banner = document.getElementById('cookie-consent');
                                if (banner) {
                                    banner.style.display = 'block';
                                }
                            }, 3000);
                            
                            // Função para aceitar cookies
                            window.acceptCookies = function() {
                                localStorage.setItem('cookieConsent', 'true');
                                const banner = document.getElementById('cookie-consent');
                                if (banner) {
                                    banner.style.display = 'none';
                                }
                            };
                        })();
                    \`}
                </Script>
            </body>
        </html>
    )
}`;

    fs.writeFileSync(layoutPath, optimizedLayout);
    console.log(`  ✅ Otimizado layout de ${siteId}`);
}

// Função para criar um componente de imagem otimizada
function createOptimizedImageComponent() {
    const componentPath = path.join(__dirname, '..', 'packages', 'shared-app', 'src', 'components', 'OptimizedImage.tsx');

    const component = `import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    className?: string
    priority?: boolean
    fill?: boolean
    sizes?: string
    placeholder?: 'blur' | 'empty'
    blurDataURL?: string
}

export function OptimizedImage({
    src,
    alt,
    width,
    height,
    className = '',
    priority = false,
    fill = false,
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    placeholder = 'empty',
    blurDataURL
}: OptimizedImageProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    
    if (hasError) {
        return (
            <div 
                className={\`bg-gray-200 dark:bg-gray-800 flex items-center justify-center \${className}\`}
                style={{ width, height }}
            >
                <span className="text-gray-500 text-sm">Imagem não disponível</span>
            </div>
        )
    }
    
    return (
        <div className={\`relative overflow-hidden \${className}\`}>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                fill={fill}
                sizes={sizes}
                priority={priority}
                placeholder={placeholder}
                blurDataURL={blurDataURL}
                loading={priority ? 'eager' : 'lazy'}
                className={\`transition-opacity duration-300 \${
                    isLoading ? 'opacity-0' : 'opacity-100'
                } \${fill ? 'object-cover' : ''}\`}
                onLoad={() => setIsLoading(false)}
                onError={() => setHasError(true)}
                quality={85}
            />
            {isLoading && (
                <div 
                    className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse"
                    style={{ width, height }}
                />
            )}
        </div>
    )
}`;

    if (!fs.existsSync(path.dirname(componentPath))) {
        fs.mkdirSync(path.dirname(componentPath), { recursive: true });
    }

    fs.writeFileSync(componentPath, component);
    console.log(`  ✅ Criado componente OptimizedImage`);
}

// Função para criar um next.config.mjs otimizado
function createOptimizedNextConfig(siteId) {
    const configPath = path.join(__dirname, '..', 'apps', siteId, 'next.config.mjs');

    const config = `/** @type {import('next').NextConfig} */
const nextConfig = {
    // Otimizações de performance
    compress: true,
    poweredByHeader: false,
    generateEtags: true,
    
    // Otimizações de imagem
    images: {
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 31536000, // 1 year
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        domains: ['images.unsplash.com', 'via.placeholder.com'],
    },
    
    // Headers de segurança e performance
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin'
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()'
                    }
                ]
            },
            {
                source: '/favicon.ico',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ]
            },
            {
                source: '/_next/static/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ]
            }
        ]
    },
    
    // Experimental features para performance
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['@multi-site-ai/shared-app', '@multi-site-ai/ui'],
    },
    
    // Webpack optimizations
    webpack: (config, { dev, isServer }) => {
        if (!dev && !isServer) {
            config.optimization.splitChunks.cacheGroups = {
                ...config.optimization.splitChunks.cacheGroups,
                vendor: {
                    test: /[\\\\/]node_modules[\\\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            }
        }
        return config
    },
    
    // Output configuration
    output: 'standalone',
    
    // Redirects para SEO
    async redirects() {
        return [
            // Adicionar redirects conforme necessário
        ]
    }
}

export default nextConfig`;

    fs.writeFileSync(configPath, config);
    console.log(`  ✅ Otimizado next.config.mjs de ${siteId}`);
}

// Função para criar robots.txt otimizado
function createOptimizedRobots(siteId) {
    const robotsPath = path.join(__dirname, '..', 'apps', siteId, 'app', 'robots.txt', 'route.ts');

    const robots = `import { NextResponse } from 'next/server'

export async function GET() {
    const robotsContent = \`User-agent: *
Allow: /

# Sitemaps
Sitemap: https://${siteId}.neostream.com.br/sitemap.xml

# Crawl delay for better server performance
Crawl-delay: 1

# Disallow search and admin pages
Disallow: /search
Disallow: /admin
Disallow: /api

# Allow important pages
Allow: /politica-de-privacidade
Allow: /termos-de-uso
Allow: /sobre
Allow: /contato
Allow: /ads.txt
\`

    return new NextResponse(robotsContent, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=86400',
        },
    })
}`;

    const robotsDir = path.dirname(robotsPath);
    if (!fs.existsSync(robotsDir)) {
        fs.mkdirSync(robotsDir, { recursive: true });
    }

    fs.writeFileSync(robotsPath, robots);
    console.log(`  ✅ Otimizado robots.txt de ${siteId}`);
}

// Função para adicionar structured data
function createStructuredData(siteId) {
    const componentPath = path.join(__dirname, '..', 'packages', 'shared-app', 'src', 'components', 'StructuredData.tsx');

    const component = `import Script from 'next/script'
import type { SiteConfig } from '@multi-site-ai/config'

interface StructuredDataProps {
    siteConfig: SiteConfig
    page?: {
        title: string
        description: string
        url: string
        publishedAt?: string
        modifiedAt?: string
        author?: string
    }
}

export function StructuredData({ siteConfig, page }: StructuredDataProps) {
    const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": siteConfig.name,
        "description": siteConfig.description,
        "url": siteConfig.url,
        "logo": siteConfig.logo ? \`\${siteConfig.url}\${siteConfig.logo}\` : undefined,
        "contactPoint": {
            "@type": "ContactPoint",
            "email": siteConfig.author.email,
            "contactType": "Customer Service"
        },
        "sameAs": Object.values(siteConfig.social || {}).filter(Boolean)
    }
    
    const websiteData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": siteConfig.name,
        "description": siteConfig.description,
        "url": siteConfig.url,
        "publisher": {
            "@type": "Organization",
            "name": siteConfig.name
        }
    }
    
    const breadcrumbData = page ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteConfig.url
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": page.title,
                "item": page.url
            }
        ]
    } : null
    
    const articleData = page && page.publishedAt ? {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": page.title,
        "description": page.description,
        "url": page.url,
        "datePublished": page.publishedAt,
        "dateModified": page.modifiedAt || page.publishedAt,
        "author": {
            "@type": "Person",
            "name": page.author || siteConfig.author.name
        },
        "publisher": {
            "@type": "Organization",
            "name": siteConfig.name,
            "logo": siteConfig.logo ? \`\${siteConfig.url}\${siteConfig.logo}\` : undefined
        }
    } : null
    
    return (
        <>
            <Script
                id="organization-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationData)
                }}
            />
            <Script
                id="website-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteData)
                }}
            />
            {breadcrumbData && (
                <Script
                    id="breadcrumb-structured-data"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(breadcrumbData)
                    }}
                />
            )}
            {articleData && (
                <Script
                    id="article-structured-data"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(articleData)
                    }}
                />
            )}
        </>
    )
}`;

    if (!fs.existsSync(path.dirname(componentPath))) {
        fs.mkdirSync(path.dirname(componentPath), { recursive: true });
    }

    fs.writeFileSync(componentPath, component);
    console.log(`  ✅ Criado componente StructuredData`);
}

console.log('🚀 Otimizando performance de todos os sites...');

// Criar componentes otimizados
createOptimizedImageComponent();
createStructuredData();

// Otimizar cada site
sites.forEach(siteId => {
    console.log(`\n⚡ Otimizando: ${siteId}`);

    optimizeLayout(siteId);
    createOptimizedNextConfig(siteId);
    createOptimizedRobots(siteId);
});

// Exportar componentes otimizados
const sharedAppIndexPath = path.join(__dirname, '..', 'packages', 'shared-app', 'src', 'index.ts');
const currentContent = fs.readFileSync(sharedAppIndexPath, 'utf8');

if (!currentContent.includes('OptimizedImage')) {
    const newContent = currentContent + `
export { OptimizedImage } from './components/OptimizedImage'
export { StructuredData } from './components/StructuredData'
`;
    fs.writeFileSync(sharedAppIndexPath, newContent);
    console.log(`\n✅ Exportados componentes otimizados`);
}

console.log('\n🎉 Otimização de performance concluída!');
console.log('\n⚡ Otimizações implementadas:');
console.log('  - Lazy loading de imagens');
console.log('  - Compressão e cache otimizado');
console.log('  - Headers de segurança');
console.log('  - Structured data para SEO');
console.log('  - Google Analytics e AdSense otimizados');
console.log('  - Robots.txt melhorado');
console.log('  - Next.js config otimizado');
console.log('\n✨ Sites agora têm performance excelente para AdSense!'); 