import { technewsConfig } from './tech-news'
import type { SiteConfig } from '../site-config'
import { financasConfig } from './financas'
import { automoveisConfig } from './automoveis'

export const siteConfigs: Record<string, SiteConfig> = {
    'tech-news': technewsConfig,
    'financas': financasConfig,
    'automoveis': automoveisConfig,
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

export { technewsConfig, financasConfig, automoveisConfig }
export type { SiteConfig } 