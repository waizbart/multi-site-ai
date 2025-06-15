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
            wordCount: post.content.split(' ').length || 500,
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
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
                    </div>

                    {/* Footer */}
                    <footer className="mt-12 pt-8 border-t">
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