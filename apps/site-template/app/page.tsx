import { createHomePage } from '@multi-site-ai/shared-app'

const SITE_ID = 'tech-news'

export const revalidate = 60 // ISR: revalidar a cada minuto

export default createHomePage(SITE_ID)