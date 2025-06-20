import { technewsConfig } from './tech-news'
import type { SiteConfig } from '../site-config'
import { financasConfig } from './financas'
import { automoveisConfig } from './automoveis'
import { saudealimentacaoConfig } from './saude-alimentacao'
import { viagemlifestyleConfig } from './viagem-lifestyle'
import { portalConfig } from './portal'
import { entretenimentoConfig } from './entretenimento'
export const siteConfigs: Record<string, SiteConfig> = {
    'tech-news': technewsConfig,
    'financas': financasConfig,
    'automoveis': automoveisConfig,
    'saude-alimentacao': saudealimentacaoConfig,
    'viagem-lifestyle': viagemlifestyleConfig,
    'portal': portalConfig,
    'entretenimento': entretenimentoConfig,// Adicione novas configurações de sites aqui
    // 'site-foo': siteFooConfig,
}

export function getSiteConfig(siteId: string): SiteConfig {
    const config = siteConfigs[siteId]
    if (!config) {
        throw new Error(`Site configuration not found for: ${siteId}`)
    }
    return config
}

export { technewsConfig, financasConfig, automoveisConfig, saudealimentacaoConfig, viagemlifestyleConfig, portalConfig, entretenimentoConfig }
export type { SiteConfig } 