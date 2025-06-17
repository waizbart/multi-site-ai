import type { SiteConfig } from '@multi-site-ai/config'
import Link from 'next/link'

interface LegalPageLayoutProps {
    title: string
    children: React.ReactNode
    siteConfig: SiteConfig
}

function LegalPageLayout({ title, children, siteConfig }: LegalPageLayoutProps) {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">{title}</h1>
                <p className="text-muted-foreground">
                    Última atualização: {new Date().toLocaleDateString('pt-BR')}
                </p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                {children}
            </div>

            <div className="mt-12 pt-8 border-t">
                <p className="text-sm text-muted-foreground">
                    Para dúvidas, entre em contato conosco através do email:{' '}
                    <Link href={`mailto:${siteConfig.author.email}`} className="text-primary hover:underline">
                        {siteConfig.author.email}
                    </Link>
                </p>
            </div>
        </div>
    )
}

// Componente de Política de Privacidade
export function PrivacyPolicyPage({ siteConfig }: { siteConfig: SiteConfig }) {
    const isFinance = siteConfig.domain.includes('financas')
    const isHealth = siteConfig.domain.includes('saude')

    return (
        <LegalPageLayout title="Política de Privacidade" siteConfig={siteConfig}>
            <h2>1. Informações que Coletamos</h2>
            <p>
                Coletamos informações quando você visita nosso site, se inscreve em nossa newsletter,
                preenche um formulário ou interage com nosso conteúdo. As informações coletadas incluem:
            </p>
            <ul>
                <li>Informações pessoais (nome, email) fornecidas voluntariamente</li>
                <li>Dados de navegação através de cookies</li>
                <li>Informações de uso do site para análise e melhoria</li>
                <li>Dados de interação com anúncios (Google AdSense)</li>
            </ul>

            <h2>2. Como Usamos suas Informações</h2>
            <p>Utilizamos as informações coletadas para:</p>
            <ul>
                <li>Personalizar sua experiência no site</li>
                <li>Melhorar nosso conteúdo e serviços</li>
                <li>Enviar newsletters e comunicações (com seu consentimento)</li>
                <li>Exibir anúncios relevantes através do Google AdSense</li>
                <li>Cumprir obrigações legais</li>
            </ul>

            <h2>3. Cookies e Tecnologias de Rastreamento</h2>
            <p>
                Utilizamos cookies para melhorar sua experiência de navegação. Os cookies são pequenos
                arquivos armazenados em seu dispositivo que nos ajudam a:
            </p>
            <ul>
                <li>Lembrar suas preferências</li>
                <li>Analisar o tráfego do site</li>
                <li>Personalizar anúncios</li>
                <li>Melhorar a funcionalidade do site</li>
            </ul>

            <h2>4. Google AdSense e Publicidade</h2>
            <p>
                Este site utiliza o Google AdSense para exibir anúncios. O Google pode usar cookies
                para servir anúncios baseados em suas visitas anteriores a este site e outros sites.
            </p>

            <h2>5. Compartilhamento de Informações</h2>
            <p>
                Não vendemos, trocamos ou transferimos suas informações pessoais para terceiros,
                exceto quando necessário para fornecer o serviço solicitado ou quando exigido por lei.
            </p>

            <h2>6. Segurança dos Dados</h2>
            <p>
                Implementamos medidas de segurança adequadas para proteger suas informações pessoais
                contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>

            <h2>7. Seus Direitos (LGPD)</h2>
            <p>
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de:
            </p>
            <ul>
                <li>Confirmar a existência de tratamento de seus dados</li>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Revogar seu consentimento</li>
            </ul>

            {(isFinance || isHealth) && (
                <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
                    <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                        Aviso Importante - Conteúdo YMYL
                    </h3>
                    <p className="text-amber-700 dark:text-amber-300 text-sm">
                        {isFinance
                            ? 'As informações financeiras fornecidas neste site são apenas para fins educacionais e informativos. Não oferecemos consultoria financeira ou de investimentos. Sempre consulte um profissional financeiro qualificado antes de tomar decisões de investimento. Os investimentos envolvem riscos e podem resultar em perdas.'
                            : 'As informações sobre saúde e alimentação fornecidas neste site são apenas para fins educacionais e informativos. Não substituem aconselhamento médico, diagnóstico ou tratamento profissional. Sempre consulte um médico, nutricionista ou outro profissional de saúde qualificado antes de fazer mudanças em sua dieta ou rotina de saúde.'
                        }
                    </p>
                </div>
            )}

            <h2>8. Alterações nesta Política</h2>
            <p>
                Esta política pode ser atualizada periodicamente. Notificaremos sobre alterações
                significativas através do site ou por email.
            </p>
        </LegalPageLayout>
    )
}

