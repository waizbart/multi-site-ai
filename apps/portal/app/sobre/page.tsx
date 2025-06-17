import { getSiteConfig } from '@multi-site-ai/config'

const siteConfig = getSiteConfig('portal')

export default function SobrePage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Sobre Nós</h1>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <h2>Sobre o {siteConfig.name}</h2>
                <p>{siteConfig.description}</p>

                <h2>Nossa Equipe</h2>
                <p>Somos uma equipe dedicada a criar conteúdo de qualidade.</p>

                

                <h2>Contato</h2>
                <p>Email: {siteConfig.author.email}</p>
            </div>
        </div>
    )
}