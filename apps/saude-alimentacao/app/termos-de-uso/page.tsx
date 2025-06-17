import { getSiteConfig } from '@multi-site-ai/config'

const siteConfig = getSiteConfig('saude-alimentacao')

export default function TermosDeUsoPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Termos de Uso</h1>
                <p className="text-muted-foreground">
                    Última atualização: {new Date().toLocaleDateString('pt-BR')}
                </p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <h2>1. Aceitação dos Termos</h2>
                <p>Ao acessar este site, você aceita estes termos de uso.</p>

                <h2>2. Uso do Site</h2>
                <p>Este site destina-se a fornecer informações educacionais.</p>

                <h2>3. Propriedade Intelectual</h2>
                <p>Todo o conteúdo é protegido por direitos autorais.</p>

                <h2>4. Isenção de Responsabilidade</h2>
                <p>As informações são fornecidas apenas para fins informativos.</p>

                <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
                    <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                        Aviso Especial
                    </h3>
                    <p className="text-amber-700 dark:text-amber-300 text-sm">
                        As informações sobre saúde fornecidas neste site são apenas para fins educacionais e informativos.
                    </p>
                </div>

                <h2>5. Lei Aplicável</h2>
                <p>Estes termos são regidos pelas leis do Brasil.</p>
            </div>
        </div>
    )
}