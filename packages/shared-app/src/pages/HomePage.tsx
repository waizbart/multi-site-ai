// @ts-nocheck

import { getSiteConfig } from '@multi-site-ai/config'
import { Badge, formatDate } from '@multi-site-ai/ui'
import { Clock, Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, getFeaturedPosts, getRecentPosts } from '../lib/posts'

interface HomePageProps {
    siteId: string
}

export function createHomePage(siteId: string) {
    const siteConfig = getSiteConfig(siteId)

    return function HomePage() {
        const featuredPosts = getFeaturedPosts(siteId, 3)
        const recentPosts = getRecentPosts(siteId, 6)
        const allPosts = getAllPosts(siteId)

        return (
            <div className="container mx-auto px-4 py-8 space-y-12">
                {/* Hero Section */}
                <section className="relative overflow-hidden rounded-xl mb-12">
                    <div className="absolute inset-0 bg-flow opacity-50" />
                    <div className="relative text-center py-20 px-4">
                        <h1 style={{ fontFamily: "Meow Script" }} className="text-5xl font-extrabold tracking-tight lg:text-6xl mb-6 bg-clip-text">
                            {siteConfig.name}
                        </h1>
                        <div className="flex items-center justify-center gap-2 mb-8">
                            <span className="text-lg text-muted-foreground">by</span>
                            <div className="flex items-center rounded-md border text-xs border-primary" style={{ fontFamily: "Lexend Zetta" }}>
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
                        <div className="flex justify-center gap-4">
                            <Link
                                href="#artigos"
                                className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                            >
                                Ver Artigos
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Featured Articles */}
                {featuredPosts.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-8">Artigos em Destaque</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {featuredPosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/${post.slug}`}
                                    className="group block p-6 bg-card hover:bg-accent/50 rounded-lg border transition-colors"
                                >
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {post.tags.slice(0, 2).map((tag) => (
                                            <Badge key={tag} variant="secondary">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-muted-foreground mb-4 line-clamp-2">
                                        {post.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <time dateTime={post.date}>
                                                {formatDate(post.date)}
                                            </time>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {post.readingTime} min
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Recent Articles */}
                <section id="artigos">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold">Artigos Recentes</h2>
                    </div>

                    {recentPosts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">Nenhum artigo disponível ainda.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {recentPosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/${post.slug}`}
                                    className="group block p-6 bg-card hover:bg-accent/50 rounded-lg border transition-colors"
                                >
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {post.tags.slice(0, 3).map((tag) => (
                                            <Badge key={tag} variant="outline">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-muted-foreground mb-4 line-clamp-3">
                                        {post.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <time dateTime={post.date}>
                                                {formatDate(post.date)}
                                            </time>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {post.readingTime} min
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

                {/* All Posts */}
                <section id="all-posts">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold">Todos os Artigos</h2>
                        <span className="text-sm text-muted-foreground">
                            {allPosts.length} artigo{allPosts.length !== 1 ? 's' : ''} disponível{allPosts.length !== 1 ? 'is' : ''}
                        </span>
                    </div>

                    {allPosts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">Nenhum artigo disponível ainda.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {allPosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/${post.slug}`}
                                    className="group block p-6 bg-card hover:bg-accent/50 rounded-lg border transition-colors"
                                >
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {post.tags.slice(0, 3).map((tag) => (
                                            <Badge key={tag} variant="outline">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-muted-foreground mb-4 line-clamp-3">
                                        {post.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <time dateTime={post.date}>
                                                {formatDate(post.date)}
                                            </time>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {post.readingTime} min
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        )
    }
} 