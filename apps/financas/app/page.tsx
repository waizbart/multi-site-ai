import { createHomePage } from '@multi-site-ai/shared-app'

const SITE_ID = 'financas'

export const revalidate = 60 // ISR: revalidar a cada minuto

export default createHomePage(SITE_ID)