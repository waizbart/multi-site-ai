'use client'

import { useState, useEffect } from 'react'
import { getRandomCommentsForPost, type Comment } from '../lib/comments'

interface LazyCommentsProps {
    postSlug: string
}

export function LazyComments({ postSlug }: LazyCommentsProps) {
    const [comments, setComments] = useState<Comment[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [shouldLoad, setShouldLoad] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !shouldLoad) {
                    setShouldLoad(true)
                }
            },
            { threshold: 0.1 }
        )

        const element = document.getElementById('comments-section')
        if (element) {
            observer.observe(element)
        }

        return () => observer.disconnect()
    }, [shouldLoad])

    useEffect(() => {
        if (shouldLoad) {
            // Simular um pequeno delay para evitar blocking
            const timer = setTimeout(() => {
                const loadedComments = getRandomCommentsForPost(postSlug)
                setComments(loadedComments)
                setIsLoading(false)
            }, 100)

            return () => clearTimeout(timer)
        }
    }, [shouldLoad, postSlug])

    if (isLoading && !shouldLoad) {
        return (
            <section id="comments-section" className="mt-12 border-t pt-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-muted rounded w-48 mb-6"></div>
                    <div className="text-center py-8 text-muted-foreground">
                        <div className="h-4 bg-muted rounded w-64 mx-auto"></div>
                    </div>
                </div>
            </section>
        )
    }

    if (comments.length === 0 && !isLoading) {
        return (
            <section id="comments-section" className="mt-12 border-t pt-8">
                <h3 className="text-2xl font-bold mb-6">Comentários</h3>
                <div className="text-center py-8 text-muted-foreground">
                    <p>Seja o primeiro a comentar este artigo!</p>
                </div>
            </section>
        )
    }

    return (
        <section id="comments-section" className="mt-12 border-t pt-8">
            <h3 className="text-2xl font-bold mb-6">Comentários ({comments.length})</h3>

            {/* Comments List */}
            <div className="space-y-6 mb-8">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-medium">{comment.initials}</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium">{comment.name}</span>
                                <span className="text-sm text-muted-foreground">• {comment.timeAgo}</span>
                            </div>
                            <p className="text-muted-foreground">
                                {comment.message}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
} 