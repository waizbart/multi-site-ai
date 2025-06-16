// @ts-nocheck

import type { Metadata } from 'next'
import Script from 'next/script'
import type { SiteConfig } from '@multi-site-ai/config'
import { ThemeProvider } from './ThemeProvider'
import NavBar from './NavBar'

interface RootLayoutProps {
    children: React.ReactNode
    siteConfig: SiteConfig
    className?: string
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

                    {/* AdSense */}
                    {siteConfig.adsenseId && (
                        <script
                            async
                            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsenseId}`}
                            crossOrigin="anonymous"
                        />
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

                            <main className="flex-1">{children}</main>

                            <footer className="w-full border-t py-6 md:py-0">
                                <div className="w-full flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row px-6">
                                    <p className="text-center text-sm leading-loose text-muted-foreground">
                                        © {new Date().getFullYear()} {siteConfig.name}
                                    </p>
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
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: siteConfig.name,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: siteConfig.seo.defaultTitle,
            description: siteConfig.seo.defaultDescription,
            images: ['/og-image.png'],
            creator: siteConfig.social?.twitter,
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
            google: 'google-site-verification-code',
        },
        alternates: {
            canonical: siteConfig.url,
        },
    }
} 