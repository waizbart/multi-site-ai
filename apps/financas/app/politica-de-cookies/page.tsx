import { getSiteConfig } from '@multi-site-ai/config'

const siteConfig = getSiteConfig('financas')

export default function PoliticaDeCookiesPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Política de Cookies</h1>
                <p className="text-muted-foreground">
                    Última atualização: {new Date().toLocaleDateString('pt-BR')}
                </p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <h2>1. O que são Cookies</h2>
                <p>Cookies são pequenos arquivos armazenados em seu dispositivo.</p>

                <h2>2. Como Usamos Cookies</h2>
                <p>Utilizamos cookies para melhorar a funcionalidade do site.</p>

                <h2>3. Tipos de Cookies</h2>
                <p>Utilizamos cookies essenciais, de análise e de publicidade.</p>

                <h2>4. Google Analytics e AdSense</h2>
                <p>Utilizamos Google Analytics e AdSense que colocam cookies.</p>

                <h2>5. Gerenciamento</h2>
                <p>Você pode controlar cookies através das configurações do navegador.</p>
            </div>
        </div>
    )
}