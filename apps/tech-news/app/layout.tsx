import { getSiteConfig } from '@multi-site-ai/config'
import { createRootLayout, createLayoutMetadata } from '@multi-site-ai/shared-app'
import { Inter } from 'next/font/google'
import './globals.css'

const SITE_ID = 'tech-news'
const siteConfig = getSiteConfig(SITE_ID)

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata = createLayoutMetadata(siteConfig)

export default createRootLayout(siteConfig, inter.className)