// @ts-nocheck

import type { Metadata } from 'next'
import Script from 'next/script'
import type { SiteConfig } from '@multi-site-ai/config'
import { ThemeProvider } from './ThemeProvider'
import NavBar from './NavBar'
import Link from 'next/link'

interface RootLayoutProps {
    children: React.ReactNode
    siteConfig: SiteConfig
    className?: string
}

// Componente de Disclaimer YMYL
function YMYLDisclaimer({ siteConfig }: { siteConfig: SiteConfig }) {
    if (!siteConfig.ymyl?.isYMYL) return null

    return (
        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                    <svg className="h-5 w-5 text-amber-600 dark:text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="text-sm text-amber-800 dark:text-amber-200">
                    <p className="font-medium mb-1">Aviso Importante</p>
                    <p>
                        {siteConfig.ymyl.financialDisclaimer || siteConfig.ymyl.medicalDisclaimer || siteConfig.ymyl.disclaimer}
                    </p>
                </div>
            </div>
        </div>
    )
}

export function createRootLayout(siteConfig: SiteConfig, className?: string) {
    return function RootLayout({ children }: { children: React.ReactNode }) {
        return (
            <html lang={siteConfig.defaultLocale}>
                <head>
                    <meta name="theme-color" content={siteConfig.themeColor} />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                    <link rel="manifest" href="/manifest.json" />

                    {/* Google Fonts - Otimizado para Performance */}
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
                        rel="stylesheet"
                    />

                    {/* AdSense - Meta tag de verificação será adicionada aqui */}
                    {siteConfig.adsenseId && (
                        <>
                            <meta name="google-adsense-account" content={siteConfig.adsenseId} />
                            <script
                                async
                                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsenseId}`}
                                crossOrigin="anonymous"
                            />
                        </>
                    )}

                    {/* Analytics */}
                    {process.env.NODE_ENV === 'production' && (
                        <>
                            <Script
                                src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
                                strategy="afterInteractive"
                            />
                            <Script id="google-analytics" strategy="afterInteractive">
                                {`
                                    window.dataLayer = window.dataLayer || [];
                                    function gtag(){dataLayer.push(arguments);}
                                    gtag('js', new Date());
                                    gtag('config', 'GA_MEASUREMENT_ID');
                                `}
                            </Script>
                        </>
                    )}
                </head>
                <body className={className}>
                    <ThemeProvider>
                        <div className="flex min-h-screen flex-col">
                            <NavBar title={siteConfig.name} />

                            <main className="flex-1">
                                <div className="container mx-auto px-4 py-6">
                                    <YMYLDisclaimer siteConfig={siteConfig} />
                                    {children}
                                </div>
                            </main>

                            <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                                <div className="container mx-auto px-4 py-8">
                                    {/* Links Legais - Obrigatórios para AdSense */}
                                    <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
                                        <Link href="/sobre" className="text-muted-foreground hover:text-foreground transition-colors">
                                            Sobre Nós
                                        </Link>
                                        <Link href="/politica-de-privacidade" className="text-muted-foreground hover:text-foreground transition-colors">
                                            Política de Privacidade
                                        </Link>
                                        <Link href="/termos-de-uso" className="text-muted-foreground hover:text-foreground transition-colors">
                                            Termos de Uso
                                        </Link>
                                        <Link href="/politica-de-cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                                            Política de Cookies
                                        </Link>
                                        <Link href="/contato" className="text-muted-foreground hover:text-foreground transition-colors">
                                            Contato
                                        </Link>
                                    </div>

                                    {/* Informações do Site */}
                                    <div className="text-center space-y-2">
                                        <p className="text-sm text-muted-foreground">
                                            © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
                                        </p>
                                        {siteConfig.author?.credentials && (
                                            <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
                                                {siteConfig.author.credentials}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </ThemeProvider>
                </body>
            </html>
        )
    }
}

export function createLayoutMetadata(siteConfig: SiteConfig): Metadata {
    return {
        title: {
            default: siteConfig.seo.defaultTitle,
            template: siteConfig.seo.titleTemplate,
        },
        description: siteConfig.seo.defaultDescription,
        keywords: siteConfig.seo.keywords,
        authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
        creator: siteConfig.author.name,
        publisher: siteConfig.author.name,
        metadataBase: new URL(siteConfig.url),
        openGraph: {
            type: 'website',
            locale: siteConfig.defaultLocale,
            url: siteConfig.url,
            title: siteConfig.seo.defaultTitle,
            description: siteConfig.seo.defaultDescription,
            siteName: siteConfig.name,
        },
        twitter: {
            card: 'summary_large_image',
            title: siteConfig.seo.defaultTitle,
            description: siteConfig.seo.defaultDescription,
            creator: '@' + siteConfig.author.name.replace(/\s+/g, '').toLowerCase(),
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        verification: {
            google: process.env.GOOGLE_VERIFICATION_ID,
        },
    }
} 