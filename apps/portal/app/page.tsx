import { getSiteConfig } from '@multi-site-ai/config'
import { siteConfigs } from '@multi-site-ai/config'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'

const SITE_ID = 'portal'

export const revalidate = 60 // ISR: revalidar a cada minuto

export default function PortalHomePage() {
    const siteConfig = getSiteConfig(SITE_ID)

    // Filtrar o próprio portal da lista
    const otherSites = Object.entries(siteConfigs).filter(([id]) => id !== SITE_ID)

    return (
        <div className="container mx-auto px-4 py-8 space-y-12">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-xl mb-12">
                <div className="absolute inset-0 bg-flow opacity-50" />
                <div className="relative text-center py-20 px-4">
                    <div className="flex items-center justify-center gap-8 mb-8">
                        <h1 style={{ fontFamily: "Meow Script" }} className="text-5xl font-extrabold tracking-tight lg:text-6xl bg-clip-text">
                            Portal
                        </h1>
                        <div className="flex items-center rounded-md border text-lg border-primary" style={{ fontFamily: "Lexend Zetta" }}>
                            <span className="px-2 py-1 bg-primary text-white dark:bg-white dark:text-primary font-bold rounded-l-md">
                                neo
                            </span>
                            <span className="px-2 py-1 text-black dark:text-white font-bold">
                                Stream
                            </span>
                        </div>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        {siteConfig.description}
                    </p>
                </div>
            </section>

            {/* Sites Grid */}
            <section>
                <h2 className="text-3xl font-bold mb-8 text-center">Nossos Sites</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {otherSites.map(([siteId, config]) => (
                        <Link
                            href={config.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={siteId}
                            className="group block p-6 bg-card hover:bg-accent/50 rounded-lg border transition-all duration-300 hover:shadow-lg hover:scale-105"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                    {config.name}
                                </h3>
                                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <p className="text-muted-foreground mb-4 line-clamp-3">
                                {config.description}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                                    {config.domain}
                                </span>
                            </div>
                            <a
                                href={config.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
                            >
                                Visitar Site
                                <ArrowRight className="ml-1 h-4 w-4" />
                            </a>
                        </Link>
                    ))}
                </div>
            </section>

            {/* About Section */}
            <section className="py-16 bg-muted/30 rounded-xl">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl font-bold mb-8 text-center">Nossa História</h2>

                    <div className="space-y-6 text-lg leading-relaxed">
                        <p className="text-muted-foreground">
                            A <strong className="text-foreground">NeoStream</strong> nasceu em 2024 de uma visão simples, mas poderosa:
                            democratizar o acesso à informação de qualidade em um mundo cada vez mais digital e fragmentado.
                        </p>

                        <p className="text-muted-foreground">
                            Tudo começou quando percebemos que as pessoas estavam perdidas em meio ao oceano de informações
                            da internet. Era difícil encontrar conteúdo confiável, atualizado e realmente útil sobre temas
                            específicos. Foi então que decidimos criar algo diferente: uma rede de sites especializados,
                            cada um focado em entregar o melhor conteúdo em sua área de expertise.
                        </p>

                        <p className="text-muted-foreground">
                            O nome <strong className="text-foreground">&ldquo;NeoStream&rdquo;</strong> representa nossa filosofia:
                            <em className="text-primary">&ldquo;Neo&rdquo;</em> simboliza o novo, o inovador, a abordagem moderna que trazemos
                            para cada tema. <em className="text-primary">&ldquo;Stream&rdquo;</em> representa o fluxo contínuo de informações
                            valiosas que entregamos aos nossos leitores, como um rio que nunca para de fluir.
                        </p>

                        <p className="text-muted-foreground">
                            Hoje, nossa rede abrange desde <strong className="text-foreground">finanças pessoais</strong> até
                            <strong className="text-foreground"> tecnologia de ponta</strong>, passando por
                            <strong className="text-foreground"> automóveis</strong>, <strong className="text-foreground">saúde e alimentação</strong>,
                            <strong className="text-foreground"> viagem e lifestyle</strong> e muito mais. Cada site é mantido por especialistas
                            apaixonados por suas áreas, garantindo que você sempre receba informações precisas, práticas e atualizadas.
                        </p>

                        <div className="bg-primary/10 p-6 rounded-lg border-l-4 border-primary mt-8">
                            <p className="text-foreground font-medium italic">
                                &ldquo;Nossa missão é ser o seu ponto de partida confiável para qualquer tema que você queira explorar.
                                Não importa se você está planejando suas finanças, escolhendo um novo carro, ou descobrindo
                                o próximo destino de viagem - a NeoStream está aqui para guiá-lo com informações que realmente importam.&rdquo;
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl font-bold mb-8 text-center">Entre em Contato</h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-2xl font-semibold mb-4">Fale Conosco</h3>
                                <p className="text-muted-foreground mb-6">
                                    Tem alguma dúvida, sugestão ou quer fazer uma parceria?
                                    Adoraríamos ouvir de você! Nossa equipe está sempre pronta
                                    para ajudar e melhorar ainda mais nossos conteúdos.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                        <span className="text-primary font-bold">@</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">Email Geral</p>
                                        <a href="mailto:contato@neostream.com.br" className="text-primary hover:underline">
                                            contato@neostream.com.br
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                        <span className="text-primary font-bold">📝</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">Parcerias & Colaborações</p>
                                        <a href="mailto:parcerias@neostream.com.br" className="text-primary hover:underline">
                                            parcerias@neostream.com.br
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                        <span className="text-primary font-bold">💡</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">Sugestões de Conteúdo</p>
                                        <a href="mailto:sugestoes@neostream.com.br" className="text-primary hover:underline">
                                            sugestoes@neostream.com.br
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Contact Form */}
                        <div className="bg-card p-6 rounded-lg border">
                            <h3 className="text-xl font-semibold mb-4">Mensagem Rápida</h3>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                                        Nome
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Seu nome"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="seu@email.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                        Assunto
                                    </label>
                                    <select
                                        id="subject"
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="">Selecione um assunto</option>
                                        <option value="geral">Dúvida Geral</option>
                                        <option value="parceria">Parceria</option>
                                        <option value="sugestao">Sugestão de Conteúdo</option>
                                        <option value="feedback">Feedback</option>
                                        <option value="outro">Outro</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                                        Mensagem
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                        placeholder="Sua mensagem..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors font-medium"
                                >
                                    Enviar Mensagem
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="text-center mt-12">
                        <h3 className="text-xl font-semibold mb-4">Siga-nos nas Redes Sociais</h3>
                        <div className="flex justify-center gap-6">
                            <a
                                href="https://twitter.com/neostream"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                                <span>🐦</span>
                                Twitter
                            </a>
                            <a
                                href="https://linkedin.com/company/neostream"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
                            >
                                <span>💼</span>
                                LinkedIn
                            </a>
                            <a
                                href="https://github.com/neostream"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
                            >
                                <span>💻</span>
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}