import type { SiteConfig } from '../site-config'

export const technewsConfig: SiteConfig = {
    name: 'Tech News',
    description: 'Notícias sobre tecnologia e inovação',
    domain: 'tech-news.neostream.com.br',
    url: 'https://tech-news.neostream.com.br',
    logo: '/logo.png',
    favicon: '/favicon.ico',
    adsenseId: 'ca-pub-6189411019780384', // TODO: Substitua pelo seu ID do AdSense
    themeColor: '#33ed05',
    defaultLocale: 'pt-BR',
    author: {
        name: 'Autor do Tech News',
        email: 'contato@neostream.com.br',
        url: 'https://tech-news.neostream.com.br'
    },
    social: {
        twitter: '@neostream',
        github: 'neostream',
        linkedin: 'neostream'
    },
    seo: {
        defaultTitle: 'Tech News',
        titleTemplate: '%s | Tech News',
        defaultDescription: 'Notícias sobre tecnologia',
        keywords: [
            // 1. Generative AI & LLMs
            "gpt-5 release date",
            "open-source llm comparison 2025",
            "agentic ai tools for devs",
            "synthetic media regulation eu",
            "generative ai roi case study",
          
            // 2. 6G & conectividade
            "6g standard timeline",
            "terahertz spectrum 6g challenges",
            "6g vs 5g latency test",
          
            // 3. Cibersegurança orientada a IA
            "disinformation security tools",
            "llm jailbreak prevention",
            "post-quantum encryption adoption 2025",
          
            // 4. Computação quântica
            "error-corrected qubits breakthrough",
            "quantum advantage 2025 cases",
            "topological qubit startup funding",
          
            // 5. Edge / Neuromorphic computing
            "neuromorphic chip launch 2025",
            "edge ai inference benchmark",
            "brain-inspired architecture explained",
          
            // 6. Ecossistema Apple 2025
            "ios 26 features list",
            "macos tahoe review",
            "liquid glass design ios",
            "ipad window management update",
          
            // 7. AR/VR & spatial computing
            "visionos 2025 update",
            "apple vision pro v2 rumors",
            "enterprise metaverse adoption stats",
          
            // 8. Veículos elétricos & recarga
            "solid state battery breakthrough 2025",
            "nacs charging standard adoption",
            "wallbox review 2025",
          
            // 9. Clima & energia para IA
            "small modular reactor data center",
            "green ai infrastructure costs",
            "carbon capture startup 2025",
          
            // 10. Robótica & automação
            "humanoid robot workplace pilot",
            "gen-2 cobots manufacturing",
            "ai robotic process automation trends"
          ]
    }
}