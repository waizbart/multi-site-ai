import { createHomePage } from '@multi-site-ai/shared-app'

const SITE_ID = 'automoveis'

export const revalidate = 60 // ISR: revalidar a cada minuto

export default createHomePage(SITE_ID)