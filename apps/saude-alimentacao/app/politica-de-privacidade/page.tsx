import { getSiteConfig } from '@multi-site-ai/config'
import Link from 'next/link'

const siteConfig = getSiteConfig('saude-alimentacao')

export default function PoliticaDePrivacidadePage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Política de Privacidade</h1>
                <p className="text-muted-foreground">
                    Última atualização: {new Date().toLocaleDateString('pt-BR')}
                </p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <h2>1. Informações que Coletamos</h2>
                <p>
                    Coletamos informações quando você visita nosso site, se inscreve em nossa newsletter,
                    preenche um formulário ou interage com nosso conteúdo.
                </p>

                <h2>2. Como Usamos suas Informações</h2>
                <p>Utilizamos as informações coletadas para personalizar sua experiência e melhorar nosso conteúdo.</p>

                <h2>3. Cookies</h2>
                <p>Utilizamos cookies para melhorar sua experiência de navegação.</p>

                <h2>4. Google AdSense</h2>
                <p>Este site utiliza o Google AdSense para exibir anúncios.</p>

                <h2>5. Compartilhamento de Informações</h2>
                <p>Não vendemos suas informações pessoais para terceiros.</p>

                <h2>6. Segurança dos Dados</h2>
                <p>Implementamos medidas de segurança para proteger suas informações.</p>

                <h2>7. Seus Direitos (LGPD)</h2>
                <p>Você tem direito ao acesso, correção e exclusão de seus dados pessoais.</p>

                <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
                    <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                        Aviso Importante
                    </h3>
                    <p className="text-amber-700 dark:text-amber-300 text-sm">
                        As informações sobre saúde e alimentação fornecidas neste site são apenas para fins educacionais e informativos. 
Não substituem aconselhamento médico, diagnóstico ou tratamento profissional. Sempre consulte um médico, 
nutricionista ou outro profissional de saúde qualificado antes de fazer mudanças em sua dieta ou rotina de saúde.
                    </p>
                </div>

                <h2>8. Alterações</h2>
                <p>Esta política pode ser atualizada periodicamente.</p>
            </div>

            <div className="mt-12 pt-8 border-t">
                <p className="text-sm text-muted-foreground">
                    Para dúvidas, entre em contato: {siteConfig.author.email}
                </p>
            </div>
        </div>
    )
}