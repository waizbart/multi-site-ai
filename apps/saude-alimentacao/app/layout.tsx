import { getSiteConfig } from '@multi-site-ai/config'
import { createRootLayout, createLayoutMetadata } from '@multi-site-ai/shared-app'
import './globals.css'

const SITE_ID = 'saude-alimentacao'
const siteConfig = getSiteConfig(SITE_ID)

export const metadata = createLayoutMetadata(siteConfig)

export default createRootLayout(siteConfig)