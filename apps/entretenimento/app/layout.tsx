import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { createRootLayout, createLayoutMetadata } from '@multi-site-ai/shared-app'
import { getSiteConfig } from '@multi-site-ai/config'
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    preload: true
})

const siteConfig = getSiteConfig('entretenimento')
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
} 