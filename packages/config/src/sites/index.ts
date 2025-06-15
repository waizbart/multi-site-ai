import { siteTemplateConfig } from './site-template'
import { technewsConfig } from './tech-news'
import type { SiteConfig } from '../site-config'

export const siteConfigs: Record<string, SiteConfig> = {
    'site-template': siteTemplateConfig,
    'tech-news': technewsConfig,
    // Adicione novas configurações de sites aqui
    // 'site-foo': siteFooConfig,
}

export function getSiteConfig(siteId: string): SiteConfig {
    const config = siteConfigs[siteId]
    if (!config) {
        throw new Error(`Site configuration not found for: ${siteId}`)
    }
    return config
}

export { siteTemplateConfig, technewsConfig }
export type { SiteConfig } 