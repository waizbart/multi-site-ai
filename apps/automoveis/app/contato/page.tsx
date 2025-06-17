import { getSiteConfig } from '@multi-site-ai/config'

const siteConfig = getSiteConfig('automoveis')

export default function ContatoPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Entre em Contato</h1>
                <p className="text-xl text-muted-foreground">
                    Estamos aqui para ajudar
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold mb-4">Informações de Contato</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="font-medium">Email</p>
                            <p className="text-primary">{siteConfig.author.email}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Como Podemos Ajudar</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium text-primary">Dúvidas Gerais</h4>
                            <p className="text-sm text-muted-foreground">
                                Tire dúvidas sobre nosso conteúdo.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-medium text-primary">Sugestões</h4>
                            <p className="text-sm text-muted-foreground">
                                Sugestões de conteúdo são bem-vindas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}