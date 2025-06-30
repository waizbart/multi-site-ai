import { getSiteConfig } from '@multi-site-ai/config'

const siteConfig = getSiteConfig('entretenimento')

export default function SobrePage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Sobre Nós</h1>
                <p className="text-xl text-muted-foreground">Conheça mais sobre o {siteConfig.name}</p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p>{siteConfig.description}</p>
                <p>Nossa missão é oferecer conteúdos de entretenimento de alta qualidade e manter nossos leitores informados sobre as principais tendências da cultura pop, cinema, música e muito mais.</p>
            </div>
        </div>
    )
} 