// Componente de Termos de Uso  
export function TermsOfServicePage({ siteConfig }: { siteConfig: SiteConfig }) {
    const isFinance = siteConfig.domain.includes('financas')
    const isHealth = siteConfig.domain.includes('saude')

    return (
        <LegalPageLayout title="Termos de Uso" siteConfig={siteConfig}>
            <h2>1. Aceitação dos Termos</h2>
            <p>
                Ao acessar e usar este site, você aceita e concorda em cumprir estes termos de uso.
                Se você não concordar com estes termos, não deve usar este site.
            </p>

            <h2>2. Uso do Site</h2>
            <p>
                Este site destina-se a fornecer informações educacionais.
                Você concorda em usar o site apenas para fins legais e de maneira que não infrinja
                os direitos de terceiros.
            </p>

            <h2>3. Conteúdo e Propriedade Intelectual</h2>
            <p>
                Todo o conteúdo deste site, incluindo textos, imagens, gráficos, logos e software,
                é propriedade de {siteConfig.name} ou de seus licenciadores e está protegido por
                direitos autorais e outras leis de propriedade intelectual.
            </p>

            <h2>4. Isenção de Responsabilidade</h2>
            <p>
                As informações fornecidas neste site são apenas para fins informativos e educacionais.
                Não garantimos a precisão, completude ou atualidade das informações.
            </p>

            {(isFinance || isHealth) && (
                <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
                    <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                        Aviso Especial - Conteúdo YMYL
                    </h3>
                    <p className="text-amber-700 dark:text-amber-300 text-sm">
                        {isFinance
                            ? 'As informações financeiras fornecidas neste site são apenas para fins educacionais e informativos. Não oferecemos consultoria financeira ou de investimentos. Sempre consulte um profissional financeiro qualificado antes de tomar decisões de investimento. Os investimentos envolvem riscos e podem resultar em perdas.'
                            : 'As informações sobre saúde e alimentação fornecidas neste site são apenas para fins educacionais e informativos. Não substituem aconselhamento médico, diagnóstico ou tratamento profissional. Sempre consulte um médico, nutricionista ou outro profissional de saúde qualificado antes de fazer mudanças em sua dieta ou rotina de saúde.'
                        }
                    </p>
                </div>
            )}

            <h2>5. Links para Sites Terceiros</h2>
            <p>
                Este site pode conter links para sites de terceiros. Não somos responsáveis pelo
                conteúdo ou práticas de privacidade desses sites.
            </p>

            <h2>6. Limitação de Responsabilidade</h2>
            <p>
                Em nenhuma circunstância seremos responsáveis por danos diretos, indiretos,
                incidentais, especiais ou consequenciais decorrentes do uso deste site.
            </p>

            <h2>7. Modificações</h2>
            <p>
                Reservamos o direito de modificar estes termos a qualquer momento. As alterações
                entrarão em vigor imediatamente após a publicação no site.
            </p>

            <h2>8. Lei Aplicável</h2>
            <p>
                Estes termos são regidos pelas leis do Brasil. Qualquer disputa será resolvida nos
                tribunais competentes do Brasil.
            </p>
        </LegalPageLayout>
    )
}

// Componente de Política de Cookies
export function CookiePolicyPage({ siteConfig }: { siteConfig: SiteConfig }) {
    return (
        <LegalPageLayout title="Política de Cookies" siteConfig={siteConfig}>
            <h2>1. O que são Cookies</h2>
            <p>
                Cookies são pequenos arquivos de texto armazenados em seu dispositivo quando você
                visita um site. Eles são amplamente utilizados para fazer os sites funcionarem de
                forma mais eficiente e fornecer informações aos proprietários do site.
            </p>

            <h2>2. Como Usamos Cookies</h2>
            <p>Utilizamos cookies para:</p>
            <ul>
                <li>Melhorar a funcionalidade do site</li>
                <li>Analisar como você usa nosso site</li>
                <li>Personalizar conteúdo e anúncios</li>
                <li>Lembrar suas preferências</li>
            </ul>

            <h2>3. Tipos de Cookies que Utilizamos</h2>

            <h3>Cookies Essenciais</h3>
            <p>
                Necessários para o funcionamento básico do site. Incluem cookies de sessão e
                preferências do usuário.
            </p>

            <h3>Cookies de Análise</h3>
            <p>
                Utilizamos Google Analytics para entender como os visitantes interagem com nosso site.
                Estes cookies coletam informações anônimas sobre páginas visitadas e tempo gasto no site.
            </p>

            <h3>Cookies de Publicidade</h3>
            <p>
                Utilizamos Google AdSense para exibir anúncios relevantes. Estes cookies rastreiam
                sua atividade de navegação para personalizar os anúncios exibidos.
            </p>

            <h2>4. Gerenciamento de Cookies</h2>
            <p>
                Você pode controlar e/ou excluir cookies conforme desejar. Você pode excluir todos os
                cookies que já estão em seu dispositivo e configurar a maioria dos navegadores para
                impedir que sejam armazenados.
            </p>

            <h2>5. Cookies de Terceiros</h2>
            <p>
                Alguns cookies são colocados por serviços de terceiros que aparecem em nossas páginas:
            </p>
            <ul>
                <li><strong>Google Analytics:</strong> Para análise de tráfego</li>
                <li><strong>Google AdSense:</strong> Para publicidade personalizada</li>
            </ul>

            <h2>6. Consentimento</h2>
            <p>
                Ao continuar a usar nosso site, você consente com o uso de cookies conforme descrito
                nesta política. Você pode retirar seu consentimento a qualquer tempo modificando as
                configurações do seu navegador.
            </p>
        </LegalPageLayout>
    )
}

