// @ts-nocheck

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSiteConfig } from '@multi-site-ai/config'
import { Badge, formatDate } from '@multi-site-ai/ui'
import { Clock, Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getAllPosts, getPostBySlug } from '../lib/posts'
import { LazyComments } from '../components/LazyComments'

interface PostPageProps {
    params: {
        slug: string
    }
}

export function createPostPage(siteId: string) {
    const siteConfig = getSiteConfig(siteId)

    const generateStaticParams = async () => {
        const posts = getAllPosts(siteId)
        return posts.map((post) => ({
            slug: post.slug,
        }))
    }

    const generateMetadata = async ({ params }: PostPageProps): Promise<Metadata> => {
        const post = getPostBySlug(siteId, params.slug)

        if (!post) {
            return {}
        }

        const publishedAt = new Date(post.date).toISOString()
        const modifiedAt = new Date(post.date).toISOString()

        return {
            title: post.title,
            description: post.description,
            keywords: post.tags,
            authors: [{ name: siteConfig.author.name }],
            openGraph: {
                title: post.title,
                description: post.description,
                type: 'article',
                publishedTime: publishedAt,
                modifiedTime: modifiedAt,
                authors: [siteConfig.author.name],
                images: [
                    {
                        url: '/og-image.png',
                        width: 1200,
                        height: 630,
                        alt: post.title,
                    }
                ],
                tags: post.tags,
            },
            twitter: {
                card: 'summary_large_image',
                title: post.title,
                description: post.description,
                images: ['/og-image.png'],
            },
            alternates: {
                canonical: `${siteConfig.url}/${post.slug}`,
            },
        }
    }

    const PostPage = ({ params }: PostPageProps) => {
        const post = getPostBySlug(siteId, params.slug)

        if (!post) {
            notFound()
        }

        // JSON-LD structured data
        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            author: {
                '@type': 'Person',
                name: siteConfig.author.name,
                url: siteConfig.author.url,
            },
            publisher: {
                '@type': 'Organization',
                name: siteConfig.name,
                url: siteConfig.url,
            },
            keywords: post.tags.join(', '),
            articleSection: 'Technology',
            wordCount: post.body?.raw?.split(' ').length || 500,
            timeRequired: `PT${post.readingTime}M`,
        }

        return (
            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />

                <article className="container mx-auto px-4 py-8 max-w-4xl">
                    {/* Back Button */}
                    <Link
                        href="/"
                        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar para Home
                    </Link>

                    {/* Header */}
                    <header className="mb-8">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag: string) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
                            {post.title}
                        </h1>

                        {/* Description */}
                        <p className="text-xl text-muted-foreground mb-6">
                            {post.description}
                        </p>

                        {/* Meta info */}
                        <div className="flex items-center gap-6 text-sm text-muted-foreground pb-6 border-b">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <time dateTime={post.date}>
                                    {formatDate(post.date)}
                                </time>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {post.readingTime} min de leitura
                            </div>
                        </div>
                    </header>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body?.raw || 'Content not available'}</ReactMarkdown>
                    </div>

                    {/* Author Section */}
                    <section className="mt-12 p-6 bg-muted/30 rounded-lg border">
                        <div className="flex items-start gap-4">
                            <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                                <img
                                    src={siteConfig.author.image || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face`}
                                    alt={`Foto de ${siteConfig.author.name}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-2">
                                    Sobre {siteConfig.author.name}
                                </h3>
                                <p className="text-muted-foreground mb-3">
                                    {siteConfig.author.bio}
                                </p>
                                {siteConfig.author.credentials && (
                                    <p className="text-sm text-muted-foreground italic">
                                        {siteConfig.author.credentials}
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Lazy Comments Section */}
                    <LazyComments postSlug={post.slug} />

                    {/* Comment Form */}
                    <div className="bg-muted/30 rounded-lg p-6 border mt-8">
                        <h4 className="font-semibold mb-4">Deixe seu comentário</h4>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                                        Nome *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                        placeholder="Seu nome"
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                        placeholder="seu@email.com"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-1">
                                    Comentário *
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                                    placeholder="Escreva seu comentário aqui..."
                                    disabled
                                ></textarea>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Seu email não será publicado. Campos obrigatórios são marcados com *
                                </p>
                                <button
                                    type="button"
                                    className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium opacity-50 cursor-not-allowed"
                                    disabled
                                >
                                    Publicar Comentário
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="mt-8 pt-8 border-t">
                        <div className="flex flex-wrap gap-2">
                            <span className="text-sm text-muted-foreground">Tags:</span>
                            {post.tags.map((tag: string) => (
                                <Badge key={tag} variant="outline">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </footer>
                </article>
            </>
        )
    }

    return {
        PostPage,
        generateStaticParams,
        generateMetadata,
        revalidate: 60 // ISR: revalidar a cada minuto
    }
}

function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
} 