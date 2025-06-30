import { getSiteConfig } from '@multi-site-ai/config'

const siteConfig = getSiteConfig('entretenimento')

export default function PoliticaDePrivacidadePage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Política de Privacidade</h1>
                <p className="text-muted-foreground">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <h2>1. Informações Coletadas</h2>
                <p>Coletamos informações para melhorar a experiência do usuário.</p>

                <h2>2. Uso das Informações</h2>
                <p>Utilizamos as informações para personalizar conteúdo e anúncios.</p>

                <h2>3. Compartilhamento</h2>
                <p>Não compartilhamos informações pessoais com terceiros sem consentimento.</p>

                <h2>4. Segurança</h2>
                <p>Empregamos medidas de segurança para proteger seus dados.</p>

                <h2>5. Seus Direitos</h2>
                <p>Você pode acessar, corrigir ou excluir suas informações pessoais.</p>
            </div>
        </div>
    )
} 