// Componente de Sobre
export function AboutPage({ siteConfig }: { siteConfig: SiteConfig }) {
    const isFinance = siteConfig.domain.includes('financas')
    const isHealth = siteConfig.domain.includes('saude')

    return (
        <LegalPageLayout title="Sobre Nós" siteConfig={siteConfig}>
            <h2>Sobre o {siteConfig.name}</h2>
            <p>{siteConfig.description}</p>

            <h2>Nossa Equipe</h2>
            <div className="bg-card border rounded-lg p-6 my-6">
                <h3 className="font-semibold mb-2 text-lg">{siteConfig.author.name}</h3>
                <p className="text-muted-foreground mb-3">
                    Equipe especializada em criar conteúdo de qualidade e informações confiáveis.
                </p>
                <p className="text-sm text-muted-foreground font-medium mb-3">
                    <strong>Credenciais:</strong> Equipe qualificada e experiente em nossa área de atuação.
                </p>
                <div className="mt-3">
                    <p className="text-sm">
                        <strong>Contato:</strong>{' '}
                        <Link href={`mailto:${siteConfig.author.email}`} className="text-primary hover:underline">
                            {siteConfig.author.email}
                        </Link>
                    </p>
                </div>
            </div>

            {(isFinance || isHealth) && (
                <>
                    <h2>Compromisso com a Qualidade</h2>
                    <p>
                        Como um site que trata de temas importantes, temos um compromisso especial
                        com a precisão e qualidade das informações que fornecemos. Nossa equipe é composta por
                        profissionais qualificados que revisam regularmente nosso conteúdo para garantir sua
                        relevância e precisão.
                    </p>

                    <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
                        <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                            Aviso Importante
                        </h3>
                        <p className="text-amber-700 dark:text-amber-300 text-sm">
                            {isFinance
                                ? 'As informações financeiras fornecidas neste site são apenas para fins educacionais e informativos. Não oferecemos consultoria financeira ou de investimentos. Sempre consulte um profissional financeiro qualificado antes de tomar decisões de investimento. Os investimentos envolvem riscos e podem resultar em perdas.'
                                : 'As informações sobre saúde e alimentação fornecidas neste site são apenas para fins educacionais e informativos. Não substituem aconselhamento médico, diagnóstico ou tratamento profissional. Sempre consulte um médico, nutricionista ou outro profissional de saúde qualificado antes de fazer mudanças em sua dieta ou rotina de saúde.'
                            }
                        </p>
                    </div>
                </>
            )}

            <h2>Nossa Missão</h2>
            <p>
                Fornecer informações precisas, úteis e atualizadas para nossos leitores, sempre
                mantendo os mais altos padrões de qualidade editorial e transparência.
            </p>

            <h2>Padrões Editoriais</h2>
            <ul>
                <li>Verificação de fatos e fontes confiáveis</li>
                <li>Revisão regular do conteúdo para manter atualização</li>
                <li>Transparência sobre autoria e credenciais</li>
                <li>Separação clara entre conteúdo editorial e publicitário</li>
            </ul>

            <h2>Contato</h2>
            <p>Para sugestões, feedback ou dúvidas, entre em contato conosco:</p>
            <ul>
                <li><strong>Email:</strong> {siteConfig.author.email}</li>
            </ul>
        </LegalPageLayout>
    )
}

// Componente de Contato
export function ContactPage({ siteConfig }: { siteConfig: SiteConfig }) {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Entre em Contato</h1>
                <p className="text-xl text-muted-foreground">
                    Estamos aqui para ajudar com suas dúvidas
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Informações de Contato</h2>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium">Email</p>
                                    <Link href={`mailto:${siteConfig.author.email}`} className="text-primary hover:underline">
                                        {siteConfig.author.email}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Como Podemos Ajudar</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium text-primary">Dúvidas Gerais</h4>
                            <p className="text-sm text-muted-foreground">
                                Tire dúvidas sobre nosso conteúdo e serviços.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-medium text-primary">Sugestões de Conteúdo</h4>
                            <p className="text-sm text-muted-foreground">
                                Sugestões de temas que você gostaria de ver no site.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-medium text-primary">Parcerias</h4>
                            <p className="text-sm text-muted-foreground">
                                Propostas de parceria e colaboração.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 